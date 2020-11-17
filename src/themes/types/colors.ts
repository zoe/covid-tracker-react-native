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
  green: IColorShades;
  teal: IColorShades;
  ui: IColorShades;
  uiDark: IColorShades;
}

export type TColorPalette = keyof IColorPalettes;
