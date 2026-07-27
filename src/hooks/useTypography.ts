import { useBreakpoints } from "../theme";

export function useTypography() {
  const { isTablet } = useBreakpoints();

  const wordleTitleSize = isTablet ? 64 : 48;
  const baseSize = isTablet ? 18 : 16;
  const labelSize = isTablet ? 16 : 14;
  const captionSize = isTablet ? 14 : 12;

  return {
    wordleTitle: {
      fontFamily: "Karnak-700",
      fontSize: wordleTitleSize,
      lineHeight: Math.round(wordleTitleSize * 1.1),
      fontWeight: "700",
    },
    base: {
      fontFamily: "Franklin-400",
      fontSize: baseSize,
      lineHeight: Math.round(baseSize * 1.3),
      fontWeight: "400",
    },
    label: {
      fontFamily: "Franklin-600",
      fontSize: labelSize,
      lineHeight: Math.round(labelSize * 1.3),
      fontWeight: "600",
    },
    caption: {
      fontFamily: "Franklin-400",
      fontSize: captionSize,
      lineHeight: Math.round(captionSize * 1.35),
      fontWeight: "400",
    },
  } as const;
}
