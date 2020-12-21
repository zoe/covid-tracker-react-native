import { DrawerContentComponentProps } from '@react-navigation/drawer';
import React, { useState } from 'react';
import { Image, SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { closeIcon } from '@assets';
import i18n from '@covid/locale/i18n';
import { CaptionText } from '@covid/components/Text';
import { ShareIcon } from '@assets/icons/navigation';
import { MenuItem } from '@covid/features/menu/DrawerMenuItem';
import { useLogout } from '@covid/features/menu/Logout.hooks';
import { LinksSection } from '@covid/features/menu/LinksSection';
import { share } from '@covid/components/Cards/BaseShareApp';
import EditProfilesIcon from '@assets/icons/navigation/EditProfilesIcon';
import NavigatorService from '@covid/NavigatorService';
import { useConstants } from '@covid/utils/hooks';

const Constants = useConstants();

const isDevChannel = () => {
  return Constants.manifest.releaseChannel === '0-dev';
};

export const DrawerMenu: React.FC<DrawerContentComponentProps> = (props) => {
  const [userEmail, setUserEmail] = useState<string>('');

  const { logout } = useLogout(props.navigation);

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

        <MenuItem
          image={<ShareIcon />}
          label={i18n.t('nav-share-this-app')}
          onPress={() => {
            const shareMessage = i18n.t('share-this-app.message');
            share(shareMessage);
          }}
        />

        <LinksSection navigation={props.navigation} />

        <View style={{ flex: 1 }} />
        <MenuItem
          label={i18n.t('logout')}
          smallLabel={userEmail}
          onPress={() => {
            setUserEmail('');
            logout();
          }}
        />
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
