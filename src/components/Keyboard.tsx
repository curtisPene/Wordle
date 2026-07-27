import { useTypography } from "@/hooks/useTypography";
import { Radii, Spacing, useTheme } from "@/theme";
import { Pressable, StyleSheet, Text, View } from "react-native";

export type KeyStatus = "default" | "correct" | "present" | "absent";

const ROWS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "BACKSPACE"],
];

interface KeyboardProps {
  keyStatuses?: Record<string, KeyStatus>;
  onKeyPress?: (key: string) => void;
}

export default function Keyboard({
  keyStatuses = {},
  onKeyPress,
}: KeyboardProps) {
  const theme = useTheme();
  const typography = useTypography();

  return (
    <View style={styles.keyboard}>
      {ROWS.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((key) => {
            const status = keyStatuses[key] ?? "default";
            const isWide = key === "ENTER" || key === "BACKSPACE";

            const backgroundColor =
              status === "correct"
                ? theme.keyCorrect
                : status === "present"
                  ? theme.keyPresent
                  : status === "absent"
                    ? theme.keyAbsent
                    : theme.keyDefaultBackground;

            const textColor =
              status === "default" ? theme.onKeyDefault : theme.onKey;

            return (
              <Pressable
                key={key}
                onPress={() => onKeyPress?.(key)}
                style={[
                  styles.key,
                  isWide && styles.wideKey,
                  { backgroundColor },
                ]}
              >
                <Text
                  style={[typography.label, { color: textColor }]}
                  numberOfLines={1}
                >
                  {key === "BACKSPACE" ? "⌫" : key}
                </Text>
              </Pressable>
            );
          })}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  keyboard: {
    gap: Spacing.xs,
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    gap: Spacing.xs,
  },
  key: {
    minWidth: 32,
    height: 48,
    paddingHorizontal: Spacing.sm,
    borderRadius: Radii.sm,
    alignItems: "center",
    justifyContent: "center",
  },
  wideKey: {
    minWidth: 48,
    paddingHorizontal: Spacing.xs,
  },
});
