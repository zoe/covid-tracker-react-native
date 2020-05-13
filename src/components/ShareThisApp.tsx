import React, { Component } from 'react';
import { Image, Share, StyleSheet, View } from 'react-native';

import { social } from '../../assets';
import { colors } from '../../theme';
import { BrandedButton, ClickableText, RegularBoldText, RegularText } from '../components/Text';
import i18n from '../locale/i18n';
import { isAndroid } from './Screen';

type CtaStyles = 'button' | 'link';

type Props = {
  ctaStyle: CtaStyles;
};

export default class ShareThisApp extends Component<Props> {
  shareMessage = i18n.t('share-this-app.message');
  shareUrl = i18n.t('share-this-app.url');

  shareApp = async () => {
    const message = this.shareMessage + (isAndroid ? ' ' + this.shareUrl : ''); // On Android add link to end of message
    try {
      await Share.share({
        message,
        url: this.shareUrl, // IOS has separate field for URL
      });
    } catch (error) {}
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.socialIconContainer}>
          <Image source={social} style={styles.socialIcon} />
        </View>
        <RegularBoldText style={styles.primaryText}>{i18n.t('share-this-app.primary-text')}</RegularBoldText>
        <RegularText style={styles.secondaryText}>{i18n.t('share-this-app.secondary-text')}</RegularText>
        {this.props.ctaStyle === 'button' ? (
          <BrandedButton onPress={this.shareApp} style={styles.shareButton}>
            {i18n.t('share-this-app.button-text')}
          </BrandedButton>
        ) : (
          <ClickableText onPress={this.shareApp} style={styles.shareLink}>
            {i18n.t('share-this-app.button-text')}
          </ClickableText>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 10,
    marginHorizontal: 20,
  },
  primaryText: {
    fontSize: 20,
    textAlign: 'center',
  },
  secondaryText: {
    paddingVertical: 10,
    paddingHorizontal: 40,
    textAlign: 'center',
    color: colors.secondary,
  },
  shareButton: {
    marginVertical: 20,
    marginHorizontal: 30,
  },
  shareLink: {
    marginTop: 5,
    marginBottom: 20,
    marginHorizontal: 30,
    textAlign: 'center',
  },
  socialIconContainer: {
    borderRadius: 10,
    margin: 30,
    alignSelf: 'center',
  },
  socialIcon: {
    height: 60,
    marginLeft: 5,
    marginTop: 5,
    resizeMode: 'contain',
  },
});
