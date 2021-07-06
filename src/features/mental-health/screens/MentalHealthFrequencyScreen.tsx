import { BasicPage, Text } from '@covid/components';
import {
  selectMentalHealthFrequency,
  setFeelingDown,
  setFeelingNervous,
  setPleasureInDoingThings,
  setStopWorrying,
} from '@covid/core/state/mental-health';
import { MentalHealthInfosRequest } from '@covid/features/mental-health/MentalHealthInfosRequest';
import { FrequencyQuestion } from '@covid/features/mental-health/partials';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import { mentalHealthApiClient } from '@covid/services';
import { useTheme } from '@covid/themes';
import * as React from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

export default function MentalHealthFrequencyScreen() {
  const [canSubmit, setCanSubmit] = React.useState(false);
  const [curQuestion, setCurQuestion] = React.useState(0);
  const MentalHealthFrequency = useSelector(selectMentalHealthFrequency);
  const dispatch = useDispatch();
  const { grid } = useTheme();
  const questions = [
    {
      action: setPleasureInDoingThings,
      question: i18n.t('mental-health.question-pleasure-in-doing-things'),
      state: MentalHealthFrequency.pleasureInDoingThings,
    },
    {
      action: setFeelingDown,
      question: i18n.t('mental-health.question-feeling-down'),
      state: MentalHealthFrequency.feelingDown,
    },
    {
      action: setFeelingNervous,
      question: i18n.t('mental-health.question-feeling-nervous'),
      state: MentalHealthFrequency.feelingNervous,
    },
    {
      action: setStopWorrying,
      question: i18n.t('mental-health.question-stop-worrying'),
      state: MentalHealthFrequency.stopWorrying,
    },
  ];

  React.useEffect(() => {
    const answered = Object.values(MentalHealthFrequency).filter((item) => item !== undefined);
    setCurQuestion(answered.length);
    const enableSubmit = answered.length >= questions.length;
    setCanSubmit(enableSubmit);
  }, [MentalHealthFrequency]);

  const saveStateAndNavigate = async () => {
    const existingMentalHealthListForUser = await mentalHealthApiClient.get();
    const existingMentalHealth = existingMentalHealthListForUser[0];
    const updatedMentalHealth: MentalHealthInfosRequest = mentalHealthApiClient.buildRequestObject(
      existingMentalHealth,
      { mentalHealthFrequency: MentalHealthFrequency },
    );
    await mentalHealthApiClient.update(updatedMentalHealth);
    NavigatorService.navigate('MentalHealthHistory', undefined);
  };

  return (
    <BasicPage active={canSubmit} footerTitle={i18n.t('navigation.next')} onPress={saveStateAndNavigate}>
      <View style={{ paddingHorizontal: grid.gutter }}>
        <Text rhythm={32} textClass="h3">
          {i18n.t('mental-health.question-frequency')}
        </Text>
        {questions.map((item, index) => {
          const key = `changes-${index}`;
          const disabled = index > curQuestion;
          return (
            <FrequencyQuestion
              disabled={disabled}
              key={key}
              onPress={(changeType) => {
                dispatch(item.action(changeType));
              }}
              question={item.question}
              state={item.state}
            />
          );
        })}
      </View>
    </BasicPage>
  );
}
