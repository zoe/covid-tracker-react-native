import { offlineService, userService } from '@covid/Services';
import Splash from '@covid/components/Splash';
import { AsyncStorageService } from '@covid/core/AsyncStorageService';
import { ApiClientBase } from '@covid/core/api/ApiClientBase';
import { ApiException } from '@covid/core/api/ApiServiceErrors';
import i18n from '@covid/locale/i18n';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors } from '@theme';
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import Navigator from './Navigation';
import { ScreenParamList } from './ScreenParamList';

type SplashScreenNavigationProp = StackNavigationProp<ScreenParamList, 'Splash'>;
type Props = {
  navigation: SplashScreenNavigationProp;
};

type NavigationType = StackNavigationProp<ScreenParamList, keyof ScreenParamList>;

type AuthenticatedUser = {
  userToken: string;
  userId: string;
};

type SplashState = {
  isOnline: boolean;
  isApiOnline: boolean;
  isLoaded: boolean;
  status: string;
  isRetryable: boolean;
  isRetryEnabled: boolean;
};

const initialState = {
  isOnline: false,
  isApiOnline: false,
  isLoaded: false,
  status: '',
  isRetryable: false,
  isRetryEnabled: false,
};

const PAUSE_TO_RETRY = 2000;

export class SplashScreen extends Component<Props, SplashState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      ...initialState,
      isOnline: offlineService.isOnline,
      isApiOnline: offlineService.isApiOnline,
    };
    this.initNavigator();
  }

  private initNavigator = () => {
    const { navigation } = this.props;
    // Stash a reference to navigator so we can have a class handle next page.
    Navigator.setNavigation(navigation as NavigationType);
  };

  componentDidMount() {
    this.loadAppState();
  }

  private loadAppState = async () => {
    this.setState({ status: i18n.t('errors.status-loading') });
    try {
      const patientId: string | null = await this.bootstrapAsync();
      this.gotoWelcomeScreen(patientId);
    } catch (error) {
      this.handleBootstrapError(error);
    }
  };

  private reloadAppState = async () => {
    this.setState({
      status: i18n.t('errors.status-retrying'),
      isRetryEnabled: false,
    });
    setTimeout(() => this.loadAppState(), offlineService.getRetryDelay());
  };

  private gotoWelcomeScreen = async (patientId: string | null) => {
    if (patientId) {
      Navigator.replaceScreen('WelcomeRepeat', { patientId });
    } else {
      Navigator.replaceScreen('Welcome');
    }
  };

  private handleBootstrapError = (error: ApiException) => {
    const messageKey = error.friendlyI18n;
    const message = messageKey ? i18n.t(messageKey) : error.message;

    this.setState({
      status: message,
      isRetryable: !!error.isRetryable,
      isRetryEnabled: false,
    });

    setTimeout(() => this.setState({ isRetryEnabled: true }), PAUSE_TO_RETRY);
  };

  private bootstrapAsync = async (): Promise<string | null> => {
    await this.updateUserCount();
    const user = await this.loadUser();
    const hasUser = !user || (!!user.userToken && !!user.userId);
    this.updateUserCountry(hasUser);
    if (hasUser) {
      this.initAuthenticatedUser(user);
      const patientId: string | null = await this.getUserPatientId(user);
      if (!patientId) {
        // Logged in with an account doesn't exist. Force logout.
        await this.forceLogout();
      }
      return patientId;
    }
    return null;
  };

  private updateUserCount = async () => {
    await userService.getStartupInfo();
  };

  private loadUser = async (): Promise<AuthenticatedUser> => {
    return (await AsyncStorageService.GetStoredData()) as AuthenticatedUser;
  };

  private updateUserCountry = async (isLoggedIn: boolean) => {
    const country: string | null = await userService.getUserCountry();
    userService.initCountryConfig(country ?? 'GB');
    if (isLoggedIn) {
      // If logged in with no country default to GB as this will handle all
      // GB users before selector was included.
      if (country === null) {
        await userService.setUserCountry('GB');
      }
    } else {
      await userService.defaultCountryFromLocale();
    }
  };

  private forceLogout = async () => {
    await userService.logout();
  };

  private initAuthenticatedUser = async (user: AuthenticatedUser) => {
    await ApiClientBase.setToken(user.userToken, user.userId);
  };

  private getUserPatientId = async (user: AuthenticatedUser): Promise<string | null> => {
    try {
      const profile = await userService.getProfile();
      const patientId = profile.patients[0];
      return patientId;
    } catch (error) {
      return null;
    }
  };

  public render() {
    const canRetry = this.state.isRetryable && this.state.isRetryEnabled;
    return (
      <View style={styles.container}>
        <Splash status={this.state.status} {...(canRetry ? { onRetry: this.reloadAppState } : {})} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.predict,
  },
});
