import React from 'react';
import { Text } from 'react-native';

import { TColorPalette, TColorShade, TGridSizes } from '@covid/themes';
import { TStyleObject } from '@covid/utils/types';

import { SText, STouchableOpacity } from './styles';

/**
 * Example purposes only
 * This is an example of a themed button
 * Do not implement yet
 */

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
      colorPalette={colorPalette}
      colorShade={colorShade}
      disabled={disabled}
      onPress={onPress}
      outline={outline}
      rhythm={rhythm}
      simple={simple}
      style={style}>
      <SText colorPalette={colorPalette} colorShade={colorShade}>
        {title}
      </SText>
    </STouchableOpacity>
  );
}

export default ThemeButton;
