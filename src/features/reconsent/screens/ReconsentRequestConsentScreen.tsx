import { Text } from '@covid/components';
import ReconsentScreen from '@covid/features/reconsent/components/ReconsentScreen';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import { grid } from '@covid/themes';
import { colors } from '@theme';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';

const Callout = (props: { title: string; description: string }) => {
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
};

export default function ReconsentRequestConsentScreen() {
  const onPrivacyPolicyPress = () => {
    NavigatorService.navigate('PrivacyPolicyUK', { viewOnly: true });
  };

  const renderCallouts = () => {
    return [1, 2, 3].map((i) => (
      <Callout
        description={i18n.t(`reconsent.request-consent.use-${i}-description`)}
        key={i}
        title={i18n.t(`reconsent.request-consent.use-${i}-title`)}
      />
    ));
  };

  return (
    <ReconsentScreen
      activeDot={3}
      buttonOnPress={() => NavigatorService.navigate('ReconsentNewsletterSignup')}
      buttonTitle={i18n.t('reconsent.request-consent.consent-yes')}
      secondaryButtonOnPress={() => NavigatorService.navigate('ReconsentFeedback')}
      secondaryButtonTitle={i18n.t('reconsent.request-consent.consent-no')}
    >
      <Text rhythm={16} style={styles.center} textClass="h2Light">
        {i18n.t('reconsent.request-consent.title')}
      </Text>
      <Text rhythm={24} style={[styles.center, styles.subtitle]} textClass="pLight">
        {i18n.t('reconsent.request-consent.subtitle')}
      </Text>
      {renderCallouts()}
      <Text onPress={onPrivacyPolicyPress} style={styles.privacyLink} textClass="pSmallLight">
        {i18n.t('reconsent.request-consent.learn-more')}{' '}
      </Text>
      <View style={styles.hr} />
    </ReconsentScreen>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.lightBlueBackground,
    borderRadius: grid.l,
    marginBottom: grid.l,
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
  hr: {
    borderBottomColor: colors.backgroundFour,
    borderBottomWidth: 1,
    marginBottom: grid.xxl,
  },
  page: {
    backgroundColor: colors.backgroundPrimary,
  },
  privacyLink: {
    color: colors.darkblue,
    marginBottom: 30,
    marginTop: grid.s,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  subtitle: {
    color: colors.secondary,
  },
});
