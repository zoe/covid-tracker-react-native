import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import i18n from '@covid/locale/i18n';
import { HeaderText, SecondaryText } from '@covid/components/Text';
import Screen, { Header } from '@covid/components/Screen';
import { ArchiveProfile } from '@covid/features/multi-profile/ArchiveProfile';
import { PatientProfile } from '@covid/core/patient/PatientState';
import { AvatarName, DEFAULT_PROFILE } from '@covid/utils/avatar';
import { Profile } from '@covid/features/multi-profile/SelectProfileScreen';
import { colors } from '@theme';

import { ScreenParamList } from '../ScreenParamList';

type RenderProps = {
  navigation: StackNavigationProp<ScreenParamList, 'EditProfile'>;
  route: RouteProp<ScreenParamList, 'EditProfile'>;
};

export const EditProfileScreen: React.FC<RenderProps> = (props) => {
  const profile = props.route.params.profile;

  function convertProfileToPatientProfile(profile: Profile): PatientProfile {
    const patientProfile: PatientProfile = {
      name: profile.name ?? '',
      avatarName: (profile.avatar_name as AvatarName) ?? DEFAULT_PROFILE,
      isPrimaryPatient: !profile.reported_by_another,
    };
    return patientProfile;
  }

  const patientProfile = convertProfileToPatientProfile(profile);

  return (
    <>
      <Screen profile={patientProfile} navigation={props.navigation} simpleCallout>
        <Header>
          <HeaderText style={{ marginBottom: 12 }}>{i18n.t('edit-profile.title')}</HeaderText>
          <SecondaryText>{i18n.t('edit-profile.text')}</SecondaryText>
        </Header>
      </Screen>

      <View>
        {profile.reported_by_another && (
          <View style={styles.archiveProfileContainer}>
            <ArchiveProfile profileId={profile.id} />
          </View>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  archiveProfileContainer: {
    justifyContent: 'flex-end',
    paddingBottom: 60,
    backgroundColor: colors.white,
  },
});
