import React, { ReactNode } from 'react';

import { IThemeVars, TColorPalette, TColorShade, TTextClass, useTheme } from '@covid/themes';

import Text from '../../text';

interface IProps {
  children: ReactNode;
  colorPalette?: TColorPalette;
  colorShade?: TColorShade;
  inverted?: boolean;
  textClass: TTextClass;
}

const H = ({ children, colorPalette = 'uiDark', colorShade = 'darker', inverted = true, textClass }: IProps) => {
  const theme: IThemeVars = useTheme();
  return (
    <Text
      colorPalette={colorPalette}
      colorShade={colorShade}
      inverted={inverted}
      textClass={textClass}
      rhythm={theme.rhythm}>
      {children}
    </Text>
  );
};

export default H;
