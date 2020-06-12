import { Linking } from 'expo';
import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';

import { colors } from '@theme';
import { ScreenContent } from '@covid/core/content/ScreenContentContracts';

import { RegularText } from './Text';

type CalloutBoxProps = {
  content: ScreenContent;
};

export const CalloutBox = ({ content }: CalloutBoxProps) => {
  return (
    <TouchableOpacity style={styles.discoveriesContainer} onPress={() => Linking.openURL(content.body_link)}>
      <View style={styles.discoveriesTitleBackground}>
        <RegularText style={styles.discoveriesTitle}>{content.title_text}</RegularText>
      </View>
      <RegularText style={styles.discoveriesText}>{content.body_text}</RegularText>
      <RegularText style={styles.discoveriesVisitText}>{content.body_text}</RegularText>
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
    letterSpacing: 0.2,
  },
  discoveriesText: {
    textAlign: 'center',
    marginHorizontal: 50,
    marginVertical: 8,
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
