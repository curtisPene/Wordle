import { PuzzleServices } from "@/domains/puzzle/services/PuzzleServices";
import { useActiveGame } from "@/stores/useActiveGame";

export class GameController {
  constructor(private readonly puzzleServices: PuzzleServices) {}

  // resets game state
  newGame() {
    const today = new Date().toISOString().slice(0, 10); // e.g. "2026-07-28"
    const currentGameDate = useActiveGame.getState().gameDate;

    if (currentGameDate === today) {
      return; // already have today's game, don't reset
    }

    useActiveGame.getState().resetGame();
    useActiveGame.getState().setGameDate(today);
    useActiveGame
      .getState()
      .setTargetWord(this.puzzleServices.getTargetWord({}));
  }
}
