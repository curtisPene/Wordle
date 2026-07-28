import Tile from "@/components/Tile";
import { Spacing } from "@/theme";
import { StyleSheet, View } from "react-native";

const ROW_COUNT = 6;
const COLUMN_COUNT = 5;

export default function Grid() {
  return (
    <View style={styles.grid}>
      {Array.from({ length: ROW_COUNT }, (_, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {Array.from({ length: COLUMN_COUNT }, (_, colIndex) => (
            <Tile key={colIndex} status="unverified" />
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    gap: Spacing.xs,
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    gap: Spacing.xs,
  },
});
