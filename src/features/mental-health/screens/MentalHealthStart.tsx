import React from 'react';
import { View } from 'react-native';

import i18n from '@covid/locale/i18n';
import { BasicPage, Text, SpeechCard, Icon } from '@covid/components';
import NavigatorService from '@covid/NavigatorService';
import { mentalHealthApiClient } from '@covid/Services';
import UserService from '@covid/core/user/UserService';

import { Profile } from '../partials';
import { MentalHealthInfosRequest } from '../MentalHealthInfosRequest';

function MentalHealthStart() {
  const createNewMentalHealthRecord = async () => {
    // TODO - use patient id of current user
    const currentPatientId: string = (await new UserService().getFirstPatientId()) ?? '';
    // Create a record
    const newMentalHealth: MentalHealthInfosRequest = {};
    await mentalHealthApiClient.add(currentPatientId, newMentalHealth);
  };

  createNewMentalHealthRecord();

  return (
    <BasicPage footerTitle="Start" onPress={() => NavigatorService.navigate('MentalHealthChanges', undefined)}>
      <Profile />

      <SpeechCard>
        <Text rhythm={16} textClass="pLight">
          {i18n.t('mental-health.introduction-0')}
        </Text>
        <Text rhythm={16} textClass="pLight">
          {i18n.t('mental-health.introduction-1')}
        </Text>
        <Text textClass="pLight">{i18n.t('mental-health.introduction-1')}</Text>
      </SpeechCard>
      <View style={{ flexDirection: 'row', paddingHorizontal: 16 }}>
        <Icon iconName="error_outline" />
        <Text textClass="pLight" style={{ marginLeft: 8 }}>
          {i18n.t('mental-health.introduction-condition')}
        </Text>
      </View>
    </BasicPage>
  );
}

export default MentalHealthStart;
