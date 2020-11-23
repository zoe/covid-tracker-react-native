import React from 'react';

import { TColorPalette, TColorShade } from '@covid/themes';

import { SIndicatorView } from './styles';

interface IProps {
  colorPalette: TColorPalette;
  colorShade: TColorShade;
}

function Indicator({ colorPalette, colorShade }: IProps) {
  return <SIndicatorView colorPalette={colorPalette} colorShade={colorShade} />;
}

export default Indicator;
