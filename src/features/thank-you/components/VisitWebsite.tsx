import { ClickableText, RegularText } from '@covid/components';
import i18n from '@covid/locale/i18n';
import { sizes } from '@covid/themes';
import { openWebLink } from '@covid/utils/links';
import { colors } from '@theme';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import reactStringReplace from 'react-string-replace';

export default class VisitWebsite extends React.Component {
  render() {
    return (
      <ClickableText onPress={() => openWebLink(i18n.t('blog-link'))} style={styles.container}>
        {reactStringReplace(i18n.t('thank-you.check-for-updates', { link: '{{LINK}}' }), '{{LINK}}', (_, i) => (
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
    color: colors.primary,
    paddingHorizontal: sizes.xxl,
    paddingVertical: sizes.xl,
    textAlign: 'center',
  },
  linkText: {
    color: colors.purple,
    textDecorationLine: 'underline',
  },
});
