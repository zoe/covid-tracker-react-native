import React from 'react';
import { View } from 'react-native';

import { QuestionBlock, Text, TIconName } from '@covid/components';
import { useTheme } from '@covid/themes';
import { TMentalHealthChange } from '@covid/core/state/mental-health';

interface IProps {
  onPress: (changeType: TMentalHealthChange) => void;
  question: string;
  state?: TMentalHealthChange;
}

type TKeyValue = {
  key: string;
  value: TMentalHealthChange;
};

type TAnswer = {
  iconName?: TIconName;
  keyValue: TKeyValue;
};

function ChangesQuestion({ onPress, question, state }: IProps) {
  const { grid } = useTheme();

  const handleOnPress = (value: TMentalHealthChange) => {
    onPress(value);
  };

  const answers: TAnswer[] = [
    {
      iconName: 'remove1',
      keyValue: { key: 'Less', value: 'LESS' },
    },
    {
      iconName: 'equal-2',
      keyValue: { key: 'No Change', value: 'NO_CHANGE' },
    },
    {
      iconName: 'plus',
      keyValue: { key: 'More', value: 'MORE' },
    },
    {
      keyValue: { key: 'Not Applicable', value: 'NOT_APPLICABLE' },
    },
  ];

  return (
    <View style={{ marginBottom: grid.xxl }}>
      <Text textClass="pSmall" rhythm={grid.s}>
        {question}
      </Text>
      <View style={{ flexDirection: 'row' }}>
        {answers.map((answer, index) => {
          const key = `answer-${index}`;
          return (
            <View key={key} style={{ flex: 1, marginRight: index < answers.length - 1 ? 8 : 0 }}>
              <QuestionBlock
                active={state === answer.keyValue.value}
                iconName={answer.iconName}
                keyValue={answer.keyValue}
                onPress={() => handleOnPress(answer.keyValue.value)}
              />
            </View>
          );
        })}
      </View>
    </View>
  );
}

export default ChangesQuestion;
