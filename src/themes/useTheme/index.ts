import { IThemeVars } from '@covid/themes/types';
import * as React from 'react';
import { ThemeContext } from 'styled-components/native';

export default function useTheme(): IThemeVars {
  return React.useContext(ThemeContext);
}
