import {
  CalendarIcon,
  CogIcon,
  HealthProfileIcon,
  LocationIcon,
  NotesIcon,
  PeopleIcon,
  SpitTestIcon,
  SyringeIcon,
} from '@assets';
import AvatarProfileScreen from '@assets/v2/svg/avatar-profile-screen';
import { CaptionText, Tag, Text, TextWithBoldInserts } from '@covid/components';
import { Screen } from '@covid/components/Screen';
import Analytics, { events } from '@covid/core/Analytics';
import { TPatientData } from '@covid/core/patient/PatientData';
import { patientService } from '@covid/core/patient/PatientService';
import { TRootState } from '@covid/core/state/root';
import { selectStartupInfo } from '@covid/core/state/selectors';
import { TStartupInfo } from '@covid/core/user/dto/UserAPIContracts';
import { AppCoordinator, appCoordinator } from '@covid/features/AppCoordinator';
import { editProfileCoordinator } from '@covid/features/multi-profile/edit-profile/EditProfileCoordinator';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import { useToggleRebrand } from '@health-study/redux/app/selectors';
import { NavigationContainerRef, useFocusEffect } from '@react-navigation/native';
import moment from 'moment';
import React from 'react';
import { Linking, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';

import { ProfileActionCard } from '../components/ProfileActionCard';
import { ProfileLinkRow } from '../components/ProfileLinkRow';
import { covidStyles, healthStudyStyles } from './ProfileScreenStyle';

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

export const ProfileScreen: React.FC<IProps> = () => {
  const toggleReBrand = useSelector(useToggleRebrand);
  const startupInfo = useSelector<TRootState, TStartupInfo | undefined>(selectStartupInfo);
  const patientId = useSelector<TRootState, string>((state) => state.user.patients[0]);
  const currentPatient = useSelector<TRootState, TPatientData>((state) => state.user.currentPatient);
  const coordinator: AppCoordinator = appCoordinator;
  const email = useSelector<TRootState, string>((state) => state.user.username);
  const [showNewTag, setShowNewTag] = React.useState<boolean>(false);

  const initAssessmentCoordAndGoToCovidTests = React.useCallback(() => {
    Analytics.track(events.PROFILE_COVID_TESTS_CARD_CLICKED);
    coordinator.startAssessmentFlowThroughTestsInProfile(currentPatient);
  }, [coordinator, currentPatient]);

  const initAssessmentCoordAndGoToVaccines = React.useCallback(() => {
    Analytics.track(events.PROFILE_VACCINES_CARD_CLICKED);
    coordinator.startAssessmentFlowThroughVaccines(currentPatient);
  }, [coordinator, currentPatient]);

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
    Analytics.track(events.PROFILE_SCREEN_SHOWN);
    if (startupInfo?.show_profile_screen_new_tag) {
      setShowNewTag(true);
      updateHasSeenProfileScreen(patientId);
    }
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      // On screen load, immediately initialise the editProfileCoordinator
      // On subsequent focus, also want to ensure we set to primary patient, otherwise will be set to secondary profile chosen
      coordinator.startEditProfileNoRedirect(currentPatient.profile);
    }, [currentPatient.profile]),
  );

  const styles = toggleReBrand ? healthStudyStyles : covidStyles;
  return (
    <Screen isInsideTabBar noHeader testID="profile-screen">
      {showNewTag ? (
        <Tag color={styles.tag.color} style={[styles.alignStart, styles.marginBottomMedium]} text={i18n.t('new')} />
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
        <AvatarProfileScreen circleFill={styles.avatar.backgroundColor} strokeColor={styles.avatar.color} />
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
              {i18n.t('profile.daily-reports', {
                dailyReportsCount: startupInfo?.primary_patient_assessments_count || 0,
              })}
            </TextWithBoldInserts>
          </View>
        </View>
      </View>

      <View style={styles.lineHorizontal} />

      <ProfileActionCard
        color={styles.profileActionCard.color}
        description={i18n.t('profile.test-card.description')}
        image={<SpitTestIcon color={styles.spitTestIcon.color} opacity={0.65} />}
        onPress={initAssessmentCoordAndGoToCovidTests}
        title={i18n.t('profile.test-card.title')}
      />

      {currentPatient?.patientState?.shouldShowVaccineList ? (
        <ProfileActionCard
          color={styles.profileActionVaccineCard.color}
          description={i18n.t('profile.vaccine-card.description')}
          image={<SyringeIcon color={styles.syringeIcon.color} opacity={0.65} />}
          onPress={initAssessmentCoordAndGoToVaccines}
          title={i18n.t('profile.vaccine-card.title')}
        />
      ) : null}

      <ProfileLinkRow inactive icon={HealthProfileIcon} key="HealthProfile" text="Health Profile - coming soon" />
      {LINKS.map((link) => (
        <ProfileLinkRow icon={link.icon} key={link.text} onPress={link.onPress} text={link.text} />
      ))}

      <View style={styles.lineHorizontal} />
      <Text inverted colorPalette="uiDark" colorShade="darker" textClass="h5Regular">
        {i18n.t('logged-in-with')}
      </Text>
      <CaptionText style={styles.email}>{email}</CaptionText>

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
