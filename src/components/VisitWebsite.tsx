import { Linking } from 'expo';
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import reactStringReplace from 'react-string-replace';

import { colors } from '../../theme';
import i18n from '../locale/i18n';
import { ClickableText, RegularText } from './Text';

export default class VisitWebsite extends Component {
  render() {
    return (
      <ClickableText onPress={() => Linking.openURL(i18n.t('blog-link'))} style={styles.container}>
        {reactStringReplace(i18n.t('thank-you.check-for-updates', { link: '{{LINK}}' }), '{{LINK}}', (match, i) => (
          <RegularText key={i} style={styles.linkText}>
            {i18n.t('thank-you.news-feed')}
          </RegularText>
        ))}
      </ClickableText>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 30,
    paddingHorizontal: 40,
    textAlign: 'center',
    color: colors.primary,
  },
  linkText: {
    color: colors.purple,
    textDecorationLine: 'underline',
  },
});
