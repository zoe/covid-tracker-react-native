import { BasicPage, Text } from '@covid/components';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import { styling } from '@covid/themes';
import * as React from 'react';
import { View } from 'react-native';

export default function ReconsentIntroductionScreen() {
  return (
    <BasicPage
      active
      withHeader
      footerTitle={i18n.t('navigation.next')}
      onPress={() => NavigatorService.navigate('ReconsentDiseasePreferences')}
      style={styling.backgroundWhite}
    >
      <View>
        <Text>Introduction</Text>
      </View>
    </BasicPage>
  );
}
