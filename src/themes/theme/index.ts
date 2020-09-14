import { DefaultTheme } from 'styled-components';

import { IThemeVars } from '../types';

import { colors } from './colors';
import { grid } from './grid';

declare module 'styled-components' {
  export interface DefaultTheme extends IThemeVars {}
}

const Theme: DefaultTheme = {
  // colors
  colors,
  // layout
  grid,
};

export default Theme;
