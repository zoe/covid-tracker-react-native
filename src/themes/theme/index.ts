import { DefaultTheme } from 'styled-components';

import { IThemeVars } from '../types';
import { colors } from './colors';
import { grid } from './grid';
import { text } from './typography';

declare module 'styled-components' {
  export interface DefaultTheme extends IThemeVars {}
}

const Theme: DefaultTheme = {
  // colors
  colors,
  // layout
  grid,
  // typography
  text,
};

export default Theme;
