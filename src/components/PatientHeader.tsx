import { ScreenName } from '@covid/core/Coordinator';
import { Profile } from '@covid/core/profile/ProfileService';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import i18n from '@covid/locale/i18n';
import { AvatarName, getAvatarByName } from '@covid/utils/avatar';
import { NavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors } from '@theme';
import { Icon } from 'native-base';
import React from 'react';
import { Image, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

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
        <Icon name="cross" style={styles.icon} type="Entypo" />
      </View>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity onPress={navigation.goBack} style={containerStyle}>
      <View style={styles.iconButton}>
        <Icon name="chevron-thin-left" style={styles.icon} type="Entypo" />
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
        {!!navigation && <BackButton navigation={navigation} showCloseButton={showCloseButton} />}
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
  altText: {
    color: colors.white,
    overflow: 'hidden',
    paddingHorizontal: 10,
  },
  altTextBox: {
    backgroundColor: colors.coral,
    borderRadius: 12,
    height: 40,
    justifyContent: 'center',
    marginRight: 5,
    marginTop: 10,
    maxWidth: 200,
  },
  avatar: {
    borderRadius: 16,
    height: 32,
    marginHorizontal: 8,
    marginVertical: 16,
    width: 32,
  },
  center: {
    flex: 1,
  },
  headerBar: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    overflow: 'visible',
    paddingHorizontal: 16,
  },
  icon: {
    color: colors.secondary,
    fontSize: 16,
  },
  iconButton: {
    alignItems: 'center',
    backgroundColor: colors.backgroundFour,
    borderRadius: 16,
    height: 32,
    justifyContent: 'center',
    marginHorizontal: 8,
    marginVertical: 16,
    width: 32,
  },
  left: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  regularText: {},
  regularTextBox: {
    justifyContent: 'center',
  },
  right: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  rightTriangle: {
    borderBottomColor: 'transparent',
    borderBottomWidth: 8,
    borderLeftColor: colors.coral,
    borderLeftWidth: 8,
    borderRightColor: 'transparent',
    borderRightWidth: 0,
    borderTopColor: 'transparent',
    borderTopWidth: 8,
    position: 'absolute',
    right: -8,
  },
});

export default PatientHeader;
