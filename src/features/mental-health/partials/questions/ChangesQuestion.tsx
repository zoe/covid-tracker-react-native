import { QuestionBlock, Text, TIconName, useFade } from '@covid/components';
import { TMentalHealthChange } from '@covid/core/state/mental-health';
import i18n from '@covid/locale/i18n';
import { useTheme } from '@covid/themes';
import * as React from 'react';
import { Animated, View } from 'react-native';

interface IProps {
  disabled?: boolean;
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

function ChangesQuestion({ disabled = false, onPress, question, state }: IProps) {
  const { grid } = useTheme();
  const fadeAnim = useFade(0.2, disabled ? 0.2 : 1, 500);
  const handleOnPress = (value: TMentalHealthChange) => {
    onPress(value);
  };

  const answers: TAnswer[] = [
    {
      iconName: 'remove1',
      keyValue: { key: i18n.t('mental-health.answer-less'), value: 'LESS' },
    },
    {
      iconName: 'drag_handle',
      keyValue: { key: i18n.t('mental-health.answer-no-change'), value: 'NO_CHANGE' },
    },
    {
      iconName: 'plus',
      keyValue: { key: i18n.t('mental-health.answer-more'), value: 'MORE' },
    },
    {
      keyValue: { key: i18n.t('mental-health.answer-not-applicable'), value: 'NOT_APPLICABLE' },
    },
  ];

  return (
    <Animated.View style={{ marginBottom: grid.xxl, opacity: fadeAnim }}>
      <Text rhythm={grid.s} textClass="pSmall">
        {question}
      </Text>
      <View style={{ flexDirection: 'row' }}>
        {answers.map((answer, index) => {
          const key = `answer-${index}`;
          return (
            <View key={key} style={{ flex: 1, marginRight: index < answers.length - 1 ? 8 : 0 }}>
              <QuestionBlock
                active={state === answer.keyValue.value}
                disabled={disabled}
                iconName={answer.iconName}
                keyValue={answer.keyValue}
                onPress={() => handleOnPress(answer.keyValue.value)}
              />
            </View>
          );
        })}
      </View>
    </Animated.View>
  );
}

export default ChangesQuestion;
