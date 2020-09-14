import { Text, TouchableOpacity } from 'react-native';

import styled from '@covid/themes/styled-components';
import { TColorPalette, TColorShade, TGridSizes } from '@covid/themes';

interface SProps {
  colorPalette: TColorPalette;
  colorShade: TColorShade;
  disabled: boolean;
  outline: boolean;
  rhythm: TGridSizes;
  simple: boolean;
}

// todo: border radius - define in theme etc

export const STouchableOpacity = styled(TouchableOpacity)<SProps>`
  ${(props) => `
    align-content: center;
    background-color: ${
      props.outline || props.simple ? 'transparent' : props.theme.colors[props.colorPalette][props.colorShade].bgColor
    };
    border-color: ${
      props.outline && !props.simple ? props.theme.colors[props.colorPalette][props.colorShade].bgColor : 'transparent'
    };
    border-radius: 8px;
    justify-content: center;
    margin-bottom: ${props.rhythm}px;
    padding: ${props.theme.grid.s}px ${props.theme.grid.s}px;
  `}
`;

interface STextProps {
  colorPalette: TColorPalette;
  colorShade: TColorShade;
}

export const SText = styled(Text)<STextProps>`
  ${(props) => `
    color: ${props.theme.colors[props.colorPalette][props.colorShade].fgColor};
    text-align: center;
  `}
`;
