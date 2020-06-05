import { PatientProfile } from '@covid/core/patient/PatientState';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import i18n from '@covid/locale/i18n';
import { getAvatarByName } from '@covid/utils/avatar';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors } from '@theme';
import { Icon } from 'native-base';
import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { ClippedText, RegularText } from './Text';

type BackButtonProps = {
  navigation: StackNavigationProp<ScreenParamList>;
};

const BackButton: React.FC<BackButtonProps> = ({ navigation }) => {
  return (
    <TouchableOpacity onPress={navigation.goBack}>
      <View style={styles.iconButton}>
        <Icon name="chevron-thin-left" type="Entypo" style={styles.icon} />
      </View>
    </TouchableOpacity>
  );
};

type NavbarProps = {
  profile: PatientProfile;
  navigation: StackNavigationProp<ScreenParamList> | undefined;
};

const PatientHeader: React.FC<NavbarProps> = ({ profile, navigation }) => {
  const avatarImage = !!profile.avatarName && getAvatarByName(profile.avatarName);

  return (
    <View style={styles.headerBar}>
      <View style={styles.left}>{!!navigation && <BackButton navigation={navigation} />}</View>
      <View style={styles.center} />
      <View style={styles.right}>
        {profile.isPrimaryPatient ? (
          <View style={styles.regularTextBox}>
            <RegularText style={styles.regularText}>{profile.name}</RegularText>
          </View>
        ) : (
          <>
            <View style={styles.altTextBox}>
              <ClippedText style={styles.altText}>{i18n.t('answer-for', { name: profile.name })}</ClippedText>
              <View style={styles.rightTriangle} />
            </View>
          </>
        )}
        {!!avatarImage && <Image source={avatarImage} style={styles.avatar} />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  iconButton: {
    height: 32,
    width: 32,
    marginVertical: 16,
    marginHorizontal: 8,
    backgroundColor: colors.backgroundFour,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 16,
    color: colors.secondary,
  },
  headerBar: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: 16,
  },
  center: {
    flex: 1,
  },
  left: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  right: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  altTextBox: {
    backgroundColor: colors.coral,
    justifyContent: 'center',
    height: 40,
    borderRadius: 12,
    marginTop: 10,
    marginRight: 5,
    maxWidth: 200,
  },
  altText: {
    paddingHorizontal: 10,
    color: colors.white,
    overflow: 'hidden',
  },
  rightTriangle: {
    position: 'absolute',
    right: -8,
    borderTopWidth: 8,
    borderRightWidth: 0,
    borderBottomWidth: 8,
    borderLeftWidth: 8,
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: colors.coral,
  },
  regularTextBox: {
    justifyContent: 'center',
  },
  regularText: {},
  avatar: {
    marginVertical: 16,
    marginHorizontal: 8,
    height: 32,
    width: 32,
    borderRadius: 16,
  },
});

export default PatientHeader;
