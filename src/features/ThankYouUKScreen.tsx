import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Text } from 'native-base';
import React, { Component } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';

import { blog004, dataPage003, incidence005, timUpdate003 } from '@assets';
import { colors } from '@theme';
import { AppRating, shouldAskForRating } from '@covid/components/AppRating';
import { ExternalCallout } from '@covid/components/ExternalCallout';
import InviteToStudy from '@covid/components/InviteToStudy';
import { Header } from '@covid/components/Screen';
import ShareThisApp from '@covid/components/ShareThisApp';
import { BrandedButton, ClickableText, HeaderText, RegularText } from '@covid/components/Text';
import { lazyInject } from '@covid/provider/services';
import { Services } from '@covid/provider/services.types';
import { ICoreService } from '@covid/core/user/UserService';
import i18n from '@covid/locale/i18n';

import { ScreenParamList } from './ScreenParamList';

type RenderProps = {
  navigation: StackNavigationProp<ScreenParamList, 'ThankYouUK'>;
  route: RouteProp<ScreenParamList, 'ThankYouUK'>;
};

type State = {
  askForRating: boolean;
  inviteToStudy: boolean;
};

const initialState = {
  askForRating: false,
  inviteToStudy: false,
};

export default class ThankYouUKScreen extends Component<RenderProps, State> {
  @lazyInject(Services.User)
  private userService: ICoreService;

  state = initialState;

  async componentDidMount() {
    this.setState({
      askForRating: await shouldAskForRating(),
      inviteToStudy: await this.userService.shouldAskForValidationStudy(true),
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
              />

              <ExternalCallout
                link="https://covid.joinzoe.com/data#daily-new-cases?utm_source=App"
                calloutID="incidence_005"
                imageSource={incidence005}
                aspectRatio={1.5}
              />

              <ExternalCallout
                link="https://youtu.be/ulG3Fet-SR8"
                calloutID="tim_update_003"
                imageSource={timUpdate003}
                aspectRatio={1.178}
              />

              <ExternalCallout
                link="https://covid.joinzoe.com/post/cancer-covid-risk?utm_source=App"
                calloutID="blog_004"
                imageSource={blog004}
                aspectRatio={1.551}
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
