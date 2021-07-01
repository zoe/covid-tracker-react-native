import { vaccineBg } from '@assets';
import AnnouncementIcon from '@assets/icons/AnnouncementIcon';
import { ScreenContent } from '@covid/core/content/ScreenContentContracts';
import { colors } from '@theme';
import * as React from 'react';
import { Image, StyleProp, StyleSheet, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';

import { RegularText } from './Text';

type CalloutBoxProps = {
  content: ScreenContent;
  onPress?: () => void;
  image?: boolean;
  boxStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  linkStyle?: StyleProp<TextStyle>;
};

export const CalloutBox = ({ content, boxStyle, titleStyle, linkStyle, onPress, image }: CalloutBoxProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.discoveriesContainer, boxStyle]}>
      {image ? <Image source={vaccineBg} style={[styles.backgroundImage, { borderRadius: 16 }]} /> : null}
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
    borderRadius: 16,
    borderWidth: 1,
    justifyContent: 'space-between',
    marginBottom: 36,
    paddingVertical: 16,
    width: '100%',
  },
  discoveriesText: {
    color: colors.white,
    fontSize: 16,
    lineHeight: 24,
    marginHorizontal: 50,
    marginVertical: 16,
    textAlign: 'center',
  },
  discoveriesTitle: {
    color: colors.white,
    fontSize: 12,
    letterSpacing: 1,
    paddingHorizontal: 4,
  },
  discoveriesTitleBackground: {
    alignItems: 'center',
    backgroundColor: colors.lightBlueBrand,
    borderRadius: 4,
    flexDirection: 'row',
    paddingHorizontal: 4,
  },
  discoveriesVisitText: {
    color: colors.lightBrand,
    fontSize: 16,
    lineHeight: 24,
  },
});
