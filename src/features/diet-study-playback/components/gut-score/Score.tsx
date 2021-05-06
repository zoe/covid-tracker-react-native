import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, Easing, View } from 'react-native';

import { Text } from '@covid/components';
import { TStyleObject } from '@covid/utils/types';

import DietScoreHeader from '../diet-score-header';
import ScoreCard from '../score-card';

import ScoreRange from './ScoreRange';

interface IProps {
  currentValue: number;
  minValue: number;
  maxValue: number;
  style?: TStyleObject;
  subTitle: string;
  title: string;
}

function Score({ currentValue, minValue, maxValue, style = {}, subTitle, title }: IProps) {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const translateXValue = useRef(new Animated.Value(0)).current;
  const { width } = Dimensions.get('window');

  const getPercentValue = () => {
    const current = currentValue - minValue;
    const range = maxValue - minValue;
    const percent = current / range;
    return percent;
  };

  const getToValue = () => {
    const percent = getPercentValue();
    if (percent < 0.25) {
      return 0;
    } else if (percent >= 0.25 && percent < 0.5) {
      return 0.3;
    } else if (percent >= 0.5 && percent < 0.75) {
      return 0.6;
    } else {
      return 1;
    }
  };

  const run = () => {
    Animated.timing(animatedValue, {
      toValue: getToValue(),
      delay: 500,
      duration: 800,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    }).start();
    //
    Animated.timing(translateXValue, {
      toValue: getPercentValue(),
      delay: 500,
      duration: 800,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    }).start();
  };

  const translateX = translateXValue.interpolate({
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
      <View>
        <ScoreRange />
        <Animated.View style={{ marginBottom: 8, transform: [{ translateX }] }}>
          <View style={{ transform: [{ translateX: -30 }] }}>
            <ScoreCard backgroundColor={animatedBackgroundColor} direction="UP">
              <Text textClass="pSmall">You</Text>
            </ScoreCard>
          </View>
        </Animated.View>
      </View>
    </View>
  );
}

export default Score;
