import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type LetterStatus = "correct" | "present" | "absent" | "unverified";

export type GameStatus = "in-progress" | "won" | "lost";

export const MAX_ATTEMPTS = 6;

// An Attempt is what the player is currently typing — not yet submitted,
// so it has no result.
export interface Attempt {
  word: string;
}

// A Guess is a validated Attempt: submitted and evaluated against the
// target word.
export interface Guess extends Attempt {
  result: LetterStatus[];
}

interface ActiveGameState {
  targetWord: string | null;
  gameDate: string | null;
  guesses: Guess[];
  currentAttempt: string;
  status: GameStatus;
  setTargetWord: (word: string) => void;
  setGameDate: (date: string) => void;
  setCurrentAttempt: (value: string) => void;
  addGuess: (guess: Guess) => void;
  setStatus: (status: GameStatus) => void;
  resetGame: () => void;
}

const initialState = {
  targetWord: null as string | null,
  gameDate: null as string | null,
  guesses: [] as Guess[],
  currentAttempt: "",
  status: "in-progress" as GameStatus,
};

export const useActiveGame = create<ActiveGameState>()(
  persist(
    (set) => ({
      ...initialState,
      setTargetWord: (word) => set({ targetWord: word }),
      setGameDate: (date) => set({ gameDate: date }),
      setCurrentAttempt: (value) => set({ currentAttempt: value }),
      addGuess: (guess) =>
        set((state) => ({
          guesses: [...state.guesses, guess],
          currentAttempt: "",
        })),
      setStatus: (status) => set({ status }),
      resetGame: () => set(initialState),
    }),
    {
      name: "active-game",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
