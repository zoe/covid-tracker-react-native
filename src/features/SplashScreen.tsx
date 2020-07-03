import { StackNavigationProp } from '@react-navigation/stack';
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import { colors } from '@theme';
import Splash from '@covid/components/Splash';
import { ApiException } from '@covid/core/api/ApiServiceErrors';
import i18n from '@covid/locale/i18n';
import { offlineService } from '@covid/Services';
import { ICoreService } from '@covid/core/user/UserService';
import { IContentService } from '@covid/core/content/ContentService';
import { Services } from '@covid/provider/services.types';
import { lazyInject } from '@covid/provider/services';

import Navigator from './AppCoordinator';
import { ScreenParamList } from './ScreenParamList';

type SplashScreenNavigationProp = StackNavigationProp<ScreenParamList, 'Splash'>;
type Props = {
  navigation: SplashScreenNavigationProp;
};

type NavigationType = StackNavigationProp<ScreenParamList, keyof ScreenParamList>;

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
  @lazyInject(Services.User)
  userService: ICoreService;

  @lazyInject(Services.Content)
  contentService: IContentService;

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
    return await this.userService.getFirstPatientId();
  };

  private updateUserCount = async () => {
    await this.contentService.getStartupInfo();
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
