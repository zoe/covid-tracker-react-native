import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { DrawerActions } from '@react-navigation/native';
import Constants from 'expo-constants';
import React, { useState, useEffect } from 'react';
import { Alert, Image, Linking, StyleSheet, TouchableOpacity, View, SafeAreaView } from 'react-native';

import { closeIcon } from '@assets';
import i18n from '@covid/locale/i18n';
import UserService, { isGBCountry, isSECountry } from '@covid/core/user/UserService';
import Analytics, { events } from '@covid/core/Analytics';
import { CaptionText, HeaderText } from '@covid/components/Text';

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

export function DrawerMenu(props: DrawerContentComponentProps) {
  const userService = new UserService();

  const [userEmail, setUserEmail] = useState<string>('');

  useEffect(() => {
    userService.getProfile().then((currentProfile) => {
      setUserEmail(currentProfile.username);
    });
  });

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
            await userService.deleteRemoteUserData();
            logout();
          },
        },
      ],
      { cancelable: false }
    );
  }

  function logout() {
    userService.logout();
    props.navigation.reset({
      index: 0,
      routes: [{ name: 'Welcome' }],
    });
    props.navigation.dispatch(DrawerActions.closeDrawer());
  }

  function goToPrivacy() {
    isGBCountry()
      ? props.navigation.navigate('PrivacyPolicyUK', { viewOnly: true })
      : isSECountry()
      ? props.navigation.navigate('PrivacyPolicySV', { viewOnly: true })
      : props.navigation.navigate('PrivacyPolicyUS', { viewOnly: true });
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
            Linking.openURL(i18n.t('blog-link'));
          }}
        />
        <MenuItem
          label={i18n.t('faqs')}
          onPress={() => {
            Linking.openURL(i18n.t('faq-link'));
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
