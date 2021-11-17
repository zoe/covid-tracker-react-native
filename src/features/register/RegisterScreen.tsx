import { BrandedButton, Text } from '@covid/components';
import { Form } from '@covid/components/Form';
import { Screen } from '@covid/components/Screen';
import { ClickableText, ErrorText, RegularText } from '@covid/components/Text';
import { ValidatedTextInput } from '@covid/components/ValidatedTextInput';
import Analytics, { events } from '@covid/core/Analytics';
import { setUsername } from '@covid/core/state/user';
import { userService } from '@covid/core/user/UserService';
import { ScreenParamList } from '@covid/features';
import { appCoordinator } from '@covid/features/AppCoordinator';
import i18n from '@covid/locale/i18n';
import { styling } from '@covid/themes';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors } from '@theme';
import { AxiosError } from 'axios';
import { Formik } from 'formik';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import * as Yup from 'yup';

type TProps = {
  navigation: StackNavigationProp<ScreenParamList, 'Register'>;
  route: RouteProp<ScreenParamList, 'Register'>;
  setUsername: (username: string) => void;
};

type TState = {
  errorMessage: string;
  enableSubmit: boolean;
  accountExists: boolean;
};

const initialState: TState = {
  accountExists: false,
  enableSubmit: false,
  errorMessage: '',
};

interface IRegistrationData {
  email: string;
  password: string;
}

const initialFormValues = {
  email: '',
  password: '',
};

class RegisterScreen extends React.Component<TProps, TState> {
  passwordComponent: any;

  constructor(props: TProps) {
    super(props);
    this.state = initialState;
  }

  onSubmit = (values: IRegistrationData) => {
    if (this.state.enableSubmit) {
      this.setState({ enableSubmit: false });
      // The register api endpoint automatically sets the consent for the user on the backend.
      userService
        .register(values.email, values.password)
        .then(async (response) => {
          const isTester = response.user.is_tester;
          Analytics.identify({ isTester });
          Analytics.track(events.SIGNUP);
          this.props.setUsername(response.user.username);
          const patientId = response.user.patients[0];
          await appCoordinator.setPatientById(patientId).then(() => appCoordinator.fetchInitialData());
          appCoordinator.gotoNextScreen(this.props.route.name);
        })
        .catch((err: AxiosError) => {
          // TODO - These error messages are misleading and we could display what the server sends back
          //
          // (In version 2 of the register endpoint we receive 403 FORBIDDEN if account has already
          // been registered.  In version 1 it was a 500, which is not an error we should ever return
          // deliberately!)
          if (err.response?.status === 403) {
            this.setState({
              accountExists: true,
              errorMessage: i18n.t('create-account.already-registered'),
            });
          } else if (err.response?.status === 400) {
            this.setState({
              accountExists: false,
              errorMessage: i18n.t('create-account.password-too-simple'),
            });
          } else {
            this.setState({
              accountExists: false,
              errorMessage: i18n.t('create-account.something-went-wrong'),
            });
          }
        })
        .catch((err: Error) => {
          this.setState({ errorMessage: i18n.t('create-account.error', { msg: err.message }) });
        });
    }
  };

  gotoLogin = () => {
    this.props.navigation.replace('Login', { terms: '' });
  };

  registerSchema = Yup.object().shape({
    email: Yup.string().required(i18n.t('create-account.email-required')).email(i18n.t('create-account.email-error')),
    password: Yup.string()
      .required(i18n.t('create-account.password-required'))
      .min(8, i18n.t('create-account.password-too-simple')),
  });

  setIsEnabled = (user: string, pass: string) => {
    const enableSubmit = user.length > 0 && pass.length > 7;
    this.setState({ enableSubmit });
  };

  onPressLogin = () => this.props.navigation.navigate('Login', { terms: '' });

  render() {
    return (
      <Screen backgroundColor={colors.backgroundPrimary} testID="register-screen">
        <Formik initialValues={initialFormValues} onSubmit={this.onSubmit} validationSchema={this.registerSchema}>
          {(formikProps) => {
            return (
              <Form>
                <Text rhythm={24} style={styles.center} textClass="h3Light">
                  {i18n.t('create-account.title')}
                </Text>
                <Text rhythm={24} style={[styles.center, styles.secondaryColour]} textClass="pLight">
                  {i18n.t('create-account.if-you-have-an-account')}{' '}
                  <Text
                    inverted
                    colorPalette="actionSecondary"
                    colorShade="main"
                    onPress={this.onPressLogin}
                    textClass="pLight"
                  >
                    {i18n.t('log-in')}
                  </Text>
                </Text>

                <ValidatedTextInput
                  autoCapitalize="none"
                  autoCompleteType="email"
                  error={(formikProps.touched.email && !!formikProps.errors.email) || this.state.accountExists}
                  keyboardType="email-address"
                  onBlur={formikProps.handleBlur('email')}
                  onChangeText={(text) => {
                    formikProps.handleChange('email')(text);
                    this.setIsEnabled(text, formikProps.values.password);
                  }}
                  onSubmitEditing={() => {
                    this.passwordComponent.focus();
                  }}
                  placeholder={i18n.t('create-account.email')}
                  returnKeyType="next"
                  testID="input-email-address"
                  value={formikProps.values.email}
                />

                {!!formikProps.touched.email && !!formikProps.errors.email ? (
                  <ErrorText>{formikProps.errors.email}</ErrorText>
                ) : null}

                {this.state.accountExists ? <ErrorText>{i18n.t('create-account.already-registered')}</ErrorText> : null}

                <View style={styling.marginTop} />

                <ValidatedTextInput
                  secureTextEntry
                  autoCapitalize="none"
                  error={formikProps.touched.password && !!formikProps.errors.password}
                  onBlur={formikProps.handleBlur('password')}
                  onChangeText={(text) => {
                    formikProps.handleChange('password')(text);
                    this.setIsEnabled(formikProps.values.email, text);
                  }}
                  placeholder={i18n.t('create-account.password')}
                  ref={(input) => (this.passwordComponent = input)}
                  returnKeyType="go"
                  testID="input-password"
                  value={formikProps.values.password}
                />

                {!!formikProps.touched.password && !!formikProps.errors.password ? (
                  <ErrorText>{formikProps.errors.password}</ErrorText>
                ) : null}

                {this.state.accountExists ? (
                  <RegularText style={styling.marginVerticalHuge}>
                    <ClickableText onPress={this.gotoLogin}>{i18n.t('log-in')}</ClickableText>{' '}
                    {i18n.t('create-account.existing-account')}
                  </RegularText>
                ) : null}

                <View style={styling.flex} />

                {!!this.state.errorMessage && !this.state.accountExists ? (
                  <ErrorText>{this.state.errorMessage}</ErrorText>
                ) : null}

                <BrandedButton
                  enabled={this.state.enableSubmit}
                  loading={formikProps.isSubmitting}
                  onPress={formikProps.handleSubmit}
                  testID="button-submit"
                >
                  {i18n.t('create-account.btn')}
                </BrandedButton>
              </Form>
            );
          }}
        </Formik>
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  center: {
    textAlign: 'center',
  },
  secondaryColour: {
    color: colors.secondary,
  },
});

const mapDispatchToProps = {
  setUsername,
};

export default connect(null, mapDispatchToProps)(RegisterScreen);
