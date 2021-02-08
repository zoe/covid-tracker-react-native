import React from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';

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
} from '@covid/core/state/mental-health';

import { Question } from '../partials';

function MentalHealthChanges() {
  const mentalHealthChanges = useSelector(selectMentalHealthChanges); // this is the state
  const { grid } = useTheme();
  const questions = [
    {
      action: setDevicesWithScreen,
      question: 'Do you watch netflix all day?',
      state: mentalHealthChanges.devicesWithScreen,
    },
    {
      action: setDrinkingAlcohol,
      question: 'Do you drink too much?',
      state: mentalHealthChanges.drinkingAlcohol,
    },
  ];
  return (
    <BasicPage footerTitle="Next" onPress={() => NavigatorService.navigate('MentalHealthFrequency', undefined)}>
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
                console.log(changeType);
              }}
            />
          );
        })}
      </View>
    </BasicPage>
  );
}

export default MentalHealthChanges;
