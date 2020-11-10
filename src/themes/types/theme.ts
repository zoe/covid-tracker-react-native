import { IGrid } from './grid';
import { IColorPalettes } from './colors';
import { ITextClass } from './typography';

export interface IThemeVars {
  // colors
  colors: IColorPalettes;
  // layout
  grid: IGrid;
  // typography
  text: ITextClass;
}
