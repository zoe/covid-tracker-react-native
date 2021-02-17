import React from 'react';
import { View } from 'react-native';

import i18n from '@covid/locale/i18n';
import { BasicPage, Text, SpeechCard, Icon } from '@covid/components';
import NavigatorService from '@covid/NavigatorService';

import { Profile } from '../partials';

function MentalHealthStart() {
  return (
    <BasicPage
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
