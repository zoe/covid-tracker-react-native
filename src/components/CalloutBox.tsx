import { CalloutBoxContent } from '@covid/core/ContentService';
import { colors } from '@theme';
import { Linking } from 'expo';
import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';

import { RegularText } from './Text';

type CalloutBoxProps = {
  content: CalloutBoxContent;
};

export const CalloutBox = ({ content }: CalloutBoxProps) => {
  return (
    <TouchableOpacity style={styles.discoveriesContainer} onPress={() => Linking.openURL(content.link.url)}>
      <View style={styles.discoveriesTitleBackground}>
        <RegularText style={styles.discoveriesTitle}>{content.title}</RegularText>
      </View>
      <RegularText style={styles.discoveriesText}>{content.description}</RegularText>
      <RegularText style={styles.discoveriesVisitText}>{content.link.title}</RegularText>
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
