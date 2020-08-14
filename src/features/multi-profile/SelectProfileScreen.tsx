import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RouteProp } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import { NUMBER_OF_PROFILE_AVATARS } from '@assets';
import { colors } from '@theme';
import { Header } from '@covid/components/Screen';
import { HeaderText, SecondaryText } from '@covid/components/Text';
import i18n from '@covid/locale/i18n';
import { DrawerToggle } from '@covid/components/DrawerToggle';
import { DEFAULT_PROFILE } from '@covid/utils/avatar';
import { Profile, ProfileList } from '@covid/components/Collections/ProfileList';
import { ProfileCard } from '@covid/components/ProfileCard';
import { offlineService } from '@covid/Services';
import { BackButton } from '@covid/components/PatientHeader';

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
    setIsApiError,
    setError,
    profiles,
    listProfiles,
    retryListProfiles,
  } = useProfileList();

  useEffect(() => {
    return navigation.addListener('focus', listProfiles);
  }, [navigation]);

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

  const getPatientThen = async (profile: Profile, callback: (patient: Profile) => void) => {
    try {
      callback(profile);
    } catch (error) {
      setIsApiError(true);
      setError(error);

      //TODO Dont think this works properly
      setTimeout(() => {
        callback(profile);
      }, offlineService.getRetryDelay());
    }
  };

  // @ts-ignore
  const stackNav: StackNavigationProp<ScreenParamList> = navigation;

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.rootContainer}>
          <View style={styles.navContainer}>
            {!!navigation && <BackButton navigation={stackNav} />}
            <DrawerToggle navigation={navigation} style={styles.menuToggle} />
          </View>

          <Header>
            <HeaderText style={{ marginBottom: 12, paddingRight: 24 }}>{i18n.t('select-profile-title')}</HeaderText>
            <SecondaryText>{i18n.t('select-profile-text')}</SecondaryText>
          </Header>

          <ProfileList
            isApiError={isApiError}
            error={error}
            status={status}
            isLoaded={isLoaded}
            profiles={profiles}
            renderItem={(profile, i) => (
              <ProfileCard
                profile={profile}
                onEditPressed={() => getPatientThen(profile, (profile) => appCoordinator.startEditProfile(profile))}
              />
            )}
            addProfile={() => {
              gotoCreateProfile();
            }}
            onProfileSelected={(profile, i) => {
              getPatientThen(profile, (profile) => appCoordinator.profileSelected(profile));
            }}
            onRetry={() => retryListProfiles()}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
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

  navContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 8,
  },

  menuToggle: {
    tintColor: colors.primary,
    marginTop: 22,
  },
});
