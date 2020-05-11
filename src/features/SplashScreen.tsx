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

type SplashScreenNavigationProp = StackNavigationProp<ScreenParamList, 'Splash'>;
type Props = {
  navigation: SplashScreenNavigationProp;
};

type NavigationType = StackNavigationProp<ScreenParamList, keyof ScreenParamList>;

type AuthenticatedUser = {
  userToken: string;
  userId: string;
};

export class SplashScreen extends Component<Props, object> {
  private userService = new UserService();

  constructor(props: Props) {
    super(props);
    this.initNavigator();
    this.gotoWelcomeScreen();
  }

  private initNavigator = () => {
    const { navigation } = this.props;
    // Stash a reference to navigator so we can have a class handle next page.
    Navigator.setNavigation(navigation as NavigationType);
  };

  private gotoWelcomeScreen = async () => {
    const patientId: string | null = await this.bootstrapAsync();
    if (patientId) {
      Navigator.replaceScreen('WelcomeRepeat', { patientId });
    } else {
      Navigator.replaceScreen('Welcome');
    }
  };

  private handleBootstrapError = (error: Error) => {
    Alert.alert(
      i18n.t('splash-error.title'),
      i18n.t('splash-error.message') + ': ' + error.message,
      [
        {
          text: i18n.t('splash-error.secondary-action-title'),
          style: 'cancel',
        },
        { text: i18n.t('splash-error.primary-action-title'), onPress: () => this.gotoWelcomeScreen() },
      ],
      { cancelable: false }
    );
  };

  private bootstrapAsync = async (): Promise<string | null> => {
    try {
      this.updateUserCount();
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
      } else {
        await this.userService.defaultCountryFromLocale();
      }
    }
  };

  private forceLogout = async () => {
    ApiClientBase.unsetToken();
    await AsyncStorageService.clearData();
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
    return <View style={styles.container} />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.predict,
  },
});
