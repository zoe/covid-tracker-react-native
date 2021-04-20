import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { Component } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';

import { notificationRemindersSE, seBlog001 } from '@assets';
import { colors, fontStyles } from '@theme';
import { AppRating, shouldAskForRating } from '@covid/features/thank-you/components/AppRating';
import { Header } from '@covid/components/Screen';
import { HeaderText, RegularText } from '@covid/components/Text';
import i18n from '@covid/locale/i18n';
import PushNotificationService, { IPushTokenEnvironment } from '@covid/core/push-notifications/PushNotificationService';
import ExpoPushTokenEnvironment from '@covid/core/push-notifications/expo';
import { ExternalCallout } from '@covid/components/ExternalCallout';
import assessmentCoordinator from '@covid/core/assessment/AssessmentCoordinator';
import { BrandedButton } from '@covid/components';
import { ScreenParamList } from '@covid/features';
import { FacebookSECard } from '@covid/features/thank-you/components/FacebookSE';
import { ShareAppCard } from '@covid/features/thank-you/components/ShareApp';

import VisitWebsite from './components/VisitWebsite';

type RenderProps = {
  navigation: StackNavigationProp<ScreenParamList, 'ThankYouSE'>;
  route: RouteProp<ScreenParamList, 'ThankYouSE'>;
};

type State = {
  askForRating: boolean;
  shouldShowReminders: boolean;
};

const initialState = {
  askForRating: false,
  shouldShowReminders: false,
};

export default class ThankYouSEScreen extends Component<RenderProps, State> {
  private pushService: IPushTokenEnvironment = new ExpoPushTokenEnvironment();

  state = initialState;

  async componentDidMount() {
    // Ask for rating if not asked before and server indicates eligible.
    this.setState({
      askForRating: await shouldAskForRating(),
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
                <HeaderText style={styles.headerText}>{i18n.t('thank-you-title')}</HeaderText>
              </Header>

              <View>
                <RegularText style={styles.subTitle}> {i18n.t('thank-you-body')}</RegularText>
              </View>

              {/*<FacebookSECard />*/}

              <ExternalCallout
                calloutID="se_blog_001"
                imageSource={seBlog001}
                aspectRatio={1.777}
                screenName={this.props.route.name}
                imageStyles={{ borderRadius: 8 }}
                link="https://www.facebook.com/events/356299709120596/"
              />

              {this.state.shouldShowReminders && (
                <ExternalCallout
                  calloutID="notificationRemindersSE"
                  imageSource={notificationRemindersSE}
                  aspectRatio={311.0 / 104.0}
                  screenName={this.props.route.name}
                  postClicked={() => {
                    PushNotificationService.openSettings();
                  }}
                />
              )}

              <ShareAppCard />
              <VisitWebsite />

              <RegularText style={styles.shareSubtitle}>{i18n.t('check-in-tomorrow')}</RegularText>

              <BrandedButton
                onPress={() => assessmentCoordinator.gotoNextScreen(this.props.route.name)}
                style={styles.done}>
                <RegularText>{i18n.t('thank-you-completed')}</RegularText>
              </BrandedButton>
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    backgroundColor: colors.backgroundSecondary,
    justifyContent: 'space-between',
  },
  rootContainer: {
    padding: 10,
  },
  headerText: {
    textAlign: 'center',
    marginTop: 15,
  },
  content: {
    marginVertical: 32,
    marginHorizontal: 18,
  },
  subTitle: {
    textAlign: 'center',
    marginBottom: 15,
    marginHorizontal: 22,
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
    ...fontStyles.bodySmallLight,
    // paddingVertical: 10,
    paddingHorizontal: 16,
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
    marginTop: 24,
    marginBottom: 20,
    marginHorizontal: 8,
    backgroundColor: colors.backgroundSecondary,
    borderColor: colors.tertiary,
    borderWidth: 1,
  },
});
