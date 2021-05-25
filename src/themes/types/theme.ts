import { IColorPalettes } from './colors';
import { IGrid } from './grid';
import { ITextClass } from './typography';

export interface IThemeVars {
  // colors
  colors: IColorPalettes;
  // layout
  grid: IGrid;
  // typography
  text: ITextClass;
}
