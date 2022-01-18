import { notificationRemindersSE } from '@assets';
import { BrandedButton } from '@covid/components';
import { ExternalCallout } from '@covid/components/ExternalCallout';
import { Screen } from '@covid/components/Screen';
import { HeaderText, RegularText } from '@covid/components/Text';
import { assessmentCoordinator } from '@covid/core/assessment/AssessmentCoordinator';
import ExpoPushTokenEnvironment from '@covid/core/push-notifications/expo';
import PushNotificationService, { IPushTokenEnvironment } from '@covid/core/push-notifications/PushNotificationService';
import { AppRating, shouldAskForRating } from '@covid/features/thank-you/components/AppRating';
import { FacebookSECard } from '@covid/features/thank-you/components/FacebookSE';
import { ShareAppCard } from '@covid/features/thank-you/components/ShareApp';
import i18n from '@covid/locale/i18n';
import { TScreenParamList } from '@covid/routes/types';
import { sizes } from '@covid/themes';
import { RouteProp } from '@react-navigation/native';
import { colors, fontStyles } from '@theme';
import * as React from 'react';
import { StyleSheet } from 'react-native';

import VisitWebsite from './components/VisitWebsite';

interface IProps {
  route: RouteProp<TScreenParamList, 'ThankYouSE'>;
}

const pushService: IPushTokenEnvironment = new ExpoPushTokenEnvironment();

export default function ThankYouSEScreen({ route }: IProps) {
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
      <Screen backgroundColor={colors.backgroundSecondary} testID="thank-you-screen">
        <HeaderText style={styles.headerText}>{i18n.t('thank-you-title')}</HeaderText>

        <RegularText style={styles.subTitle}> {i18n.t('thank-you-body')}</RegularText>

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
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  done: {
    backgroundColor: colors.backgroundSecondary,
    borderColor: colors.tertiary,
    borderWidth: 1,
    marginTop: sizes.l,
  },
  headerText: {
    textAlign: 'center',
  },
  shareSubtitle: {
    ...fontStyles.bodySmallLight,
    color: colors.secondary,
    textAlign: 'center',
  },
  subTitle: {
    marginBottom: sizes.m,
    textAlign: 'center',
  },
});
