import { GradientColorBar, Text } from '@covid/components';
import DietScoreHeader from '@covid/features/diet-study-playback/components/diet-score-header';
import ScoreCard from '@covid/features/diet-study-playback/components/score-card';
import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, Easing, StyleProp, View, ViewStyle } from 'react-native';

import ScoreRange from './ScoreRange';
import { SScoreContainerView } from './styles';

interface IProps {
  currentValue: number;
  minValue: number;
  minValueLabel: string;
  maxValue: number;
  maxValueLabel: string;
  style?: StyleProp<ViewStyle>;
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
  const { width } = Dimensions.get('window');

  const getToValue = () => {
    const current = currentValue - minValue;
    const range = maxValue - minValue;
    return current / range;
  };

  const run = () => {
    Animated.timing(animatedValue, {
      delay: 500,
      duration: 800,
      easing: Easing.inOut(Easing.ease),
      toValue: getToValue(),
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
      <DietScoreHeader subTitle={subTitle} title={title} />
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
          endScore={maxValue}
          endScoreLabel={maxValueLabel}
          startScore={minValue}
          startScoreLabel={minValueLabel}
        />
      </SScoreContainerView>
    </View>
  );
}

export default Score;
