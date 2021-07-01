import { IThemeVars } from '@covid/themes/types';
import { DefaultTheme } from 'styled-components';

import { colors } from './colors';
import { grid } from './grid';
import { styles } from './typography';

declare module 'styled-components' {
  export interface DefaultTheme extends IThemeVars {}
}

const theme: DefaultTheme = {
  colors,
  grid,
  text: styles,
};

export default theme;
