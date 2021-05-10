import { Divider } from '@covid/components/Text';
import Analytics, { events } from '@covid/core/Analytics';
import { isGBCountry, isSECountry } from '@covid/core/localisation/LocalisationService';
import PushNotificationService from '@covid/core/push-notifications/PushNotificationService';
import { IUserService } from '@covid/core/user/UserService';
import { DrawerMenuItem, LinkItem } from '@covid/features/menu/DrawerMenuItem';
import { useLogout } from '@covid/features/menu/Logout.hooks';
import i18n from '@covid/locale/i18n';
import { useInjection } from '@covid/provider/services.hooks';
import { Services } from '@covid/provider/services.types';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import React from 'react';
import { Alert, StyleSheet } from 'react-native';

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
          style: 'cancel',
          text: i18n.t('cancel'),
        },
        {
          onPress: async () => {
            Analytics.track(events.DELETE_ACCOUNT_DATA);
            Analytics.track(events.CLICK_DRAWER_MENU_ITEM, {
              name: DrawerMenuItem.DELETE_MY_DATA,
            });
            await userService.deleteRemoteUserData();
            logout();
          },
          style: 'destructive',
          text: i18n.t('delete'),
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

      <LinkItem onPress={openPushNotificationSettings} type={DrawerMenuItem.TURN_ON_REMINDERS} />

      <LinkItem link={i18n.t('blog-link')} type={DrawerMenuItem.RESEARCH_UPDATE} />

      <LinkItem link={i18n.t('faq-link')} type={DrawerMenuItem.FAQ} />

      <LinkItem onPress={goToPrivacy} type={DrawerMenuItem.PRIVACY_POLICY} />

      <LinkItem onPress={showDeleteAlert} type={DrawerMenuItem.DELETE_MY_DATA} />

      <Divider styles={styles.divider} />
    </>
  );
};

const styles = StyleSheet.create({
  divider: {
    borderBottomWidth: 1,
    marginHorizontal: 0,
    marginVertical: 24,
  },
});
