import React from 'react';
import { View } from 'react-native';

import { TStyleObject } from '@covid/utils/types';

import DietScoreHeader from '../diet-score-header';

import ScoreRange from './score-range';

interface IProps {
  style?: TStyleObject;
  subTitle: string;
  title: string;
}

function Score({ title, subTitle, style = {} }: IProps) {
  return (
    <View style={style}>
      <DietScoreHeader title={title} subTitle={subTitle} rhythm={24} />
      <ScoreRange />
    </View>
  );
}

export default Score;
