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

export class SplashScreen extends Component<Props, object> {
  private userService = new UserService();

  constructor(props: Props) {
    super(props);
    this.bootstrapAsync();
  }

  private bootstrapAsync = async () => {
    const { navigation } = this.props;
    let country: string | null = null;

    // Stash a reference to navigator so we can have a class handle next page.
    Navigator.setNavigation(navigation as NavigationType);

    try {
      await this.userService.getStartupInfo();
      country = await this.userService.getUserCountry();
      this.userService.initCountry(country as string);
    } catch (err) {
      Alert.alert(
        i18n.t('splash-error.title'),
        i18n.t('splash-error.message') + ': ' + err.message,
        [
          {
            text: i18n.t('splash-error.secondary-action-title'),
            style: 'cancel',
          },
          { text: i18n.t('splash-error.primary-action-title'), onPress: () => this.bootstrapAsync() },
        ],
        { cancelable: false }
      );
    }

    const { userToken, userId } = await AsyncStorageService.GetStoredData();

    if (userToken && userId) {
      ApiClientBase.setToken(userToken, userId);

      // If logged in with no country default to GB as this will handle all GB users before selector was included.
      if (country == null) {
        await this.userService.setUserCountry('GB');
      }

      try {
        const profile = await this.userService.getProfile();
        const patientId = profile.patients[0];
        Navigator.replaceScreen('WelcomeRepeat', { patientId });
      } catch (error) {
        // Logged in with an account doesn't exist. Force logout.
        ApiClientBase.unsetToken();
        await AsyncStorageService.clearData();
        Navigator.replaceScreen('Welcome');
      }
    } else {
      if (country == null) {
        // Using locale to default to a country
        await this.userService.defaultCountryFromLocale();
      }
      Navigator.replaceScreen('Welcome');
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
