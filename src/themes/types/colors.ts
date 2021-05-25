export type TColorCombination = {
  bgColor: string;
  fgColor: string;
};

export interface IColorShades {
  lighter: TColorCombination;
  light: TColorCombination;
  main: TColorCombination;
  dark: TColorCombination;
  darker: TColorCombination;
}
export type TColorShade = keyof IColorShades;

// shopify polaris color palette - to be replaced
export interface IColorPalettes {
  blue: IColorShades;
  burgundy: IColorShades;
  coral: IColorShades;
  gray: IColorShades;
  green: IColorShades;
  orange: IColorShades;
  teal: IColorShades;
  ui: IColorShades;
  uiDark: IColorShades;
  // zoe covid palette - no shades provided at this point
  accentBlue: IColorShades;
  accentCyan: IColorShades;
  accentMagenta: IColorShades;
  accentPredict: IColorShades;
  actionPrimary: IColorShades;
  actionSecondary: IColorShades;
  feedbackBad: IColorShades;
  feedbackExcellent: IColorShades;
  feedbackGood: IColorShades;
  feedbackPoor: IColorShades;
}

export type TColorPalette = keyof IColorPalettes;
