// src/domains/puzzle/stores/useUsedWords.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface UsedWordsState {
  usedWords: string[];
  addUsedWord: (word: string) => void;
}

export const useUsedWords = create<UsedWordsState>()(
  persist(
    (set) => ({
      usedWords: [],
      addUsedWord: (word) =>
        set((state) => ({ usedWords: [...state.usedWords, word] })),
    }),
    {
      name: "used-words",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
