import React from 'react';

import { GradientColorBar, ScoreCard, Text } from '@covid/components';

import ScoreRange from './score-range';
import { SScoreContainerView } from './styles';

interface IProps {
  title: string;
}

function Score({ title }: IProps) {
  return (
    <>
      <Text textClass="h4Regular" rhythm={8}>
        {title}
      </Text>
      <Text textClass="pSmallLight" colorPalette="uiDark" colorShade="dark" inverted>
        February 2020
      </Text>
      <SScoreContainerView>
        <ScoreCard backgroundColor="#FFD519">
          <Text>You</Text>
          <Text>42</Text>
        </ScoreCard>
        <GradientColorBar />
        <ScoreRange startScore={5} startScoreLabel="Poor" endScore={15} endScoreLabel="Excellent" />
      </SScoreContainerView>
    </>
  );
}

export default Score;
