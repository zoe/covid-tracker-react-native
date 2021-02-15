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
} from '@covid/core/state/mental-health';
import i18n from '@covid/locale/i18n';

import { ChangesQuestion } from '../partials';

function MentalHealthChanges() {
  const [canSubmit, setCanSubmit] = useState(false);
  const [curQuestion, setCurQuestion] = useState(0);
  const mentalHealthChanges = useSelector(selectMentalHealthChanges);
  const dispatch = useDispatch();
  const { grid } = useTheme();
  const questions = [
    {
      action: setDevicesWithScreen,
      question: i18n.t('mental-health.question-devices-with-screen'),
      state: mentalHealthChanges.devicesWithScreen,
    },
    {
      action: setDrinkingAlcohol,
      question: i18n.t('mental-health.question-drinking-alcohol'),
      state: mentalHealthChanges.drinkingAlcohol,
    },
    {
      action: setEngagingWithOrganisations,
      question: i18n.t('mental-health.question-engaging-with-organisations'),
      state: mentalHealthChanges.engagingWithOrganisations,
    },
    {
      action: setFeelingAlone,
      question: i18n.t('mental-health.question-feeling-alone'),
      state: mentalHealthChanges.feelingAlone,
    },
    {
      action: setGreenSpaces,
      question: i18n.t('mental-health.question-green-spaces'),
      state: mentalHealthChanges.greenSpaces,
    },
    {
      action: setInteractingFaceToFace,
      question: i18n.t('mental-health.question-interacting-face-to-face'),
      state: mentalHealthChanges.interactingFaceToFace,
    },
    {
      action: setInteractingViaPhoneOrTechnology,
      question: i18n.t('mental-health.question-interacting-via-phone-or-technology'),
      state: mentalHealthChanges.interactingViaPhoneOrTechnology,
    },
    {
      action: setPhysical,
      question: i18n.t('mental-health.question-physical'),
      state: mentalHealthChanges.physical,
    },
    {
      action: setReadingWatchingListeningNews,
      question: i18n.t('mental-health.question-reading-watching-listening-News'),
      state: mentalHealthChanges.readingWatchingListeningNews,
    },
    {
      action: setRelaxation,
      question: i18n.t('mental-health.question-relaxation'),
      state: mentalHealthChanges.relaxation,
    },
    {
      action: setSleep,
      question: i18n.t('mental-health.question-sleep'),
      state: mentalHealthChanges.sleep,
    },
    {
      action: setSmokingOrVaping,
      question: i18n.t('mental-health.question-smoking-or-vaping'),
      state: mentalHealthChanges.smokingOrVaping,
    },
    {
      action: setSnacks,
      question: i18n.t('mental-health.question-snacks'),
      state: mentalHealthChanges.snacks,
    },
    {
      action: setTimeWithPets,
      question: i18n.t('mental-health.question-time-with-pets'),
      state: mentalHealthChanges.timeWithPets,
    },
    {
      action: setWorking,
      question: i18n.t('mental-health.question-working'),
      state: mentalHealthChanges.working,
    },
  ];

  useEffect(() => {
    const answered = Object.values(mentalHealthChanges).filter((item) => item !== undefined);
    setCurQuestion(answered.length);
    const enableSubmit = answered.length >= questions.length;
    setCanSubmit(enableSubmit);
  }, [mentalHealthChanges]);

  return (
    <BasicPage
      active={canSubmit}
      footerTitle="Next"
      onPress={() => NavigatorService.navigate('MentalHealthFrequency', undefined)}>
      <View style={{ paddingHorizontal: grid.gutter }}>
        <Text textClass="h3" rhythm={32}>
          {i18n.t('mental-health.question-changes')}
        </Text>
        {questions.map((item, index) => {
          const key = `changes-${index}`;
          const disabled = index > curQuestion;
          return (
            <ChangesQuestion
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

export default MentalHealthChanges;
