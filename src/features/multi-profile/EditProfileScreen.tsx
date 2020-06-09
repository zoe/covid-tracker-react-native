import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { Modal, StyleSheet, TouchableHighlight, TouchableOpacity } from 'react-native';
import { View } from 'native-base';

import i18n from '@covid/locale/i18n';
import { HeaderText, RegularBoldText, RegularText, SecondaryText } from '@covid/components/Text';
import Screen, { Header } from '@covid/components/Screen';
import { ArchiveConfirmationModal } from '@covid/features/multi-profile/ArchiveConfirmationModal';
import { ArchiveReasonModal } from '@covid/features/multi-profile/ArchiveReasonModal';
import { colors } from '@theme';
import { ArchiveProfile } from '@covid/features/multi-profile/ArchiveProfile';
import { PatientProfile } from '@covid/core/patient/PatientState';
import { AvatarName, DEFAULT_PROFILE } from '@covid/utils/avatar';

import { ScreenParamList } from '../ScreenParamList';

type RenderProps = {
  navigation: StackNavigationProp<ScreenParamList, 'EditProfile'>;
  route: RouteProp<ScreenParamList, 'EditProfile'>;
};

export const EditProfileScreen: React.FC<RenderProps> = (props) => {
  const profile = props.route.params.profile;

  const patientProfile: PatientProfile = {
    name: profile.name ?? '',
    avatarName: (profile.avatar_name as AvatarName) ?? DEFAULT_PROFILE,
    isPrimaryPatient: !profile.reported_by_another,
  };

  return (
    <Screen profile={patientProfile} navigation={props.navigation}>
      <Header>
        <HeaderText style={{ marginBottom: 12 }}>
          {profile.name}
          {"'s "}
          {i18n.t('edit-profile.title')}
        </HeaderText>
        <SecondaryText>{i18n.t('edit-profile.text')}</SecondaryText>
      </Header>

      {profile.reported_by_another && <ArchiveProfile profileId={profile.id} />}
    </Screen>
  );
};
