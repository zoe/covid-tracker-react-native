import { notificationRemindersSE } from '@assets';
import { BrandedButton } from '@covid/components';
import { ExternalCallout } from '@covid/components/ExternalCallout';
import { Header } from '@covid/components/Screen';
import { HeaderText, RegularText } from '@covid/components/Text';
import { assessmentCoordinator } from '@covid/core/assessment/AssessmentCoordinator';
import ExpoPushTokenEnvironment from '@covid/core/push-notifications/expo';
import PushNotificationService, { IPushTokenEnvironment } from '@covid/core/push-notifications/PushNotificationService';
import { ScreenParamList } from '@covid/features';
import { AppRating, shouldAskForRating } from '@covid/features/thank-you/components/AppRating';
import { FacebookSECard } from '@covid/features/thank-you/components/FacebookSE';
import { ShareAppCard } from '@covid/features/thank-you/components/ShareApp';
import i18n from '@covid/locale/i18n';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors, fontStyles } from '@theme';
import * as React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';

import VisitWebsite from './components/VisitWebsite';

interface IProps {
  navigation: StackNavigationProp<ScreenParamList, 'ThankYouSE'>;
  route: RouteProp<ScreenParamList, 'ThankYouSE'>;
}

const pushService: IPushTokenEnvironment = new ExpoPushTokenEnvironment();

export default function ThankYouSEScreen({ navigation, route }: IProps) {
  const [askForRating, setAskForRating] = React.useState<boolean>(false);
  const [shouldShowReminders, setShouldShowReminders] = React.useState<boolean>(false);

  React.useEffect(() => {
    (async () => {
      try {
        const ratingAskResponse = await shouldAskForRating();
        setAskForRating(ratingAskResponse);

        const notificationsAllowed = await pushService.isGranted();
        setShouldShowReminders(!notificationsAllowed);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(`Ask for rating and / or push notifications service call failed with error: ${e}`);
      }
    })();
  }, []);

  return (
    <>
      {askForRating && <AppRating />}
      <SafeAreaView>
        <ScrollView contentContainerStyle={styles.scrollView} testID="scroll-view-thank-you-screen">
          <View style={styles.rootContainer}>
            <Header>
              <HeaderText style={styles.headerText}>{i18n.t('thank-you-title')}</HeaderText>
            </Header>

            <View>
              <RegularText style={styles.subTitle}> {i18n.t('thank-you-body')}</RegularText>
            </View>

            <FacebookSECard />

            {shouldShowReminders ? (
              <ExternalCallout
                aspectRatio={311.0 / 104.0}
                calloutID="notificationRemindersSE"
                imageSource={notificationRemindersSE}
                postClicked={() => {
                  PushNotificationService.openSettings();
                }}
                screenName={route.name}
              />
            ) : null}

            <ShareAppCard />
            <VisitWebsite />

            <RegularText style={styles.shareSubtitle}>{i18n.t('check-in-tomorrow')}</RegularText>

            <BrandedButton
              onPress={() => assessmentCoordinator.gotoNextScreen(route.name)}
              style={styles.done}
              testID="button-complete"
            >
              <RegularText>{i18n.t('thank-you-completed')}</RegularText>
            </BrandedButton>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  content: {
    marginHorizontal: 16,
    marginVertical: 32,
  },
  done: {
    backgroundColor: colors.backgroundSecondary,
    borderColor: colors.tertiary,
    borderWidth: 1,
    marginBottom: 20,
    marginHorizontal: 8,
    marginTop: 24,
  },
  headerText: {
    marginTop: 15,
    textAlign: 'center',
  },
  newsFeed: {
    color: colors.primary,
    fontSize: 20,
    paddingHorizontal: 40,
    paddingVertical: 20,
    textAlign: 'center',
  },
  newsFeedClickable: {
    color: colors.purple,
    fontSize: 20,
    textDecorationLine: 'underline',
  },
  rootContainer: {
    padding: 12,
  },
  scrollView: {
    backgroundColor: colors.backgroundSecondary,
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  shareSubtitle: {
    ...fontStyles.bodySmallLight,

    color: colors.secondary,
    paddingHorizontal: 16,
    textAlign: 'center',
  },
  socialIcon: {
    height: 60,
    marginLeft: 5,
    marginTop: 5,
    resizeMode: 'contain',
  },
  subTitle: {
    marginBottom: 15,
    marginHorizontal: 22,
    textAlign: 'center',
  },
});
