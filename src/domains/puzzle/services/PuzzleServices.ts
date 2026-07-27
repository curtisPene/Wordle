import { DomainError } from "@/DomainError";

export class PuzzleServices {
  constructor(private readonly targetWords: string[]) {}

  private getDayOfYear(date: Date): number {
    return Math.floor(
      (date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) /
        86400000,
    );
  }

  getTargetWord(command: { seed?: string }) {
    if (command.seed) {
      const seed = command.seed.trim().toLowerCase();

      if (seed.length !== 5) {
        throw new DomainError("INVALID_SEED_LENGTH");
      }
      if (!this.targetWords.includes(seed)) {
        throw new DomainError("INVALID_SEED");
      }
      return seed;
    }

    const dayOfYear = this.getDayOfYear(new Date());
    const index = dayOfYear % this.targetWords.length;
    return this.targetWords[index];
  }

  evaluateGuess(command: { guess: string; target: string }) {
    const guess = command.guess.trim().toLowerCase();
    const target = command.target.trim().toLowerCase();

    if (guess.length !== 5) {
      throw new DomainError("INVALID_WORD_LENGTH");
    }
    if (!this.targetWords.includes(guess)) {
      throw new DomainError("INVALID_WORD");
    }

    const guessArray = guess.split("");
    const targetArray = target.split("");
    const result: ("correct" | "present" | "absent")[] = new Array(
      guessArray.length,
    );

    const remainingLetterCounts: Record<string, number> = {};
    targetArray.forEach((letter) => {
      remainingLetterCounts[letter] = (remainingLetterCounts[letter] ?? 0) + 1;
    });

    // Go through each letter in the guess array, if the letter is
    // in the target array and at the same index, then it is correct
    guessArray.forEach((letter, index) => {
      if (letter === targetArray[index]) {
        result[index] = "correct";
        remainingLetterCounts[letter] -= 1;
      }
    });

    // From the previous for each loop we know that any unmarked letters
    // in the guess array are now either present or absent.
    // So here we check that if the letter is in the remainingLetterCounts array AND
    // the letters remaining count is greater than 0, then we know its present ie correct guess
    // but wrong location. Lastly mark the guess as absent
    guessArray.forEach((letter, index) => {
      if (result[index]) return;

      if (remainingLetterCounts[letter] > 0) {
        result[index] = "present";
        remainingLetterCounts[letter] -= 1;
      } else {
        result[index] = "absent";
      }
    });

    return result;
  }
}
