import { IThemeVars } from '@covid/themes/types';
import { useContext } from 'react';
import { ThemeContext } from 'styled-components/native';

export default (): IThemeVars => useContext(ThemeContext);
