import { LetterStatus } from "@/stores/useActiveGame";
import { useTheme } from "@/theme";
import { StyleSheet, Text, View } from "react-native";

interface TileProps {
  letter?: string;
  status: LetterStatus;
}

export default function Tile({ letter, status }: TileProps) {
  const theme = useTheme();

  const backgroundColor =
    status === "correct"
      ? theme.tileCorrect
      : status === "present"
        ? theme.tilePresent
        : status === "absent"
          ? theme.tileAbsent
          : theme.tileEmptyBackground;

  const borderColor =
    status === "unverified" ? theme.tileEmptyBorder : backgroundColor;
  const textColor = status === "unverified" ? theme.text : theme.onTile;

  return (
    <View style={[styles.tile, { backgroundColor, borderColor }]}>
      <Text style={[styles.letter, { color: textColor }]}>{letter}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tile: {
    width: 56,
    height: 56,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  letter: {
    fontFamily: "Franklin-700",
    fontSize: 28,
  },
});
