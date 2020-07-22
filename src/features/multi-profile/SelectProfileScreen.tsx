import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RouteProp } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';

import { NUMBER_OF_PROFILE_AVATARS } from '@assets';
import { colors } from '@theme';
import { LoadingModal } from '@covid/components/Loading';
import { Header } from '@covid/components/Screen';
import { HeaderText, SecondaryText } from '@covid/components/Text';
import i18n from '@covid/locale/i18n';
import { DrawerToggle } from '@covid/components/DrawerToggle';
import { DEFAULT_PROFILE } from '@covid/utils/avatar';
import { ProfileList } from '@covid/components/Collections/ProfileList';
import { ProfileCard } from '@covid/components/ProfileCard';

import { ScreenParamList } from '../ScreenParamList';
import appCoordinator from '../AppCoordinator';

import { useProfileList } from './ProfileList.hooks';

type RenderProps = {
  navigation: DrawerNavigationProp<ScreenParamList, 'SelectProfile'>;
  route: RouteProp<ScreenParamList, 'SelectProfile'>;
};

const SelectProfileScreen: React.FC<RenderProps> = ({ navigation }) => {
  const {
    status,
    error,
    isLoaded,
    isApiError,
    onRetry,
    profiles,
    listProfiles,
    profileSelected,
    retryListProfiles,
    setIsApiError,
  } = useProfileList(navigation);

  useEffect(() => {
    listProfiles();
  }, []);

  const profileListProps = {
    navigation,
    isApiError,
    error,
    status,
    isLoaded,
    profiles,
  };

  const getNextAvatarName = async (): Promise<string> => {
    if (profiles) {
      const n = (profiles.length + 1) % NUMBER_OF_PROFILE_AVATARS;
      return 'profile' + n.toString();
    } else {
      return DEFAULT_PROFILE;
    }
  };

  const gotoCreateProfile = async () => {
    appCoordinator.goToCreateProfile(await getNextAvatarName());
  };

  return (
    <View>
      <SafeAreaView>
        {isApiError && (
          <LoadingModal error={error} status={status} onRetry={onRetry} onPress={() => setIsApiError(false)} />
        )}
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.rootContainer}>
            <DrawerToggle navigation={navigation} style={{ tintColor: colors.primary }} />

            <Header>
              <HeaderText style={{ marginBottom: 12, paddingRight: 24 }}>{i18n.t('select-profile-title')}</HeaderText>
              <SecondaryText>{i18n.t('select-profile-text')}</SecondaryText>
            </Header>

            <ProfileList
              {...profileListProps}
              renderItem={(profile, i) => <ProfileCard profile={profile} index={i} />}
              addProfile={() => {
                gotoCreateProfile();
              }}
              onProfileSelected={(profileId, i) => {
                profileSelected(profileId, i);
              }}
              onRetry={() => {
                retryListProfiles();
              }}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default SelectProfileScreen;

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },

  rootContainer: {
    padding: 10,
  },
});
