import Text from '@covid/components/typography/text';
import { TColorPalette, TColorShade, TGridSizes, TTextClass } from '@covid/themes';
import * as React from 'react';

interface IProps {
  children: React.ReactNode;
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
    <Text colorPalette={colorPalette} colorShade={colorShade} inverted={inverted} rhythm={rhythm} textClass={textClass}>
      {children}
    </Text>
  );
};

export default H;
