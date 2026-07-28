import { palette, Radii, Spacing } from "@/theme";
import { Pressable, PressableProps, StyleSheet } from "react-native";

interface ButtonProps extends PressableProps {
  children: React.ReactNode;
  type?: "default" | "outline";
  backgroundColor?: string;
}

export default function Button({
  children,
  type,
  backgroundColor = palette.black,
  style,
  ...props
}: ButtonProps) {
  return (
    <Pressable
      {...props}
      style={(state) => [
        styles.button,
        { backgroundColor },
        state.pressed && styles.pressed,
        typeof style === "function" ? style(state) : style,
      ]}
    >
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xxl,
    borderRadius: Radii.full,
    alignItems: "center",
    justifyContent: "center",
  },
  pressed: {
    transform: [{ translateY: 2 }],
  },
});
