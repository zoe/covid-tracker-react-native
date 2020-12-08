import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, Easing, View } from 'react-native';

import { GradientColorBar, Text } from '@covid/components';
import { TStyleObject } from '@covid/utils/types';

import DietScoreHeader from '../diet-score-header';
import ScoreCard from '../score-card';

import ScoreRange from './score-range';
import { SScoreContainerView } from './styles';

interface IProps {
  currentValue: number;
  minValue: number;
  minValueLabel: string;
  maxValue: number;
  maxValueLabel: string;
  style?: TStyleObject;
  subTitle: string;
  title: string;
}

function Score({
  currentValue,
  minValue,
  minValueLabel,
  maxValue,
  maxValueLabel,
  style = {},
  subTitle,
  title,
}: IProps) {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const animatedColorValue = useRef(new Animated.Value(0)).current;
  const { width } = Dimensions.get('window');

  const getToValue = () => {
    const current = currentValue - minValue;
    const range = maxValue - minValue;
    return current / range;
  };

  const run = () => {
    Animated.timing(animatedValue, {
      toValue: getToValue(),
      delay: 5000,
      duration: 1000,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    }).start();
  };

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, width - 64],
  });

  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 0.3, 0.6, 1],
    outputRange: ['rgb(255,150,0)', 'rgb(255,213,25)', 'rgb(192,217,4)', 'rgb(160,180,6)'],
  });

  const animatedBackgroundColor = {
    backgroundColor,
  };

  useEffect(run);

  return (
    <View style={style}>
      <DietScoreHeader title={title} subTitle={subTitle} />
      <SScoreContainerView>
        <Animated.View style={{ marginBottom: 8, transform: [{ translateX }] }}>
          <View style={{ transform: [{ translateX: -30 }] }}>
            <ScoreCard backgroundColor={animatedBackgroundColor}>
              <Text textClass="pSmall">You</Text>
              <Text textClass="h5Medium">{currentValue}</Text>
            </ScoreCard>
          </View>
        </Animated.View>
        <GradientColorBar />
        <ScoreRange
          startScore={minValue}
          startScoreLabel={minValueLabel}
          endScore={maxValue}
          endScoreLabel={maxValueLabel}
        />
      </SScoreContainerView>
    </View>
  );
}

export default Score;
