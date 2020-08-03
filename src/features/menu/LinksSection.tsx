import React from 'react';
import { Alert, StyleSheet } from 'react-native';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';

import i18n from '@covid/locale/i18n';
import { isGBCountry, isSECountry, IUserService } from '@covid/core/user/UserService';
import Analytics, { events } from '@covid/core/Analytics';
import { Divider } from '@covid/components/Text';
import { useInjection } from '@covid/provider/services.hooks';
import { Services } from '@covid/provider/services.types';

import { DrawerMenuItem, LinkItem } from './DrawerMenuItem';
import { useLogout } from './Logout.hooks';

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
      { cancelable: false }
    );
  }

  return <React.Fragment>
    <Divider styles={styles.divider} />

    <LinkItem
      type={DrawerMenuItem.RESEARCH_UPDATE}
      link={i18n.t('blog-link')}
    />

    <LinkItem
      type={DrawerMenuItem.FAQ}
      link={i18n.t('faq-link')}
    />

    <LinkItem
      type={DrawerMenuItem.PRIVACY_POLICY}
      onPress={() => goToPrivacy()} />

    <LinkItem
      type={DrawerMenuItem.DELETE_MY_DATA}
      onPress={() => showDeleteAlert()} />

    <Divider styles={styles.divider} />
  </React.Fragment>
}

const styles = StyleSheet.create({
  divider: {
    marginHorizontal: 0,
    marginVertical: 24,
    borderBottomWidth: 1
  }
});
