import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { Component } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';

import { colors } from '../../theme';
import { CovidRating, shouldAskForRating } from '../components/CovidRating';
import Donate from '../components/Donate';
import ProgressStatus from '../components/ProgressStatus';
import { Header, ProgressBlock } from '../components/Screen';
import ShareThisApp from '../components/ShareThisApp';
import { ClickableText, HeaderText, RegularText } from '../components/Text';
import VisitWebsite from '../components/VisitWebsite';
import { isGBCountry } from '../core/user/UserService';
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

              {isGBCountry() ? (
                <>
                  <Donate />
                  <VisitWebsite />
                  <ShareThisApp ctaStyle="link" />
                </>
              ) : (
                <>
                  <ShareThisApp ctaStyle="button" />
                  <VisitWebsite />
                </>
              )}

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
