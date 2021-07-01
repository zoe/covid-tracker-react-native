import { chevronRight } from '@assets';
import Screen, { Header } from '@covid/components/Screen';
import { Header3Text, HeaderText, SecondaryText } from '@covid/components/Text';
import { ArchiveProfile } from '@covid/features/multi-profile/ArchiveProfile';
import { editProfileCoordinator } from '@covid/features/multi-profile/edit-profile/EditProfileCoordinator';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import i18n from '@covid/locale/i18n';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors } from '@theme';
import * as React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

type RenderProps = {
  navigation: StackNavigationProp<ScreenParamList, 'EditProfile'>;
  route: RouteProp<ScreenParamList, 'EditProfile'>;
};

export const EditProfileScreen: React.FC<RenderProps> = (props) => {
  const LinkItem: React.FC<{ title: string; action: VoidFunction }> = ({ title, action }) => {
    return (
      <TouchableOpacity onPress={action} style={styles.profileLabel}>
        <Header3Text>{title}</Header3Text>
        <Image source={chevronRight} style={styles.chevron} />
      </TouchableOpacity>
    );
  };

  return (
    <>
      <Screen
        simpleCallout
        navigation={props.navigation}
        profile={props.route.params?.patientData?.profile}
        testID="edit-profile-screen"
      >
        <Header>
          <HeaderText style={{ marginBottom: 12 }}>{i18n.t('edit-profile.title')}</HeaderText>
          <SecondaryText>{i18n.t('edit-profile.text')}</SecondaryText>
        </Header>

        <LinkItem
          action={() => editProfileCoordinator.goToEditLocation()}
          title={i18n.t('edit-profile.your-location')}
        />

        {editProfileCoordinator.shouldShowEditStudy() ? (
          <LinkItem action={() => editProfileCoordinator.goToEditYourStudy()} title={i18n.t('your-study.title')} />
        ) : null}

        {editProfileCoordinator.shouldShowSchoolNetwork() ? (
          <LinkItem action={() => editProfileCoordinator.goToSchoolNetwork()} title="School network" />
        ) : null}

        {editProfileCoordinator.shouldShowUniNetwork() ? (
          <LinkItem action={() => editProfileCoordinator.goToUniversityNetwork()} title="University network" />
        ) : null}
      </Screen>

      <View>
        {props.route.params?.patientData?.profile?.reported_by_another ? (
          <View style={styles.archiveProfileContainer}>
            <ArchiveProfile patientId={props.route.params?.patientData?.patientId} />
          </View>
        ) : null}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  archiveProfileContainer: {
    backgroundColor: colors.white,
    justifyContent: 'flex-end',
    paddingBottom: 60,
  },
  chevron: {
    height: 16,
    width: 16,
  },
  profileLabel: {
    alignItems: 'center',
    backgroundColor: colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
});
