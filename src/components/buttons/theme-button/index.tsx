import React from 'react';

import { TColorPalette, TColorShade, TGridSizes } from '@covid/themes';
import { TStyleObject } from '@covid/utils/types';

import { Text } from '../../typography';

import { STouchableOpacity } from './styles';

interface IProps {
  colorPalette: TColorPalette;
  colorShade: TColorShade;
  disabled?: boolean;
  onPress: () => void;
  outline?: boolean;
  rhythm?: TGridSizes;
  simple?: boolean;
  style?: TStyleObject;
  textStyle?: TStyleObject;
  title: string;
}

function ThemeButton({
  colorPalette,
  colorShade,
  disabled = false,
  onPress,
  outline = false,
  rhythm = 0,
  simple = false,
  style = {},
  textStyle = {},
  title,
}: IProps) {
  const inverted = !!(outline || simple);
  return (
    <STouchableOpacity
      accessible
      accessibilityRole="button"
      colorPalette={colorPalette}
      colorShade={colorShade}
      disabled={disabled}
      onPress={onPress}
      outline={outline}
      rhythm={rhythm}
      simple={simple}
      style={style}
    >
      <Text
        colorPalette={colorPalette}
        colorShade={colorShade}
        inverted={inverted}
        textClass={simple ? 'pBold' : 'pLight'}
      >
        {title}
      </Text>
    </STouchableOpacity>
  );
}

export default ThemeButton;
