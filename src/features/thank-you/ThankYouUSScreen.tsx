import Check from '@assets/icons/Check';
import { ShareAppCardViral } from '@covid/components/cards/ShareAppViral';
import { Screen } from '@covid/components/Screen';
import { ClickableText, HeaderText, RegularText } from '@covid/components/Text';
import { assessmentCoordinator } from '@covid/core/assessment/AssessmentCoordinator';
import { AppRating, shouldAskForRating } from '@covid/features/thank-you/components/AppRating';
import i18n from '@covid/locale/i18n';
import { TScreenParamList } from '@covid/routes/types';
import { sizes, styling } from '@covid/themes';
import { openWebLink } from '@covid/utils/links';
import { RouteProp } from '@react-navigation/native';
import { colors } from '@theme';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface IProps {
  route: RouteProp<TScreenParamList, 'ThankYouUS'>;
}

export default function ThankYouUSScreen({ route }: IProps) {
  const [askForRating, setAskForRating] = React.useState<boolean>(false);

  React.useEffect(() => {
    (async () => {
      try {
        const ratingAskResponse = await shouldAskForRating();
        setAskForRating(ratingAskResponse);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(`Ask for rating call failed with error: ${e}`);
      }
    })();
  }, []);

  return (
    <>
      {askForRating && <AppRating />}
      <Screen backgroundColor={colors.backgroundSecondary} testID="thank-you-screen">
        <View style={styles.checkWrapper}>
          <Check color="white" />
        </View>

        <HeaderText style={{ marginTop: sizes.l, textAlign: 'center' }}>
          {i18n.t('thank-you.report-tomorrow')}
        </HeaderText>

        <Text style={styles.thankYou}>{i18n.t('thank-you.numbers')}</Text>

        <ShareAppCardViral />

        <RegularText style={styles.partnerContainer}>
          {i18n.t('thank-you.thank-you-for-joining')} <Text style={styles.partner}>Massachusetts General Hospital</Text>
          , <Text style={styles.partner}>Stanford University School of Medicine</Text> &{' '}
          <Text style={styles.partner}>King's College London</Text> {i18n.t('thank-you.to-help-communities')}
        </RegularText>

        <RegularText style={styles.visitWebsite}>
          {i18n.t('thank-you.visit-our')}{' '}
          <ClickableText onPress={() => openWebLink(i18n.t('blog-link'))}>{i18n.t('thank-you.website')}</ClickableText>{' '}
          {i18n.t('thank-you.to-see-discoveries')}
        </RegularText>

        <View style={styling.flex} />

        <ClickableText
          onPress={() => assessmentCoordinator.gotoNextScreen(route.name)}
          style={styles.done}
          testID="button-complete"
        >
          {i18n.t('thank-you.done')}
        </ClickableText>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  checkWrapper: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: colors.feedbackExcellent,
    borderRadius: 16,
    height: 32,
    justifyContent: 'center',
    width: 32,
  },
  done: {
    alignSelf: 'center',
    color: colors.brand,
    fontSize: 24,
    marginTop: sizes.xl,
  },
  partner: {
    fontFamily: 'SofiaPro-Bold',
    lineHeight: 24,
  },
  partnerContainer: {
    lineHeight: 24,
    marginTop: sizes.xl,
    textAlign: 'center',
  },
  thankYou: {
    color: colors.primary,
    fontFamily: 'SofiaPro-Light',
    fontSize: 16,
    lineHeight: 24,
    paddingVertical: sizes.m,
    textAlign: 'center',
  },
  visitWebsite: {
    marginTop: sizes.l,
    textAlign: 'center',
  },
});
