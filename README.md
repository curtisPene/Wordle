# Wordle

A from-scratch Wordle clone built with Expo, used as a hands-on way to learn
React Native by shipping a real, playable app rather than following a
tutorial.

## Stack

- [Expo](https://docs.expo.dev/versions/v57.0.0/) (React Native)
- [Zustand](https://github.com/pmndrs/zustand), persisted to device storage
- [Reanimated](https://docs.swmansion.com/react-native-reanimated/) for tile
  flip and shake animations
- [Jest](https://jestjs.io/) via `jest-expo`
- [Supabase](https://supabase.com/) for auth and stats (planned)

## Why it's built this way

Most Wordle clones are a single component with a big switch statement. This
one is built the way a production app would be — game logic, app state, and
UI are kept honestly separated, so a bug is always traceable to the layer
that owns it, not a symptom of everything being tangled together:

- **The puzzle rules know nothing about the app.** `PuzzleServices` picks the
  day's word and scores a guess as pure functions — no store access, no React,
  no side effects. It's tested in isolation and would work identically in a
  CLI or a server.
- **Only the controller is allowed to mutate state.** `GameController` is the
  single place that reads a service result and decides what happens to the
  game — record the guess, flip to `won`/`lost`, or reject it. Nothing else in
  the codebase calls a store setter directly.
- **Errors are modeled, not stringly-typed.** `DomainError` (a Wordle rule was
  broken — bad word, wrong length) and `GameStateError` (the app isn't in a
  state where this action makes sense) are distinct hierarchies. Each carries
  a typed `reason`, so a `catch` block can be as coarse or as specific as the
  situation actually calls for.
- **The view can't touch app state, and doesn't try to interpret it either.**
  A `useGameViewModel` hook is the single source of truth for the "play a
  game" flow — it exposes already-shaped data (`rows`, `status`) and commands
  (`onPress`), and every screen or component that needs this flow reads from
  the same hook call rather than re-deriving its own copy.
- **Animation is local and reactive, never coordinated by state.** Tiles flip
  and shake themselves in response to their own props changing — there's no
  "wait, then reveal" state machine. The data is always correct; the
  presentation is just late on purpose.

## Architecture

```text
src/
  domains/
    puzzle/          pure game logic — no app state, no side effects
      services/       PuzzleServices (pick the word, evaluate a guess)
      data/           the word list
      tests/
    gameplay/         orchestrates the puzzle domain against app state
      controllers/    GameController — the only thing allowed to mutate state
      viewModels/     useGameViewModel — the single source of truth per flow
      tests/
  stores/             Zustand, persisted to AsyncStorage
  components/         presentational only (Tile, Grid, Keyboard, Button)
  errors/             DomainError / GameStateError hierarchies
  theme.ts            design tokens: colors, spacing, typography
  app/                screens, routed via Expo Router
```

## Get started

```bash
npm install
npx expo start
```

## Testing

```bash
npm test
```

`PuzzleServices` is tested for both correctness (exact matches, duplicate
letters, no overlap) and its error paths. `GameController` is tested against
the real Zustand store — win detection, loss after six attempts, rejected
guesses, and the daily-reset logic.

## Status

Working:

- Daily word selection, deterministic per calendar day, resets once per day
- Guess evaluation (correct / present / absent, including duplicate letters)
- Win/loss detection
- Tile flip and shake animations, staggered per column
- Game state persists across app restarts

Not yet built:

- Keyboard key coloring based on past guesses
- Results screen content
- Auth and stats (Supabase)
