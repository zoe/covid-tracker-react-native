import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

import i18n from '@covid/locale/i18n';
import { HeaderText, SecondaryText } from '@covid/components/Text';
import Screen, { Header } from '@covid/components/Screen';
import { ArchiveProfile } from '@covid/features/multi-profile/ArchiveProfile';
import { colors } from '@theme';
import { chevronRight } from '@assets';
import editProfileCoordinator from '@covid/features/multi-profile/edit-profile/EditProfileCoordinator';

import { ScreenParamList } from '../../ScreenParamList';

type RenderProps = {
  navigation: StackNavigationProp<ScreenParamList, 'EditProfile'>;
  route: RouteProp<ScreenParamList, 'EditProfile'>;
};

export const EditProfileScreen: React.FC<RenderProps> = (props) => {
  const patientData = props.route.params.patientData;

  return (
    <>
      <Screen profile={patientData.profile} navigation={props.navigation} simpleCallout>
        <Header>
          <HeaderText style={{ marginBottom: 12 }}>{i18n.t('edit-profile.title')}</HeaderText>
          <SecondaryText>{i18n.t('edit-profile.text')}</SecondaryText>
        </Header>

        <TouchableOpacity style={styles.profileLabel} onPress={() => editProfileCoordinator.goToEditLocation()}>
          <HeaderText>Your location</HeaderText>
          <Image style={styles.chevron} source={chevronRight} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.profileLabel} onPress={() => editProfileCoordinator.goToEditLocation()}>
          <HeaderText>Your location</HeaderText>
          <Image style={styles.chevron} source={chevronRight} />
        </TouchableOpacity>
      </Screen>

      <View>
        {patientData.profile!.reported_by_another && (
          <View style={styles.archiveProfileContainer}>
            <ArchiveProfile patientId={patientData.patientId} />
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
  profileLabel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.white,
  },
  chevron: {
    height: 16,
    width: 16,
  },
});
