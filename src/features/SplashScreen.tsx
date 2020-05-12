import { StackNavigationProp } from '@react-navigation/stack';
import React, { Component } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { colors } from '../../theme';
import { AsyncStorageService } from '../core/AsyncStorageService';
import { ApiClientBase } from '../core/user/ApiClientBase';
import UserService from '../core/user/UserService';
import i18n from '../locale/i18n';
import Navigator from './Navigation';
import { ScreenParamList } from './ScreenParamList';
import Splash from '../components/Splash';
import { offlineService } from '../Services';
import { ApiException } from '../core/ApiServiceErrors';

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
};

const initialState = {
  isOnline: false,
  isApiOnline: false,
  isLoaded: false,
  status: '',
};

export class SplashScreen extends Component<Props, SplashState> {
  private userService = new UserService();

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
    this.setState({ status: 'Loading...' });
    this.loadAppState();
  }

  private loadAppState = async () => {
    const patientId: string | null = await this.bootstrapAsync();
    if (true || this.state.isLoaded) {
      this.gotoWelcomeScreen(patientId);
    }
  };

  private gotoWelcomeScreen = async (patientId: string | null) => {
    if (patientId) {
      Navigator.replaceScreen('WelcomeRepeat', { patientId });
    } else {
      Navigator.replaceScreen('Welcome');
    }
  };

  showAlert(message: string) {
    Alert.alert(
      i18n.t('splash-error.title'),
      i18n.t('splash-error.message') + ': ' + message,
      [
        {
          text: i18n.t('splash-error.secondary-action-title'),
          style: 'cancel',
        },
        { text: i18n.t('splash-error.primary-action-title'), onPress: () => this.loadAppState() },
      ],
      { cancelable: false }
    );
  }

  private handleBootstrapError = (error: ApiException) => {
    console.log('Caught an error', error.isRetryable);
    if (error.isRetryable) {
      console.log('Updating online status');
      offlineService.updateApiOnlineStatus(false);
    }

    this.setState({ status: error.message });
    this.showAlert(error.message);
  };

  private bootstrapAsync = async (): Promise<string | null> => {
    try {
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
    } catch (error) {
      this.handleBootstrapError(error);
    }
    return null;
  };

  private updateUserCount = async () => {
    await this.userService.getStartupInfo();
  };

  private loadUser = async (): Promise<AuthenticatedUser> => {
    return (await AsyncStorageService.GetStoredData()) as AuthenticatedUser;
  };

  private updateUserCountry = async (isLoggedIn: boolean) => {
    const country: string | null = await this.userService.getUserCountry();
    this.userService.initCountryConfig(country || 'GB');
    if (isLoggedIn) {
      // If logged in with no country default to GB as this will handle all
      // GB users before selector was included.
      if (country === null) {
        await this.userService.setUserCountry('GB');
      }
    } else {
      await this.userService.defaultCountryFromLocale();
    }
  };

  private forceLogout = async () => {
    await this.userService.logout();
  };

  private initAuthenticatedUser = async (user: AuthenticatedUser) => {
    await ApiClientBase.setToken(user.userToken, user.userId);
  };

  private getUserPatientId = async (user: AuthenticatedUser): Promise<string | null> => {
    try {
      const profile = await this.userService.getProfile();
      const patientId = profile.patients[0];
      return patientId;
    } catch (error) {
      return null;
    }
  };

  public render() {
    return (
      <View style={styles.container}>
        <Splash status={this.state.status} />
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
