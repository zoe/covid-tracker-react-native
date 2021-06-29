import { BasicPage, Text } from '@covid/components';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import { styling } from '@covid/themes';
import * as React from 'react';
import { View } from 'react-native';

export default function ReconsentFeedbackScreen() {
  return (
    <BasicPage
      active
      withHeader
      footerTitle={i18n.t('navigation.next')}
      onPress={() => NavigatorService.navigate('ReconsentReconsider')}
      style={styling.backgroundWhite}
    >
      <View>
        <Text>Feedback on why no consent</Text>
      </View>
    </BasicPage>
  );
}
