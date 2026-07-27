import { DomainError } from "@/DomainError";

export class PuzzleServices {
  constructor(
    private readonly targetWords: string[],
    private usedWords: string[],
    private target: string,
  ) {}

  setTargetWord() {
    const unusedWords = this.targetWords.filter(
      (word) => !this.usedWords.includes(word),
    );

    const pool = unusedWords.length > 0 ? unusedWords : this.targetWords;

    this.target = pool[Math.floor(Math.random() * pool.length)];
  }

  private evaluateGuess(command: { guess: string }) {
    const guess = command.guess.trim().toLowerCase();

    if (!this.target) {
      this.setTargetWord();
    }

    if (guess.length !== 5) {
      throw new DomainError("INVALID_WORD_LENGTH");
    }
    if (!this.isValidWord(command)) {
      throw new DomainError("INVALID_WORD");
    }

    const guessArray = guess.split("");
    const targetArray = this.target.split("");
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

  private isValidWord(command: { guess: string }) {
    return this.targetWords.includes(command.guess);
  }
}
