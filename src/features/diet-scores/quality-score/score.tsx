import React from 'react';

import { GradientColorBar, ScoreCard, Text } from '@covid/components';

import DietScoreHeader from '../diet-score-header';

import ScoreRange from './score-range';
import { SScoreContainerView } from './styles';

interface IProps {
  subTitle: string;
  title: string;
}

function Score({ subTitle, title }: IProps) {
  return (
    <>
      <DietScoreHeader title={title} subTitle={subTitle} />
      <SScoreContainerView>
        <ScoreCard backgroundColor="#FFD519">
          <Text textClass="pSmall">You</Text>
          <Text textClass="h5Medium">42</Text>
        </ScoreCard>
        <GradientColorBar />
        <ScoreRange startScore={5} startScoreLabel="Poor" endScore={15} endScoreLabel="Excellent" />
      </SScoreContainerView>
    </>
  );
}

export default Score;
