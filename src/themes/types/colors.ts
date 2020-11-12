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
  green: IColorShades;
}

export type TColorPalette = keyof IColorPalettes;
