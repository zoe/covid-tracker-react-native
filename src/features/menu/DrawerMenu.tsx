import { DrawerContentComponentProps } from '@react-navigation/drawer';
import Constants from 'expo-constants';
import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, TouchableOpacity, View, SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { closeIcon } from '@assets';
import i18n from '@covid/locale/i18n';
import { IUserService } from '@covid/core/user/UserService';
import Analytics, { events } from '@covid/core/Analytics';
import { CaptionText } from '@covid/components/Text';
import PushNotificationService from '@covid/core/push-notifications/PushNotificationService';
import { useInjection } from '@covid/provider/services.hooks';
import { Services } from '@covid/provider/services.types';
import appCoordinator from '@covid/features/AppCoordinator';
import { MyStudyIcon, VaccineRegistryIcon, ShareIcon, EditProfilesIcon } from '@assets/icons/navigation';
import { MenuItem, DrawerMenuItem } from '@covid/features/menu/DrawerMenuItem';
import { useLogout } from '@covid/features/menu/Logout.hooks';
import { LinksSection } from '@covid/features/menu/LinksSection';

const isDevChannel = () => {
  return Constants.manifest.releaseChannel === '0-dev';
};

export const DrawerMenu: React.FC<DrawerContentComponentProps> = (props) => {
  const userService = useInjection<IUserService>(Services.User);
  const [userEmail, setUserEmail] = useState<string>('');
  const [showDietStudy, setShowDietStudy] = useState<boolean>(false);
  const [showVaccineRegistry, setShowVaccineRegistry] = useState<boolean>(false);
  const { logout } = useLogout(props.navigation);

  useEffect(() => {
    if (userEmail !== '') return;
    fetchEmail();
    fetchShouldShowVaccine();
    fetchShouldShowDietStudy();
  }, [userService.hasUser, setUserEmail]);

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

  const fetchShouldShowDietStudy = async () => {
    try {
      const showDietStudy = await appCoordinator.shouldShowStudiesMenu();
      setShowDietStudy(showDietStudy);
    } catch (_) {
      setShowDietStudy(false);
    }
  };

  function openDietStudy() {
    appCoordinator.goToDietStart();
  }

  return (
    <SafeAreaView style={styles.drawerRoot}>
      <ScrollView style={styles.container}>
        <View style={styles.topBar}>
          <CaptionText>
            {Constants.manifest.revisionId ? Constants.manifest.revisionId : Constants.manifest.version}
            {isDevChannel() && ` (DEV)`}
          </CaptionText>
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <Image style={styles.closeIcon} source={closeIcon} />
          </TouchableOpacity>
        </View>

        {showDietStudy && (
          <MenuItem
            image={<MyStudyIcon />}
            label={i18n.t('diet-study.drawer-menu-item')}
            onPress={() => {
              openDietStudy();
            }}
          />
        )}

        <MenuItem image={<EditProfilesIcon />} label={i18n.t('nav-edit-profile')} onPress={() => {}} />

        {showVaccineRegistry && (
          <MenuItem
            image={<VaccineRegistryIcon />}
            label={i18n.t('vaccine-registry.menu-item')}
            onPress={() => {
              appCoordinator.goToVaccineRegistry();
            }}
          />
        )}

        <MenuItem
          image={<ShareIcon />}
          label={i18n.t('nav-share-this-app')}
          onPress={() => {
            appCoordinator.goToVaccineRegistry();
          }}
        />

        <LinksSection navigation={props.navigation} />

        <View style={{ flex: 1 }} />
        <MenuItem
          label={i18n.t('logout')}
          onPress={() => {
            setUserEmail('');
            logout();
          }}
        />
        <CaptionText style={styles.versionText}>{userEmail}</CaptionText>
      </ScrollView>
    </SafeAreaView>
  );
};

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
