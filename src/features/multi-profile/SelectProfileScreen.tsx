import { NUMBER_OF_PROFILE_AVATARS } from '@assets';
import { BackButton } from '@covid/components/PatientHeader';
import { Header } from '@covid/components/Screen';
import { HeaderText, SecondaryText } from '@covid/components/Text';
import { Coordinator, IEditableProfile, ISelectProfile } from '@covid/core/Coordinator';
import { ILocalisationService } from '@covid/core/localisation/LocalisationService';
import { Profile } from '@covid/core/profile/ProfileService';
import { ScreenParamList } from '@covid/features';
import i18n from '@covid/locale/i18n';
import { useInjection } from '@covid/provider/services.hooks';
import { Services } from '@covid/provider/services.types';
import { offlineService } from '@covid/Services';
import { DEFAULT_PROFILE } from '@covid/utils/avatar';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { colors } from '@theme';
import React, { useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';

import appCoordinator from '../AppCoordinator';
import { ProfileCard } from './components/ProfileCard';
import { ProfileList } from './components/ProfileList';
import { useProfileList } from './ProfileList.hooks';

type RenderProps = {
  navigation: NavigationProp<ScreenParamList, 'SelectProfile'>;
  route: RouteProp<ScreenParamList, 'SelectProfile'>;
};

export type SelectProfileCoordinator =
  | (Coordinator & ISelectProfile)
  | (Coordinator & ISelectProfile & IEditableProfile);

const SelectProfileScreen: React.FC<RenderProps> = ({ navigation, route }) => {
  const { status, error, isLoaded, isApiError, setIsApiError, setError, profiles, listProfiles, retryListProfiles } =
    useProfileList();
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
      return `profile${n.toString()}`;
    }
    return DEFAULT_PROFILE;
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

      // TODO Dont think this works properly
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
            addProfile={
              showCreateProfile
                ? () => {
                    gotoCreateProfile();
                  }
                : undefined
            }
            error={error}
            isApiError={isApiError}
            isLoaded={isLoaded}
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
            profiles={profiles}
            renderItem={(profile, i) => (
              <ProfileCard
                index={i}
                onEditPressed={
                  assessmentFlow
                    ? () => {
                        getPatientThen(profile, (profile) => {
                          (coordinator as IEditableProfile).startEditProfile(profile);
                        });
                      }
                    : undefined
                }
                profile={profile}
              />
            )}
            status={status}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SelectProfileScreen;

const styles = StyleSheet.create({
  menuToggle: {
    marginTop: 22,
    tintColor: colors.primary,
  },

  navContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 8,
  },

  rootContainer: {
    padding: 10,
  },

  scrollView: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
});
