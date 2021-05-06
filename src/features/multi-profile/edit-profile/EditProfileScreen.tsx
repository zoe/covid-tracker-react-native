import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

import NavigatorService from '@covid/NavigatorService';
import i18n from '@covid/locale/i18n';
import { HeaderText, SecondaryText, Header3Text } from '@covid/components/Text';
import Screen, { Header } from '@covid/components/Screen';
import { ArchiveProfile } from '@covid/features/multi-profile/ArchiveProfile';
import { colors } from '@covid/theme';
import { chevronRight } from '@assets';
import editProfileCoordinator from '@covid/features/multi-profile/edit-profile/EditProfileCoordinator';

import { ScreenParamList } from '../../ScreenParamList';

type RenderProps = {
  navigation: StackNavigationProp<ScreenParamList, 'EditProfile'>;
  route: RouteProp<ScreenParamList, 'EditProfile'>;
};

export const EditProfileScreen: React.FC<RenderProps> = (props) => {
  const patientData = props.route.params.patientData;

  const LinkItem: React.FC<{ title: string; action: VoidFunction }> = ({ title, action }) => {
    return (
      <TouchableOpacity style={styles.profileLabel} onPress={action}>
        <Header3Text>{title}</Header3Text>
        <Image style={styles.chevron} source={chevronRight} />
      </TouchableOpacity>
    );
  };

  return (
    <>
      <Screen profile={patientData.profile} navigation={props.navigation} simpleCallout>
        <Header>
          <HeaderText style={{ marginBottom: 12 }}>{i18n.t('edit-profile.title')}</HeaderText>
          <SecondaryText>{i18n.t('edit-profile.text')}</SecondaryText>
        </Header>

        <LinkItem
          title={i18n.t('edit-profile.your-location')}
          action={() => editProfileCoordinator.goToEditLocation()}
        />

        {false && (
          // Disabled
          <LinkItem title={i18n.t('title-about-you')} action={() => editProfileCoordinator.goToEditAboutYou()} />
        )}

        {editProfileCoordinator.shouldShowEditStudy() && (
          <LinkItem title={i18n.t('your-study.title')} action={() => editProfileCoordinator.goToEditYourStudy()} />
        )}

        {editProfileCoordinator.shouldShowSchoolNetwork() && (
          <LinkItem title="School network" action={() => editProfileCoordinator.goToSchoolNetwork()} />
        )}

        {editProfileCoordinator.shouldShowUniNetwork() && (
          <LinkItem title="University network" action={() => editProfileCoordinator.goToUniversityNetwork()} />
        )}
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
