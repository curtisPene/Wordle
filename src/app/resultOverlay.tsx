import Button from "@/components/Button";
import { useGameViewModel } from "@/domains/gameplay/viewmodels/useGameViewModel";
import { GameStateError } from "@/errors/GameStateError";
import { useTheme } from "@/theme";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function ResultOverlay() {
  const theme = useTheme();
  const { status } = useGameViewModel();
  const [showResults, setShowResults] = useState<boolean>(false);

  const onShowResults = () => {
    setShowResults(true);
  };
  return (
    <>
      <Button type="outline" onPress={onShowResults}>
        <Text>See Results</Text>
      </Button>
      {showResults && (
        <View
          style={[
            StyleSheet.absoluteFill,
            styles.resultScreen,
            { backgroundColor: theme.background },
          ]}
        >
          <Text style={{ color: theme.text }}>{status}</Text>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  resultScreen: {
    ...StyleSheet.absoluteFill,
    alignItems: "center",
    justifyContent: "center",
  },
});
