import { ShareAppCardViral } from '@covid/components/cards/ShareAppViral';
import { ClickableText, HeaderText, RegularText } from '@covid/components/Text';
import { assessmentCoordinator } from '@covid/core/assessment/AssessmentCoordinator';
import { ScreenParamList } from '@covid/features';
import { AppRating, shouldAskForRating } from '@covid/features/thank-you/components/AppRating';
import i18n from '@covid/locale/i18n';
import { openWebLink } from '@covid/utils/links';
import { AntDesign } from '@expo/vector-icons';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors } from '@theme';
import * as React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

interface IProps {
  navigation: StackNavigationProp<ScreenParamList, 'ThankYouUS'>;
  route: RouteProp<ScreenParamList, 'ThankYouUS'>;
}

export default function ThankYouUSScreen({ navigation, route }: IProps) {
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
      <SafeAreaView>
        <ScrollView contentContainerStyle={styles.scrollView} testID="scroll-view-thank-you-screen">
          <View style={styles.rootContainer}>
            <AntDesign name="checkcircle" size={32} style={styles.checkIcon} />
            <HeaderText style={{ marginTop: 24, textAlign: 'center' }}>
              {i18n.t('thank-you.report-tomorrow')}
            </HeaderText>
            <Text style={styles.thankYou}>{i18n.t('thank-you.numbers')}</Text>

            <ShareAppCardViral />

            <RegularText style={styles.partnerContainer}>
              {i18n.t('thank-you.thank-you-for-joining')}{' '}
              <Text style={styles.partner}>Massachusetts General Hospital</Text>,{' '}
              <Text style={styles.partner}>Stanford University School of Medicine</Text> &{' '}
              <Text style={styles.partner}>King's College London</Text> {i18n.t('thank-you.to-help-communities')}
            </RegularText>

            <RegularText style={styles.visitWebsite}>
              {i18n.t('thank-you.visit-our')}{' '}
              <ClickableText onPress={() => openWebLink(i18n.t('blog-link'))}>
                {i18n.t('thank-you.website')}
              </ClickableText>{' '}
              {i18n.t('thank-you.to-see-discoveries')}
            </RegularText>

            <ClickableText
              onPress={() => {
                assessmentCoordinator.gotoNextScreen(route.name);
              }}
              style={styles.done}
              testID="button-complete"
            >
              {i18n.t('thank-you.done')}
            </ClickableText>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  checkIcon: {
    alignSelf: 'center',
    color: colors.feedbackExcellent,
  },

  done: {
    alignSelf: 'center',
    color: colors.brand,
    fontSize: 24,
    margin: 40,
  },

  partner: {
    fontFamily: 'SofiaPro-Bold',
    lineHeight: 24,
  },

  partnerContainer: {
    lineHeight: 24,
    marginHorizontal: 16,
    marginTop: 40,
    textAlign: 'center',
  },

  rootContainer: {
    marginTop: 16,
    padding: 16,
  },

  scrollView: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },

  thankYou: {
    color: colors.primary,
    fontFamily: 'SofiaPro-Light',
    fontSize: 16,
    lineHeight: 24,
    padding: 16,
    textAlign: 'center',
  },

  visitWebsite: {
    marginTop: 24,
    textAlign: 'center',
  },
});
