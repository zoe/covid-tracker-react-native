import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';

import i18n from '@covid/locale/i18n';
import { BasicPage, Text, SpeechCard, Icon } from '@covid/components';
import NavigatorService from '@covid/NavigatorService';
import { mentalHealthApiClient } from '@covid/Services';
import { selectUser, IUser } from '@covid/core/state/user';

import { Profile } from '../partials';
import { MentalHealthInfosRequest } from '../MentalHealthInfosRequest';

function MentalHealthStart() {
  const [canStart, setCanStart] = useState(false);
  const user: IUser = useSelector(selectUser);

  const createNewMentalHealthRecord = async () => {
    const currentPatientId: string = user.patients[0];
    const newMentalHealth: MentalHealthInfosRequest = {};
    await mentalHealthApiClient.add(currentPatientId, newMentalHealth);
    setCanStart(true);
  };

  useEffect(() => {
    createNewMentalHealthRecord();
  }, []);

  return (
    <BasicPage
      active={canStart}
      footerTitle={i18n.t('navigation.start')}
      onPress={() => NavigatorService.navigate('MentalHealthChanges', undefined)}>
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
