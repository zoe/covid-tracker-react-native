import React from 'react';

import { ShareIcon } from '@assets';
import { TColorPalette, TColorShade } from '@covid/themes';

import { Text } from '../../typography';

import { SContainerView, SIconContainerView } from './styles';

interface IProps {
  colorPalette?: TColorPalette;
  colorShade?: TColorShade;
  label: string;
  onPress: () => void;
}

function ShareButton({ colorPalette = 'burgundy', colorShade = 'main', label, onPress }: IProps) {
  return (
    <SContainerView onPress={onPress}>
      <SIconContainerView>
        <ShareIcon />
      </SIconContainerView>
      <Text colorPalette={colorPalette} colorShade={colorShade} inverted>
        {label}
      </Text>
    </SContainerView>
  );
}

export default ShareButton;
