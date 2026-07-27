import { useColorScheme, useWindowDimensions } from "react-native";

export function useTheme() {
  const scheme = useColorScheme(); // 'light' | 'dark' | null
  return scheme === "dark" ? darkTheme : lightTheme;
}

export const Breakpoints = {
  tablet: 768,
  desktop: 1024,
} as const;

export function useBreakpoints() {
  const { width } = useWindowDimensions();
  return {
    isTablet: width >= Breakpoints.tablet,
    isDesktop: width >= Breakpoints.desktop,
  };
}

// design tokens
export const palette = {
  blue600: "#2b7de0",
  blue700: "#1f5fb0",
  orange600: "#d9622b",
  green600: "#6aaa64",
  greenDark: "#538d4e",
  yellow600: "#c9b458",
  yellowDark: "#b59f3b",
  gray200: "#d3d6da",
  gray400: "#878a8c",
  gray700: "#3a3f47",
  gray800: "#26282c",
  gray900: "#121213",
  offWhite: "#e3e3e1",
  white: "#ffffff",
  black: "#000000",
} as const;

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const Radii = {
  sm: 4,
  md: 8,
  lg: 16,
  full: 999,
} as const;

// Wordle's homepage is intentionally not theme-split — one fixed look
// regardless of system color scheme.
export const homeTheme = {
  background: palette.white,
  black: "#121212",
  text: palette.black,
  primary: palette.blue600,
  onPrimary: palette.white,
} as const;

export const lightTheme = {
  background: palette.white,
  foreground: palette.black,
  text: palette.black,

  primary: palette.blue600,
  onPrimary: palette.white,

  // game grid tiles
  tileEmptyBorder: palette.gray200,
  tileEmptyBackground: palette.white,
  tileCorrect: palette.green600,
  tilePresent: palette.yellow600,
  tileAbsent: palette.gray400,
  onTile: palette.white,

  // on-screen keyboard keys
  keyDefaultBackground: palette.gray200,
  onKeyDefault: palette.black,
  keyCorrect: palette.green600,
  keyPresent: palette.yellow600,
  keyAbsent: palette.gray400,
  onKey: palette.white,
} as const;

export const darkTheme = {
  background: palette.gray900,
  foreground: palette.white,
  text: palette.white,

  primary: palette.blue600,
  onPrimary: palette.white,

  // game grid tiles
  tileEmptyBorder: palette.gray700,
  tileEmptyBackground: palette.gray900,
  tileCorrect: palette.greenDark,
  tilePresent: palette.yellowDark,
  tileAbsent: palette.gray700,
  onTile: palette.white,

  // on-screen keyboard keys
  keyDefaultBackground: palette.gray700,
  onKeyDefault: palette.white,
  keyCorrect: palette.greenDark,
  keyPresent: palette.yellowDark,
  keyAbsent: palette.gray800,
  onKey: palette.white,
} as const;
