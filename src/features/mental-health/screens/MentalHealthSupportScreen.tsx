import { BasicPage, Text } from '@covid/components';
import { RadioInput } from '@covid/components/inputs/RadioInput';
import {
  selectMentalHealthSupport,
  setHasNeededSupport,
  setHasReceivedSupport,
  TGeneralAnswer,
} from '@covid/core/state/mental-health';
import { IMentalHealthSupport } from '@covid/core/state/mental-health/support/types';
import { initialOptions } from '@covid/features/mental-health/data';
import { MentalHealthInfosRequest } from '@covid/features/mental-health/MentalHealthInfosRequest';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import { mentalHealthApiClient } from '@covid/services';
import { useTheme } from '@covid/themes';
import * as React from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

export default function MentalHealthSupportScreen() {
  const [canSubmit, setCanSubmit] = React.useState(false);
  const { grid } = useTheme();
  const MentalHealthSupport: IMentalHealthSupport = useSelector(selectMentalHealthSupport);
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
    const updatedMentalHealth: MentalHealthInfosRequest = mentalHealthApiClient.buildRequestObject(
      existingMentalHealth,
      { mentalHealthSupport: MentalHealthSupport },
    );
    await mentalHealthApiClient.update(updatedMentalHealth);
    NavigatorService.navigate('MentalHealthLearning', undefined);
  };

  return (
    <BasicPage active={canSubmit} footerTitle={i18n.t('navigation.next')} onPress={saveStateAndNavigate}>
      <View style={{ paddingHorizontal: grid.gutter }}>
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
      </View>
    </BasicPage>
  );
}
