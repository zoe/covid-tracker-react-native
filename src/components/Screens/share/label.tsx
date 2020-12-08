import React from 'react';
import { Image } from 'react-native';

import { covidIcon, createdByZoe, C19 } from '@assets';
import { TColorPalette, TColorShade } from '@covid/themes';

import { Text } from '../../typography';

import { SShareLabelView, SRowView, SImageContainer, SImage, STextContainer, SLogoContainer } from './styles';

interface IProps {
  colorPalette?: TColorPalette;
  colorShade?: TColorShade;
}

function ShareLabel({ colorPalette = 'teal', colorShade = 'main' }: IProps) {
  return (
    <SShareLabelView colorPalette={colorPalette} colorShade={colorShade}>
      <SRowView>
        <STextContainer>
          <Text colorPalette={colorPalette} colorShade={colorShade} textClass="h6Regular">
            Explore the state of the pandemic in your area via the COVID Symptom Study App covid.joinzoe.com
          </Text>
        </STextContainer>
        <SLogoContainer>
          <SImageContainer>
            <C19 />
          </SImageContainer>
          <Image source={createdByZoe} />
        </SLogoContainer>
      </SRowView>
    </SShareLabelView>
  );
}

export default ShareLabel;
