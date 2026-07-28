import Grid from "@/components/Grid";
import Keyboard from "@/components/Keyboard";
import { Spacing, useTheme } from "@/theme";
import { StyleSheet, View } from "react-native";

export default function Game() {
  const theme = useTheme();

  return (
    <View style={[styles.root, { backgroundColor: theme.background }]}>
      <View style={styles.gridContainer}>
        <Grid />
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
