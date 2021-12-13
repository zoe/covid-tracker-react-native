import {
  TColorPalette,
  TColorShade,
  TFontFamily,
  TFontStyle,
  TGridSize,
  TTextAlign,
  TTtextDecorationLine,
  TTypeSizes,
} from '@covid/themes';
import { Text } from 'react-native';
import styled from 'styled-components/native';

interface ITextProps {
  colorPalette: TColorPalette;
  colorShade: TColorShade;
  fontFamily: TFontFamily;
  fontSize: TTypeSizes;
  fontStyle: TFontStyle;
  inverted: boolean;
  letterSpacing: number;
  lineHeight: number;
  rhythm: TGridSize;
  textAlign: TTextAlign;
  textDecorationLine: TTtextDecorationLine;
}

export const SText = styled(Text)<ITextProps>`
  ${(props) => `
    color: ${
      props.inverted
        ? props.theme.colors[props.colorPalette][props.colorShade].bgColor
        : props.theme.colors[props.colorPalette][props.colorShade].fgColor
    };
    font-family: ${props.fontFamily};
    font-size: ${props.fontSize}px;
    font-style: ${props.fontStyle};
    letter-spacing: ${props.letterSpacing}px;
    line-height: ${props.lineHeight}px;
    margin-bottom: ${props.rhythm}px;
    text-align: ${props.textAlign};
    textDecorationLine: ${props.textDecorationLine};
  `}
`;
