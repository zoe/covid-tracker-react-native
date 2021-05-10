import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RouteProp } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import { PoweredByZoeSmall } from '@covid/components/Logos/PoweredByZoe';
import { CompactHeader, Header } from '@covid/features/dashboard/Header';
import { CollapsibleHeaderScrollView } from '@covid/features/dashboard/CollapsibleHeaderScrollView';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import appCoordinator from '@covid/features/AppCoordinator';
import { ExternalCallout } from '@covid/components/ExternalCallout';
import { share } from '@covid/components/Cards/BaseShareApp';
import { dietStudyPlaybackReadyUS, shareAppV3 } from '@assets';
import i18n from '@covid/locale/i18n';
import { useAppDispatch } from '@covid/core/state/store';
import { updateTodayDate } from '@covid/core/content/state/contentSlice';
import { pushNotificationService } from '@covid/Services';
import { PartnerLogoUSDash } from '@covid/components/Logos/PartnerLogo';
import { RootState } from '@covid/core/state/root';
import { StartupInfo } from '@covid/core/user/dto/UserAPIContracts';
import AnalyticsService, { events } from '@covid/core/Analytics';
import { ShareVaccineCard } from '@covid/components/Cards/ShareVaccineCard';

const HEADER_EXPANDED_HEIGHT = 328;
const HEADER_COLLAPSED_HEIGHT = 100;

interface IProps {
  navigation: DrawerNavigationProp<ScreenParamList>;
  route: RouteProp<ScreenParamList, 'DashboardUS'>;
}

export function DashboardUSScreen({ route, navigation }: IProps) {
  const dispatch = useAppDispatch();

  const startupInfo = useSelector<RootState, StartupInfo | undefined>((state) => state.content.startupInfo);
  const [showDietStudyPlayback] = useState<boolean | undefined>(startupInfo?.show_diet_score);

  const headerConfig = {
    compact: HEADER_COLLAPSED_HEIGHT,
    expanded: HEADER_EXPANDED_HEIGHT,
  };

  const onReport = async () => {
    await appCoordinator.gotoNextScreen(route.name);
  };

  const onShare = async () => {
    const shareMessage = i18n.t('share-this-app.message');
    await share(shareMessage);
  };

  useEffect(() => {
    (async () => {
      AnalyticsService.identify();
      await pushNotificationService.subscribeForPushNotifications();
    })();
  }, []);

  useEffect(() => {
    return navigation.addListener('focus', async () => {
      dispatch(updateTodayDate());
    });
  }, [navigation]);

  return (
    <CollapsibleHeaderScrollView
      config={headerConfig}
      navigation={navigation}
      compactHeader={<CompactHeader reportOnPress={onReport} />}
      expandedHeader={<Header reportOnPress={onReport} />}>
      <View style={styles.calloutContainer}>
        <ShareVaccineCard screenName="DashboardUS" />

        {showDietStudyPlayback ? (
          <TouchableWithoutFeedback
            onPress={() => {
              AnalyticsService.track(events.DIET_STUDY_PLAYBACK_CLICKED);
              appCoordinator.goToDietStudy();
            }}>
            <Image style={styles.dietStudyImage} source={dietStudyPlaybackReadyUS} />
          </TouchableWithoutFeedback>
        ) : null}
        <ExternalCallout
          calloutID="sharev3"
          imageSource={shareAppV3}
          aspectRatio={311 / 135}
          screenName={route.name}
          postClicked={onShare}
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
  schoolModuleContainer: {
    marginHorizontal: 32,
    marginBottom: 8,
    height: 200,
  },
  calloutContainer: {
    marginHorizontal: 16,
  },
  zoe: {
    marginBottom: 32,
  },
  dietStudyImage: {
    width: '100%',
    aspectRatio: 1200 / 1266,
    height: undefined,
    resizeMode: 'contain',
    marginVertical: 8,
  },
});
