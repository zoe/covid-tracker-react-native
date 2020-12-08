import React from 'react';

import { TColorPalette, TColorShade } from '@covid/themes';

import { SIndicatorView } from './styles';

interface IProps {
  colorPalette: TColorPalette;
  colorShade?: TColorShade;
}

function StatusIndicator({ colorPalette, colorShade = 'main' }: IProps) {
  return <SIndicatorView colorPalette={colorPalette} colorShade={colorShade} />;
}

export default StatusIndicator;
