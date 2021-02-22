import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import NavigatorService from '@covid/NavigatorService';
import { BasicPage, DropdownField, Text } from '@covid/components';
import { useTheme } from '@covid/themes';
import {
  selectMentalHealthSupport,
  setHasNeededSupport,
  setHasReceivedSupport,
  TGeneralAnswer,
} from '@covid/core/state/mental-health';
import i18n from '@covid/locale/i18n';
import { mentalHealthApiClient } from '@covid/Services';
import { IMentalHealthSupport } from '@covid/core/state/mental-health/support/types';
import { events, track } from '@covid/core/Analytics';

import { initialOptions } from '../data';
import { MentalHealthInfosRequest } from '../MentalHealthInfosRequest';

function MentalHealthSupport() {
  const [tracked, setTracked] = useState(false);
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
    if (!tracked) {
      track(events.MENTAL_HEALTH_SCREEN_LEARNING);
      setTracked(true);
    }
  });

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
      { mentalHealthSupport: MentalHealthSupport }
    );
    await mentalHealthApiClient.update(updatedMentalHealth);
    NavigatorService.navigate('MentalHealthLearning', undefined);
  };

  return (
    <BasicPage active={canSubmit} footerTitle={i18n.t('navigation.next')} onPress={saveStateAndNavigate}>
      <View style={{ paddingHorizontal: grid.gutter }}>
        <Text textClass="h3" rhythm={16}>
          {i18n.t('mental-health.question-support-title')}
        </Text>
        <View>
          <DropdownField
            label={i18n.t('mental-health.question-support-needed')}
            selectedValue={MentalHealthSupport.hasNeededSupport}
            onValueChange={handleSetHasNeededSupport}
            items={initialOptions}
          />
        </View>
        {MentalHealthSupport.hasNeededSupport === 'YES' && (
          <View>
            <DropdownField
              label={i18n.t('mental-health.question-support-received')}
              selectedValue={MentalHealthSupport.hasReceivedSupport}
              onValueChange={handleSetHasReceivedSupport}
              items={initialOptions}
            />
          </View>
        )}
      </View>
    </BasicPage>
  );
}

export default MentalHealthSupport;
