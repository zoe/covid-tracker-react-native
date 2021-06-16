import { BrandedButton, FeaturedContentList, FeaturedContentType } from '@covid/components';
import { Header } from '@covid/components/Screen';
import { ClickableText, HeaderText, RegularText } from '@covid/components/Text';
import Analytics, { events } from '@covid/core/Analytics';
import assessmentCoordinator from '@covid/core/assessment/AssessmentCoordinator';
import { RootState } from '@covid/core/state/root';
import { StartupInfo } from '@covid/core/user/dto/UserAPIContracts';
import { ImpactTimelineCard } from '@covid/features/anniversary';
import appCoordinator from '@covid/features/AppCoordinator';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import { AppRating, shouldAskForRating } from '@covid/features/thank-you/components/AppRating';
import { ShareAppCard } from '@covid/features/thank-you/components/ShareApp';
import i18n from '@covid/locale/i18n';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors } from '@theme';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';

import { BigGreenTickFilled } from './components/BigGreenTick';

interface IProps {
  navigation: StackNavigationProp<ScreenParamList, 'ThankYouUK'>;
  route: RouteProp<ScreenParamList, 'ThankYouUK'>;
}

export default function ThankYouUKScreen({ navigation, route }: IProps) {
  const startupInfo = useSelector<RootState, StartupInfo | undefined>((state) => state.content.startupInfo);
  const [askForRating, setAskForRating] = useState<boolean>(false);

  useEffect(() => {
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
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.rootContainer}>
            <View style={{ marginTop: 24 }}>
              <BigGreenTickFilled />
            </View>

            <Header>
              <HeaderText style={styles.headerText}>{i18n.t('thank-you-uk.title')}</HeaderText>
            </Header>

            <RegularText style={styles.signOff}>{i18n.t('thank-you-uk.sign-off')}</RegularText>

            <FeaturedContentList screenName={route.name} type={FeaturedContentType.ThankYou} />

            {startupInfo?.show_timeline ? (
              <ImpactTimelineCard
                onPress={() => {
                  Analytics.track(events.ANNIVERSARY_FROM_THANKYOU);
                  appCoordinator.goToAnniversary();
                }}
                size="LARGE"
              />
            ) : null}

            <View style={{ margin: 6 }} />

            <ShareAppCard />

            <BrandedButton
              onPress={() => assessmentCoordinator.gotoNextScreen(route.name)}
              style={styles.ctaSingleProfile}
            >
              <RegularText style={styles.ctaSingleProfileText}>{i18n.t('thank-you-uk.cta-single-profile')}</RegularText>
            </BrandedButton>

            <View style={styles.ctaMultipleProfile}>
              <ClickableText
                onPress={() => assessmentCoordinator.gotoSelectProfile()}
                style={styles.ctaMultipleProfileText}
              >
                {i18n.t('thank-you-uk.cta-multi-profile')}
              </ClickableText>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  ctaMultipleProfile: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 24,
    paddingTop: 15,
  },
  ctaMultipleProfileText: {
    color: colors.purple,
  },
  ctaSingleProfile: {
    backgroundColor: colors.backgroundSecondary,
    borderColor: colors.brand,
    borderWidth: 1,
    marginVertical: 20,
    paddingTop: 8,
  },
  ctaSingleProfileText: {
    color: colors.brand,
  },
  dateLabel: {
    marginBottom: 8,
    marginTop: -16,
    textAlign: 'center',
  },
  dietStudyImage: {
    aspectRatio: 1200 / 1266,
    height: undefined,
    marginVertical: 8,
    resizeMode: 'contain',
    width: '100%',
  },
  headerText: {
    textAlign: 'center',
  },
  rootContainer: {
    maxWidth: 500,
    padding: 16,
  },
  scrollView: {
    backgroundColor: colors.backgroundSecondary,
    flexGrow: 1,
  },
  signOff: {
    marginBottom: 16,
    marginHorizontal: 16,
    textAlign: 'center',
  },
  socialIcon: {
    aspectRatio: 1,
    height: undefined,
    resizeMode: 'contain',
    width: '100%',
  },
  socialIconContainer: {
    alignSelf: 'center',
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: -10,
  },
  subTitle: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
