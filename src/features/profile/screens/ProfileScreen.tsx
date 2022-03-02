import {
  CalendarIcon,
  CogIcon,
  LocationIcon,
  NotesIcon,
  PeopleIcon,
  profile10,
  SpitTestIcon,
  SyringeIcon,
} from '@assets';
import { CaptionText, Tag, Text, TextWithBoldInserts } from '@covid/components';
import { Screen } from '@covid/components/Screen';
import Analytics, { events } from '@covid/core/Analytics';
import { TPatientData } from '@covid/core/patient/PatientData';
import { patientService } from '@covid/core/patient/PatientService';
import { TRootState } from '@covid/core/state/root';
import { selectStartupInfo } from '@covid/core/state/selectors';
import { TStartupInfo } from '@covid/core/user/dto/UserAPIContracts';
import { AppCoordinator, appCoordinator } from '@covid/features/AppCoordinator';
import { useLogout } from '@covid/features/menu/useLogout';
import { editProfileCoordinator } from '@covid/features/multi-profile/edit-profile/EditProfileCoordinator';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import { sizes } from '@covid/themes';
import { NavigationContainerRef, useFocusEffect } from '@react-navigation/native';
import { colors } from '@theme';
import moment from 'moment';
import * as React from 'react';
import { Image, Linking, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';

import { ProfileActionCard } from '../components/ProfileActionCard';
import { ProfileLinkRow } from '../components/ProfileLinkRow';

const updateHasSeenProfileScreen = async (patientId: string) => {
  await patientService.updatePatientInfo(patientId, {
    has_seen_profile_screen: true,
  });
};

const contactUs = () => {
  Analytics.track(events.PROFILE_CONTACT_EMAIL_CLICKED);
  Linking.openURL('mailto:covidteam@joinzoe.com');
};

interface IProps {
  navigation: NavigationContainerRef<ReactNavigation.RootParamList>;
}

export const ProfileScreen: React.FC<IProps> = (props) => {
  const startupInfo = useSelector<TRootState, TStartupInfo | undefined>(selectStartupInfo);
  const patientId = useSelector<TRootState, string>((state) => state.user.patients[0]);
  const currentPatient = useSelector<TRootState, TPatientData>((state) => state.user.currentPatient);
  const email = useSelector<TRootState, string>((state) => state.user.username);
  const logout = useLogout(props.navigation);

  const coordinator: AppCoordinator = appCoordinator;

  const initAssessmentCoordAndGoToCovidTests = React.useCallback(() => {
    Analytics.track(events.PROFILE_COVID_TESTS_CARD_CLICKED);
    // Important: this kicks off the logic around backdating profiles etc.
    coordinator.startAssessmentFlow(currentPatient);
  }, [coordinator, currentPatient]);

  const initAssessmentCoordAndGoToVaccines = React.useCallback(() => {
    Analytics.track(events.PROFILE_VACCINES_CARD_CLICKED);
    coordinator.startAssessmentFlowThroughVaccines(currentPatient);
  }, [coordinator, currentPatient]);

  const logoutOnPress = React.useCallback(() => {
    Analytics.track(events.PROFILE_LOGOUT_CLICKED);
    logout();
  }, []);

  const LINKS = React.useMemo(
    () => [
      {
        icon: LocationIcon,
        onPress: () => {
          Analytics.track(events.PROFILE_LOCATION_CLICKED);
          editProfileCoordinator.goToEditLocation();
        },
        text: i18n.t('profile.location'),
      },
      {
        icon: CogIcon,
        onPress: () => {
          Analytics.track(events.PROFILE_OTHER_CLICKED);
          editProfileCoordinator.startEditProfileOther();
        },
        text: i18n.t('profile.other'),
      },
      {
        icon: PeopleIcon,
        onPress: () => {
          Analytics.track(events.PROFILE_SECONDARY_PROFILES_CLICKED);
          NavigatorService.navigate('SelectProfile', { assessmentFlow: false });
        },
        text: i18n.t('profile.secondary-profiles'),
      },
    ],
    [currentPatient],
  );

  React.useEffect(() => {
    updateHasSeenProfileScreen(patientId);
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      // On screen load, immediately initialise the editProfileCoordinator
      // On subsequent focus, also want to ensure we set to primary patient, otherwise will be set to secondary profile chosen
      coordinator.startEditProfileNoRedirect(currentPatient.profile);
    }, [currentPatient.profile]),
  );

  return (
    <Screen isInsideTabBar noHeader testID="profile-screen">
      {startupInfo?.show_profile_screen_new_tag ? (
        <Tag color={colors.accent} style={[styles.alignStart, styles.marginBottomMedium]} text={i18n.t('new')} />
      ) : null}
      <Text
        inverted
        colorPalette="uiDark"
        colorShade="darker"
        style={styles.marginBottomMedium}
        testID="studies-list-screen-title"
        textClass="h2"
      >
        {i18n.t('profile.title')}
      </Text>
      <View style={styles.userDetails}>
        <Image resizeMode="contain" source={profile10} style={styles.avatar} />
        <View style={styles.details}>
          <Text rhythm={4} textClass="h5Regular">
            {i18n.t('profile.name')}
          </Text>
          <View style={styles.detailsRow}>
            <CalendarIcon />
            <TextWithBoldInserts style={styles.detailsText} textClass="pSmallLight">
              {i18n.t('profile.date-joined', {
                date: moment(startupInfo?.primary_patient_date_joined).format('Do [of] MMMM, YYYY'),
              })}
            </TextWithBoldInserts>
          </View>
          <View style={styles.detailsRow}>
            <NotesIcon />
            <TextWithBoldInserts style={styles.detailsText} textClass="pSmallLight">
              {/* TODO: Make dynamic */}
              {i18n.t('profile.daily-reports', { dailyReportsCount: '1000' })}
            </TextWithBoldInserts>
          </View>
        </View>
      </View>

      <View style={styles.lineHorizontal} />

      <ProfileActionCard
        color={colors.darkBlue}
        description={i18n.t('profile.test-card.description')}
        image={SpitTestIcon}
        onPress={initAssessmentCoordAndGoToCovidTests}
        testID="covid-tests"
        title={i18n.t('profile.test-card.title')}
      />

      {currentPatient?.patientState?.shouldShowVaccineList ? (
        <ProfileActionCard
          color={colors.vegan}
          description={i18n.t('profile.vaccine-card.description')}
          image={SyringeIcon}
          onPress={initAssessmentCoordAndGoToVaccines}
          testID="vaccines"
          title={i18n.t('profile.vaccine-card.title')}
        />
      ) : null}

      {LINKS.map((link) => (
        <ProfileLinkRow icon={link.icon} key={link.text} onPress={link.onPress} text={link.text} />
      ))}

      <View style={styles.lineHorizontal} />

      <TouchableOpacity
        accessibilityRole="button"
        onPress={logoutOnPress}
        style={styles.logout}
        testID="profile-item-logout"
      >
        <Text inverted colorPalette="uiDark" colorShade="darker" textClass="h5Regular">
          {i18n.t('logout')}
        </Text>
        <CaptionText style={styles.email}>{email}</CaptionText>
      </TouchableOpacity>

      <TouchableOpacity accessibilityRole="link" onPress={contactUs} testID="profile-item-incorrect-email">
        <Text inverted colorPalette="uiDark" colorShade="darker" textClass="pSmallLight">
          {i18n.t('profile.incorrect-email')}
          <Text inverted colorPalette="accentMagenta" colorShade="main" textClass="pSmallLight">
            {i18n.t('profile.incorrect-email-address')}
          </Text>
        </Text>
      </TouchableOpacity>
    </Screen>
  );
};

const styles = StyleSheet.create({
  alignStart: {
    alignSelf: 'flex-start',
  },
  avatar: {
    height: 80,
    width: 80,
  },
  details: {
    marginLeft: sizes.m,
  },
  detailsRow: {
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: sizes.xxs,
  },
  detailsText: {
    marginLeft: sizes.s,
  },
  email: {
    marginTop: sizes.xs,
    textDecorationLine: 'underline',
  },
  lineHorizontal: {
    backgroundColor: colors.hrColor,
    height: 1,
    marginVertical: sizes.l,
  },
  logout: {
    marginBottom: sizes.xs,
    marginTop: sizes.m,
  },
  marginBottomMedium: {
    marginBottom: sizes.m,
  },
  userDetails: {
    flexDirection: 'row',
  },
});
