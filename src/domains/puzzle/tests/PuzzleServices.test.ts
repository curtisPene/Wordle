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
});
