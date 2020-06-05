import { blog001, incidence001, surveyInvite, webinar001 } from '@assets';
import { userService } from '@covid/Services';
import { CovidRating, shouldAskForRating } from '@covid/components/CovidRating';
import { ExternalCallout } from '@covid/components/ExternalCallout';
import InviteToStudy from '@covid/components/InviteToStudy';
import { Header } from '@covid/components/Screen';
import ShareThisApp from '@covid/components/ShareThisApp';
import { BrandedButton, ClickableText, HeaderText, RegularText } from '@covid/components/Text';
import { experiments, startExperiment } from '@covid/core/Experiments';
import i18n from '@covid/locale/i18n';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors } from '@theme';
import { Text } from 'native-base';
import React, { Component } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';

import { ScreenParamList } from './ScreenParamList';

type RenderProps = {
  navigation: StackNavigationProp<ScreenParamList, 'ThankYouUK'>;
  route: RouteProp<ScreenParamList, 'ThankYouUK'>;
};

type State = {
  askForRating: boolean;
  inviteToStudy: boolean;
  variant: string | null;
};

const initialState = {
  askForRating: false,
  inviteToStudy: false,
  variant: null,
};

export default class ThankYouUKScreen extends Component<RenderProps, State> {
  state = initialState;

  async componentDidMount() {
    this.setState({
      askForRating: await shouldAskForRating(),
      variant: await startExperiment(experiments.Experiment_001, 4),
      inviteToStudy: await userService.shouldAskForValidationStudy(true),
    });
  }

  render() {
    const showIncidenceCallout = this.state.variant === 'variant_1' || this.state.variant === 'variant_4';
    const showWebinarCallout = this.state.variant === 'variant_2' || this.state.variant === 'variant_4';
    const showBlogCallout = this.state.variant === 'variant_3' || this.state.variant === 'variant_4';
    return (
      <>
        {this.state.askForRating && <CovidRating />}
        <SafeAreaView>
          <ScrollView contentContainerStyle={styles.scrollView}>
            <View style={styles.rootContainer}>
              <Header>
                <HeaderText style={styles.headerText}>{i18n.t('thank-you-uk.title')}</HeaderText>
              </Header>

              <View>
                <RegularText style={styles.subTitle}>{i18n.t('thank-you-uk.subtitle')}</RegularText>
              </View>

              {showIncidenceCallout && (
                <ExternalCallout
                  link="https://covid.joinzoe.com/data#daily-new-cases?utm_source=App"
                  calloutID="incidence_001"
                  imageSource={incidence001}
                  aspectRatio={1.5}
                />
              )}

              {showWebinarCallout && (
                <ExternalCallout
                  link="https://youtu.be/oAmVPaxMQ1c"
                  calloutID="webinar_001"
                  imageSource={webinar001}
                  aspectRatio={1.178}
                />
              )}

              {showBlogCallout && (
                <ExternalCallout
                  link="https://covid.joinzoe.com/post/science-covid-diagnosis?utm_source=App"
                  calloutID="blog_001"
                  imageSource={blog001}
                  aspectRatio={1.551}
                />
              )}

              <ExternalCallout
                link="https://www.surveymonkey.co.uk/r/LC26RN9"
                calloutID="surveyInvite"
                imageSource={surveyInvite}
                aspectRatio={3.38}
              />

              <View style={{ margin: 10 }} />

              <ShareThisApp />

              {this.state.inviteToStudy && <InviteToStudy placement="ThankYouUK" />}

              <View style={styles.content}>
                <RegularText style={styles.signOff}>{i18n.t('thank-you-uk.sign-off')}</RegularText>
              </View>

              <BrandedButton
                onPress={() => this.props.navigation.navigate('WelcomeRepeat')}
                style={styles.ctaSingleProfile}>
                <Text style={styles.ctaSingleProfileText}>{i18n.t('thank-you-uk.cta-single-profile')}</Text>
              </BrandedButton>

              <View style={styles.ctaMultipleProfile}>
                <ClickableText
                  onPress={() => this.props.navigation.navigate('SelectProfile')}
                  style={styles.ctaMultipleProfileText}>
                  {i18n.t('thank-you-uk.cta-multi-profile')}
                </ClickableText>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  headerText: {
    textAlign: 'center',
    marginTop: 15,
  },
  subTitle: {
    textAlign: 'center',
    marginBottom: 15,
  },
  signOff: {
    textAlign: 'center',
  },
  content: {
    marginVertical: 32,
    marginHorizontal: 18,
  },
  scrollView: {
    flexGrow: 1,
    backgroundColor: colors.backgroundSecondary,
  },
  rootContainer: {
    alignSelf: 'center',
    maxWidth: 500,
    padding: 10,
  },
  socialIconContainer: {
    marginVertical: -10,
    borderRadius: 10,
    marginHorizontal: 10,
    alignSelf: 'center',
  },
  socialIcon: {
    resizeMode: 'contain',
    width: '100%',
    height: undefined,
    aspectRatio: 1,
  },
  ctaMultipleProfile: {
    paddingTop: 15,
    paddingBottom: 24,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  ctaMultipleProfileText: {
    color: colors.primary,
  },
  ctaSingleProfileText: {
    color: colors.primary,
  },
  ctaSingleProfile: {
    marginTop: 10,
    marginBottom: 20,
    marginHorizontal: 40,
    backgroundColor: colors.backgroundSecondary,
    borderColor: colors.primary,
    borderWidth: 1,
  },
});
