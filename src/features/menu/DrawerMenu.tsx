import { closeIcon } from '@assets';
import { ShareIcon, VaccineRegistryIcon } from '@assets/icons/navigation';
import EditProfilesIcon from '@assets/icons/navigation/EditProfilesIcon';
import { share } from '@covid/components/Cards/BaseShareApp';
import { CaptionText } from '@covid/components/Text';
import { IConsentService } from '@covid/core/consent/ConsentService';
import { selectUser } from '@covid/core/state/user';
import { IUserService } from '@covid/core/user/UserService';
import appCoordinator from '@covid/features/AppCoordinator';
import { MenuItem } from '@covid/features/menu/DrawerMenuItem';
import { LinksSection } from '@covid/features/menu/LinksSection';
import { useLogout } from '@covid/features/menu/Logout.hooks';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import { useInjection } from '@covid/provider/services.hooks';
import { Services } from '@covid/provider/services.types';
import Constants from '@covid/utils/Constants';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import React, { useEffect, useState } from 'react';
import { Image, SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

const isDevChannel = () => {
  return Constants.manifest.releaseChannel === '0-dev';
};

export const DrawerMenu: React.FC<DrawerContentComponentProps> = (props) => {
  const user = useSelector(selectUser);
  const userService = useInjection<IUserService>(Services.User);
  const consentService = useInjection<IConsentService>(Services.Consent);

  const [showVaccineRegistry, setShowVaccineRegistry] = useState<boolean>(false);
  const { logout } = useLogout(props.navigation);

  useEffect(() => {
    if (user.username !== '') return;
    fetchStudyStatus();
  }, [userService.hasUser]);

  const fetchStudyStatus = async () => {
    try {
      const data = await consentService.getStudyStatus();
      setShowVaccineRegistry(data.should_ask_uk_vaccine_register);
    } catch (_) {
      setShowVaccineRegistry(false);
    }
  };

  return (
    <SafeAreaView style={styles.drawerRoot}>
      <ScrollView style={styles.container}>
        <View style={styles.topBar}>
          <CaptionText>
            {`Version `}
            {Constants.manifest.revisionId ? Constants.manifest.revisionId : Constants.manifest.version}
            {isDevChannel() && ` (DEV)`}
          </CaptionText>
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <Image source={closeIcon} style={styles.closeIcon} />
          </TouchableOpacity>
        </View>

        <MenuItem
          image={<EditProfilesIcon />}
          label={i18n.t('nav-edit-profile')}
          onPress={() => {
            NavigatorService.navigate('SelectProfile', { assessmentFlow: false });
          }}
        />

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
            const shareMessage = i18n.t('share-this-app.message');
            share(shareMessage);
          }}
        />

        <LinksSection navigation={props.navigation} />

        <View style={{ marginBottom: 24, paddingBottom: 24 }}>
          <MenuItem
            label={i18n.t('logout')}
            onPress={() => {
              logout();
            }}
            smallLabel={user.username}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  closeIcon: {
    alignSelf: 'flex-end',
    height: 20,
    width: 20,
  },
  container: {
    flex: 1,
    padding: 24,
  },
  drawerIcon: {
    height: 24,
    marginEnd: 16,
    width: 24,
  },
  drawerRoot: {
    flex: 1,
  },
  topBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 20,
    paddingLeft: 8,
  },
});
