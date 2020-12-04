import { View } from 'react-native';

import styled from '@covid/themes/styled-components';
import { TColorPalette, TColorShade } from '@covid/themes';

interface SProps {
  colorPalette: TColorPalette;
  colorShade: TColorShade;
}

export const SIndicatorView = styled(View)<SProps>`
  ${(props) => `
    background-color: ${props.theme.colors[props.colorPalette][props.colorShade].bgColor};
    border-radius: ${props.theme.grid.m * 0.5}px;
    height: ${props.theme.grid.m}px;
    width: ${props.theme.grid.m}px;
  `}
`;
