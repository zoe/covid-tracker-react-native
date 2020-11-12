import { DrawerNavigationProp } from '@react-navigation/drawer';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import React, { Component } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import { covidIcon } from '@assets';
import { colors } from '@theme';
import { CalloutBox } from '@covid/components/CalloutBox';
import { ContributionCounter } from '@covid/components/ContributionCounter';
import { LoadingModal } from '@covid/components/Loading';
import { PartnerLogoSE, PartnerLogoUS } from '@covid/components/Logos/PartnerLogo';
import { PoweredByZoe } from '@covid/components/Logos/PoweredByZoe';
import { BrandedButton, RegularText } from '@covid/components/Text';
import AnalyticsService from '@covid/core/Analytics';
import { ApiErrorState, initialErrorState } from '@covid/core/api/ApiServiceErrors';
import { cleanIntegerVal } from '@covid/utils/number';
import i18n from '@covid/locale/i18n';
import { offlineService, pushNotificationService } from '@covid/Services';
import { DrawerToggle } from '@covid/components/DrawerToggle';
import { ScreenContent } from '@covid/core/content/ScreenContentContracts';
import { lazyInject, container } from '@covid/provider/services';
import { Services } from '@covid/provider/services.types';
import { IUserService } from '@covid/core/user/UserService';
import { IContentService } from '@covid/core/content/ContentService';
import { ILocalisationService, isUSCountry, isSECountry } from '@covid/core/localisation/LocalisationService';
import { IConsentService } from '@covid/core/consent/ConsentService';
import appCoordinator from '@covid/features/AppCoordinator';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import { openWebLink } from '@covid/utils/links';

type PropsType = {
  navigation: CompositeNavigationProp<
    StackNavigationProp<ScreenParamList, 'WelcomeRepeat'>,
    DrawerNavigationProp<ScreenParamList>
  >;
  route: RouteProp<ScreenParamList, 'WelcomeRepeat'>;
};

type WelcomeRepeatScreenState = {
  userCount: number | null;
  onRetry?: () => void;
  calloutBoxContent: ScreenContent;
} & ApiErrorState;

const initialState = {
  ...initialErrorState,
  userCount: null,
  calloutBoxContent: container.get<IContentService>(Services.Content).getCalloutBoxDefault(),
};

export class WelcomeRepeatScreen extends Component<PropsType, WelcomeRepeatScreenState> {
  @lazyInject(Services.User)
  private readonly userService: IUserService;

  @lazyInject(Services.Localisation)
  private readonly localisationService: ILocalisationService;

  @lazyInject(Services.Content)
  private readonly contentService: IContentService;

  @lazyInject(Services.Consent)
  private readonly consentService: IConsentService;

  state: WelcomeRepeatScreenState = initialState;

  async componentDidMount() {
    const userCount = await this.contentService.getUserCount();
    const cleanUserCount = userCount ? cleanIntegerVal(userCount as string) : 0;

    AnalyticsService.identify();
    await pushNotificationService.refreshPushToken();

    this.setState({
      calloutBoxContent: this.contentService.getCalloutBoxDefault(),
      userCount: cleanUserCount,
    });
  }

  gotoNextScreen = async () => {
    try {
      await appCoordinator.gotoNextScreen(this.props.route.name);
    } catch (error) {
      this.setState({
        isApiError: true,
        error,
        onRetry: () => {
          this.setState({
            status: i18n.t('errors.status-retrying'),
            error: null,
          });
          setTimeout(() => {
            this.setState({ status: i18n.t('errors.status-loading') });
            this.gotoNextScreen();
          }, offlineService.getRetryDelay());
        },
      });
    }
  };

  displayPartnerLogo = () => {
    return isUSCountry() ? <PartnerLogoUS /> : isSECountry() ? <PartnerLogoSE /> : <PoweredByZoe />;
  };

  render() {
    return (
      <SafeAreaView style={styles.safeView}>
        {this.state.isApiError && (
          <LoadingModal
            error={this.state.error}
            status={this.state.status}
            onRetry={this.state.onRetry}
            onPress={() => this.setState({ isApiError: false })}
          />
        )}
        <ScrollView>
          <View style={styles.headerContainer}>
            <DrawerToggle
              navigation={this.props.navigation as DrawerNavigationProp<ScreenParamList>}
              style={{ tintColor: colors.white }}
            />
          </View>
          <View style={styles.rootContainer}>
            <View style={styles.covidIconBackground}>
              <Image source={covidIcon} style={styles.covidIcon} resizeMode="contain" />
            </View>

            <Text style={styles.appName}>{i18n.t('welcome.title')}</Text>

            <RegularText style={styles.subtitle}>{i18n.t('welcome.take-a-minute')}</RegularText>

            <ContributionCounter variant={2} count={this.state.userCount} />

            {this.displayPartnerLogo()}

            <CalloutBox
              content={this.state.calloutBoxContent}
              onPress={() => openWebLink(this.state.calloutBoxContent.body_link)}
            />
          </View>
        </ScrollView>
        <View style={styles.reportContainer}>
          <BrandedButton style={styles.reportButton} onPress={this.gotoNextScreen}>
            {i18n.t('welcome.report-button')}
          </BrandedButton>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
    backgroundColor: colors.brand,
  },
  headerContainer: {
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  rootContainer: {
    paddingHorizontal: 24,
    alignItems: 'center',
    flex: 1,
  },
  covidIconBackground: {
    backgroundColor: colors.predict,
    padding: 8,
    borderRadius: 8,
    marginVertical: 24,
  },
  covidIcon: {
    height: 48,
    width: 48,
  },
  appName: {
    color: colors.white,
    fontSize: 14,
  },
  subtitle: {
    color: colors.white,
    fontSize: 24,
    lineHeight: 38,
    textAlign: 'center',
    marginTop: 16,
  },

  reportContainer: {
    padding: 20,
  },
  reportButton: {
    textAlign: 'center',
    backgroundColor: colors.purple,
    alignSelf: 'center',
    width: '100%',
    elevation: 0,
  },
});
