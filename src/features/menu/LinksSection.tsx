import React from 'react';
import { Alert, StyleSheet } from 'react-native';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';

import i18n from '@covid/locale/i18n';
import { IUserService } from '@covid/core/user/UserService';
import Analytics, { events } from '@covid/core/Analytics';
import { Divider } from '@covid/components/Text';
import { useInjection } from '@covid/provider/services.hooks';
import { Services } from '@covid/provider/services.types';
import PushNotificationService from '@covid/core/push-notifications/PushNotificationService';
import { isGBCountry, isSECountry } from '@covid/core/localisation/LocalisationService';
import { DrawerMenuItem, LinkItem } from '@covid/features/menu/DrawerMenuItem';
import { useLogout } from '@covid/features/menu/Logout.hooks';

export const LinksSection: React.FC<{ navigation: DrawerNavigationHelpers }> = ({ navigation }) => {
  const userService = useInjection<IUserService>(Services.User);
  const { logout } = useLogout(navigation);

  function goToPrivacy() {
    Analytics.track(events.CLICK_DRAWER_MENU_ITEM, {
      name: DrawerMenuItem.PRIVACY_POLICY,
    });
    isGBCountry()
      ? navigation.navigate('PrivacyPolicyUK', { viewOnly: true })
      : isSECountry()
      ? navigation.navigate('PrivacyPolicySV', { viewOnly: true })
      : navigation.navigate('PrivacyPolicyUS', { viewOnly: true });
  }

  function showDeleteAlert() {
    Alert.alert(
      i18n.t('delete-data-alert-title'),
      i18n.t('delete-data-alert-text'),
      [
        {
          text: i18n.t('cancel'),
          style: 'cancel',
        },
        {
          text: i18n.t('delete'),
          style: 'destructive',
          onPress: async () => {
            Analytics.track(events.DELETE_ACCOUNT_DATA);
            Analytics.track(events.CLICK_DRAWER_MENU_ITEM, {
              name: DrawerMenuItem.DELETE_MY_DATA,
            });
            await userService.deleteRemoteUserData();
            logout();
          },
        },
      ],
      { cancelable: false },
    );
  }

  async function openPushNotificationSettings() {
    Analytics.track(events.CLICK_DRAWER_MENU_ITEM, {
      name: DrawerMenuItem.TURN_ON_REMINDERS,
    });
    await PushNotificationService.openSettings();
  }

  return (
    <>
      <Divider styles={styles.divider} />

      <LinkItem type={DrawerMenuItem.TURN_ON_REMINDERS} onPress={openPushNotificationSettings} />

      <LinkItem type={DrawerMenuItem.RESEARCH_UPDATE} link={i18n.t('blog-link')} />

      <LinkItem type={DrawerMenuItem.FAQ} link={i18n.t('faq-link')} />

      <LinkItem type={DrawerMenuItem.PRIVACY_POLICY} onPress={goToPrivacy} />

      <LinkItem type={DrawerMenuItem.DELETE_MY_DATA} onPress={showDeleteAlert} />

      <Divider styles={styles.divider} />
    </>
  );
};

const styles = StyleSheet.create({
  divider: {
    marginHorizontal: 0,
    marginVertical: 24,
    borderBottomWidth: 1,
  },
});
