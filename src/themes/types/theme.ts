import { IGrid } from './grid';
import { IColorPalettes } from './colors';

export interface IThemeVars {
  // colors
  colors: IColorPalettes;
  // layout
  grid: IGrid;
}
