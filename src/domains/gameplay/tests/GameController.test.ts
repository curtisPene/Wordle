import { TARGET_WORDS } from "@/domains/puzzle/data/targetWords";
import { PuzzleServices } from "@/domains/puzzle/services/PuzzleServices";
import { MAX_ATTEMPTS, useActiveGame } from "@/stores/useActiveGame";
import { GameController } from "../controllers/GameController";

function noop() {}

beforeEach(() => {
  useActiveGame.getState().resetGame();
});

describe("GameController.newGame", () => {
  it("sets a target word and today's date on a fresh store", () => {
    const gameController = new GameController(new PuzzleServices(TARGET_WORDS));

    gameController.newGame();

    const state = useActiveGame.getState();
    expect(state.targetWord).not.toBeNull();
    expect(TARGET_WORDS).toContain(state.targetWord);
    expect(state.gameDate).not.toBeNull();
  });

  it("does not reset an already-in-progress game for the same day", () => {
    const gameController = new GameController(new PuzzleServices(TARGET_WORDS));

    gameController.newGame();
    const targetWord = useActiveGame.getState().targetWord;

    useActiveGame.getState().setCurrentAttempt("abcde");
    gameController.newGame();

    expect(useActiveGame.getState().targetWord).toBe(targetWord);
    expect(useActiveGame.getState().currentAttempt).toBe("abcde");
  });
});

describe("GameController.onEnter", () => {
  it("records a valid guess and clears the current attempt", () => {
    const gameController = new GameController(new PuzzleServices(TARGET_WORDS));
    useActiveGame.getState().setTargetWord("hello");
    useActiveGame.getState().setCurrentAttempt("hello");

    gameController.onEnter({ guess: "hello", onBadGuess: noop });

    const state = useActiveGame.getState();
    expect(state.guesses).toHaveLength(1);
    expect(state.guesses[0].word).toBe("hello");
    expect(state.currentAttempt).toBe("");
  });

  it("sets status to won when the guess matches the target", () => {
    const gameController = new GameController(new PuzzleServices(TARGET_WORDS));
    useActiveGame.getState().setTargetWord("hello");
    useActiveGame.getState().setCurrentAttempt("hello");

    gameController.onEnter({ guess: "hello", onBadGuess: noop });

    expect(useActiveGame.getState().status).toBe("won");
  });

  it("sets status to lost after MAX_ATTEMPTS incorrect guesses", () => {
    const gameController = new GameController(new PuzzleServices(TARGET_WORDS));
    useActiveGame.getState().setTargetWord("hello");

    for (let i = 0; i < MAX_ATTEMPTS; i++) {
      useActiveGame.getState().setCurrentAttempt("jiffy");
      gameController.onEnter({ guess: "jiffy", onBadGuess: noop });
    }

    expect(useActiveGame.getState().guesses).toHaveLength(MAX_ATTEMPTS);
    expect(useActiveGame.getState().status).toBe("lost");
  });

  it("stays in-progress with fewer than MAX_ATTEMPTS incorrect guesses", () => {
    const gameController = new GameController(new PuzzleServices(TARGET_WORDS));
    useActiveGame.getState().setTargetWord("hello");
    useActiveGame.getState().setCurrentAttempt("jiffy");

    gameController.onEnter({ guess: "jiffy", onBadGuess: noop });

    expect(useActiveGame.getState().status).toBe("in-progress");
  });

  it("calls onBadGuess and does not record a guess when the word is invalid", () => {
    const gameController = new GameController(new PuzzleServices(TARGET_WORDS));
    useActiveGame.getState().setTargetWord("hello");
    useActiveGame.getState().setCurrentAttempt("zzzzz");

    const onBadGuess = jest.fn();
    gameController.onEnter({ guess: "zzzzz", onBadGuess });

    expect(onBadGuess).toHaveBeenCalledTimes(1);
    expect(useActiveGame.getState().guesses).toHaveLength(0);
  });

  it("does not throw or record a guess when no target word is set", () => {
    const gameController = new GameController(new PuzzleServices(TARGET_WORDS));
    useActiveGame.getState().setCurrentAttempt("hello");

    const onBadGuess = jest.fn();

    expect(() =>
      gameController.onEnter({ guess: "hello", onBadGuess }),
    ).not.toThrow();
    expect(useActiveGame.getState().guesses).toHaveLength(0);
  });
});

describe("GameController.onBackspace", () => {
  it("removes the last character of the current attempt", () => {
    const gameController = new GameController(new PuzzleServices(TARGET_WORDS));
    useActiveGame.getState().setCurrentAttempt("hell");

    gameController.onBackspace();

    expect(useActiveGame.getState().currentAttempt).toBe("hel");
  });
});

describe("GameController.onKey", () => {
  it("appends a letter to the current attempt", () => {
    const gameController = new GameController(new PuzzleServices(TARGET_WORDS));
    useActiveGame.getState().setCurrentAttempt("hel");

    gameController.onKey("l");

    expect(useActiveGame.getState().currentAttempt).toBe("hell");
  });

  it("does not append a letter once the attempt already has 5 characters", () => {
    const gameController = new GameController(new PuzzleServices(TARGET_WORDS));
    useActiveGame.getState().setCurrentAttempt("hello");

    gameController.onKey("x");

    expect(useActiveGame.getState().currentAttempt).toBe("hello");
  });
});
