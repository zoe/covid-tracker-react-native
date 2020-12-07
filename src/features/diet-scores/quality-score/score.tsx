import React from 'react';
import { View } from 'react-native';

import { GradientColorBar, ScoreCard, Text } from '@covid/components';
import { TStyleObject } from '@covid/utils/types';

import DietScoreHeader from '../diet-score-header';

import ScoreRange from './score-range';
import { SScoreContainerView } from './styles';

interface IProps {
  style?: TStyleObject;
  subTitle: string;
  title: string;
}

function Score({ style = {}, subTitle, title }: IProps) {
  return (
    <View style={style}>
      <DietScoreHeader title={title} subTitle={subTitle} />
      <SScoreContainerView>
        <View style={{ marginBottom: 8 }}>
          <ScoreCard backgroundColor="#FFD519">
            <Text textClass="pSmall">You</Text>
            <Text textClass="h5Medium">42</Text>
          </ScoreCard>
        </View>
        <GradientColorBar />
        <ScoreRange startScore={5} startScoreLabel="Poor" endScore={15} endScoreLabel="Excellent" />
      </SScoreContainerView>
    </View>
  );
}

export default Score;
