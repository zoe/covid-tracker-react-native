import { covidIcon } from '@assets';
import { BrandedButton } from '@covid/components';
import { CalloutBox } from '@covid/components/CalloutBox';
import { DrawerToggle } from '@covid/components/DrawerToggle';
import { LoadingModal } from '@covid/components/Loading';
import { PartnerLogoSE, PartnerLogoUS } from '@covid/components/logos/PartnerLogo';
import { PoweredByZoe } from '@covid/components/logos/PoweredByZoe';
import { RegularText } from '@covid/components/Text';
import { ApiErrorState, initialErrorState } from '@covid/core/api/ApiServiceErrors';
import { contentService } from '@covid/core/content/ContentService';
import { ScreenContent } from '@covid/core/content/ScreenContentContracts';
import { isSECountry, isUSCountry } from '@covid/core/localisation/LocalisationService';
import { appCoordinator } from '@covid/features/AppCoordinator';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import i18n from '@covid/locale/i18n';
import { offlineService, pushNotificationService } from '@covid/services';
import { openWebLink } from '@covid/utils/links';
import { cleanIntegerVal } from '@covid/utils/number';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors } from '@theme';
import * as React from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

import { ContributionCounter } from './components/ContributionCounter';

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
  calloutBoxContent: contentService.getCalloutBoxDefault(),
  userCount: null,
};

export class WelcomeRepeatScreen extends React.Component<PropsType, WelcomeRepeatScreenState> {
  state: WelcomeRepeatScreenState = initialState;

  async componentDidMount() {
    const userCount = await contentService.getUserCount();
    const cleanUserCount = userCount ? cleanIntegerVal(userCount as string) : 0;

    await pushNotificationService.subscribeForPushNotifications();

    this.setState({
      calloutBoxContent: contentService.getCalloutBoxDefault(),
      userCount: cleanUserCount,
    });
  }

  gotoNextScreen = async () => {
    try {
      await appCoordinator.gotoNextScreen(this.props.route.name);
    } catch (error) {
      this.setState({
        error,
        isApiError: true,
        onRetry: () => {
          this.setState({
            error: null,
            status: i18n.t('errors.status-retrying'),
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
        {this.state.isApiError ? (
          <LoadingModal
            error={this.state.error}
            onPress={() => this.setState({ isApiError: false })}
            onRetry={this.state.onRetry}
            status={this.state.status}
          />
        ) : null}
        <ScrollView>
          <View style={styles.headerContainer}>
            <DrawerToggle
              navigation={this.props.navigation as DrawerNavigationProp<ScreenParamList>}
              style={{ tintColor: colors.white }}
            />
          </View>
          <View style={styles.rootContainer}>
            <View style={styles.covidIconBackground}>
              <Image resizeMode="contain" source={covidIcon} style={styles.covidIcon} />
            </View>

            <Text style={styles.appName}>{i18n.t('welcome.title')}</Text>

            <RegularText style={styles.subtitle}>{i18n.t('welcome.take-a-minute')}</RegularText>

            <ContributionCounter count={this.state.userCount} variant={2} />

            {this.displayPartnerLogo()}

            <CalloutBox
              content={this.state.calloutBoxContent}
              onPress={() => openWebLink(this.state.calloutBoxContent.body_link)}
            />
          </View>
        </ScrollView>
        <View style={styles.reportContainer}>
          <BrandedButton onPress={this.gotoNextScreen} style={styles.reportButton}>
            {i18n.t('welcome.report-button')}
          </BrandedButton>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  appName: {
    color: colors.white,
    fontSize: 14,
  },
  covidIcon: {
    height: 48,
    width: 48,
  },
  covidIconBackground: {
    backgroundColor: colors.predict,
    borderRadius: 8,
    marginVertical: 24,
    padding: 8,
  },
  headerContainer: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  reportButton: {
    alignSelf: 'center',
    backgroundColor: colors.purple,
    elevation: 0,
    textAlign: 'center',
    width: '100%',
  },
  reportContainer: {
    padding: 20,
  },
  rootContainer: {
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 24,
  },

  safeView: {
    backgroundColor: colors.brand,
    flex: 1,
  },
  subtitle: {
    color: colors.white,
    fontSize: 24,
    lineHeight: 38,
    marginTop: 16,
    textAlign: 'center',
  },
});
