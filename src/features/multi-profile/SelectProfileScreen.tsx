import { NUMBER_OF_PROFILE_AVATARS } from '@assets';
import { BackButton } from '@covid/components/PatientHeader';
import { Header } from '@covid/components/Screen';
import { HeaderText, SecondaryText } from '@covid/components/Text';
import { Coordinator, IEditableProfile, ISelectProfile } from '@covid/core/Coordinator';
import { ILocalisationService } from '@covid/core/localisation/LocalisationService';
import { Profile } from '@covid/core/profile/ProfileService';
import { ScreenParamList } from '@covid/features';
import appCoordinator from '@covid/features/AppCoordinator';
import i18n from '@covid/locale/i18n';
import { useInjection } from '@covid/provider/services.hooks';
import { Services } from '@covid/provider/services.types';
import { offlineService } from '@covid/Services';
import { styling } from '@covid/themes';
import { DEFAULT_PROFILE } from '@covid/utils/avatar';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { colors } from '@theme';
import React, { useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';

import { ProfileCard } from './components/ProfileCard';
import { ProfileList } from './components/ProfileList';
import { useProfileList } from './ProfileList.hooks';

type TProps = {
  navigation: NavigationProp<ScreenParamList, 'SelectProfile'>;
  route: RouteProp<ScreenParamList, 'SelectProfile'>;
};

export type SelectProfileCoordinator =
  | (Coordinator & ISelectProfile)
  | (Coordinator & ISelectProfile & IEditableProfile);

export default function SelectProfileScreen({ navigation, route }: TProps) {
  const { status, error, isLoaded, isApiError, setIsApiError, setError, profiles, listProfiles, retryListProfiles } =
    useProfileList();
  const { assessmentFlow } = route.params;
  const coordinator: SelectProfileCoordinator = appCoordinator;
  const localisationService = useInjection<ILocalisationService>(Services.Localisation);
  const showCreateProfile = localisationService.getConfig()?.enableMultiplePatients;

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

  function onProfileSelected(profile: Profile) {
    getPatientThen(profile, (profile) => {
      if (assessmentFlow) {
        coordinator.profileSelected(profile);
      } else {
        (coordinator as IEditableProfile).startEditProfile(profile);
      }
    });
  }

  return (
    <SafeAreaView style={styling.flex}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.rootContainer}>
          <View style={styles.navContainer}>{navigation ? <BackButton navigation={navigation} /> : null}</View>

          <Header>
            <HeaderText style={styles.headerText}>
              {assessmentFlow ? i18n.t('select-profile-title-assessment') : i18n.t('select-profile-title-edit')}
            </HeaderText>
            {assessmentFlow ? <SecondaryText>{i18n.t('select-profile-text')}</SecondaryText> : null}
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
            onProfileSelected={onProfileSelected}
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
                testID={`profile-card-${i}`}
              />
            )}
            status={status}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerText: {
    marginBottom: 12,
    paddingRight: 24,
  },
  menuToggle: {
    marginTop: 20,
    tintColor: colors.primary,
  },
  navContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 8,
  },
  rootContainer: {
    padding: 12,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
});
