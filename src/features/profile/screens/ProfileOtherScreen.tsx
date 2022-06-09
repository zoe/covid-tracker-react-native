import { chevronRight } from '@assets';
import { Screen } from '@covid/components/Screen';
import { Header3Text, HeaderText } from '@covid/components/Text';
import { editProfileCoordinator } from '@covid/features/multi-profile/edit-profile/EditProfileCoordinator';
import i18n from '@covid/locale/i18n';
import { TScreenParamList } from '@covid/routes/types';
import { sizes } from '@covid/themes';
import { RouteProp } from '@react-navigation/native';
import { colors } from '@theme';
import * as React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';

type TLinkItemProps = {
  onPress: VoidFunction;
  title: string;
};

function LinkItem(props: TLinkItemProps) {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.profileLabel}>
      <Header3Text>{props.title}</Header3Text>
      <Image source={chevronRight} style={styles.chevron} />
    </TouchableOpacity>
  );
}

type TProps = {
  route: RouteProp<TScreenParamList, 'EditProfile'>;
};

export const ProfileOtherScreen: React.FC<TProps> = (props) => {
  return (
    <Screen simpleCallout profile={props.route.params?.patientData?.profile} testID="profile-other-screen">
      <HeaderText style={{ marginBottom: sizes.s }}>{i18n.t('profile.other-screen.title')}</HeaderText>

      {editProfileCoordinator.shouldShowEditStudy() ? (
        <LinkItem onPress={editProfileCoordinator.goToEditYourStudy} title={i18n.t('your-study.title')} />
      ) : null}
    </Screen>
  );
};

const styles = StyleSheet.create({
  chevron: {
    height: 16,
    width: 16,
  },
  profileLabel: {
    alignItems: 'center',
    backgroundColor: colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: sizes.m,
  },
});
