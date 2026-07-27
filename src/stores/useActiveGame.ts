import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type LetterStatus = "correct" | "present" | "absent";

export type GameStatus = "in-progress" | "won" | "lost";

export const MAX_ATTEMPTS = 6;

export interface Guess {
  word: string;
  result: LetterStatus[];
}

interface ActiveGameState {
  targetWord: string | null;
  gameDate: string | null;
  guesses: Guess[];
  currentRow: string;
  status: GameStatus;
  setTargetWord: (word: string) => void;
  setGameDate: (date: string) => void;
  setCurrentRow: (value: string) => void;
  addGuess: (guess: Guess) => void;
  setStatus: (status: GameStatus) => void;
  resetGame: () => void;
}

const initialState = {
  targetWord: null as string | null,
  gameDate: null as string | null,
  guesses: [] as Guess[],
  currentRow: "",
  status: "in-progress" as GameStatus,
};

export const useActiveGame = create<ActiveGameState>()(
  persist(
    (set) => ({
      ...initialState,
      setTargetWord: (word) => set({ targetWord: word }),
      setGameDate: (date) => set({ gameDate: date }),
      setCurrentRow: (value) => set({ currentRow: value }),
      addGuess: (guess) =>
        set((state) => ({
          guesses: [...state.guesses, guess],
          currentRow: "",
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
