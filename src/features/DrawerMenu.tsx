import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { DrawerActions } from '@react-navigation/native';
import Constants from 'expo-constants';
import React, { useState, useEffect } from 'react';
import { Alert, Image, Linking, StyleSheet, TouchableOpacity, View, SafeAreaView } from 'react-native';

import { closeIcon } from '@assets';
import i18n from '@covid/locale/i18n';
import { isGBCountry, isSECountry, IUserService } from '@covid/core/user/UserService';
import Analytics, { events } from '@covid/core/Analytics';
import { CaptionText, HeaderText } from '@covid/components/Text';
import PushNotificationService from '@covid/core/push-notifications/PushNotificationService';
import { useInjection } from '@covid/provider/services.hooks';
import { Services } from '@covid/provider/services.types';
import appCoordinator from '@covid/features/AppCoordinator';

type MenuItemProps = {
  label: string;
  onPress: () => void;
};

const isDevChannel = () => {
  return Constants.manifest.releaseChannel === '0-dev';
};

const MenuItem = (props: MenuItemProps) => {
  return (
    <TouchableOpacity style={styles.iconNameRow} onPress={props.onPress}>
      <HeaderText>{props.label}</HeaderText>
    </TouchableOpacity>
  );
};

enum DrawerMenuItem {
  RESEARCH_UPDATE = 'RESEARCH_UPDATE',
  TURN_ON_REMINDERS = 'TURN_ON_REMINDERS',
  FAQ = 'FAQ',
  PRIVACY_POLICY = 'PRIVACY_POLICY',
  DELETE_MY_DATA = 'DELETE_MY_DATA',
  LOGOUT = 'LOGOUT',
}

export function DrawerMenu(props: DrawerContentComponentProps) {
  const userService = useInjection<IUserService>(Services.User);
  const [userEmail, setUserEmail] = useState<string>('');
  const [showVaccineRegistry, setShowVaccineRegistry] = useState<boolean>(false);

  const fetchEmail = async () => {
    try {
      const profile = await userService.getProfile();
      setUserEmail(profile?.username ?? '');
    } catch (_) {
      setUserEmail('');
    }
  };

  const fetchShouldShowVaccine = async () => {
    try {
      const shouldAskForVaccineRegistry = await userService.shouldAskForVaccineRegistry();
      setShowVaccineRegistry(shouldAskForVaccineRegistry);
    } catch (_) {
      setShowVaccineRegistry(false);
    }
  };

  useEffect(() => {
    if (userEmail !== '') return;
    fetchEmail();
    fetchShouldShowVaccine();
  }, [userService.hasUser]);

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

  function logout() {
    Analytics.track(events.CLICK_DRAWER_MENU_ITEM, {
      name: DrawerMenuItem.LOGOUT,
    });
    setUserEmail(''); // Reset email
    userService.logout();
    props.navigation.reset({
      index: 0,
      routes: [{ name: 'Welcome' }],
    });
    props.navigation.dispatch(DrawerActions.closeDrawer());
  }

  function goToPrivacy() {
    Analytics.track(events.CLICK_DRAWER_MENU_ITEM, {
      name: DrawerMenuItem.PRIVACY_POLICY,
    });
    isGBCountry()
      ? props.navigation.navigate('PrivacyPolicyUK', { viewOnly: true })
      : isSECountry()
      ? props.navigation.navigate('PrivacyPolicySV', { viewOnly: true })
      : props.navigation.navigate('PrivacyPolicyUS', { viewOnly: true });
  }

  function showResearchUpdates() {
    Analytics.track(events.CLICK_DRAWER_MENU_ITEM, {
      name: DrawerMenuItem.RESEARCH_UPDATE,
    });
    Linking.openURL(i18n.t('blog-link'));
  }

  function openFAQ() {
    Analytics.track(events.CLICK_DRAWER_MENU_ITEM, {
      name: DrawerMenuItem.FAQ,
    });
    Linking.openURL(i18n.t('faq-link'));
  }

  async function openPushNoticationSettings() {
    Analytics.track(events.CLICK_DRAWER_MENU_ITEM, {
      name: DrawerMenuItem.TURN_ON_REMINDERS,
    });
    await PushNotificationService.openSettings();
  }

  return (
    <SafeAreaView style={styles.drawerRoot}>
      <View style={styles.container}>
        <View style={styles.topBar}>
          <CaptionText>
            {Constants.manifest.revisionId ? Constants.manifest.revisionId : Constants.manifest.version}
            {isDevChannel() && ` (DEV)`}
          </CaptionText>
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <Image style={styles.closeIcon} source={closeIcon} />
          </TouchableOpacity>
        </View>
        <MenuItem
          label={i18n.t('research-updates')}
          onPress={() => {
            showResearchUpdates();
          }}
        />
        {showVaccineRegistry && (
          <MenuItem
            label={i18n.t('vaccine-registry.menu-item')}
            onPress={() => {
              appCoordinator.goToVaccineRegistry();
            }}
          />
        )}

        <MenuItem
          label={i18n.t('push-notifications')}
          onPress={() => {
            openPushNoticationSettings();
          }}
        />
        <MenuItem
          label={i18n.t('faqs')}
          onPress={() => {
            openFAQ();
          }}
        />
        <MenuItem label={i18n.t('privacy-policy')} onPress={() => goToPrivacy()} />
        <MenuItem label={i18n.t('delete-my-data')} onPress={() => showDeleteAlert()} />
        <View style={{ flex: 1 }} />
        <MenuItem label={i18n.t('logout')} onPress={() => logout()} />
        <CaptionText style={styles.versionText}>{userEmail}</CaptionText>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  drawerRoot: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 24,
  },
  closeIcon: {
    height: 20,
    width: 20,
    alignSelf: 'flex-end',
  },
  iconNameRow: {
    marginStart: 8,
    marginTop: 32,
    flexDirection: 'row',
  },
  drawerIcon: {
    height: 24,
    width: 24,
    marginEnd: 16,
  },
  topBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 8,
  },
  versionText: {
    marginTop: 8,
    paddingLeft: 8,
  },
});
