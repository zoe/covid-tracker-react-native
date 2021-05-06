import { StackNavigationProp } from '@react-navigation/stack';
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import RNSplashScreen from 'react-native-splash-screen';
import { RouteProp } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { colors } from '@covid/theme';
import Splash from '@covid/features/splash/components/Splash';
import { ApiException } from '@covid/core/api/ApiServiceErrors';
import i18n from '@covid/locale/i18n';
import { offlineService } from '@covid/Services';
import { IUserService } from '@covid/core/user/UserService';
import { Services } from '@covid/provider/services.types';
import { lazyInject } from '@covid/provider/services';
import { setUsername, setPatients } from '@covid/core/state/user';
import { ScreenParamList } from '@covid/features';
import NavigatorService from '@covid/NavigatorService';
import { homeScreenName } from '@covid/core/localisation/LocalisationService';

import appCoordinator from '../AppCoordinator';

type Props = {
  navigation: StackNavigationProp<ScreenParamList, 'Splash'>;
  route: RouteProp<ScreenParamList, 'Splash'>;
  setUsername: (username: string) => void;
  setPatients: (patients: string[]) => void;
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
  status: i18n.t('errors.status-loading'),
  isRetryable: false,
  isRetryEnabled: false,
};

class SplashScreen extends Component<Props, SplashState> {
  @lazyInject(Services.User)
  userService: IUserService;

  constructor(props: Props) {
    super(props);
    this.state = {
      ...initialState,
      isOnline: offlineService.isOnline,
      isApiOnline: offlineService.isApiOnline,
    };
  }

  async componentDidMount() {
    Linking.getInitialURL().then(async (url) => {
      const screenName: keyof ScreenParamList = this.props.route.name; // change to let when implemented
      if (url) {
        // TODO - set screenName to url deeplink
      }
      try {
        await this.initAppState(screenName);
      } catch (error) {
        this.handleBootstrapError(error);
      }
    });
  }

  async initAppState(screenName: keyof ScreenParamList) {
    await appCoordinator.init(this.props.setUsername, this.props.setPatients);
    RNSplashScreen.hide();
    // reset router if deeplinking this ensures the dashboard is loaded as the default route
    if (screenName !== this.props.route.name) {
      NavigatorService.reset([{ name: homeScreenName() }]);
    }
    appCoordinator.gotoNextScreen(screenName);
  }

  private reloadAppState = async () => {
    this.setState({
      status: i18n.t('errors.status-retrying'),
      isRetryEnabled: false,
    });

    try {
      await this.initAppState();
    } catch (error) {
      this.handleBootstrapError(error);
    }
  };

  private handleBootstrapError = (error: ApiException) => {
    const messageKey = error.friendlyI18n;
    const message = messageKey ? i18n.t(messageKey) : error.message;

    this.setState({
      status: message,
      isRetryable: !!error.isRetryable,
      isRetryEnabled: true,
    });
  };

  private logout = async () => {
    await this.userService.logout();
  };

  public render() {
    const canRetry = this.state.isRetryable && this.state.isRetryEnabled;
    const splashProps = canRetry
      ? {
          onRetry: this.reloadAppState,
          onLogout: this.logout,
        }
      : {};
    return (
      <View style={styles.container}>
        <Splash status={this.state.status} {...splashProps} />
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

const mapDispatchToProps = {
  setUsername,
  setPatients,
};

export default connect(null, mapDispatchToProps)(SplashScreen);
