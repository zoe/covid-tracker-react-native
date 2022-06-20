import { isGBCountry, isSECountry } from '@covid/core/localisation/LocalisationService';
import PushNotificationService from '@covid/core/push-notifications/PushNotificationService';
import { TRootState } from '@covid/core/state/root';
import { selectStartupInfo } from '@covid/core/state/selectors';
import { TStartupInfo } from '@covid/core/user/dto/UserAPIContracts';
import { userService } from '@covid/core/user/UserService';
import { LinkItem } from '@covid/features/menu/LinkItem';
import { useLogout } from '@covid/features/menu/useLogout';
import i18n from '@covid/locale/i18n';
import { sizes } from '@covid/themes';
import Analytics, { events } from '@health-study/analytics';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import { colors } from '@theme';
import * as React from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';

function openPushNotificationSettings() {
  PushNotificationService.openSettings();
}

type TProps = {
  navigation: DrawerNavigationHelpers;
};

export const LinksSection: React.FC<TProps> = (props: TProps) => {
  const logout = useLogout(props.navigation);
  const startupInfo = useSelector<TRootState, TStartupInfo | undefined>(selectStartupInfo);

  const goToPrivacy = React.useCallback(() => {
    if (isGBCountry()) {
      props.navigation.navigate('PrivacyPolicyUK', { viewOnly: true });
    } else if (isSECountry()) {
      props.navigation.navigate('PrivacyPolicySV', { viewOnly: true });
    } else {
      props.navigation.navigate('PrivacyPolicyUS', { viewOnly: true });
    }
  }, [props.navigation]);

  const goToTesting = React.useCallback(() => props.navigation.navigate('TestingMode'), [props.navigation]);

  const showDeleteAlert = React.useCallback(() => {
    Alert.alert(
      i18n.t('delete-data-alert-title'),
      i18n.t('delete-data-alert-text'),
      [
        {
          style: 'cancel',
          text: i18n.t('cancel'),
        },
        {
          onPress: async () => {
            Analytics.track(events.DELETE_ACCOUNT_DATA);
            await userService.deleteRemoteUserData();
            logout();
          },
          style: 'destructive',
          text: i18n.t('delete'),
        },
      ],
      { cancelable: false },
    );
  }, [logout]);

  return (
    <>
      <View style={styles.divider} />

      <LinkItem
        analyticsName="TURN_ON_REMINDERS"
        label={i18n.t('push-notifications')}
        onPress={openPushNotificationSettings}
      />

      <LinkItem analyticsName="RESEARCH_UPDATE" label={i18n.t('research-updates')} link={i18n.t('blog-link')} />

      <LinkItem analyticsName="FAQ" label={i18n.t('faqs')} link={i18n.t('faq-link')} />

      <LinkItem analyticsName="PRIVACY_POLICY" label={i18n.t('privacy-policy')} onPress={goToPrivacy} />

      <LinkItem analyticsName="DELETE_MY_DATA" label={i18n.t('delete-my-data')} onPress={showDeleteAlert} />

      {startupInfo?.is_tester ? (
        <LinkItem analyticsName="TESTING_MODE" label={i18n.t('testing-mode')} onPress={goToTesting} />
      ) : null}

      <View style={styles.divider} />
    </>
  );
};

const styles = StyleSheet.create({
  divider: {
    backgroundColor: colors.backgroundFour,
    height: 1,
    marginVertical: sizes.l,
    width: '100%',
  },
});
