import { BrandedButton, EFeaturedContentType, FeaturedContentList } from '@covid/components';
import { Screen } from '@covid/components/Screen';
import { ClickableText, HeaderText, RegularText } from '@covid/components/Text';
import Analytics, { events } from '@covid/core/Analytics';
import { assessmentCoordinator } from '@covid/core/assessment/AssessmentCoordinator';
import { appActions } from '@covid/core/state/app/slice';
import { TRootState } from '@covid/core/state/root';
import { selectStartupInfo } from '@covid/core/state/selectors';
import { TStartupInfo } from '@covid/core/user/dto/UserAPIContracts';
import { ImpactTimelineCard } from '@covid/features/anniversary';
import { appCoordinator } from '@covid/features/AppCoordinator';
import { AppRating, shouldAskForRating } from '@covid/features/thank-you/components/AppRating';
import { ShareAppCard } from '@covid/features/thank-you/components/ShareApp';
import i18n from '@covid/locale/i18n';
import { TScreenParamList } from '@covid/routes/types';
import { sizes } from '@covid/themes';
import { RouteProp } from '@react-navigation/native';
import { colors } from '@theme';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { BigGreenTickFilled } from './components/BigGreenTick';

interface IProps {
  route: RouteProp<TScreenParamList, 'ThankYouUK'>;
}

export default function ThankYouUKScreen(props: IProps) {
  const dispatch = useDispatch();
  const startupInfo = useSelector<TRootState, TStartupInfo | undefined>(selectStartupInfo);
  const [askForRating, setAskForRating] = React.useState<boolean>(false);

  React.useEffect(() => {
    (async () => {
      if (startupInfo?.show_modal === 'mental-health-playback') {
        dispatch(appActions.setModalMentalHealthPlaybackVisible(true));
        return;
      }
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
        <BigGreenTickFilled />

        <HeaderText style={styles.headerText}>{i18n.t('thank-you-uk.title')}</HeaderText>

        <RegularText style={styles.signOff}>{i18n.t('thank-you-uk.sign-off')}</RegularText>

        <FeaturedContentList screenName={props.route.name} type={EFeaturedContentType.ThankYou} />

        {startupInfo?.show_timeline ? (
          <ImpactTimelineCard
            onPress={() => {
              Analytics.track(events.ANNIVERSARY_FROM_THANKYOU);
              appCoordinator.goToAnniversary();
            }}
            size="LARGE"
          />
        ) : null}

        <ShareAppCard />

        <BrandedButton
          onPress={() => assessmentCoordinator.gotoNextScreen(props.route.name)}
          style={styles.ctaSingleProfile}
          testID="button-complete"
        >
          <RegularText style={styles.ctaSingleProfileText}>{i18n.t('thank-you-uk.cta-single-profile')}</RegularText>
        </BrandedButton>

        <ClickableText onPress={() => assessmentCoordinator.gotoSelectProfile()} style={styles.ctaMultipleProfileText}>
          {i18n.t('thank-you-uk.cta-multi-profile')}
        </ClickableText>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  ctaMultipleProfileText: {
    alignSelf: 'center',
    color: colors.purple,
  },
  ctaSingleProfile: {
    backgroundColor: colors.backgroundSecondary,
    borderColor: colors.brand,
    borderWidth: 1,
    marginVertical: sizes.l,
    paddingTop: sizes.xs,
  },
  ctaSingleProfileText: {
    color: colors.brand,
  },
  headerText: {
    marginTop: sizes.xl,
    textAlign: 'center',
  },
  signOff: {
    marginBottom: sizes.xl,
    marginTop: sizes.m,
    textAlign: 'center',
  },
});
