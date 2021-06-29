import { BasicPage, Link, Text } from '@covid/components';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import { styling } from '@covid/themes';
import * as React from 'react';
import { View } from 'react-native';

export default function ReconsentRequestConsentScreen() {
  return (
    <BasicPage
      active
      withHeader
      footerTitle={i18n.t('navigation.next')}
      onPress={() => NavigatorService.navigate('ReconsentNewsletterSignup')}
      style={styling.backgroundWhite}
    >
      <View>
        <Text>Request consent screen</Text>

        <Link
          linkText="No consent"
          onPress={() => {
            NavigatorService.navigate('ReconsentFeedback');
          }}
        />
      </View>
    </BasicPage>
  );
}
