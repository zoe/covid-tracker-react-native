import { BrandedButton, ErrorText, Text } from '@covid/components';
import Card from '@covid/components/cards/Card';
import { contentService } from '@covid/core/content/ContentService';
import IllustrationSignup from '@covid/features/reconsent/components/IllustrationSignup';
import ReconsentScreen from '@covid/features/reconsent/components/ReconsentScreen';
import Tick from '@covid/features/reconsent/components/Tick';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import { colors } from '@theme/colors';
import * as React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

const hitSlop = {
  bottom: 24,
  left: 24,
  right: 24,
  top: 24,
};

export default function ReconsentNewsletterSignupScreen() {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [signedUp, setSignedUp] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);

  async function toggleNewsletterSignup() {
    try {
      await contentService.signUpForDiseaseResearchNewsletter(signedUp);
      setSignedUp((prevState) => !prevState);
    } catch {
      setError(i18n.t('something-went-wrong'));
    }
  }

  return (
    <ReconsentScreen
      hideBackButton
      buttonOnPress={() => NavigatorService.navigate('Dashboard')}
      buttonTitle={i18n.t('reconsent.newsletter-signup.button')}
    >
      <Text rhythm={24} textAlign="center" textClass="h2Light">
        {i18n.t('reconsent.newsletter-signup.title')}
      </Text>
      <Text rhythm={24} textAlign="center" textClass="pLight">
        {i18n.t('reconsent.newsletter-signup.description-1')}
      </Text>
      <Text textAlign="center" textClass="pLight">
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
        {error ? <ErrorText style={{ marginBottom: 8, textAlign: 'center' }}>{error}</ErrorText> : null}
        {signedUp ? (
          <>
            <View style={styles.messageWrapper}>
              <Tick />
              <Text style={styles.marginLeft} textClass="p">
                {i18n.t('reconsent.newsletter-signup.card-message')}
              </Text>
            </View>
            <Pressable hitSlop={hitSlop} onPress={toggleNewsletterSignup} style={styles.buttonNoPressable}>
              <Text style={styles.buttonNoText} textClass="p">
                {i18n.t('reconsent.newsletter-signup.card-button-no')}
              </Text>
            </Pressable>
          </>
        ) : (
          <BrandedButton loading={loading} onPress={toggleNewsletterSignup} style={styles.buttonYes}>
            {i18n.t('reconsent.newsletter-signup.card-button-yes')}
          </BrandedButton>
        )}
      </Card>
    </ReconsentScreen>
  );
}

const styles = StyleSheet.create({
  buttonNoPressable: {
    alignSelf: 'center',
    marginTop: 24,
  },
  buttonNoText: {
    color: colors.purple,
  },
  buttonYes: {
    backgroundColor: colors.darkblue,
  },
  card: {
    marginBottom: 16,
    marginTop: 40,
  },
  illustration: {
    alignSelf: 'center',
    marginBottom: 8,
  },
  marginLeft: {
    marginLeft: 8,
  },
  messageWrapper: {
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
  },
});
