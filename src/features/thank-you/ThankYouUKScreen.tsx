import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Text } from 'native-base';
import React, { Component } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';

import { colors } from '@theme';
import { AppRating, shouldAskForRating } from '@covid/components/AppRating';
import InviteToStudy from '@covid/components/InviteToStudy';
import { Header } from '@covid/components/Screen';
import { ShareAppCard } from '@covid/components/Cards/ShareApp';
import { BrandedButton, ClickableText, HeaderText, RegularText } from '@covid/components/Text';
import { lazyInject } from '@covid/provider/services';
import { Services } from '@covid/provider/services.types';
import { ICoreService } from '@covid/core/user/UserService';
import i18n from '@covid/locale/i18n';
import PushNotificationService, { IPushTokenEnvironment } from '@covid/core/push-notifications/PushNotificationService';
import ExpoPushTokenEnvironment from '@covid/core/push-notifications/expo';
import { IContentfulService, IThankYouModuleModel } from '@covid/core/contentful/ContentfulService';
import { ContentfulThankYouModule } from '@covid/components/Content/ContentfulThankYouModule';

import { ScreenParamList } from '../ScreenParamList';

type RenderProps = {
  navigation: StackNavigationProp<ScreenParamList, 'ThankYouUK'>;
  route: RouteProp<ScreenParamList, 'ThankYouUK'>;
};

type State = {
  askForRating: boolean;
  inviteToStudy: boolean;
  shouldShowReminders: boolean;
  incidenceModule?: IThankYouModuleModel;
  modules: IThankYouModuleModel[];
};

const initialState = {
  askForRating: false,
  inviteToStudy: false,
  shouldShowReminders: false,
  modules: [],
};

export default class ThankYouUKScreen extends Component<RenderProps, State> {
  @lazyInject(Services.User)
  private userService: ICoreService;
  @lazyInject(Services.ContentfulService)
  private contentfulService: IContentfulService;

  private pushService: IPushTokenEnvironment = new ExpoPushTokenEnvironment();

  state: State = initialState;

  async componentDidMount() {
    const modules = await this.contentfulService.getThankYouModules();
    this.setState({
      askForRating: await shouldAskForRating(),
      inviteToStudy: await this.userService.shouldAskForValidationStudy(true),
      shouldShowReminders: !(await this.pushService.isGranted()),
      modules: await this.contentfulService.getThankYouModules(),
      incidenceModule: modules.find((module) => module.slug === 'incidence'),
    });

    console.log(modules.find((module) => module.id)?.image.url);
  }

  module(slug: string): IThankYouModuleModel | undefined {
    return this.state.modules.find((module) => module.slug === slug);
  }

  get incidenceModule() {
    return this.module('incidence');
  }
  get dataModule() {
    return this.module('data');
  }
  get blogModule() {
    return this.module('blog');
  }
  get notificationRemindersModule() {
    return this.module('notificationReminders');
  }
  get timsVideoModule() {
    return this.module('timsVideo');
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

              {this.incidenceModule && <ContentfulThankYouModule {...this.incidenceModule} />}

              {this.dataModule && <ContentfulThankYouModule {...this.dataModule} />}

              {this.timsVideoModule && <ContentfulThankYouModule {...this.timsVideoModule} />}

              {this.blogModule && <ContentfulThankYouModule {...this.blogModule} />}

              {this.state.shouldShowReminders && this.notificationRemindersModule && (
                <ContentfulThankYouModule
                  {...this.notificationRemindersModule}
                  action={() => {
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
