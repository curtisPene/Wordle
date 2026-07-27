# Wordle

A Wordle clone.

## Stack

- [Expo](https://docs.expo.dev/versions/v57.0.0/) (React Native)
- [Supabase](https://supabase.com/) for auth and stats

## Architecture

Code is organized by domain under `src/domains/`, following a ports/services
pattern:

- **`puzzle`** — pure game logic (picking the day's word, evaluating guesses).
  No app state, no side effects.
- **`gameplay`** — orchestrates the puzzle domain against app state:
  - `controllers/` — coordinates resets and cross-cutting state changes
    (e.g. `GameController` resets the board on a new day)
  - `viewModels/` — hooks that connect a screen to state and actions
    (e.g. `useGameViewModel`)

Shared, non-domain-specific pieces live alongside `domains/`:

- `src/stores/` — Zustand stores, persisted to device storage
  (`useActiveGame`, `useUsedWords`)
- `src/components/` — presentational UI components (`Tile`, `Grid`,
  `Keyboard`, `Button`)
- `src/theme.ts` — design tokens and theme (colors, spacing, typography)
- `src/app/` — screens, routed via [Expo Router](https://docs.expo.dev/versions/v57.0.0/sdk/router.md)

## Get started

```bash
npm install
npx expo start
```

## Testing

```bash
npm test
```

## Status

Working:

- Daily word selection, resetting once per calendar day
- Guess evaluation (correct / present / absent, including duplicate letters)
- On-screen keyboard input (letters, backspace, enter)
- Game state persists across app restarts

Not yet wired up:

- Grid doesn't render guesses/current row yet
- Win/loss detection and end-of-game state
- Keyboard key coloring based on past guesses
- Auth and stats (Supabase)
