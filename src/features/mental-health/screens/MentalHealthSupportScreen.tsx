import { Text } from '@covid/components';
import { RadioInput } from '@covid/components/inputs/RadioInput';
import { Screen } from '@covid/components/Screen';
import {
  selectMentalHealthSupport,
  setHasNeededSupport,
  setHasReceivedSupport,
  TGeneralAnswer,
} from '@covid/core/state/mental-health';
import { TStateMentalHealthSupport } from '@covid/core/state/mental-health/support/types';
import { initialOptions } from '@covid/features/mental-health/data';
import { mentalHealthApiClient } from '@covid/features/mental-health/MentalHealthApiClient';
import { TMentalHealthInfosRequest } from '@covid/features/mental-health/MentalHealthInfosRequest';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import { colors } from '@theme';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function MentalHealthSupportScreen() {
  const [canSubmit, setCanSubmit] = React.useState(false);
  const MentalHealthSupport: TStateMentalHealthSupport = useSelector(selectMentalHealthSupport);
  const dispatch = useDispatch();

  const handleSetHasNeededSupport = (value: TGeneralAnswer) => {
    dispatch(setHasNeededSupport(value));
  };

  const handleSetHasReceivedSupport = (value: TGeneralAnswer) => {
    dispatch(setHasReceivedSupport(value));
  };

  React.useEffect(() => {
    if (MentalHealthSupport.hasNeededSupport === 'NO' || MentalHealthSupport.hasNeededSupport === 'DECLINE_TO_SAY') {
      setCanSubmit(true);
      return;
    }
    if (MentalHealthSupport.hasReceivedSupport) {
      setCanSubmit(true);
      return;
    }
    setCanSubmit(false);
  }, [MentalHealthSupport]);

  const saveStateAndNavigate = async () => {
    const existingMentalHealthListForUser = await mentalHealthApiClient.get();
    const existingMentalHealth = existingMentalHealthListForUser[0];
    const updatedMentalHealth: TMentalHealthInfosRequest = mentalHealthApiClient.buildRequestObject(
      existingMentalHealth,
      { mentalHealthSupport: MentalHealthSupport },
    );
    await mentalHealthApiClient.update(updatedMentalHealth);
    NavigatorService.navigate('MentalHealthLearning', undefined);
  };

  return (
    <Screen
      backgroundColor={colors.backgroundTertiary}
      footerEnabled={canSubmit}
      footerOnPress={saveStateAndNavigate}
      footerTitle={i18n.t('navigation.next')}
      testID="mental-health-support-screen"
    >
      <Text rhythm={16} textClass="h3">
        {i18n.t('mental-health.question-support-title')}
      </Text>
      <RadioInput
        items={initialOptions}
        label={i18n.t('mental-health.question-support-needed')}
        onValueChange={handleSetHasNeededSupport}
        selectedValue={MentalHealthSupport.hasNeededSupport}
      />
      {MentalHealthSupport.hasNeededSupport === 'YES' ? (
        <RadioInput
          items={initialOptions}
          label={i18n.t('mental-health.question-support-received')}
          onValueChange={handleSetHasReceivedSupport}
          selectedValue={MentalHealthSupport.hasReceivedSupport}
        />
      ) : null}
    </Screen>
  );
}
