import { notificationRemindersSE, seBlog001 } from '@assets';
import { BrandedButton } from '@covid/components';
import { ExternalCallout } from '@covid/components/ExternalCallout';
import { Header } from '@covid/components/Screen';
import { HeaderText, RegularText } from '@covid/components/Text';
import assessmentCoordinator from '@covid/core/assessment/AssessmentCoordinator';
import ExpoPushTokenEnvironment from '@covid/core/push-notifications/expo';
import PushNotificationService, { IPushTokenEnvironment } from '@covid/core/push-notifications/PushNotificationService';
import { ScreenParamList } from '@covid/features';
import { AppRating, shouldAskForRating } from '@covid/features/thank-you/components/AppRating';
import { FacebookSECard } from '@covid/features/thank-you/components/FacebookSE';
import { ShareAppCard } from '@covid/features/thank-you/components/ShareApp';
import i18n from '@covid/locale/i18n';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors, fontStyles } from '@theme';
import React, { Component } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';

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

              {/* <FacebookSECard /> */}

              <ExternalCallout
                aspectRatio={1.777}
                calloutID="se_blog_001"
                imageSource={seBlog001}
                imageStyles={{ borderRadius: 8 }}
                link="https://www.facebook.com/events/356299709120596/"
                screenName={this.props.route.name}
              />

              {this.state.shouldShowReminders ? (
                <ExternalCallout
                  aspectRatio={311.0 / 104.0}
                  calloutID="notificationRemindersSE"
                  imageSource={notificationRemindersSE}
                  postClicked={() => {
                    PushNotificationService.openSettings();
                  }}
                  screenName={this.props.route.name}
                />
              ) : null}

              <ShareAppCard />
              <VisitWebsite />

              <RegularText style={styles.shareSubtitle}>{i18n.t('check-in-tomorrow')}</RegularText>

              <BrandedButton
                onPress={() => assessmentCoordinator.gotoNextScreen(this.props.route.name)}
                style={styles.done}
              >
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
  content: {
    marginHorizontal: 18,
    marginVertical: 32,
  },
  done: {
    backgroundColor: colors.backgroundSecondary,
    borderColor: colors.tertiary,
    borderWidth: 1,
    marginBottom: 20,
    marginHorizontal: 8,
    marginTop: 24,
  },
  headerText: {
    marginTop: 15,
    textAlign: 'center',
  },
  newsFeed: {
    color: colors.primary,
    fontSize: 20,
    paddingHorizontal: 40,
    paddingVertical: 20,
    textAlign: 'center',
  },
  newsFeedClickable: {
    color: colors.purple,
    fontSize: 20,
    textDecorationLine: 'underline',
  },
  rootContainer: {
    padding: 10,
  },
  scrollView: {
    backgroundColor: colors.backgroundSecondary,
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  shareSubtitle: {
    ...fontStyles.bodySmallLight,

    color: colors.secondary,
    // paddingVertical: 10,
    paddingHorizontal: 16,
    textAlign: 'center',
  },
  socialIcon: {
    height: 60,
    marginLeft: 5,
    marginTop: 5,
    resizeMode: 'contain',
  },
  subTitle: {
    marginBottom: 15,
    marginHorizontal: 22,
    textAlign: 'center',
  },
});
