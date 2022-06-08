import { shareAppV3 } from '@assets';
import { share } from '@covid/components/cards/BaseShareApp';
import { ExternalCallout } from '@covid/components/ExternalCallout';
import { PartnerLogoUSDash } from '@covid/components/logos/PartnerLogo';
import { PoweredByZoeSmall } from '@covid/components/logos/PoweredByZoe';
import { updateTodayDate } from '@covid/core/state/content/slice';
import { TRootState } from '@covid/core/state/root';
import { selectStartupInfo } from '@covid/core/state/selectors';
import { TStartupInfo } from '@covid/core/user/dto/UserAPIContracts';
import { appCoordinator } from '@covid/features/AppCoordinator';
import { CollapsibleHeaderScrollView } from '@covid/features/dashboard/components/CollapsibleHeaderScrollView';
import { CompactHeader } from '@covid/features/dashboard/components/CompactHeader';
import { ExpandedHeader } from '@covid/features/dashboard/components/ExpandedHeader';
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

  const dietStudyPlaybackReadyUS = React.useMemo(() => require('@assets/diet-playback-ready-us.png'), []);

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
    appCoordinator.goToDietStudy();
  }, []);

  return (
    <CollapsibleHeaderScrollView compactHeader={compactHeader} config={headerConfig} expandedHeader={expandedHeader}>
      <View style={styles.marginHorizontal}>
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
  dietStudyImage: {
    aspectRatio: 1200 / 1266,
    height: undefined,
    marginVertical: sizes.xs,
    resizeMode: 'contain',
    width: '100%',
  },
  marginHorizontal: {
    marginHorizontal: sizes.screenHorizontalPadding,
  },
  zoe: {
    marginBottom: sizes.xl,
  },
});
