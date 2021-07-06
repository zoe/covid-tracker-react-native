import { BasicPage, Text } from '@covid/components';
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
import { IUser, selectUser } from '@covid/core/state/user';
import { MentalHealthInfosRequest } from '@covid/features/mental-health/MentalHealthInfosRequest';
import { ChangesQuestion } from '@covid/features/mental-health/partials';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import { mentalHealthApiClient } from '@covid/services';
import { useTheme } from '@covid/themes';
import * as React from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

export default function MentalHealthChangesScreen() {
  const user: IUser = useSelector(selectUser);
  const [canSubmit, setCanSubmit] = React.useState(false);
  const [curQuestion, setCurQuestion] = React.useState(0);
  const mentalHealthChanges = useSelector(selectMentalHealthChanges);
  const dispatch = useDispatch();
  const { grid } = useTheme();
  const questions = [
    {
      action: setSleep,
      question: i18n.t('mental-health.question-sleep'),
      state: mentalHealthChanges.sleep,
    },
    {
      action: setPhysical,
      question: i18n.t('mental-health.question-physical'),
      state: mentalHealthChanges.physical,
    },
    {
      action: setGreenSpaces,
      question: i18n.t('mental-health.question-green-spaces'),
      state: mentalHealthChanges.greenSpaces,
    },
    {
      action: setTimeWithPets,
      question: i18n.t('mental-health.question-time-with-pets'),
      state: mentalHealthChanges.timeWithPets,
    },
    {
      action: setSmokingOrVaping,
      question: i18n.t('mental-health.question-smoking-or-vaping'),
      state: mentalHealthChanges.smokingOrVaping,
    },
    {
      action: setDrinkingAlcohol,
      question: i18n.t('mental-health.question-drinking-alcohol'),
      state: mentalHealthChanges.drinkingAlcohol,
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
      action: setFeelingAlone,
      question: i18n.t('mental-health.question-feeling-alone'),
      state: mentalHealthChanges.feelingAlone,
    },
    {
      action: setWorking,
      question: i18n.t('mental-health.question-working'),
      state: mentalHealthChanges.working,
    },
    {
      action: setRelaxation,
      question: i18n.t('mental-health.question-relaxation'),
      state: mentalHealthChanges.relaxation,
    },
    {
      action: setReadingWatchingListeningNews,
      question: i18n.t('mental-health.question-reading-watching-listening-News'),
      state: mentalHealthChanges.readingWatchingListeningNews,
    },
    {
      action: setDevicesWithScreen,
      question: i18n.t('mental-health.question-devices-with-screen'),
      state: mentalHealthChanges.devicesWithScreen,
    },
    {
      action: setSnacks,
      question: i18n.t('mental-health.question-snacks'),
      state: mentalHealthChanges.snacks,
    },
    {
      action: setEngagingWithOrganisations,
      question: i18n.t('mental-health.question-engaging-with-organisations'),
      state: mentalHealthChanges.engagingWithOrganisations,
    },
  ];

  const createNewMentalHealthRecord = async () => {
    const currentPatientId: string = user.patients[0];
    const newMentalHealth: MentalHealthInfosRequest = {};
    await mentalHealthApiClient.add(currentPatientId, newMentalHealth);
  };

  React.useEffect(() => {
    createNewMentalHealthRecord();
  }, []);

  React.useEffect(() => {
    const answered = Object.values(mentalHealthChanges).filter((item) => item !== undefined);
    setCurQuestion(answered.length);
    const enableSubmit = answered.length >= questions.length;
    setCanSubmit(enableSubmit);
  }, [mentalHealthChanges]);

  const saveStateAndNavigate = async () => {
    const existingMentalHealthListForUser = await mentalHealthApiClient.get();
    const existingMentalHealth = existingMentalHealthListForUser[0];
    const updatedMentalHealth: MentalHealthInfosRequest = mentalHealthApiClient.buildRequestObject(
      existingMentalHealth,
      { mentalHealthChanges },
    );
    await mentalHealthApiClient.update(updatedMentalHealth);
    NavigatorService.navigate('MentalHealthFrequency', undefined);
  };

  return (
    <BasicPage active={canSubmit} footerTitle={i18n.t('navigation.next')} onPress={saveStateAndNavigate}>
      <View style={{ paddingHorizontal: grid.gutter }}>
        <Text rhythm={32} textClass="h3">
          {i18n.t('mental-health.question-changes')}
        </Text>
        {questions.map((item, index) => {
          const key = `changes-${index}`;
          const disabled = index > curQuestion;
          return (
            <ChangesQuestion
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
