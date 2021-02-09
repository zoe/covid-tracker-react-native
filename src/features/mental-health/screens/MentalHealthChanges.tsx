import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { BasicPage, Text } from '@covid/components';
import NavigatorService from '@covid/NavigatorService';
import { useTheme } from '@covid/themes';
import {
  selectMentalHealthChanges,
  setDevicesWithScreen,
  setDrinkingAlcohol,
  setEngagingWithOrganisations,
  setFeelingAlone,
  setGreenSpaces,
  setInteractingFaceToFace,
  setInteractingViaPhoneOrTechnology,
  setPhysical,
  setReadingWatchingListeningNews,
  setRelaxation,
  setSleep,
  setSmokingOrVaping,
  setSnacks,
  setTimeWithPets,
  setWorking,
  TMentalHealthChange,
} from '@covid/core/state/mental-health';

import { Question } from '../partials';

function MentalHealthChanges() {
  const [canSubmit, setCanSubmit] = useState(false);
  const mentalHealthChanges = useSelector(selectMentalHealthChanges);
  const dispatch = useDispatch();
  const { grid } = useTheme();
  const questions = [
    {
      action: setDevicesWithScreen,
      question: 'Using devices with a screen',
      state: mentalHealthChanges.devicesWithScreen,
    },
    {
      action: setDrinkingAlcohol,
      question: 'Drinking alcohol',
      state: mentalHealthChanges.drinkingAlcohol,
    },
    {
      action: setEngagingWithOrganisations,
      question:
        'Engaging in organisations, clubs or societies (e.g. political, religious, charitable, social, sport. or other groups organisations, clubs or societies).',
      state: mentalHealthChanges.engagingWithOrganisations,
    },
    {
      action: setFeelingAlone,
      question: 'Feeling more alone',
      state: mentalHealthChanges.feelingAlone,
    },
    {
      action: setGreenSpaces,
      question: 'Spending time in green spaces such as parks, gardens, countryside',
      state: mentalHealthChanges.greenSpaces,
    },
    {
      action: setInteractingFaceToFace,
      question: 'Interacting face-to-face with family/friends',
      state: mentalHealthChanges.interactingFaceToFace,
    },
    {
      action: setInteractingViaPhoneOrTechnology,
      question: 'Talking to family/friends via phone / technology',
      state: mentalHealthChanges.interactingViaPhoneOrTechnology,
    },
    {
      action: setPhysical,
      question: 'Being physically active / doing exercise',
      state: mentalHealthChanges.physical,
    },
    {
      action: setReadingWatchingListeningNews,
      question: 'Reading/watching/listening to the news',
      state: mentalHealthChanges.readingWatchingListeningNews,
    },
    {
      action: setRelaxation,
      question: 'Relaxation / mindfulness/ meditation',
      state: mentalHealthChanges.relaxation,
    },
    {
      action: setSleep,
      question: 'Sleeping well',
      state: mentalHealthChanges.sleep,
    },
    {
      action: setSmokingOrVaping,
      question: 'Smoking or vaping',
      state: mentalHealthChanges.smokingOrVaping,
    },
    {
      action: setSnacks,
      question: 'Eating savoury snacks / confectionery  ',
      state: mentalHealthChanges.snacks,
    },
    {
      action: setTimeWithPets,
      question: 'Spending time with pets',
      state: mentalHealthChanges.timeWithPets,
    },
    {
      action: setWorking,
      question: 'Working',
      state: mentalHealthChanges.working,
    },
  ];

  useEffect(() => {
    const canSubmit = !Object.values(mentalHealthChanges).includes(undefined);
    setCanSubmit(canSubmit);
  }, [mentalHealthChanges]);

  return (
    <BasicPage
      active={canSubmit}
      footerTitle="Next"
      onPress={() => NavigatorService.navigate('MentalHealthFrequency', undefined)}>
      <View style={{ paddingHorizontal: grid.gutter }}>
        <Text textClass="h3" rhythm={32}>
          During this pandemic, have you changed the way you have spent time doing the following:
        </Text>
        {questions.map((item, index) => {
          const key = `changes-${index}`;
          return (
            <Question
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

export default MentalHealthChanges;
