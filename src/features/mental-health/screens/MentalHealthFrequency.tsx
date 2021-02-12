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

import { FrequencyQuestion } from '../partials';

function MentalHealthFrequency() {
  const [canSubmit, setCanSubmit] = useState(false);
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
    const canSubmit = !Object.values(MentalHealthFrequency).includes(undefined);
    setCanSubmit(canSubmit);
  }, [MentalHealthFrequency]);

  return (
    <BasicPage
      active={canSubmit}
      footerTitle="Next"
      onPress={() => NavigatorService.navigate('MentalHealthHistory', undefined)}>
      <View style={{ paddingHorizontal: grid.gutter }}>
        <Text textClass="h3" rhythm={32}>
          Over the last 2 weeks, how often have you been bothered by the following for:
        </Text>
        {questions.map((item, index) => {
          const key = `changes-${index}`;
          return (
            <FrequencyQuestion
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
