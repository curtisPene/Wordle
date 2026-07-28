import { DomainError } from "@/errors/DomainError";
import { PuzzleServices } from "@/domains/puzzle/services/PuzzleServices";
import { GameStateError } from "@/errors/GameStateError";
import { InvalidWordError } from "@/errors/InvalidWordError";
import { MAX_ATTEMPTS, useActiveGame } from "@/stores/useActiveGame";

function getLocalDateString(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export class GameController {
  constructor(private readonly puzzleServices: PuzzleServices) {}

  // resets game state
  newGame() {
    try {
      const today = getLocalDateString(new Date()); // e.g. "2026-07-28", local time
      const currentGameDate = useActiveGame.getState().gameDate;

      if (currentGameDate === today) {
        return; // already have today's game, don't reset
      }

      useActiveGame.getState().resetGame();
      useActiveGame.getState().setGameDate(today);
      useActiveGame
        .getState()
        .setTargetWord(this.puzzleServices.getTargetWord({}));
    } catch (error) {
      if (error instanceof DomainError) {
        console.log("GameController.newGame domain error:", error.message);
      } else {
        console.log("GameController.newGame unexpected error:", error);
      }
    }
  }

  onEnter(command: { guess: string; onBadGuess: () => void }) {
    try {
      const currentRow = useActiveGame.getState().currentAttempt;
      const targetWord = useActiveGame.getState().targetWord;

      if (!targetWord) {
        throw new GameStateError("TARGET_WORD_NOT_SET");
      }

      const result = this.puzzleServices.evaluateGuess({
        guess: currentRow,
        target: targetWord,
      });

      useActiveGame.getState().addGuess({ word: currentRow, result });

      const isWin = result.every((letter) => letter === "correct");
      const guesses = useActiveGame.getState().guesses;

      if (isWin) {
        useActiveGame.getState().setStatus("won");
      } else if (guesses.length >= MAX_ATTEMPTS) {
        useActiveGame.getState().setStatus("lost");
      }
    } catch (error) {
      if (error instanceof InvalidWordError) {
        console.log("GameController.onEnter invalid word:", error.reason);
        command.onBadGuess();
      } else if (error instanceof GameStateError) {
        console.log("GameController.onEnter state error:", error.reason);
      } else if (error instanceof DomainError) {
        console.log("GameController.onEnter domain error:", error.message);
      } else {
        console.log("GameController.onEnter unexpected error:", error);
      }
    }
  }

  onBackspace() {
    try {
      const currentRow = useActiveGame.getState().currentAttempt;
      useActiveGame.getState().setCurrentAttempt(currentRow.slice(0, -1));
    } catch (error) {
      console.log("GameController.onBackspace error:", error);
    }
  }

  onKey(key: string) {
    try {
      const currentRow = useActiveGame.getState().currentAttempt;
      if (currentRow.length === 5) return;
      useActiveGame.getState().setCurrentAttempt(currentRow + key);
    } catch (error) {
      console.log("GameController.onKey error:", error);
    }
  }
}
