import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Text } from 'native-base';
import React, { Component } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';

import { dataPage003, timUpdate011, notificationReminders, blog012 } from '@assets';
import { colors } from '@theme';
import { AppRating, shouldAskForRating } from '@covid/components/AppRating';
import { ExternalCallout } from '@covid/components/ExternalCallout';
import InviteToStudy from '@covid/components/InviteToStudy';
import { Header } from '@covid/components/Screen';
import { ShareAppCard } from '@covid/components/Cards/ShareApp';
import { BrandedButton, ClickableText, HeaderText, RegularText } from '@covid/components/Text';
import { lazyInject } from '@covid/provider/services';
import { Services } from '@covid/provider/services.types';
import i18n from '@covid/locale/i18n';
import PushNotificationService, { IPushTokenEnvironment } from '@covid/core/push-notifications/PushNotificationService';
import ExpoPushTokenEnvironment from '@covid/core/push-notifications/expo';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import appCoordinator from '@covid/features/AppCoordinator';
import { IConsentService } from '@covid/core/consent/ConsentService';
import assessmentCoordinator from '@covid/core/assessment/AssessmentCoordinator';

type RenderProps = {
  navigation: StackNavigationProp<ScreenParamList, 'ThankYouUK'>;
  route: RouteProp<ScreenParamList, 'ThankYouUK'>;
};

type State = {
  askForRating: boolean;
  inviteToStudy: boolean;
  shouldShowReminders: boolean;
};

const initialState = {
  askForRating: false,
  inviteToStudy: false,
  shouldShowReminders: false,
};

export default class ThankYouUKScreen extends Component<RenderProps, State> {
  @lazyInject(Services.Consent)
  private consentService: IConsentService;
  private pushService: IPushTokenEnvironment = new ExpoPushTokenEnvironment();

  state = initialState;

  async componentDidMount() {
    this.setState({
      askForRating: await shouldAskForRating(),
      inviteToStudy: await this.consentService.shouldAskForValidationStudy(true),
      shouldShowReminders: !(await this.pushService.isGranted()),
    });
  }

  render() {
    return (
      <>
        {this.state.askForRating && <AppRating />}
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
                link="https://covid.joinzoe.com/your-contribution?utm_source=App"
                calloutID="data_page_003"
                imageSource={dataPage003}
                aspectRatio={1.55}
                screenName={this.props.route.name}
              />

              <ExternalCallout
                link="https://covid.joinzoe.com/post/incidence-update-sept-25?utm_source=App"
                calloutID="blog_012"
                imageSource={blog012}
                aspectRatio={1.552}
                screenName={this.props.route.name}
              />

              <ExternalCallout
                link="https://youtu.be/sGqyHQIKDFs"
                calloutID="tim_update_011"
                imageSource={timUpdate011}
                aspectRatio={1.099}
                screenName={this.props.route.name}
              />

              {this.state.shouldShowReminders && (
                <ExternalCallout
                  calloutID="notificationReminders"
                  imageSource={notificationReminders}
                  aspectRatio={1244.0 / 368.0}
                  screenName={this.props.route.name}
                  postClicked={() => {
                    PushNotificationService.openSettings();
                  }}
                />
              )}

              <View style={{ margin: 10 }} />

              <ShareAppCard />

              {this.state.inviteToStudy && <InviteToStudy placement="ThankYouUK" />}

              <View style={styles.content}>
                <RegularText style={styles.signOff}>{i18n.t('thank-you-uk.sign-off')}</RegularText>
              </View>

              <BrandedButton
                onPress={() => assessmentCoordinator.gotoNextScreen(this.props.route.name)}
                style={styles.ctaSingleProfile}>
                <Text style={styles.ctaSingleProfileText}>{i18n.t('thank-you-uk.cta-single-profile')}</Text>
              </BrandedButton>

              <View style={styles.ctaMultipleProfile}>
                <ClickableText
                  onPress={() => assessmentCoordinator.gotoSelectProfile()}
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
