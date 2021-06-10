import { notificationReminders } from '@assets';
import { BrandedButton, FeaturedContentList, FeaturedContentType } from '@covid/components';
import { ExternalCallout } from '@covid/components/ExternalCallout';
import { Header } from '@covid/components/Screen';
import { ClickableText, HeaderText, RegularText } from '@covid/components/Text';
import Analytics, { events } from '@covid/core/Analytics';
import assessmentCoordinator from '@covid/core/assessment/AssessmentCoordinator';
import { IConsentService } from '@covid/core/consent/ConsentService';
import ExpoPushTokenEnvironment from '@covid/core/push-notifications/expo';
import PushNotificationService, { IPushTokenEnvironment } from '@covid/core/push-notifications/PushNotificationService';
import store from '@covid/core/state/store';
import { ImpactTimelineCard } from '@covid/features/anniversary';
import appCoordinator from '@covid/features/AppCoordinator';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import { AppRating, shouldAskForRating } from '@covid/features/thank-you/components/AppRating';
import { ShareAppCard } from '@covid/features/thank-you/components/ShareApp';
import i18n from '@covid/locale/i18n';
import { lazyInject } from '@covid/provider/services';
import { Services } from '@covid/provider/services.types';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors } from '@theme';
import React, { Component } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';

import { BigGreenTickFilled } from './components/BigGreenTick';

type RenderProps = {
  navigation: StackNavigationProp<ScreenParamList, 'ThankYouUK'>;
  route: RouteProp<ScreenParamList, 'ThankYouUK'>;
};

type State = {
  askForRating: boolean;
  shouldShowReminders: boolean;
  showTimelineCard: boolean;
};

const initialState = {
  askForRating: false,
  shouldShowReminders: false,
  showTimelineCard: false,
};

export default class ThankYouUKScreen extends Component<RenderProps, State> {
  @lazyInject(Services.Consent)
  private consentService: IConsentService;

  private pushService: IPushTokenEnvironment = new ExpoPushTokenEnvironment();

  state = initialState;

  async componentDidMount() {
    this.setState({
      askForRating: await shouldAskForRating(),
      shouldShowReminders: !(await this.pushService.isGranted()),
    });
  }

  render() {
    const { startupInfo } = store.getState().content;

    return (
      <>
        {this.state.askForRating && <AppRating />}
        <SafeAreaView>
          <ScrollView contentContainerStyle={styles.scrollView} testID="scroll-view-thank-you-screen">
            <View style={styles.rootContainer}>
              <View style={{ marginTop: 24 }}>
                <BigGreenTickFilled />
              </View>

              <Header>
                <HeaderText style={styles.headerText}>{i18n.t('thank-you-uk.title')}</HeaderText>
              </Header>

              <RegularText style={styles.signOff}>{i18n.t('thank-you-uk.sign-off')}</RegularText>

              {startupInfo?.show_timeline ? (
                <ImpactTimelineCard
                  onPress={() => {
                    Analytics.track(events.ANNIVERSARY_FROM_THANKYOU);
                    appCoordinator.goToAnniversary();
                  }}
                  size="LARGE"
                />
              ) : null}

              <FeaturedContentList screenName={this.props.route.name} type={FeaturedContentType.ThankYou} />

              {this.state.shouldShowReminders ? (
                <ExternalCallout
                  aspectRatio={1244.0 / 368.0}
                  calloutID="notificationReminders"
                  imageSource={notificationReminders}
                  postClicked={() => {
                    PushNotificationService.openSettings();
                  }}
                  screenName={this.props.route.name}
                />
              ) : null}

              <View style={{ margin: 10 }} />

              <ShareAppCard />

              <BrandedButton
                onPress={() => assessmentCoordinator.gotoNextScreen(this.props.route.name)}
                style={styles.ctaSingleProfile}
                testID="button-back"
              >
                <RegularText style={styles.ctaSingleProfileText}>
                  {i18n.t('thank-you-uk.cta-single-profile')}
                </RegularText>
              </BrandedButton>

              <View style={styles.ctaMultipleProfile}>
                <ClickableText
                  onPress={() => assessmentCoordinator.gotoSelectProfile()}
                  style={styles.ctaMultipleProfileText}
                >
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
  ctaMultipleProfile: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 24,
    paddingTop: 15,
  },
  ctaMultipleProfileText: {
    color: colors.purple,
  },
  ctaSingleProfile: {
    backgroundColor: colors.backgroundSecondary,
    borderColor: colors.brand,
    borderWidth: 1,
    marginVertical: 20,
    paddingTop: 8,
  },
  ctaSingleProfileText: {
    color: colors.brand,
  },
  dateLabel: {
    marginBottom: 8,
    marginTop: -16,
    textAlign: 'center',
  },
  dietStudyImage: {
    aspectRatio: 1200 / 1266,
    height: undefined,
    marginVertical: 8,
    resizeMode: 'contain',
    width: '100%',
  },
  headerText: {
    textAlign: 'center',
  },
  rootContainer: {
    maxWidth: 500,
    padding: 16,
  },
  scrollView: {
    backgroundColor: colors.backgroundSecondary,
    flexGrow: 1,
  },
  signOff: {
    marginHorizontal: 16,
    textAlign: 'center',
  },
  socialIcon: {
    aspectRatio: 1,
    height: undefined,
    resizeMode: 'contain',
    width: '100%',
  },
  socialIconContainer: {
    alignSelf: 'center',
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: -10,
  },
  subTitle: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
