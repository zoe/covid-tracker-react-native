import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { BasicPage, Text } from '@covid/components';
import NavigatorService from '@covid/NavigatorService';
import { useTheme } from '@covid/themes';
import {
  selectMentalHealthFrequency,
  setFeelingDown,
  setFeelingNervous,
  setPleasureInDoingThings,
  setStopWorrying,
} from '@covid/core/state/mental-health';
import { mentalHealthApiClient } from '@covid/Services';
import UserService from '@covid/core/user/UserService';

import { FrequencyQuestion } from '../partials';
import { MentalHealthInfosRequest } from '../MentalHealthInfosRequest';

function MentalHealthFrequency() {
  const [canSubmit, setCanSubmit] = useState(false);
  const [curQuestion, setCurQuestion] = useState(0);
  const MentalHealthFrequency = useSelector(selectMentalHealthFrequency);
  const dispatch = useDispatch();
  const { grid } = useTheme();
  const questions = [
    {
      action: setPleasureInDoingThings,
      question: 'Little interest or pleasure in doing things',
      state: MentalHealthFrequency.pleasureInDoingThings,
    },
    {
      action: setFeelingDown,
      question: 'Feeling down, depressed or hopeless',
      state: MentalHealthFrequency.feelingDown,
    },
    {
      action: setFeelingNervous,
      question: 'Feeling nervous, anxious or on edge',
      state: MentalHealthFrequency.feelingNervous,
    },
    {
      action: setStopWorrying,
      question: 'Not being able to stop or control worrying',
      state: MentalHealthFrequency.stopWorrying,
    },
  ];

  useEffect(() => {
    const answered = Object.values(MentalHealthFrequency).filter((item) => item !== undefined);
    setCurQuestion(answered.length);
    const enableSubmit = answered.length >= questions.length;
    setCanSubmit(enableSubmit);
  }, [MentalHealthFrequency]);

  const saveStateAndNavigate = async () => {
    // TODO: get existing mental health data, specifically ID, from state (Should be preloaded by here)
    const existingMentalHealthListForUser = await mentalHealthApiClient.get();
    const existingMentalHealth = existingMentalHealthListForUser[0];
    const updatedMentalHealth: MentalHealthInfosRequest = {
      id: existingMentalHealth.id,
      patient: existingMentalHealth.patient,
      little_interest_or_pleasure_in_doing_things: MentalHealthFrequency.pleasureInDoingThings,
      feeling_down: MentalHealthFrequency.feelingDown,
      feeling_nervous: MentalHealthFrequency.feelingNervous,
      not_being_able_to_control_worrying: MentalHealthFrequency.stopWorrying,
    };

    await mentalHealthApiClient.update(existingMentalHealth.id, updatedMentalHealth);
    NavigatorService.navigate('MentalHealthHistory', undefined);
  };

  return (
    <BasicPage active={canSubmit} footerTitle="Next" onPress={() => saveStateAndNavigate()}>
      <View style={{ paddingHorizontal: grid.gutter }}>
        <Text textClass="h3" rhythm={32}>
          Over the last 2 weeks, how often have you been bothered by the following for:
        </Text>
        {questions.map((item, index) => {
          const key = `changes-${index}`;
          const disabled = index > curQuestion;
          return (
            <FrequencyQuestion
              disabled={disabled}
              question={item.question}
              key={key}
              onPress={(changeType) => {
                dispatch(item.action(changeType));
              }}
              state={item.state}
            />
          );
        })}
      </View>
    </BasicPage>
  );
}

export default MentalHealthFrequency;
