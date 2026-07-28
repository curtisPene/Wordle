import { GameController } from "@/domains/gameplay/controllers/GameController";
import { TARGET_WORDS } from "@/domains/puzzle/data/targetWords";
import { PuzzleServices } from "@/domains/puzzle/services/PuzzleServices";
import { useActiveGame } from "@/stores/useActiveGame";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { useEffect } from "react";

export default function RootLayout() {
  const gameState = useActiveGame((state) => state);
  const [fontsLoaded] = useFonts({
    "Franklin-400": require("../../assets/fonts/franklin-normal-400.ttf"),
    "Franklin-600": require("../../assets/fonts/franklin-normal-600.ttf"),
    "Franklin-700": require("../../assets/fonts/franklin-normal-700.ttf"),
    "Karnak-700": require("../../assets/fonts/karnakcondensed-normal-700.ttf"),
  });

  useEffect(() => {
    new GameController(new PuzzleServices(TARGET_WORDS)).newGame();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Wordle" }} />
      <Stack.Screen name="game" options={{ title: "Game" }} />
    </Stack>
  );
}
