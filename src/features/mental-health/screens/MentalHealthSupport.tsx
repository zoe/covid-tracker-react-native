import { BasicPage, DropdownField, Text } from '@covid/components';
import {
  selectMentalHealthSupport,
  setHasNeededSupport,
  setHasReceivedSupport,
  TGeneralAnswer,
} from '@covid/core/state/mental-health';
import { IMentalHealthSupport } from '@covid/core/state/mental-health/support/types';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import { mentalHealthApiClient } from '@covid/Services';
import { useTheme } from '@covid/themes';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { initialOptions } from '../data';
import { MentalHealthInfosRequest } from '../MentalHealthInfosRequest';

function MentalHealthSupport() {
  const [canSubmit, setCanSubmit] = useState(false);
  const { grid } = useTheme();
  const MentalHealthSupport: IMentalHealthSupport = useSelector(selectMentalHealthSupport);
  const dispatch = useDispatch();

  const handleSetHasNeededSupport = (value: TGeneralAnswer) => {
    dispatch(setHasNeededSupport(value));
  };

  const handleSetHasReceivedSupport = (value: TGeneralAnswer) => {
    dispatch(setHasReceivedSupport(value));
  };

  useEffect(() => {
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
        <View>
          <DropdownField
            items={initialOptions}
            label={i18n.t('mental-health.question-support-needed')}
            onValueChange={handleSetHasNeededSupport}
            selectedValue={MentalHealthSupport.hasNeededSupport}
          />
        </View>
        {MentalHealthSupport.hasNeededSupport === 'YES' ? (
          <View>
            <DropdownField
              items={initialOptions}
              label={i18n.t('mental-health.question-support-received')}
              onValueChange={handleSetHasReceivedSupport}
              selectedValue={MentalHealthSupport.hasReceivedSupport}
            />
          </View>
        ) : null}
      </View>
    </BasicPage>
  );
}

export default MentalHealthSupport;
