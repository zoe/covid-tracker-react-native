import React from 'react';
import { StyleProp, TextStyle } from 'react-native';

import {
  useTheme,
  IThemeVars,
  TColorShade,
  TColorPalette,
  TGridSizes,
  TFontFamily,
  TFontStyle,
  TTextAlign,
  TTtextDecorationLine,
  TTextClass,
  TTypeSizes,
} from '@covid/themes';

import { SText } from './styles';

export interface IProps {
  children: React.ReactNode;
  colorPalette?: TColorPalette;
  colorShade?: TColorShade;
  fontFamily?: TFontFamily | undefined;
  fontSize?: TTypeSizes | undefined;
  fontStyle?: TFontStyle | undefined;
  inverted?: boolean;
  letterSpacing?: number | undefined;
  lineHeight?: number | undefined;
  onPress?: () => void | undefined;
  rhythm?: TGridSizes;
  style?: StyleProp<TextStyle>;
  textAlign?: TTextAlign | undefined;
  textDecorationLine?: TTtextDecorationLine | undefined;
  textClass?: TTextClass;
}

export default function Text({
  children,
  colorPalette = 'ui',
  colorShade = 'lighter',
  fontFamily = undefined,
  fontSize = undefined,
  fontStyle = undefined,
  inverted = false,
  letterSpacing = undefined,
  lineHeight = undefined,
  textDecorationLine = undefined,
  onPress = undefined,
  rhythm = 0,
  style = {},
  textAlign = undefined,
  textClass = 'default',
}: IProps) {
  const theme: IThemeVars = useTheme();
  const fFamily = fontFamily ? fontFamily : theme.text[textClass].fontFamily;
  const fSize = fontSize ? fontSize : theme.text[textClass].fontSize;
  const fStyle = fontStyle ? fontStyle : theme.text[textClass].fontStyle;
  const lHeight = lineHeight ? lineHeight : theme.text[textClass].lineHeight;
  const tAlign = textAlign ? textAlign : theme.text[textClass].textAlign;
  const lSpacing = letterSpacing ? letterSpacing : theme.text[textClass].letterSpacing;
  const tDecorationLine = textDecorationLine ? textDecorationLine : theme.text[textClass].textDecorationLine;
  return (
    <SText
      colorPalette={colorPalette}
      colorShade={colorShade}
      fontFamily={fFamily}
      fontSize={fSize}
      fontStyle={fStyle}
      inverted={inverted}
      lineHeight={lHeight}
      letterSpacing={lSpacing}
      onPress={onPress}
      rhythm={rhythm}
      style={style}
      textAlign={tAlign}
      textDecorationLine={tDecorationLine}>
      {children}
    </SText>
  );
}
