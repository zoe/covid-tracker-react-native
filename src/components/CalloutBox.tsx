import { vaccineBg } from '@assets';
import AnnouncementIcon from '@assets/icons/AnnouncementIcon';
import { TScreenContent } from '@covid/core/content/ScreenContentContracts';
import { sizes } from '@covid/themes';
import { colors } from '@theme';
import * as React from 'react';
import { Image, StyleProp, StyleSheet, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';

import { RegularText } from './Text';

type TProps = {
  content: TScreenContent;
  onPress?: () => void;
  image?: boolean;
  boxStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  linkStyle?: StyleProp<TextStyle>;
};

export const CalloutBox = ({ content, boxStyle, titleStyle, linkStyle, onPress, image }: TProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.discoveriesContainer, boxStyle]}>
      {image ? <Image source={vaccineBg} style={[styles.backgroundImage, { borderRadius: sizes.m }]} /> : null}
      <View style={[styles.discoveriesTitleBackground, titleStyle]}>
        <AnnouncementIcon />
        <RegularText style={styles.discoveriesTitle}>{content.title_text}</RegularText>
      </View>
      <RegularText style={styles.discoveriesText}>{content.body_text}</RegularText>
      <RegularText style={[styles.discoveriesVisitText, linkStyle]}>{content.link_text}</RegularText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    height: '125%',
    left: 0,
    position: 'absolute',
    top: 0,
    width: '100%',
  },
  discoveriesContainer: {
    alignItems: 'center',
    borderColor: colors.backgroundSecondary,
    borderRadius: sizes.m,
    borderWidth: 1,
    justifyContent: 'space-between',
    paddingVertical: sizes.m,
    width: '100%',
  },
  discoveriesText: {
    color: colors.white,
    fontSize: 16,
    lineHeight: 24,
    marginHorizontal: sizes.xxl,
    marginVertical: sizes.m,
    textAlign: 'center',
  },
  discoveriesTitle: {
    color: colors.white,
    fontSize: 12,
    letterSpacing: 1,
    paddingHorizontal: sizes.xxs,
  },
  discoveriesTitleBackground: {
    alignItems: 'center',
    backgroundColor: colors.lightBlueBrand,
    borderRadius: sizes.xxs,
    flexDirection: 'row',
    paddingHorizontal: sizes.xxs,
  },
  discoveriesVisitText: {
    color: colors.lightBrand,
    fontSize: 16,
    lineHeight: 24,
  },
});
