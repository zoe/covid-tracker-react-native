import React from 'react';
import { View } from 'react-native';

import { QuestionBlock, Spacer, Text } from '@covid/components';
import { useTheme } from '@covid/themes';
import { TMentalHealthChange } from '@covid/core/state/mental-health';

interface IProps {
  onPress: (changeType: TMentalHealthChange) => void;
  question: string;
}

function Question({ onPress, question }: IProps) {
  const { grid } = useTheme();

  const handleOnPress = (value: TMentalHealthChange) => {
    onPress(value);
  };

  return (
    <View style={{ marginBottom: grid.xxl }}>
      <Text textClass="pSmall">{question}</Text>
      <View style={{ flexDirection: 'row' }}>
        <QuestionBlock
          iconName="remove1"
          keyValue={{ key: 'Less', value: 'LESS' }}
          onPress={() => handleOnPress('LESS')}
        />
        <Spacer />
        <QuestionBlock
          iconName="equal-2"
          keyValue={{ key: 'No Change', value: 'NO_CHANGE' }}
          onPress={() => handleOnPress('NO_CHANGE')}
        />
        <Spacer />
        <QuestionBlock
          iconName="plus"
          keyValue={{ key: 'More', value: 'MORE' }}
          onPress={() => handleOnPress('MORE')}
        />
        <Spacer />
        <QuestionBlock
          keyValue={{ key: 'Not Applicable', value: 'NOT_APPLICABLE' }}
          onPress={() => handleOnPress('NOT_APPLICABLE')}
        />
      </View>
    </View>
  );
}

export default Question;
