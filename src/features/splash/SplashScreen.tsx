import { ApiException } from '@covid/core/api/ApiServiceErrors';
import { TScreenName } from '@covid/core/Coordinator';
import { homeScreenName } from '@covid/core/localisation/LocalisationService';
import { setPatients, setUsername } from '@covid/core/state/user';
import { userService } from '@covid/core/user/UserService';
import { appCoordinator } from '@covid/features/AppCoordinator';
import Splash from '@covid/features/splash/components/Splash';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import { TScreenParamList } from '@covid/routes/types';
import { RouteProp } from '@react-navigation/native';
import { colors } from '@theme';
import * as Linking from 'expo-linking';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import RNSplashScreen from 'react-native-splash-screen';
import { connect } from 'react-redux';

type TProps = {
  route: RouteProp<TScreenParamList, 'Splash'>;
  setUsername: (username: string) => void;
  setPatients: (patients: string[]) => void;
};

type TState = {
  status: string;
  isRetryable: boolean;
  isRetryEnabled: boolean;
};

class SplashScreen extends React.Component<TProps, TState> {
  constructor(props: TProps) {
    super(props);

    this.state = {
      isRetryEnabled: false,
      isRetryable: false,
      status: i18n.t('errors.status-loading'),
    };
  }

  async componentDidMount() {
    Linking.getInitialURL().then(async (url) => {
      const screenName: TScreenName = this.props.route.name; // change to let when implemented
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

  async initAppState(screenName?: TScreenName) {
    await appCoordinator.init(this.props.setUsername, this.props.setPatients);
    RNSplashScreen.hide();
    // reset router if deeplinking this ensures the dashboard is loaded as the default route
    if (screenName !== this.props.route.name) {
      NavigatorService.reset([{ name: homeScreenName() }]);
    }
    if (screenName) {
      appCoordinator.gotoNextScreen(screenName);
    }
  }

  private reloadAppState = async () => {
    this.setState({
      isRetryEnabled: false,
      status: i18n.t('errors.status-retrying'),
    });

    try {
      await this.initAppState();
    } catch (error) {
      this.handleBootstrapError(error);
    }
  };

  private handleBootstrapError = (error: ApiException) => {
    this.setState({
      isRetryEnabled: true,
      isRetryable: !!error.isRetryable,
      status: error.message,
    });
  };

  private logout = async () => {
    await userService.logout();
  };

  public render() {
    const canRetry = this.state.isRetryable && this.state.isRetryEnabled;
    const splashProps = canRetry
      ? {
          onLogout: this.logout,
          onRetry: this.reloadAppState,
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
    backgroundColor: colors.predict,
    flex: 1,
  },
});

const mapDispatchToProps = {
  setPatients,
  setUsername,
};

export default connect(null, mapDispatchToProps)(SplashScreen);
