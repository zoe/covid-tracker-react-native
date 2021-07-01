import { Text } from '@covid/components';
import ReconsentHeader from '@covid/features/reconsent/components/ReconsentHeader';
import ReconsentScreen from '@covid/features/reconsent/components/ReconsentScreen';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import { grid } from '@covid/themes';
import { colors } from '@theme';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';

function Callout(props: { title: string; description: string }) {
  return (
    <View style={styles.card}>
      <Text rhythm={8} style={styles.cardTitle} textClass="h4Medium">
        {props.title}
      </Text>
      <Text style={styles.cardDescription} textClass="pLight">
        {props.description}
      </Text>
    </View>
  );
}

export default function ReconsentRequestConsentScreen() {
  return (
    <ReconsentScreen
      buttonOnPress={() => NavigatorService.navigate('ReconsentNewsletterSignup')}
      buttonTitle={i18n.t('reconsent.request-consent.consent-yes')}
    >
      <ReconsentHeader showBackIcon showDots />
      <Text rhythm={16} style={styles.center} textClass="h2Light">
        {i18n.t('reconsent.request-consent.title')}
      </Text>
      <Text rhythm={24} style={[styles.center, styles.subtitle]} textClass="pLight">
        {i18n.t('reconsent.request-consent.subtitle')}
      </Text>

      <Callout
        description={i18n.t('reconsent.request-consent.use-1-description')}
        title={i18n.t('reconsent.request-consent.use-1-title')}
      />
    </ReconsentScreen>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.lightBlueBackground,
    borderRadius: grid.l,
    paddingHorizontal: grid.xxl,
    paddingVertical: grid.xxl,
  },
  cardDescription: {
    color: colors.darkblue,
  },
  cardTitle: {
    color: colors.darkblue,
  },
  center: {
    textAlign: 'center',
  },
  page: {
    backgroundColor: colors.backgroundPrimary,
  },

  subtitle: {
    color: colors.secondary,
  },
});
