import { Text } from '@covid/components';
import { ErrorText } from '@covid/components/Text';
import Analytics, { events } from '@covid/core/Analytics';
import { patientService } from '@covid/core/patient/PatientService';
import { selectDiseasePreferences } from '@covid/core/state/reconsent';
import { RootState } from '@covid/core/state/root';
import ReconsentScreen from '@covid/features/reconsent/components/ReconsentScreen';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import { grid } from '@covid/themes';
import { RouteProp } from '@react-navigation/native';
import { colors } from '@theme';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';

interface IProps {
  route: RouteProp<ScreenParamList, 'ReconsentRequestConsent'>;
}

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

export default function ReconsentRequestConsentScreen(props: IProps) {
  const [error, setError] = React.useState<string | null>(null);
  const patientId = useSelector<RootState, string>((state) => state.user.patients[0]);

  const diseasePreferences = useSelector(selectDiseasePreferences);

  const onPrivacyPolicyPress = () => {
    Analytics.track(events.RECONSENT_PRIVACY_POLICY_CLICKED);
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

  const onConfirmYes = async () => {
    Analytics.track(events.RECONSENT_YES_CLICKED);

    const diseasePreferencesPayload = { ...diseasePreferences, research_consent_asked: true };
    try {
      await patientService.updatePatientInfo(patientId, diseasePreferencesPayload);
      NavigatorService.navigate('ReconsentNewsletterSignup');
    } catch {
      setError(i18n.t('something-went-wrong'));
    }
  };

  const onNoClick = () => {
    Analytics.track(events.RECONSENT_FIRST_NO_CLICKED);
    NavigatorService.navigate('ReconsentFeedback');
  };

  return (
    <ReconsentScreen
      activeDot={3}
      buttonOnPress={onConfirmYes}
      buttonTitle={i18n.t('reconsent.request-consent.consent-yes')}
      secondaryButtonOnPress={props.route.params?.secondTime ? undefined : onNoClick}
      secondaryButtonTitle={props.route.params?.secondTime ? undefined : i18n.t('reconsent.request-consent.consent-no')}
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
      {error ? <ErrorText style={styles.errorText}>{error}</ErrorText> : null}
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
  errorText: {
    marginBottom: 8,
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
