import { social } from '@assets';
import { BrandedButton, RegularBoldText, RegularText } from '@covid/components/Text';
import Analytics, { events } from '@covid/core/Analytics';
import i18n from '@covid/locale/i18n';
import { colors } from '@theme';
import React, { Component } from 'react';
import { Image, Share, ShareAction, StyleSheet, View } from 'react-native';

import { isAndroid } from './Screen';

export default class ShareThisApp extends Component {
  shareMessage = i18n.t('share-this-app.message');
  shareUrl = i18n.t('share-this-app.url');

  extractSharedOn(shareAction: ShareAction): string | null {
    if (shareAction.action === Share.sharedAction) {
      return isAndroid ? 'Android: no data' : shareAction.activityType ? shareAction.activityType : 'unknown';
    }

    if (shareAction.action === Share.dismissedAction) {
      return 'Dismissed';
    }

    return null;
  }

  shareApp = async () => {
    const message = this.shareMessage + (isAndroid ? ' ' + this.shareUrl : ''); // On Android add link to end of message
    try {
      const shareAction = await Share.share({
        message,
        url: this.shareUrl, // IOS has separate field for URL
      });

      const sharedOn = this.extractSharedOn(shareAction);
      Analytics.track(events.SHARE_THIS_APP, { sharedOn });
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

        <BrandedButton onPress={this.shareApp} style={styles.shareButton}>
          {i18n.t('share-this-app.button-text')}
        </BrandedButton>
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
