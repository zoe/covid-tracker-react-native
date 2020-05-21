import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RouteProp } from '@react-navigation/native';
import { Linking } from 'expo';
import React, { Component } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { covidIcon, menuIcon, gbPartnersReturn, svPartnersReturn, usPartnersReturn } from '../../../assets';
import { colors } from '../../../theme';
import { ContributionCounter } from '../../components/ContributionCounter';
import { BrandedButton, RegularText } from '../../components/Text';
import AnalyticsService from '../../core/Analytics';
import { isGBCountry, isSECountry, isUSCountry } from '../../core/user/UserService';
import i18n from '../../locale/i18n';
import Navigator, { NavigationType } from '../Navigation';
import { ScreenParamList } from '../ScreenParamList';
import { CalloutBox } from '../../components/CalloutBox';
import { ApiErrorState, initialErrorState } from '../../core/ApiServiceErrors';
import { offlineService, pushNotificationService, userService } from '../../Services';
import { LoadingModal } from '../../components/Loading';
import { cleanIntegerVal } from '../../core/utils/number';

type PropsType = {
  navigation: DrawerNavigationProp<ScreenParamList, 'WelcomeRepeat'>;
  route: RouteProp<ScreenParamList, 'WelcomeRepeat'>;
  patientId: string;
};

type WelcomeRepeatScreenState = {
  userCount: number | null;
  onRetry?: () => void;
} & ApiErrorState;

const initialState = {
  ...initialErrorState,
  userCount: null,
};

export class WelcomeRepeatScreen extends Component<PropsType, WelcomeRepeatScreenState> {
  state: WelcomeRepeatScreenState = initialState;

  async componentDidMount() {
    Navigator.resetNavigation((this.props.navigation as unknown) as NavigationType);
    const userCount = await userService.getUserCount();
    this.setState({ userCount: cleanIntegerVal(userCount as string) });
    AnalyticsService.identify();
    await pushNotificationService.refreshPushToken();
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

  navigateToPrivacyPolicy = () => {
    if (isUSCountry()) {
      this.props.navigation.navigate('PrivacyPolicyUS', { viewOnly: true });
    } else {
      this.props.navigation.navigate('PrivacyPolicyUK', { viewOnly: true });
    }
  };

  getWebsiteUrl = () => {
    if (isUSCountry()) {
      return 'https://covid.joinzoe.com/us';
    } else if (isSECountry()) {
      return 'https://covid19app.lu.se/';
    } else {
      return 'https://covid.joinzoe.com/';
    }
  };

  partnersLogos = () => {
    if (isGBCountry()) {
      return gbPartnersReturn;
    } else if (isSECountry()) {
      return svPartnersReturn;
    } else {
      return usPartnersReturn;
    }
  };

  render() {
    const calloutContent = {
      title: i18n.t('welcome.research'),
      description: i18n.t('welcome.see-how-your-area-is-affected'),
      link: {
        title: i18n.t('welcome.visit-the-website'),
        url: this.getWebsiteUrl(),
      },
    };

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
          <View style={styles.rootContainer}>
            <View style={styles.headerRow}>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.toggleDrawer();
                }}>
                <Image source={menuIcon} style={styles.menuIcon} />
              </TouchableOpacity>
            </View>

            <View style={styles.covidIconBackground}>
              <Image source={covidIcon} style={styles.covidIcon} resizeMode="contain" />
            </View>

            <Text style={styles.appName}>{i18n.t('welcome.title')}</Text>

            <RegularText style={styles.subtitle}>{i18n.t('welcome.take-a-minute')}</RegularText>

            <ContributionCounter variant={2} count={this.state.userCount} />

            <Image style={styles.partnersLogo} source={this.partnersLogos()} />

            <View style={{ flex: 1 }} />

            <CalloutBox content={calloutContent} />
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
  rootContainer: {
    paddingHorizontal: 24,
    paddingTop: 24,
    flex: 1,
    alignItems: 'center',
  },
  headerRow: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'flex-end',
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

  partnersLogo: {
    width: '95%',
    height: 100,
    resizeMode: 'contain',
  },
  menuIcon: {
    height: 20,
    width: 20,
    tintColor: colors.white,
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
