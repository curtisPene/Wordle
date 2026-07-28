import { TARGET_WORDS } from "@/domains/puzzle/data/targetWords";
import { PuzzleServices } from "@/domains/puzzle/services/PuzzleServices";
import { Guess, useActiveGame } from "@/stores/useActiveGame";
import { useState } from "react";
import { GameController } from "../controllers/GameController";

export const useGameViewModel = () => {
  const targetWord = useActiveGame((s) => s.targetWord);
  const guesses = useActiveGame((s) => s.guesses);
  const currentAttempt = useActiveGame((s) => s.currentAttempt);
  const status = useActiveGame((s) => s.status);

  const [shake, setShake] = useState<boolean>(false);

  const puzzleServices = new PuzzleServices(TARGET_WORDS);
  const gameController = new GameController(puzzleServices);

  // The current play state is a sequence of Guesses: everything already
  // submitted, plus the in-progress attempt modeled as an unverified Guess.
  const rows: Guess[] = [
    ...guesses,
    ...(status === "in-progress" && currentAttempt
      ? [
          {
            word: currentAttempt,
            result: Array(currentAttempt.length).fill(
              "unverified",
            ) as Guess["result"],
          },
        ]
      : []),
  ];

  const onPress = (key: string) => {
    if (!targetWord) return;
    if (key === "ENTER") {
      gameController.onEnter({
        guess: currentAttempt,
        onBadGuess: () => {
          setShake(true);
        },
      });
    } else if (key === "BACKSPACE") {
      gameController.onBackspace();
    } else {
      gameController.onKey(key);
    }
  };

  console.log("---------------------------------------------------");
  console.log("Attempt: ", currentAttempt);
  console.log("Stauts", status);
  console.log("Shake", shake);
  console.log("Target word", targetWord);
  console.log("Rows", rows);
  console.log("---------------------------------------------------");

  const attemptNumber = status === "in-progress" ? guesses.length : -1;

  return {
    rows,
    status,
    onPress,
    shake,
    setShake,
    attemptNumber,
  };
};
