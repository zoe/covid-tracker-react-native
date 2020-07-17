import React from 'react';
import { TouchableOpacity, View, StyleSheet, StyleProp, ViewStyle, TextStyle, Image } from 'react-native';

import { colors } from '@theme';
import { ScreenContent } from '@covid/core/content/ScreenContentContracts';
import AnnouncementIcon from '@assets/icons/AnnouncementIcon';
import { vaccineBg } from '@assets';

import { RegularText } from './Text';

type CalloutBoxProps = {
  content: ScreenContent;
  onPress: () => void;
  image?: boolean;
  boxStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  linkStyle?: StyleProp<TextStyle>;
};

export const CalloutBox = ({ content, boxStyle, titleStyle, linkStyle, onPress, image }: CalloutBoxProps) => {
  return (
    <TouchableOpacity style={[styles.discoveriesContainer, boxStyle]} onPress={onPress}>
      {image && <Image source={vaccineBg} style={[styles.backgroundImage, { borderRadius: 16 }]} />}
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
  discoveriesContainer: {
    paddingVertical: 16,
    width: '100%',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.backgroundSecondary,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 36,
  },
  discoveriesTitleBackground: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.lightBlueBrand,
    paddingHorizontal: 4,
    borderRadius: 4,
  },
  discoveriesTitle: {
    fontSize: 12,
    color: colors.white,
    letterSpacing: 1,
    paddingHorizontal: 4,
  },
  discoveriesText: {
    textAlign: 'center',
    marginHorizontal: 50,
    marginVertical: 16,
    color: colors.white,
    fontSize: 16,
    lineHeight: 24,
  },
  discoveriesVisitText: {
    color: colors.lightBrand,
    fontSize: 16,
    lineHeight: 24,
  },
  backgroundImage: {
    position: 'absolute',
    height: '125%',
    width: '100%',
    left: 0,
    top: 0,
  },
});
