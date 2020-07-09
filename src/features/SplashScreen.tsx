import { StackNavigationProp } from '@react-navigation/stack';
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { RouteProp } from '@react-navigation/native';

import { colors } from '@theme';
import Splash from '@covid/components/Splash';
import { ApiException } from '@covid/core/api/ApiServiceErrors';
import i18n from '@covid/locale/i18n';
import { offlineService } from '@covid/Services';
import { ICoreService } from '@covid/core/user/UserService';
import { Services } from '@covid/provider/services.types';
import { lazyInject } from '@covid/provider/services';

import appCoordinator from './AppCoordinator';
import { ScreenParamList } from './ScreenParamList';

type Props = {
  navigation: StackNavigationProp<ScreenParamList, 'Splash'>;
  route: RouteProp<ScreenParamList, 'Splash'>;
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

const PAUSE_TO_RETRY = 2000;

export class SplashScreen extends Component<Props, SplashState> {
  @lazyInject(Services.User)
  userService: ICoreService;

  constructor(props: Props) {
    super(props);
    this.state = {
      ...initialState,
      isOnline: offlineService.isOnline,
      isApiOnline: offlineService.isApiOnline,
    };
  }

  async componentDidMount() {
    try {
      await this.initAppState();
    } catch (error) {
      this.handleBootstrapError(error);
    }
  }

  async initAppState() {
    await appCoordinator.init();
    appCoordinator.gotoNextScreen(this.props.route.name);
  }

  private reloadAppState = async () => {
    this.setState({
      status: i18n.t('errors.status-retrying'),
      isRetryEnabled: false,
    });
    setTimeout(() => this.initAppState(), offlineService.getRetryDelay());
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
