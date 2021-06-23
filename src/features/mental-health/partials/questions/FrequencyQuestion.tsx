import { QuestionBlock, Text, useFade } from '@covid/components';
import { TMentalHealthFrequency } from '@covid/core/state/mental-health';
import i18n from '@covid/locale/i18n';
import { useTheme } from '@covid/themes';
import * as React from 'react';
import { Animated, View } from 'react-native';

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

function FrequencyQuestion({ disabled = true, onPress, question, state }: IProps) {
  const { grid } = useTheme();
  const fadeAnim = useFade(0.2, disabled ? 0.2 : 1, 500);

  const handleOnPress = (value: TMentalHealthFrequency) => {
    onPress(value);
  };

  const answers: TAnswer[] = [
    {
      keyValue: { key: i18n.t('mental-health.answer-not-at-all'), value: 'NOT_AT_ALL' },
    },
    {
      keyValue: { key: i18n.t('mental-health.answer-several-days'), value: 'SEVERAL_DAYS' },
    },
    {
      keyValue: { key: i18n.t('mental-health.answer-more-than-half'), value: 'MORE_THAN_HALF_THE_DAYS' },
    },
    {
      keyValue: { key: i18n.t('mental-health.answer-nearly-every-day'), value: 'NEARLY_EVERY_DAY' },
    },
  ];

  const decline: TAnswer = {
    keyValue: { key: i18n.t('mental-health.answer-prefer-not-to-say'), value: 'DECLINE_TO_SAY' },
  };

  return (
    <Animated.View style={{ marginBottom: grid.xxl, opacity: fadeAnim }}>
      <Text rhythm={grid.s} textClass="pSmall">
        {question}
      </Text>
      <View style={{ flexDirection: 'row', marginBottom: grid.s }}>
        {answers.map((answer, index) => {
          const key = `answer-${index}`;
          return (
            <View key={key} style={{ flex: 1, marginRight: index < answers.length - 1 ? 8 : 0 }}>
              <QuestionBlock
                active={state === answer.keyValue.value}
                disabled={disabled}
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
          disabled={disabled}
          keyValue={decline.keyValue}
          onPress={() => handleOnPress(decline.keyValue.value)}
        />
      </View>
    </Animated.View>
  );
}

export default FrequencyQuestion;
