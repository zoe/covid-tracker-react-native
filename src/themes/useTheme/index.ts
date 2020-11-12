import { useContext } from 'react';
import { ThemeContext } from 'styled-components/native';

import { IThemeVars } from '../types';

export default (): IThemeVars => useContext(ThemeContext);
