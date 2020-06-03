import { Text } from 'native-base';

import { blog001, incidence001, studyInvite, surveyInvite, webinar001 } from '@assets';
import { CovidRating, shouldAskForRating } from '@covid/components/CovidRating';
import { Header } from '@covid/components/Screen';
import ShareThisApp from '@covid/components/ShareThisApp';
import { BrandedButton, HeaderText, RegularText } from '@covid/components/Text';
import Navigator from '@covid/features/Navigation';
import i18n from '@covid/locale/i18n';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors } from '@theme';
import React, { Component } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';

import { ScreenParamList } from './ScreenParamList';
import { ExternalCallout } from '@covid/components/ExternalCallout';

type RenderProps = {
  navigation: StackNavigationProp<ScreenParamList, 'ThankYouUK'>;
  route: RouteProp<ScreenParamList, 'ThankYouUK'>;
};

export default class ThankYouUKScreen extends Component<RenderProps, { askForRating: boolean }> {
  state = {
    askForRating: false,
    inviteToStudy: false,
  };

  async componentDidMount() {
    // Ask for rating if not asked before and server indicates eligible.
    if (await shouldAskForRating()) {
      this.setState({ askForRating: true });
    }

    // TODO: Set inviteToStudy based on eligibility
  }

  gotoNextScreen = async () => {
    try {
      // TODO Is PatientID needed here?
      const patientId = '';
      await Navigator.gotoNextScreen(this.props.route.name, { patientId });
    } catch (error) {
      // Pass
    }
  };

  render() {
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

              <ExternalCallout
                link="https://covid.joinzoe.com/data"
                calloutID="incidence_001"
                imageSource={incidence001}
                aspectRatio={1.5}
              />

              <ExternalCallout
                link="https://www.youtube.com/watch?v=3nqlg0VPFi8&feature=emb_title"
                calloutID="webinar_001"
                imageSource={webinar001}
                aspectRatio={1.178}
              />

              <ExternalCallout
                link="https://covid.joinzoe.com/post/science-covid-diagnosis"
                calloutID="blog_001"
                imageSource={blog001}
                aspectRatio={1.551}
              />

              <ExternalCallout
                link="https://covid.joinzoe.com/"
                calloutID="surveyInvite"
                imageSource={surveyInvite}
                aspectRatio={3.38}
              />

              <View style={{ margin: 10 }} />

              <ShareThisApp />

              {this.state.inviteToStudy && (
                <View style={styles.socialIconContainer}>
                  <Image source={studyInvite} style={styles.socialIcon} />
                </View>
              )}

              <View style={styles.content}>
                <RegularText style={styles.signOff}>{i18n.t('thank-you-uk.sign-off')}</RegularText>
              </View>

              <BrandedButton onPress={this.gotoNextScreen} style={styles.done}>
                <Text style={styles.doneText}>{i18n.t('thank-you-uk.cta-multi-profile')}</Text>
              </BrandedButton>
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
  },
  subTitle: {
    textAlign: 'center',
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
  done: {
    marginTop: 10,
    marginBottom: 20,
    marginHorizontal: 30,
    backgroundColor: colors.backgroundSecondary,
    borderColor: colors.primary,
    borderWidth: 1,
  },
  doneText: {
    color: colors.primary,
  },
});
