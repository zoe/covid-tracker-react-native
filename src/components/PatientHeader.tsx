import { StackNavigationProp } from '@react-navigation/stack';
import { Icon } from 'native-base';
import React from 'react';
import { View, StyleSheet, Image, StyleProp, ViewStyle } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationProp } from '@react-navigation/native';

import { colors } from '@theme';
import { AvatarName, getAvatarByName } from '@covid/utils/avatar';
import i18n from '@covid/locale/i18n';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import { ScreenName } from '@covid/core/Coordinator';
import { Profile } from '@covid/core/profile/ProfileService';

import { ClippedText, RegularText } from './Text';

type BackButtonProps = {
  navigation: NavigationProp<ScreenParamList, ScreenName>;
  style?: StyleProp<ViewStyle>;
  showCloseButton?: boolean;
};

export enum CallOutType {
  Simple,
  Tag,
}

export const BackButton: React.FC<BackButtonProps> = ({ navigation, style: containerStyle, showCloseButton }) => {
  return showCloseButton ? (
    <TouchableOpacity onPress={navigation.goBack} style={containerStyle}>
      <View style={styles.iconButton}>
        <Icon name="cross" type="Entypo" style={styles.icon} />
      </View>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity onPress={navigation.goBack} style={containerStyle}>
      <View style={styles.iconButton}>
        <Icon name="chevron-thin-left" type="Entypo" style={styles.icon} />
      </View>
    </TouchableOpacity>
  );
};

type PatientHeaderProps = {
  profile: Profile;
  navigation?: StackNavigationProp<ScreenParamList>;
  simpleCallout?: boolean;
  type?: CallOutType;
  calloutTitle?: string;
  showCloseButton?: boolean;
};

type NavbarProps = {
  navigation?: StackNavigationProp<ScreenParamList>;
  rightComponent?: React.ReactNode;
  showCloseButton?: boolean;
};

export const NavHeader: React.FC<NavbarProps> = ({ navigation, rightComponent, showCloseButton }) => {
  return (
    <View style={styles.headerBar}>
      <View style={styles.left}>
        {!!navigation ? <BackButton navigation={navigation} showCloseButton={showCloseButton} /> : null}
      </View>
      <View style={styles.center} />
      <View style={styles.right}>{rightComponent}</View>
    </View>
  );
};

const PatientHeader: React.FC<PatientHeaderProps> = ({
  profile,
  navigation,
  simpleCallout = false,
  type = !profile.reported_by_another ? CallOutType.Simple : CallOutType.Tag,
  calloutTitle = !profile.reported_by_another ? profile.name : i18n.t('answer-for', { name: profile.name }),
  showCloseButton = false,
}) => {
  const avatarImage = getAvatarByName(profile.avatar_name as AvatarName);
  const avatarComponent = (
    <>
      {type === CallOutType.Simple || simpleCallout ? (
        <View style={styles.regularTextBox}>
          <RegularText style={styles.regularText}>{calloutTitle}</RegularText>
        </View>
      ) : (
        <>
          <View style={styles.altTextBox}>
            <ClippedText style={styles.altText}>{calloutTitle}</ClippedText>
            <View style={styles.rightTriangle} />
          </View>
        </>
      )}
      {!!avatarImage && <Image source={avatarImage} style={styles.avatar} />}
    </>
  );

  return <NavHeader navigation={navigation} rightComponent={avatarComponent} showCloseButton={showCloseButton} />;
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
    overflow: 'visible',
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
