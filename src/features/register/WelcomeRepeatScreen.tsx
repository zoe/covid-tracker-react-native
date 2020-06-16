import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RouteProp } from '@react-navigation/native';
import React, { Component } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

import { covidIcon } from '@assets';
import { colors } from '@theme';
import { CalloutBox } from '@covid/components/CalloutBox';
import { ContributionCounter } from '@covid/components/ContributionCounter';
import { LoadingModal } from '@covid/components/Loading';
import { Partnership } from '@covid/components/Partnership';
import { PoweredByZoe } from '@covid/components/PoweredByZoe';
import { BrandedButton, RegularText } from '@covid/components/Text';
import AnalyticsService from '@covid/core/Analytics';
import { ApiErrorState, initialErrorState } from '@covid/core/api/ApiServiceErrors';
import { cleanIntegerVal } from '@covid/core/utils/number';
import i18n from '@covid/locale/i18n';
import { contentService, offlineService, pushNotificationService, userService } from '@covid/Services';
import { DrawerToggle } from '@covid/components/DrawerToggle';
import { ScreenContent } from '@covid/core/content/ScreenContentContracts';

import Navigator, { NavigationType } from '../Navigation';
import { ScreenParamList } from '../ScreenParamList';

type PropsType = {
  navigation: DrawerNavigationProp<ScreenParamList, 'WelcomeRepeat'>;
  route: RouteProp<ScreenParamList, 'WelcomeRepeat'>;
  patientId: string;
};

type WelcomeRepeatScreenState = {
  userCount: number | null;
  showPartnerLogos: boolean;
  onRetry?: () => void;
  calloutBoxContent: ScreenContent;
} & ApiErrorState;

const initialState = {
  ...initialErrorState,
  userCount: null,
  showPartnerLogos: true,
  calloutBoxContent: contentService.getCalloutBoxDefault(),
};

export class WelcomeRepeatScreen extends Component<PropsType, WelcomeRepeatScreenState> {
  state: WelcomeRepeatScreenState = initialState;

  async componentDidMount() {
    Navigator.resetNavigation((this.props.navigation as unknown) as NavigationType);
    const userCount = await contentService.getUserCount();
    this.setState({ userCount: cleanIntegerVal(userCount as string) });
    const feature = userService.getConfig();
    this.setState({ showPartnerLogos: feature.showPartnerLogos });
    AnalyticsService.identify();
    await pushNotificationService.refreshPushToken();

    const content = await contentService.getWelcomeRepeatContent();
    console.log('CONTENT: ' + JSON.stringify(content));
    this.setState({ calloutBoxContent: content });
  }

  gotoNextScreen = async () => {
    const patientId = this.props.route.params.patientId;

    try {
      await Navigator.gotoNextScreen(this.props.route.name, { patientId });
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
            <DrawerToggle navigation={this.props.navigation} style={{ tintColor: colors.white }} />
          </View>
          <View style={styles.rootContainer}>
            <View style={styles.covidIconBackground}>
              <Image source={covidIcon} style={styles.covidIcon} resizeMode="contain" />
            </View>

            <Text style={styles.appName}>{i18n.t('welcome.title')}</Text>

            <RegularText style={styles.subtitle}>{i18n.t('welcome.take-a-minute')}</RegularText>

            <ContributionCounter variant={2} count={this.state.userCount} />

            {this.state.showPartnerLogos ? <Partnership /> : <PoweredByZoe />}

            <View style={{ flex: 1 }} />

            <CalloutBox content={this.state.calloutBoxContent} />
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
