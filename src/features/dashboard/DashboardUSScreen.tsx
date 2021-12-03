import { dietStudyPlaybackReadyUS, shareAppV3 } from '@assets';
import { share } from '@covid/components/cards/BaseShareApp';
import { ShareVaccineCard } from '@covid/components/cards/ShareVaccineCard';
import { ExternalCallout } from '@covid/components/ExternalCallout';
import { PartnerLogoUSDash } from '@covid/components/logos/PartnerLogo';
import { PoweredByZoeSmall } from '@covid/components/logos/PoweredByZoe';
import AnalyticsService, { events } from '@covid/core/Analytics';
import { updateTodayDate } from '@covid/core/state/contentSlice';
import { TRootState } from '@covid/core/state/root';
import { selectStartupInfo } from '@covid/core/state/selectors';
import { TStartupInfo } from '@covid/core/user/dto/UserAPIContracts';
import { appCoordinator } from '@covid/features/AppCoordinator';
import { CollapsibleHeaderScrollView } from '@covid/features/dashboard/CollapsibleHeaderScrollView';
import { CompactHeader } from '@covid/features/dashboard/CompactHeader';
import { ExpandedHeader } from '@covid/features/dashboard/ExpandedHeader';
import i18n from '@covid/locale/i18n';
import { TScreenParamList } from '@covid/routes/types';
import { pushNotificationService } from '@covid/services';
import { sizes } from '@covid/themes';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RouteProp } from '@react-navigation/native';
import * as React from 'react';
import { Image, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

const headerConfig = {
  compact: sizes.headerCompactHeight,
  expanded: sizes.headerExpandedHeight,
};

interface IProps {
  navigation: DrawerNavigationProp<TScreenParamList>;
  route: RouteProp<TScreenParamList, 'DashboardUS'>;
}

export function DashboardUSScreen({ route, navigation }: IProps) {
  const dispatch = useDispatch();
  const startupInfo = useSelector<TRootState, TStartupInfo | undefined>(selectStartupInfo);
  const [showDietStudyPlayback] = React.useState<boolean | undefined>(startupInfo?.show_diet_score);

  React.useEffect(() => {
    pushNotificationService.subscribeForPushNotifications();
  }, []);

  React.useEffect(() => {
    return navigation.addListener('focus', async () => {
      dispatch(updateTodayDate());
    });
  }, []);

  const onPressReport = React.useCallback(() => appCoordinator.gotoNextScreen(route.name), []);

  const onShare = React.useCallback(() => share(i18n.t('share-this-app.message')), []);

  const compactHeader = React.useMemo(() => <CompactHeader onPress={onPressReport} />, []);
  const expandedHeader = React.useMemo(() => <ExpandedHeader onPress={onPressReport} />, []);

  const onPressDietStudy = React.useCallback(() => {
    AnalyticsService.track(events.DIET_STUDY_PLAYBACK_CLICKED);
    appCoordinator.goToDietStudy();
  }, []);

  return (
    <CollapsibleHeaderScrollView compactHeader={compactHeader} config={headerConfig} expandedHeader={expandedHeader}>
      <View style={styles.calloutContainer}>
        <ShareVaccineCard screenName="DashboardUS" />

        {showDietStudyPlayback ? (
          <TouchableWithoutFeedback onPress={onPressDietStudy}>
            <Image source={dietStudyPlaybackReadyUS} style={styles.dietStudyImage} />
          </TouchableWithoutFeedback>
        ) : null}
        <ExternalCallout
          aspectRatio={311 / 135}
          calloutID="sharev3"
          imageSource={shareAppV3}
          postClicked={onShare}
          screenName={route.name}
        />
      </View>

      <View style={styles.zoe}>
        <PartnerLogoUSDash />
        <PoweredByZoeSmall />
      </View>
    </CollapsibleHeaderScrollView>
  );
}

const styles = StyleSheet.create({
  calloutContainer: {
    marginHorizontal: sizes.m,
  },
  dietStudyImage: {
    aspectRatio: 1200 / 1266,
    height: undefined,
    marginVertical: sizes.xs,
    resizeMode: 'contain',
    width: '100%',
  },
  schoolModuleContainer: {
    height: 200,
    marginBottom: sizes.xs,
    marginHorizontal: sizes.xl,
  },
  zoe: {
    marginBottom: sizes.xl,
  },
});
