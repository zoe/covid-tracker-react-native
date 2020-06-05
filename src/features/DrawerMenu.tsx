import { closeIcon } from '@assets';
import { CaptionText, HeaderText } from '@covid/components/Text';
import Analytics, { events } from '@covid/core/Analytics';
import UserService, { isGBCountry, isSECountry } from '@covid/core/user/UserService';
import i18n from '@covid/locale/i18n';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { DrawerActions } from '@react-navigation/native';
import Constants from 'expo-constants';
import React from 'react';
import { Alert, Image, Linking, StyleSheet, TouchableOpacity, View, SafeAreaView } from 'react-native';

const isDevChannel = () => {
  return Constants.manifest.releaseChannel === '0-dev';
};

export function DrawerMenu(props: DrawerContentComponentProps) {
  const userService = new UserService();

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

  return (
    <SafeAreaView style={styles.drawerRoot}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <Image style={styles.closeIcon} source={closeIcon} />
        </TouchableOpacity>
        <View style={{ height: 40 }} />
        <TouchableOpacity
          style={styles.iconNameRow}
          onPress={() => {
            Linking.openURL(i18n.t('blog-link'));
          }}>
          <HeaderText>{i18n.t('research-updates')}</HeaderText>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconNameRow}
          onPress={() => {
            Linking.openURL(i18n.t('faq-link'));
          }}>
          <HeaderText>{i18n.t('faqs')}</HeaderText>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconNameRow}
          onPress={() => {
            isGBCountry()
              ? props.navigation.navigate('PrivacyPolicyUK', { viewOnly: true })
              : isSECountry()
              ? props.navigation.navigate('PrivacyPolicySV', { viewOnly: true })
              : props.navigation.navigate('PrivacyPolicyUS', { viewOnly: true });
          }}>
          <HeaderText>{i18n.t('privacy-policy')}</HeaderText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconNameRow} onPress={() => showDeleteAlert()}>
          <HeaderText>{i18n.t('delete-my-data')}</HeaderText>
        </TouchableOpacity>
        <View style={{ flex: 1 }} />
        <TouchableOpacity style={styles.iconNameRow} onPress={() => logout()}>
          <HeaderText>{i18n.t('logout')}</HeaderText>
        </TouchableOpacity>
        <CaptionText style={[styles.versionText]}>
          {Constants.manifest.version}
          {Constants.manifest.revisionId && ` : ${Constants.manifest.revisionId}`}
          {isDevChannel() && ` (DEV)`}
        </CaptionText>
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
  versionText: {
    marginTop: 32,
    alignSelf: 'center',
  },
});
