import { covidIcon } from '@assets';
import { BrandedButton } from '@covid/components';
import { CalloutBox } from '@covid/components/CalloutBox';
import { DrawerToggle } from '@covid/components/DrawerToggle';
import { LoadingModal } from '@covid/components/Loading';
import { PartnerLogoSE, PartnerLogoUS } from '@covid/components/logos/PartnerLogo';
import { PoweredByZoe } from '@covid/components/logos/PoweredByZoe';
import { Screen } from '@covid/components/Screen';
import { RegularText } from '@covid/components/Text';
import { initialErrorState, TApiErrorState } from '@covid/core/api/ApiServiceErrors';
import { contentService } from '@covid/core/content/ContentService';
import { TScreenContent } from '@covid/core/content/ScreenContentContracts';
import { isSECountry, isUSCountry } from '@covid/core/localisation/LocalisationService';
import { appCoordinator } from '@covid/features/AppCoordinator';
import { ContributionCounter } from '@covid/features/register/components/ContributionCounter';
import { TScreenParamList } from '@covid/features/ScreenParamList';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import { offlineService, pushNotificationService } from '@covid/services';
import { sizes } from '@covid/themes';
import { openWebLink } from '@covid/utils/links';
import { cleanIntegerVal } from '@covid/utils/number';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors } from '@theme';
import * as React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

type TProps = {
  navigation: CompositeNavigationProp<
    StackNavigationProp<TScreenParamList, 'WelcomeRepeat'>,
    DrawerNavigationProp<TScreenParamList>
  >;
  route: RouteProp<TScreenParamList, 'WelcomeRepeat'>;
};

type TState = {
  userCount: number | null;
  onRetry?: () => void;
  calloutBoxContent: TScreenContent;
} & TApiErrorState;

const initialState = {
  ...initialErrorState,
  calloutBoxContent: contentService.getCalloutBoxDefault(),
  userCount: null,
};

export class WelcomeRepeatScreen extends React.Component<TProps, TState> {
  state: TState = initialState;

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

  renderHeader = () => (
    <View style={styles.header}>
      <DrawerToggle onPress={NavigatorService.openDrawer} testID="drawer-toggle" />
    </View>
  );

  renderPartnerLogo = () => {
    return isUSCountry() ? <PartnerLogoUS /> : isSECountry() ? <PartnerLogoSE /> : <PoweredByZoe />;
  };

  renderFooter = () => (
    <View style={styles.wrapper}>
      <BrandedButton onPress={this.gotoNextScreen} style={styles.reportButton}>
        {i18n.t('welcome.report-button')}
      </BrandedButton>
    </View>
  );

  render() {
    return (
      <>
        {this.state.isApiError ? (
          <LoadingModal
            error={this.state.error}
            onPress={() => this.setState({ isApiError: false })}
            onRetry={this.state.onRetry}
            status={this.state.status}
          />
        ) : null}
        <Screen
          noPadding
          backgroundColor={colors.brand}
          renderFooter={this.renderFooter}
          renderHeader={this.renderHeader}
          testID="welcome-repeat-screen"
        >
          <View style={styles.rootContainer}>
            <View style={styles.covidIconBackground}>
              <Image resizeMode="contain" source={covidIcon} style={styles.covidIcon} />
            </View>

            <Text style={styles.appName}>{i18n.t('welcome.title')}</Text>

            <RegularText style={styles.subtitle}>{i18n.t('welcome.take-a-minute')}</RegularText>

            <ContributionCounter count={this.state.userCount} variant={2} />

            {this.renderPartnerLogo()}

            <CalloutBox
              content={this.state.calloutBoxContent}
              onPress={() => openWebLink(this.state.calloutBoxContent.body_link)}
            />
          </View>
        </Screen>
      </>
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
    borderRadius: sizes.xs,
    marginBottom: sizes.l,
    padding: sizes.xs,
  },
  header: {
    alignItems: 'flex-end',
    height: sizes.headerCompactHeight,
    justifyContent: 'center',
    paddingHorizontal: sizes.m,
  },
  reportButton: {
    alignSelf: 'center',
    backgroundColor: colors.purple,
    elevation: 0,
    textAlign: 'center',
    width: '100%',
  },
  rootContainer: {
    alignItems: 'center',
    flex: 1,
    paddingBottom: sizes.screenVerticalPadding,
    paddingHorizontal: sizes.screenHorizontalPadding,
  },
  subtitle: {
    color: colors.white,
    fontSize: 24,
    lineHeight: 38,
    marginTop: sizes.m,
    textAlign: 'center',
  },
  wrapper: {
    backgroundColor: colors.brand,
    padding: sizes.l,
  },
});
