import { DrawerNavigationProp } from '@react-navigation/drawer';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import { NUMBER_OF_PROFILE_AVATARS } from '@assets';
import { colors } from '@theme';
import { Header } from '@covid/components/Screen';
import { HeaderText, SecondaryText } from '@covid/components/Text';
import i18n from '@covid/locale/i18n';
import { DEFAULT_PROFILE } from '@covid/utils/avatar';
import { Profile, ProfileList } from '@covid/components/Collections/ProfileList';
import { ProfileCard } from '@covid/components/ProfileCard';
import { offlineService } from '@covid/Services';
import { BackButton } from '@covid/components/PatientHeader';
import { Coordinator, IEditableProfile, ISelectProfile } from '@covid/core/Coordinator';
import { useInjection } from '@covid/provider/services.hooks';
import { ILocalisationService } from '@covid/core/localisation/LocalisationService';
import { Services } from '@covid/provider/services.types';

import { ScreenParamList } from '../ScreenParamList';
import appCoordinator from '../AppCoordinator';

import { useProfileList } from './ProfileList.hooks';

type RenderProps = {
  navigation: NavigationProp<ScreenParamList, 'SelectProfile'>;
  route: RouteProp<ScreenParamList, 'SelectProfile'>;
};

export type SelectProfileCoordinator =
  | (Coordinator & ISelectProfile)
  | (Coordinator & ISelectProfile & IEditableProfile);

const SelectProfileScreen: React.FC<RenderProps> = ({ navigation, route }) => {
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

  const { assessmentFlow } = route.params;
  const coordinator: SelectProfileCoordinator = appCoordinator;

  const localisationService = useInjection<ILocalisationService>(Services.Localisation);
  const showCreateProfile = localisationService.getConfig().enableMultiplePatients;

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
    (coordinator as IEditableProfile).goToCreateProfile(await getNextAvatarName());
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

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.rootContainer}>
          <View style={styles.navContainer}>{!!navigation && <BackButton navigation={navigation} />}</View>

          <Header>
            <HeaderText style={{ marginBottom: 12, paddingRight: 24 }}>
              {assessmentFlow ? i18n.t('select-profile-title-assessment') : i18n.t('select-profile-title-edit')}
            </HeaderText>
            {assessmentFlow && <SecondaryText>{i18n.t('select-profile-text')}</SecondaryText>}
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
                onEditPressed={
                  assessmentFlow
                    ? () => {
                        getPatientThen(profile, (profile) => {
                          (coordinator as IEditableProfile).startEditProfile(profile);
                        });
                      }
                    : undefined
                }
              />
            )}
            addProfile={
              showCreateProfile
                ? () => {
                    gotoCreateProfile();
                  }
                : undefined
            }
            onProfileSelected={(profile: Profile, i: number) => {
              getPatientThen(profile, (profile) => {
                if (assessmentFlow) {
                  coordinator.profileSelected(profile);
                } else {
                  (coordinator as IEditableProfile).startEditProfile(profile);
                }
              });
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
