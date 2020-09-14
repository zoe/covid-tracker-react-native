import * as styledComponents from 'styled-components/native';

import { IThemeVars } from './types';

const {
  default: styled,
  css,
  ThemeProvider,
} = styledComponents as styledComponents.ReactNativeThemedStyledComponentsModule<IThemeVars>;

export { css, ThemeProvider };
export default styled;
