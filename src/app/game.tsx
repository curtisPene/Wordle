import Grid from "@/components/Grid";
import Keyboard from "@/components/Keyboard";
import { useActiveGame } from "@/stores/useActiveGame";
import { Spacing, useTheme } from "@/theme";
import { StyleSheet, View } from "react-native";

export default function Game() {
  const theme = useTheme();
  const targetWord = useActiveGame((s) => s.targetWord);
  const guesses = useActiveGame((s) => s.guesses);
  const currentRow = useActiveGame((s) => s.currentRow);
  const status = useActiveGame((s) => s.status);
  const setCurrentRow = useActiveGame((s) => s.setCurrentRow);
  const addGuess = useActiveGame((s) => s.addGuess);
  const setStatus = useActiveGame((s) => s.setStatus);

  return (
    <View style={[styles.root, { backgroundColor: theme.background }]}>
      <View style={styles.gridContainer}>
        <Grid rows={[]} />
      </View>

      <Keyboard />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "space-between",
    paddingVertical: Spacing.lg,
  },
  gridContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
