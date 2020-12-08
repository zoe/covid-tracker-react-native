import React, { ReactNode } from 'react';

import { TColorPalette, TColorShade, TTextClass, TGridSizes } from '@covid/themes';

import Text from '../../text';

interface IProps {
  children: ReactNode;
  colorPalette?: TColorPalette;
  colorShade?: TColorShade;
  inverted?: boolean;
  rhythm?: TGridSizes;
  textClass: TTextClass;
}

const H = ({
  children,
  colorPalette = 'uiDark',
  colorShade = 'darker',
  inverted = true,
  rhythm = 0,
  textClass,
}: IProps) => {
  return (
    <Text colorPalette={colorPalette} colorShade={colorShade} inverted={inverted} textClass={textClass} rhythm={rhythm}>
      {children}
    </Text>
  );
};

export default H;
