import React from 'react';

import { ScoreCard, Text } from '@covid/components';

import DietScoreHeader from '../diet-score-header';

import ScoreRange from './score-range';

interface IProps {
  subTitle: string;
  title: string;
}

function Score({ title, subTitle }: IProps) {
  return (
    <>
      <DietScoreHeader title={title} subTitle={subTitle} />
      <ScoreRange />
      <ScoreCard backgroundColor="#FFD519" direction="UP">
        <Text textClass="pSmall">You</Text>
      </ScoreCard>
    </>
  );
}

export default Score;
