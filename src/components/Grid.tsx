import Tile, { TileStatus } from "@/components/Tile";
import { Spacing } from "@/theme";
import { StyleSheet, View } from "react-native";

export interface GridRow {
  letters: string[];
  statuses: TileStatus[];
}

interface GridProps {
  rows: GridRow[];
  rowCount?: number;
  columnCount?: number;
}

export default function Grid({
  rows,
  rowCount = 6,
  columnCount = 5,
}: GridProps) {
  const paddedRows: GridRow[] = Array.from({ length: rowCount }, (_, i) => {
    return (
      rows[i] ?? {
        letters: Array(columnCount).fill(""),
        statuses: Array(columnCount).fill("empty"),
      }
    );
  });

  return (
    <View style={styles.grid}>
      {paddedRows.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {Array.from({ length: columnCount }, (_, colIndex) => (
            <Tile
              key={colIndex}
              letter={row.letters[colIndex]}
              status={row.statuses[colIndex] ?? "empty"}
            />
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
