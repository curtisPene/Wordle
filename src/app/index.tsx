import WordleIcon from "@/assets/wordle-icon.svg";
import Button from "@/components/Button";
import { useTypography } from "@/hooks/useTypography";
import { homeTheme, Spacing } from "@/theme";
import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  const typography = useTypography();

  const date = new Date();

  const formatted = date.toLocaleDateString("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric",
  });
  // "07/28/2026"

  return (
    <View style={[styles.root, { backgroundColor: homeTheme.background }]}>
      <WordleIcon width={84} height={84} />
      <View style={styles.topText}>
        <Text style={[typography.wordleTitle, { color: homeTheme.text }]}>
          Wordle
        </Text>
        <Text style={[typography.base, { color: homeTheme.text }]}>
          Get 6 guesses to guess a 5 letter word
        </Text>
      </View>

      <Button
        backgroundColor={homeTheme.black}
        onPress={() => {
          router.push("/game");
        }}
      >
        <Text style={[typography.base, { color: homeTheme.onPrimary }]}>
          Play
        </Text>
      </Button>
      <View style={styles.bottomText}>
        <Text style={[typography.caption, { color: homeTheme.text }]}>
          {formatted}
        </Text>
        <Text>Edited by Curtis Pene</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: Spacing.lg,
    gap: Spacing.lg,
    alignItems: "center",
    justifyContent: "center",
  },

  topText: {
    gap: Spacing.xs,
    alignItems: "center",
    justifyContent: "center",
  },

  bottomText: {
    gap: Spacing.xs,
    alignItems: "center",
    justifyContent: "center",
  },
});
