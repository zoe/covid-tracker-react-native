import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Linking } from 'expo';
import React, { Component } from 'react';
import { Image, SafeAreaView, ScrollView, Share, StyleSheet, View } from 'react-native';
import reactStringReplace from 'react-string-replace';

import { social } from '../../assets';
import { colors } from '../../theme';
import { CovidRating, shouldAskForRating } from '../components/CovidRating';
import ProgressStatus from '../components/ProgressStatus';
import { Header, isAndroid, ProgressBlock } from '../components/Screen';
import { BrandedButton, ClickableText, HeaderText, RegularBoldText, RegularText } from '../components/Text';
import i18n from '../locale/i18n';
import { ScreenParamList } from './ScreenParamList';

type RenderProps = {
  navigation: StackNavigationProp<ScreenParamList, 'ThankYou'>;
  route: RouteProp<ScreenParamList, 'ThankYou'>;
};

export default class ThankYouScreen extends Component<RenderProps, { askForRating: boolean }> {
  state = {
    askForRating: false,
  };

  shareMessage = i18n.t('share-with-friends-message');
  shareUrl = i18n.t('share-with-friends-url');

  shareApp = async () => {
    const message = this.shareMessage + (isAndroid ? ' ' + this.shareUrl : ''); // On Android add link to end of message
    try {
      await Share.share({
        message,
        url: this.shareUrl, // IOS has separate field for URL
      });
    } catch (error) {}
  };

  async componentDidMount() {
    // Ask for rating if not asked before and server indicates eligible.
    if (await shouldAskForRating()) {
      this.setState({ askForRating: true });
    }
  }

  render() {
    return (
      <>
        {this.state.askForRating && <CovidRating />}
        <SafeAreaView>
          <ScrollView contentContainerStyle={styles.scrollView}>
            <View style={styles.rootContainer}>
              <Header>
                <HeaderText>{i18n.t('thank-you-title')}</HeaderText>
              </Header>

              <ProgressBlock>
                <ProgressStatus step={5} maxSteps={5} />
              </ProgressBlock>

              <View style={styles.content}>
                <RegularText>{i18n.t('thank-you-body')}</RegularText>
              </View>

              <View style={styles.shareContainer}>
                <View style={styles.socialIconContainer}>
                  <Image source={social} style={styles.socialIcon} />
                </View>
                <RegularBoldText style={styles.share}>{i18n.t('thank-you.please-share-app')}</RegularBoldText>
                <RegularText style={styles.shareSubtitle}>{i18n.t('thank-you.share-text')}</RegularText>
                <BrandedButton onPress={this.shareApp} style={styles.shareButton}>
                  {i18n.t('thank-you.btn-share')}
                </BrandedButton>
              </View>

              <ClickableText onPress={() => Linking.openURL(i18n.t('blog-link'))} style={styles.newsFeed}>
                {reactStringReplace(
                  i18n.t('thank-you.check-for-updates', { link: '{{LINK}}' }),
                  '{{LINK}}',
                  (match, i) => (
                    <RegularText key={i} style={styles.newsFeedClickable}>
                      {i18n.t('thank-you.news-feed')}
                    </RegularText>
                  )
                )}
              </ClickableText>
              <RegularText style={styles.shareSubtitle}>{i18n.t('check-in-tomorrow')}</RegularText>

              <ClickableText onPress={this.props.navigation.popToTop} style={styles.done}>
                {i18n.t('completed')}
              </ClickableText>
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    justifyContent: 'space-between',
    marginVertical: 32,
    marginHorizontal: 18,
  },
  scrollView: {
    flexGrow: 1,
    backgroundColor: colors.backgroundSecondary,
    justifyContent: 'space-between',
  },
  rootContainer: {
    padding: 10,
  },
  shareContainer: {
    backgroundColor: colors.white,
    borderRadius: 10,
    marginHorizontal: 20,
  },
  share: {
    fontSize: 20,
    textAlign: 'center',
  },
  newsFeed: {
    paddingVertical: 20,
    paddingHorizontal: 40,
    fontSize: 20,
    textAlign: 'center',
    color: colors.primary,
  },
  newsFeedClickable: {
    fontSize: 20,
    color: colors.purple,
    textDecorationLine: 'underline',
  },
  shareSubtitle: {
    paddingVertical: 10,
    paddingHorizontal: 40,
    textAlign: 'center',
    color: colors.secondary,
  },
  shareButton: {
    marginVertical: 20,
    marginHorizontal: 30,
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
  done: {
    alignSelf: 'center',
    margin: 40,
    fontSize: 24,
    color: colors.brand,
  },
});
