import { ShareIcon } from '@assets';
import { Text } from '@covid/components/typography';
import { TColorPalette, TColorShade } from '@covid/themes';
import * as React from 'react';

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
      <Text inverted colorPalette={colorPalette} colorShade={colorShade} fontSize={14}>
        {label}
      </Text>
    </SContainerView>
  );
}

export default ShareButton;
