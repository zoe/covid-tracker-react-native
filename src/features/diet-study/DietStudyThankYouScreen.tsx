import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BrandedButton, HeaderText, RegularText } from '@covid/components/Text';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import { colors } from '@theme';
import PatientHeader from '@covid/components/PatientHeader';
import i18n from '@covid/locale/i18n';
import { ShareAppCard } from '@covid/components/Cards/ShareApp';
import dietStudyCoordinator from '@covid/core/diet-study/DietStudyCoordinator';
import { ProfileCard } from '@covid/components/ProfileCard';
import { Loading, LoadingModal } from '@covid/components/Loading';
import { Profile } from '@covid/features/multi-profile/SelectProfileScreen';
import { offlineService } from '@covid/Services';
import { ApiErrorState } from '@covid/core/api/ApiServiceErrors';

type Props = {
  navigation: StackNavigationProp<ScreenParamList, 'DietStudyThankYou'>;
  route: RouteProp<ScreenParamList, 'DietStudyThankYou'>;
};

export const DietStudyThankYouScreen: React.FC<Props> = (props) => {
  const { currentPatient } = props.route.params.dietStudyData;
  const [isLoaded, setLoaded] = useState(false);
  const [profiles, setProfiles] = useState([] as Profile[]);
  const [apiError, setApiError] = useState({} as ApiErrorState);
  const [showProfiles, setShowProfiles] = useState(false);

  useEffect(() => {
    const loadProfiles = async () => {
      if (await dietStudyCoordinator.showProfiles()) {
        setShowProfiles(true);
        await listProfiles();
      }
    };
    //loadProfiles() //Removed for this version
  });

  async function listProfiles() {
    setApiError({ status: i18n.t('errors.status-loading'), error: null } as ApiErrorState);
    try {
      const profiles = await dietStudyCoordinator.listPatients();
      if (profiles) {
        setProfiles(profiles);
        setLoaded(true);
      }
    } catch (error) {
      setApiError({ error } as ApiErrorState);
    }
  }

  function retryListProfiles() {
    setApiError({ status: i18n.t('errors.status-retrying'), error: null } as ApiErrorState);
    setTimeout(() => listProfiles(), offlineService.getRetryDelay());
  }

  async function profileSelected(profileId: string, index: number) {
    try {
      setApiError({ isApiError: false } as ApiErrorState);
      // TODO Selected profile goto
    } catch (error) {
      setApiError({
        isApiError: true,
        error,
        onRetry: () => {
          setApiError({
            status: i18n.t('errors.status-retrying'),
            error: null,
          } as ApiErrorState);
          setTimeout(() => {
            setApiError({ status: i18n.t('errors.status-loading') } as ApiErrorState);
            profileSelected(profileId, index);
          }, offlineService.getRetryDelay());
        },
      } as ApiErrorState);
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.backgroundSecondary }}>
      {apiError.isApiError && (
        <LoadingModal
          error={apiError.error}
          status={apiError.status}
          onRetry={apiError.onRetry}
          onPress={() => setApiError({ isApiError: false } as ApiErrorState)}
        />
      )}

      <PatientHeader profile={currentPatient.profile} navigation={props.navigation} />

      <ScrollView style={styles.contentContainer}>
        <HeaderText style={styles.headerText}>{i18n.t('diet-study.thank-you.title')}</HeaderText>

        {!showProfiles && <RegularText style={styles.bodyText}>{i18n.t('diet-study.thank-you.text-1')}</RegularText>}

        {showProfiles &&
          (isLoaded ? (
            <View style={styles.profileList}>
              {profiles.map((profile, i) => {
                return (
                  <View style={styles.cardContainer} key={profile.id}>
                    <TouchableOpacity onPress={() => profileSelected(profile.id, i)}>
                      <ProfileCard profile={profile} index={i} />
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
          ) : (
            <Loading
              status={apiError.status}
              error={apiError.error}
              style={{ borderColor: 'green', borderWidth: 1 }}
              onRetry={() => retryListProfiles()}
            />
          ))}

        <RegularText style={styles.bodyText}>{i18n.t('diet-study.thank-you.text-2')}</RegularText>

        <View style={{ marginTop: 24 }}>
          <ShareAppCard />
        </View>

        <View style={styles.buttonContainer}>
          <BrandedButton
            style={styles.button}
            onPress={() => {
              dietStudyCoordinator.gotoNextScreen(props.route.name);
            }}>
            <RegularText style={styles.buttonText}>{i18n.t('vaccine-registry.next')}</RegularText>
          </BrandedButton>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 32,
    flexGrow: 1,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 32,
    alignItems: 'center',
  },
  buttonText: {
    color: colors.white,
  },
  button: {
    marginVertical: 16,
    backgroundColor: colors.purple,
  },
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
  backIcon: {
    alignSelf: 'flex-start',
    marginTop: 32,
  },
  headerText: {
    marginTop: 24,
  },
  bodyText: {
    marginTop: 24,
  },
});
