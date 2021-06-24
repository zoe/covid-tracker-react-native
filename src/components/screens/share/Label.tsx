import { C19, CreatedByZoe } from '@assets';
import { Text } from '@covid/components/typography';
import { TColorPalette, TColorShade } from '@covid/themes';
import * as React from 'react';

import { SImageContainer, SLogoContainer, SRowView, SShareLabelView, STextContainer } from './styles';

interface IProps {
  colorPalette?: TColorPalette;
  colorShade?: TColorShade;
  label?: string;
}

function ShareLabel({
  colorPalette = 'teal',
  colorShade = 'main',
  label = 'Explore the state of the pandemic in your area via the COVID Symptom Study App',
}: IProps) {
  return (
    <SShareLabelView colorPalette={colorPalette} colorShade={colorShade}>
      <SRowView>
        <STextContainer>
          <Text colorPalette={colorPalette} colorShade={colorShade} textClass="h6Regular">
            {label}
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
