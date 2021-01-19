import React from 'react';

import { CreatedByZoe, C19 } from '@assets';
import { TColorPalette, TColorShade } from '@covid/themes';

import { Text } from '../../typography';

import { SShareLabelView, SRowView, SImageContainer, STextContainer, SLogoContainer } from './styles';

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
            Explore the state of the pandemic in your area via the COVID Symptom Study App
          </Text>
          <Text colorPalette={colorPalette} colorShade={colorShade} textClass="h6Regular">
            covid.joinzoe.com
          </Text>
        </STextContainer>
        <SLogoContainer>
          <SImageContainer>
            <C19 />
          </SImageContainer>
          <CreatedByZoe />
        </SLogoContainer>
      </SRowView>
    </SShareLabelView>
  );
}

export default ShareLabel;
