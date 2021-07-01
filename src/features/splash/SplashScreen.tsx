import { ApiException } from '@covid/core/api/ApiServiceErrors';
import { homeScreenName } from '@covid/core/localisation/LocalisationService';
import { setPatients, setUsername } from '@covid/core/state/user';
import { userService } from '@covid/core/user/UserService';
import { ScreenParamList } from '@covid/features';
import { appCoordinator } from '@covid/features/AppCoordinator';
import Splash from '@covid/features/splash/components/Splash';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors } from '@theme';
import * as Linking from 'expo-linking';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import RNSplashScreen from 'react-native-splash-screen';
import { connect } from 'react-redux';

type Props = {
  navigation: StackNavigationProp<ScreenParamList, 'Splash'>;
  route: RouteProp<ScreenParamList, 'Splash'>;
  setUsername: (username: string) => void;
  setPatients: (patients: string[]) => void;
};

type SplashState = {
  status: string;
  isRetryable: boolean;
  isRetryEnabled: boolean;
};

class SplashScreen extends React.Component<Props, SplashState> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isRetryEnabled: false,
      isRetryable: false,
      status: i18n.t('errors.status-loading'),
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
    const messageKey = error.friendlyI18n;
    const message = messageKey ? i18n.t(messageKey) : error.message;

    this.setState({
      isRetryEnabled: true,
      isRetryable: !!error.isRetryable,
      status: message,
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
