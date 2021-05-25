import {
  IThemeVars,
  TColorPalette,
  TColorShade,
  TFontFamily,
  TFontStyle,
  TGridSizes,
  TTextAlign,
  TTextClass,
  TTtextDecorationLine,
  TTypeSizes,
  useTheme,
} from '@covid/themes';
import { TStyleObject } from '@covid/utils/types';
import React, { ReactNode } from 'react';

import { SText } from './styles';

interface IProps {
  children: ReactNode;
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
  style?: TStyleObject;
  textAlign?: TTextAlign | undefined;
  textDecorationLine?: TTtextDecorationLine | undefined;
  textClass?: TTextClass;
}

const Text = ({
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
}: IProps) => {
  const theme: IThemeVars = useTheme();
  const fFamily = fontFamily || theme.text[textClass].fontFamily;
  const fSize = fontSize || theme.text[textClass].fontSize;
  const fStyle = fontStyle || theme.text[textClass].fontStyle;
  const lHeight = lineHeight || theme.text[textClass].lineHeight;
  const tAlign = textAlign || theme.text[textClass].textAlign;
  const lSpacing = letterSpacing || theme.text[textClass].letterSpacing;
  const tDecorationLine = textDecorationLine || theme.text[textClass].textDecorationLine;
  return (
    <SText
      colorPalette={colorPalette}
      colorShade={colorShade}
      fontFamily={fFamily}
      fontSize={fSize}
      fontStyle={fStyle}
      inverted={inverted}
      letterSpacing={lSpacing}
      lineHeight={lHeight}
      onPress={onPress}
      rhythm={rhythm}
      style={style}
      textAlign={tAlign}
      textDecorationLine={tDecorationLine}
    >
      {children}
    </SText>
  );
};

export default Text;
