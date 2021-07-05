import { dietStudyPlaybackReadyUS, shareAppV3 } from '@assets';
import { share } from '@covid/components/cards/BaseShareApp';
import { ShareVaccineCard } from '@covid/components/cards/ShareVaccineCard';
import { ExternalCallout } from '@covid/components/ExternalCallout';
import { PartnerLogoUSDash } from '@covid/components/logos/PartnerLogo';
import { PoweredByZoeSmall } from '@covid/components/logos/PoweredByZoe';
import AnalyticsService, { events } from '@covid/core/Analytics';
import { updateTodayDate } from '@covid/core/content/state/contentSlice';
import { RootState } from '@covid/core/state/root';
import { useAppDispatch } from '@covid/core/state/store';
import { StartupInfo } from '@covid/core/user/dto/UserAPIContracts';
import { appCoordinator } from '@covid/features/AppCoordinator';
import { CollapsibleHeaderScrollView } from '@covid/features/dashboard/CollapsibleHeaderScrollView';
import { CompactHeader, Header } from '@covid/features/dashboard/Header';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import i18n from '@covid/locale/i18n';
import { pushNotificationService } from '@covid/services';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RouteProp } from '@react-navigation/native';
import * as React from 'react';
import { Image, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { useSelector } from 'react-redux';

const HEADER_EXPANDED_HEIGHT = 328;
const HEADER_COLLAPSED_HEIGHT = 100;

interface IProps {
  navigation: DrawerNavigationProp<ScreenParamList>;
  route: RouteProp<ScreenParamList, 'DashboardUS'>;
}

export function DashboardUSScreen({ route, navigation }: IProps) {
  const dispatch = useAppDispatch();

  const startupInfo = useSelector<RootState, StartupInfo | undefined>((state) => state.content.startupInfo);
  const [showDietStudyPlayback] = React.useState<boolean | undefined>(startupInfo?.show_diet_score);

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

  React.useEffect(() => {
    (async () => {
      await pushNotificationService.subscribeForPushNotifications();
    })();
  }, []);

  React.useEffect(() => {
    return navigation.addListener('focus', async () => {
      dispatch(updateTodayDate());
    });
  }, [navigation]);

  return (
    <CollapsibleHeaderScrollView
      compactHeader={<CompactHeader reportOnPress={onReport} />}
      config={headerConfig}
      expandedHeader={<Header reportOnPress={onReport} />}
      navigation={navigation}
    >
      <View style={styles.calloutContainer}>
        <ShareVaccineCard screenName="DashboardUS" />

        {showDietStudyPlayback ? (
          <TouchableWithoutFeedback
            onPress={() => {
              AnalyticsService.track(events.DIET_STUDY_PLAYBACK_CLICKED);
              appCoordinator.goToDietStudy();
            }}
          >
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
    marginHorizontal: 16,
  },
  dietStudyImage: {
    aspectRatio: 1200 / 1266,
    height: undefined,
    marginVertical: 8,
    resizeMode: 'contain',
    width: '100%',
  },
  schoolModuleContainer: {
    height: 200,
    marginBottom: 8,
    marginHorizontal: 32,
  },
  zoe: {
    marginBottom: 32,
  },
});
