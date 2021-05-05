import { DrawerContentComponentProps } from '@react-navigation/drawer';
import React, { useEffect, useState } from 'react';
import { Image, SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

import { closeIcon } from '@assets';
import i18n from '@covid/locale/i18n';
import { IUserService } from '@covid/core/user/UserService';
import { CaptionText } from '@covid/components/Text';
import { useInjection } from '@covid/provider/services.hooks';
import { Services } from '@covid/provider/services.types';
import appCoordinator from '@covid/features/AppCoordinator';
import { ShareIcon, VaccineRegistryIcon } from '@assets/icons/navigation';
import { MenuItem } from '@covid/features/menu/DrawerMenuItem';
import { useLogout } from '@covid/features/menu/Logout.hooks';
import { LinksSection } from '@covid/features/menu/LinksSection';
import { IConsentService } from '@covid/core/consent/ConsentService';
import { share } from '@covid/components/cards/BaseShareApp';
import EditProfilesIcon from '@assets/icons/navigation/EditProfilesIcon';
import NavigatorService from '@covid/NavigatorService';
import { useConstants } from '@covid/utils/hooks';
import { selectUser } from '@covid/core/state/user';

const Constants = useConstants();

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
            <Image style={styles.closeIcon} source={closeIcon} />
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
            smallLabel={user.username}
            onPress={() => {
              logout();
            }}
          />
        </View>
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
    paddingBottom: 20,
  },
});
