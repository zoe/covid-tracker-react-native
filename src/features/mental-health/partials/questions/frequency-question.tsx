import React from 'react';
import { Animated, View } from 'react-native';

import { QuestionBlock, Text, useFade } from '@covid/components';
import { useTheme } from '@covid/themes';
import { TMentalHealthFrequency } from '@covid/core/state/mental-health';

interface IProps {
  disabled?: boolean;
  onPress: (changeType: TMentalHealthFrequency) => void;
  question: string;
  state?: TMentalHealthFrequency;
}

type TKeyValue = {
  key: string;
  value: TMentalHealthFrequency;
};

type TAnswer = {
  keyValue: TKeyValue;
};

function FrequencyQuestion({ disabled = false, onPress, question, state }: IProps) {
  const { grid } = useTheme();
  const fadeAnim = useFade(0.2, disabled ? 0.2 : 1, 500);

  const handleOnPress = (value: TMentalHealthFrequency) => {
    onPress(value);
  };

  const answers: TAnswer[] = [
    {
      keyValue: { key: 'Not at all', value: 'NOT_AT_ALL' },
    },
    {
      keyValue: { key: 'Several days', value: 'SEVERAL_DAYS' },
    },
    {
      keyValue: { key: 'More than half the days', value: 'MORE_THAN_HALF_THE_DAYS' },
    },
    {
      keyValue: { key: 'Nearly every day', value: 'NEARLY_EVERY_DAY' },
    },
  ];

  const decline: TAnswer = {
    keyValue: { key: 'Prefer not to say', value: 'DECLINE_TO_SAY' },
  };

  return (
    <Animated.View style={{ marginBottom: grid.xxl, opacity: fadeAnim }}>
      <Text textClass="pSmall" rhythm={grid.s}>
        {question}
      </Text>
      <View style={{ flexDirection: 'row', marginBottom: grid.s }}>
        {answers.map((answer, index) => {
          const key = `answer-${index}`;
          return (
            <View key={key} style={{ flex: 1, marginRight: index < answers.length - 1 ? 8 : 0 }}>
              <QuestionBlock
                active={state === answer.keyValue.value}
                keyValue={answer.keyValue}
                onPress={() => handleOnPress(answer.keyValue.value)}
              />
            </View>
          );
        })}
      </View>
      <View>
        <QuestionBlock
          active={state === decline.keyValue.value}
          backgroundColor="transparent"
          keyValue={decline.keyValue}
          onPress={() => handleOnPress(decline.keyValue.value)}
        />
      </View>
    </Animated.View>
  );
}

export default FrequencyQuestion;
