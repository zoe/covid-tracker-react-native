import { BrandedButton, ErrorText, Text } from '@covid/components';
import Card from '@covid/components/cards/Card';
import Analytics, { events } from '@covid/core/Analytics';
import { contentService } from '@covid/core/content/ContentService';
import { fetchStartupInfo } from '@covid/core/state/contentSlice';
import { resetFeedback, selectReturnScreenName } from '@covid/core/state/reconsent';
import IllustrationSignup from '@covid/features/reconsent/components/IllustrationSignup';
import ReconsentScreen from '@covid/features/reconsent/components/ReconsentScreen';
import Tick from '@covid/features/reconsent/components/Tick';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import { sizes } from '@covid/themes';
import { colors } from '@theme/colors';
import * as React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

const hitSlop = {
  bottom: 24,
  left: 24,
  right: 24,
  top: 24,
};

export default function ReconsentNewsletterSignupScreen() {
  const [error, setError] = React.useState<string>();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [signedUp, setSignedUp] = React.useState<boolean>(false);
  const dispatch = useDispatch();
  const returnScreenName = useSelector(selectReturnScreenName);

  async function toggleNewsletterSignup() {
    setLoading(true);
    try {
      if (signedUp) {
        Analytics.track(events.RECONSENT_NEWSLETTER_UNSUBSCRIBE);
      } else {
        Analytics.track(events.RECONSENT_NEWSLETTER_SUBSCRIBE);
      }
      await contentService.signUpForDiseaseResearchNewsletter(!signedUp);
      setSignedUp((prevState) => !prevState);
    } catch {
      setError(i18n.t('something-went-wrong'));
    }
    setLoading(false);
  }

  async function onPress() {
    if (signedUp) {
      // In Amplitude it's hard to filter people who subscribed but didn't unsubscribe.
      Analytics.track(events.RECONSENT_NEWSLETTER_SUBSCRIBED_FINAL);
    }
    // Update the startup info (as research consent has changed and app needs to be aware)
    // This requires async await to make sure!
    await dispatch(fetchStartupInfo());
    NavigatorService.navigate('Dashboard');
    if (returnScreenName === 'Menu') {
      NavigatorService.openDrawer();
    }

    if (returnScreenName === 'Studies') {
      NavigatorService.navigate('Dashboard', { screen: 'StudiesList' });
    }
    dispatch(resetFeedback());
  }

  return (
    <ReconsentScreen
      noHeader
      buttonOnPress={onPress}
      buttonTitle={i18n.t('reconsent.newsletter-signup.button')}
      testID="reconsent-newsletter-signup-screen"
    >
      <Text rhythm={24} style={styles.marginTop} textAlign="center" textClass="h2Light">
        {i18n.t('reconsent.newsletter-signup.title')}
      </Text>
      <Text rhythm={24} textAlign="center" textClass="h4Light">
        {i18n.t('reconsent.newsletter-signup.description-1')}
      </Text>
      <Text textAlign="center" textClass="h4Light">
        {i18n.t('reconsent.newsletter-signup.description-2')}
      </Text>
      <Card useShadow style={styles.card}>
        <IllustrationSignup style={styles.illustration} />
        <Text rhythm={24} textClass="h4">
          {i18n.t('reconsent.newsletter-signup.card-title')}
        </Text>
        <Text rhythm={24} textClass="pLight">
          {i18n.t('reconsent.newsletter-signup.card-description')}
        </Text>
        {error ? <ErrorText style={{ marginBottom: sizes.xs, textAlign: 'center' }}>{error}</ErrorText> : null}
        {signedUp ? (
          <>
            <View style={styles.messageWrapper}>
              <Tick />
              <Text style={styles.marginLeft} textClass="p">
                {i18n.t('reconsent.newsletter-signup.card-message')}
              </Text>
            </View>
            <TouchableOpacity
              disabled={loading}
              hitSlop={hitSlop}
              onPress={toggleNewsletterSignup}
              style={styles.buttonNo}
              testID="button-opt-out"
            >
              <Text style={styles.buttonNoText} textClass="p">
                {i18n.t('reconsent.newsletter-signup.card-button-no')}
              </Text>
            </TouchableOpacity>
          </>
        ) : (
          <BrandedButton
            enabled={!loading}
            loading={loading}
            onPress={toggleNewsletterSignup}
            style={styles.buttonYes}
            testID="button-opt-in"
          >
            {i18n.t('reconsent.newsletter-signup.card-button-yes')}
          </BrandedButton>
        )}
      </Card>
    </ReconsentScreen>
  );
}

const styles = StyleSheet.create({
  buttonNo: {
    alignSelf: 'center',
    marginTop: sizes.l,
  },
  buttonNoText: {
    color: colors.purple,
  },
  buttonYes: {
    backgroundColor: colors.darkblue,
  },
  card: {
    marginBottom: sizes.m,
    marginTop: sizes.xxl,
  },
  illustration: {
    alignSelf: 'center',
    marginBottom: sizes.xs,
  },
  marginLeft: {
    marginLeft: sizes.xs,
  },
  marginTop: {
    marginTop: sizes.m,
  },
  messageWrapper: {
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
  },
});
