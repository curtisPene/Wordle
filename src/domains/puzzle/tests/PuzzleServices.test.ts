import { InvalidWordError } from "@/errors/InvalidWordError";
import { TARGET_WORDS } from "../data/targetWords";
import { PuzzleServices } from "../services/PuzzleServices";

describe("PuzzleServices.evaluateGuess", () => {
  it("marks every letter correct when the guess matches the target exactly", () => {
    const puzzleServices = new PuzzleServices(TARGET_WORDS);

    const result = puzzleServices.evaluateGuess({
      guess: "hello",
      target: "hello",
    });

    expect(result).toEqual([
      "correct",
      "correct",
      "correct",
      "correct",
      "correct",
    ]);
  });

  it("correctly identifies duplicate guessed letters up to the count in the target", () => {
    const puzzleServices = new PuzzleServices(TARGET_WORDS);

    const result = puzzleServices.evaluateGuess({
      guess: "llama",
      target: "jolly",
    });

    expect(result).toEqual([
      "present",
      "present",
      "absent",
      "absent",
      "absent",
    ]);
  });

  it("marks every letter incorrect when the guess does not match the target at all", () => {
    const puzzleServices = new PuzzleServices(TARGET_WORDS);

    const result = puzzleServices.evaluateGuess({
      guess: "jiffy",
      target: "hello",
    });

    expect(result).toEqual(["absent", "absent", "absent", "absent", "absent"]);
  });

  it("throws InvalidWordError with reason TOO_SHORT when the guess isn't 5 letters", () => {
    const puzzleServices = new PuzzleServices(TARGET_WORDS);

    expect(() =>
      puzzleServices.evaluateGuess({ guess: "cat", target: "hello" }),
    ).toThrow(InvalidWordError);

    try {
      puzzleServices.evaluateGuess({ guess: "cat", target: "hello" });
    } catch (error) {
      expect(error).toBeInstanceOf(InvalidWordError);
      expect((error as InvalidWordError).reason).toBe("TOO_SHORT");
    }
  });

  it("throws InvalidWordError with reason NOT_IN_DICTIONARY when the guess isn't a real word", () => {
    const puzzleServices = new PuzzleServices(TARGET_WORDS);

    try {
      puzzleServices.evaluateGuess({ guess: "zzzzz", target: "hello" });
      throw new Error("expected evaluateGuess to throw");
    } catch (error) {
      expect(error).toBeInstanceOf(InvalidWordError);
      expect((error as InvalidWordError).reason).toBe("NOT_IN_DICTIONARY");
    }
  });
});

describe("PuzzleServices.getTargetWord", () => {
  it("returns a deterministic word from the target list when called without a seed", () => {
    const puzzleServices = new PuzzleServices(TARGET_WORDS);

    const first = puzzleServices.getTargetWord({});
    const second = puzzleServices.getTargetWord({});

    expect(TARGET_WORDS).toContain(first);
    expect(first).toBe(second);
  });

  it("returns the seed when it is a valid word", () => {
    const puzzleServices = new PuzzleServices(TARGET_WORDS);

    const result = puzzleServices.getTargetWord({ seed: "hello" });

    expect(result).toBe("hello");
  });

  it("throws InvalidWordError when the seed isn't 5 letters", () => {
    const puzzleServices = new PuzzleServices(TARGET_WORDS);

    try {
      puzzleServices.getTargetWord({ seed: "hi" });
      throw new Error("expected getTargetWord to throw");
    } catch (error) {
      expect(error).toBeInstanceOf(InvalidWordError);
      expect((error as InvalidWordError).reason).toBe("TOO_SHORT");
    }
  });

  it("throws InvalidWordError when the seed isn't a real word", () => {
    const puzzleServices = new PuzzleServices(TARGET_WORDS);

    try {
      puzzleServices.getTargetWord({ seed: "zzzzz" });
      throw new Error("expected getTargetWord to throw");
    } catch (error) {
      expect(error).toBeInstanceOf(InvalidWordError);
      expect((error as InvalidWordError).reason).toBe("NOT_IN_DICTIONARY");
    }
  });
});
