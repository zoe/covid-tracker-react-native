import React from 'react';
import { TouchableOpacity, View, StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native';

import { colors } from '@theme';
import { ScreenContent } from '@covid/core/content/ScreenContentContracts';

import { RegularText } from './Text';

type CalloutBoxProps = {
  content: ScreenContent;
  onPress: () => void;
  boxStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  linkStyle?: StyleProp<TextStyle>;
};

export const CalloutBox = ({ content, boxStyle, titleStyle, linkStyle, onPress }: CalloutBoxProps) => {
  return (
    <TouchableOpacity style={[styles.discoveriesContainer, boxStyle]} onPress={onPress}>
      <View style={[styles.discoveriesTitleBackground, titleStyle]}>
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
});
