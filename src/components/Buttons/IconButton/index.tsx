import React from 'react';
import { Image, ImageSourcePropType } from 'react-native';

import { TColorPalette, TColorShade } from '@covid/themes';

import { STouchableOpacity } from './styles';

interface IProps {
  colorPalette?: TColorPalette;
  colorShade?: TColorShade;
  imgSrc: ImageSourcePropType;
  onPress: VoidFunction;
  outline?: boolean;
  simple?: boolean;
}

// TODO - replace image with icon font

function IconButton({
  colorPalette = 'ui',
  colorShade = 'lighter',
  imgSrc,
  onPress,
  outline = false,
  simple = false,
}: IProps) {
  return (
    <STouchableOpacity
      colorPalette={colorPalette}
      colorShade={colorShade}
      outline={outline}
      simple={simple}
      onPress={onPress}>
      <Image source={imgSrc} />
    </STouchableOpacity>
  );
}

export default IconButton;
