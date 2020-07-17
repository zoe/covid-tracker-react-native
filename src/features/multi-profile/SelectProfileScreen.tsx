import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RouteProp, useLinkProps } from '@react-navigation/native';
import React, { Component, useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { isLoaded } from 'expo-font';

import { NUMBER_OF_PROFILE_AVATARS } from '@assets';
import { colors } from '@theme';
import { Loading, LoadingModal } from '@covid/components/Loading';
import { Header } from '@covid/components/Screen';
import { HeaderText, SecondaryText } from '@covid/components/Text';
import { ApiErrorState, initialErrorState, AppException } from '@covid/core/api/ApiServiceErrors';
import i18n from '@covid/locale/i18n';
import { offlineService } from '@covid/Services';
import { DrawerToggle } from '@covid/components/DrawerToggle';
import { ProfileCard } from '@covid/components/ProfileCard';
import { NewProfileCard } from '@covid/components/NewProfileCard';
import { DEFAULT_PROFILE } from '@covid/utils/avatar';
import { lazyInject } from '@covid/provider/services';
import { Services } from '@covid/provider/services.types';
import { ICoreService, IUserService } from '@covid/core/user/UserService';
import { useInjection } from '@covid/provider/services.hooks';

import { ScreenParamList } from '../ScreenParamList';
import appCoordinator from '../AppCoordinator';

type RenderProps = {
  navigation: DrawerNavigationProp<ScreenParamList, 'SelectProfile'>;
  route: RouteProp<ScreenParamList, 'SelectProfile'>;
};

export type Profile = {
  id: string;
  name?: string;
  avatar_name?: string;
  reported_by_another?: boolean;
  report_count?: number;
  last_reported_at?: Date;
  created_at?: Date;
};

type ProfileListState = {
  isLoaded: boolean;
  profiles: Profile[];
  shouldRefresh: boolean;
};

type State = ProfileListState & ApiErrorState;

const initialState = {
  ...initialErrorState,
  profiles: [],
  isLoaded: false,
  shouldRefresh: false,
};

const ProfileList: React.FC<
  ApiErrorState & {
    profiles: Profile[];
    isLoaded: boolean;
    addProfile?: VoidFunction;
    onProfileSelected: (profile: string, index: number) => void;
    navigation: DrawerNavigationProp<ScreenParamList, 'SelectProfile'>;
  }
> = ({ status, error, isLoaded, profiles, addProfile, onProfileSelected, onRetry }) => {
  if (!isLoaded) {
    return <Loading status={status} error={error} style={{ borderColor: 'green', borderWidth: 1 }} onRetry={onRetry} />;
  }

  return (
    <>
      <View style={styles.profileList}>
        {profiles.map((profile, i) => {
          return (
            <View style={styles.cardContainer} key={profile.id}>
              <TouchableOpacity onPress={() => onProfileSelected(profile.id, i)}>
                <ProfileCard profile={profile} index={i} />
              </TouchableOpacity>
            </View>
          );
        })}

        {addProfile && (
          <TouchableOpacity style={styles.cardContainer} key="new" onPress={addProfile}>
            <NewProfileCard />
          </TouchableOpacity>
        )}
      </View>
    </>
  );
};

export const useProfileList = (navigation: DrawerNavigationProp<ScreenParamList, 'SelectProfile'>) => {
  const userService = useInjection<ICoreService>(Services.User);

  const [shouldRefresh, setShouldRefresh] = useState<boolean>(false);
  const [status, setStatus] = useState<string>('');
  const [error, setError] = useState<AppException | null>(null);
  const [isApiError, setIsApiError] = useState<boolean>(false);

  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [onRetry, setOnRetry] = useState<any>(() => {});

  useEffect(() => {
    const fetch = async () => {
      navigation.addListener('focus', async () => {
        if (shouldRefresh) {
          await listProfiles();
        }
      });

      await listProfiles();

      setShouldRefresh(true);
    };
    fetch();
  }, []);

  const retryListProfiles = () => {
    setStatus(i18n.t('errors.status-retrying'));
    setError(null);
    setTimeout(() => listProfiles(), offlineService.getRetryDelay());
  };

  const listProfiles = async () => {
    setStatus(i18n.t('errors.status-loading'));
    setError(null);

    try {
      const profiles = await userService.listPatients();

      if (profiles) {
        setProfiles(profiles);
        setIsLoaded(true);
      }
    } catch (error) {
      setError(error);
    }
  };

  const profileSelected = async (profileId: string, index: number) => {
    try {
      const currentPatient = await userService.getPatientState(profileId);
      setIsApiError(false);
      await appCoordinator.profileSelected(index === 0, currentPatient);
    } catch (error) {
      setIsApiError(true);
      setError(error);

      setOnRetry(() => {
        setStatus(i18n.t('errors.status-retrying'));
        setError(null);

        setTimeout(() => {
          setStatus(i18n.t('errors.status-loading'));
          profileSelected(profileId, index);
        }, offlineService.getRetryDelay());
      });
    }
  };

  return {
    status,
    error,
    isApiError,
    isLoaded,
    onRetry,
    profiles,
    retryListProfiles,
    profileSelected,
    setIsApiError,
  };
};

const SelectProfileScreen: React.FC<RenderProps> = ({ navigation }) => {
  const {
    status,
    error,
    isLoaded,
    isApiError,
    onRetry,
    profiles,
    profileSelected,
    retryListProfiles,
    setIsApiError,
  } = useProfileList(navigation);

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
              navigation={navigation}
              isApiError={isApiError}
              error={error}
              status={status}
              isLoaded={isLoaded}
              profiles={profiles}
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
  profileList: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    width: '100%',
    alignContent: 'stretch',
  },

  cardContainer: {
    width: '45%',
    marginHorizontal: 8,
    marginVertical: 4,
  },

  scrollView: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },

  rootContainer: {
    padding: 10,
  },
});
