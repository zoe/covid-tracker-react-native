import { BrandedButton } from '@covid/components';
import { Field, FieldError } from '@covid/components/Forms';
import { ClickableText, ErrorText, HeaderLightText, RegularText } from '@covid/components/Text';
import { ValidatedTextInput } from '@covid/components/ValidatedTextInput';
import Analytics, { events } from '@covid/core/Analytics';
import { setUsername } from '@covid/core/state/user';
import { userService } from '@covid/core/user/UserService';
import { ScreenParamList } from '@covid/features';
import { appCoordinator } from '@covid/features/AppCoordinator';
import i18n from '@covid/locale/i18n';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors } from '@theme';
import { AxiosError } from 'axios';
import { Formik } from 'formik';
import { Form, Label } from 'native-base';
import * as React from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { connect } from 'react-redux';
import * as Yup from 'yup';

type PropsType = {
  navigation: StackNavigationProp<ScreenParamList, 'Register'>;
  route: RouteProp<ScreenParamList, 'Register'>;
  setUsername: (username: string) => void;
};

type State = {
  errorMessage: string;
  enableSubmit: boolean;
  accountExists: boolean;
};

const initialState: State = {
  accountExists: false,
  enableSubmit: false,
  errorMessage: '',
};

interface RegistrationData {
  email: string;
  password: string;
}

const initialRegistrationValues = {
  email: '',
  password: '',
};

class RegisterScreen extends React.Component<PropsType, State> {
  private passwordComponent: any;

  constructor(props: PropsType) {
    super(props);
    this.state = initialState;
  }

  private checkFieldsFilled = (props: any) => {
    if (props.errors.password || props.errors.email) return false;
    return true;
  };

  private handleCreateAccount(formData: RegistrationData) {
    if (this.state.enableSubmit) {
      this.setState({ enableSubmit: false }); // Stop resubmissions
      userService
        .register(formData.email, formData.password)
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
              errorMessage: i18n.t('create-account.something-went-wrong', { msg: err.response?.status }),
            });
          }
        })
        // do nothing for now but find a way to report it somewhere?
        .catch((err: Error) => {
          this.setState({ errorMessage: i18n.t('create-account.error', { msg: err.message }) });
        });
    }
  }

  gotoLogin = () => {
    this.props.navigation.replace('Login', { terms: '' });
  };

  registerSchema = Yup.object().shape({
    email: Yup.string().required(i18n.t('create-account.email-required')).email(i18n.t('create-account.email-error')),
    password: Yup.string()
      .required(i18n.t('create-account.password-required'))
      .min(8, i18n.t('create-account.password-too-simple')), // todo: complicated enough...
  });

  /*   .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    ) */

  setIsEnabled(user: string, pass: string) {
    const enableSubmit = user.length > 0 && pass.length > 7;
    this.setState({ enableSubmit });
  }

  render() {
    return (
      <View style={styles.flex} testID="register-screen">
        <Formik
          initialValues={initialRegistrationValues}
          onSubmit={(values: RegistrationData) => this.handleCreateAccount(values)}
          validationSchema={this.registerSchema}
        >
          {(props) => {
            return (
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView
                  behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                  style={styles.rootContainer}
                >
                  <View>
                    <View style={styles.loginHeader}>
                      <HeaderLightText>{i18n.t('create-account.title')}</HeaderLightText>
                      <View style={styles.loginSubtitle}>
                        <RegularText>
                          {i18n.t('create-account.if-you-have-an-account')}{' '}
                          <ClickableText onPress={() => this.props.navigation.navigate('Login')}>
                            {i18n.t('log-in')}
                          </ClickableText>
                        </RegularText>
                      </View>
                    </View>

                    <Form style={styles.form}>
                      <View style={styles.formItem}>
                        <Field>
                          <Label style={styles.labelStyle}>{i18n.t('create-account.email')}</Label>
                          <ValidatedTextInput
                            autoCapitalize="none"
                            autoCompleteType="email"
                            error={(props.touched.email && !!props.errors.email) || this.state.accountExists}
                            keyboardType="email-address"
                            onBlur={props.handleBlur('email')}
                            onChangeText={(text) => {
                              // this.setState({ enableSubmit: true });
                              props.handleChange('email')(text);
                              this.setIsEnabled(text, props.values.password);
                            }}
                            onSubmitEditing={() => {
                              this.passwordComponent.focus();
                            }}
                            placeholder={i18n.t('create-account.email')}
                            returnKeyType="next"
                            testID="input-email-address"
                            value={props.values.email}
                          />
                          {!!props.touched.email && !!props.errors.email ? (
                            <FieldError>{props.errors.email}</FieldError>
                          ) : null}
                          {this.state.accountExists ? (
                            <FieldError>{i18n.t('create-account.already-registered')}</FieldError>
                          ) : null}
                        </Field>
                      </View>

                      <View style={styles.formItem}>
                        <Field>
                          <Label style={styles.labelStyle}>{i18n.t('create-account.password')}</Label>
                          <ValidatedTextInput
                            secureTextEntry
                            error={props.touched.password && props.errors.password}
                            onBlur={props.handleBlur('password')}
                            onChangeText={(text) => {
                              props.handleChange('password')(text);
                              this.setIsEnabled(props.values.email, text);
                            }}
                            onSubmitEditing={(event) => props.handleSubmit()}
                            placeholder={i18n.t('create-account.password')}
                            ref={(input) => (this.passwordComponent = input)}
                            returnKeyType="go"
                            testID="input-password"
                            value={props.values.password}
                          />
                          {!!props.touched.password && !!props.errors.password ? (
                            <FieldError>{props.errors.password}</FieldError>
                          ) : null}
                        </Field>
                      </View>
                    </Form>

                    {this.state.accountExists ? (
                      <View style={styles.nextAction}>
                        <RegularText style={{ textAlign: 'center' }}>
                          <ClickableText onPress={this.gotoLogin}>{i18n.t('log-in')}</ClickableText>{' '}
                          {i18n.t('create-account.existing-account')}
                        </RegularText>
                      </View>
                    ) : null}
                  </View>
                  <View style={styles.actionBlock}>
                    {!!this.state.errorMessage && !this.state.accountExists ? (
                      <View>
                        <ErrorText>{this.state.errorMessage}</ErrorText>
                      </View>
                    ) : null}
                    <View>
                      <BrandedButton
                        enabled={this.state.enableSubmit}
                        loading={props.isSubmitting}
                        onPress={props.handleSubmit}
                        testID="button-submit"
                      >
                        {i18n.t('create-account.btn')}
                      </BrandedButton>
                    </View>
                  </View>
                </KeyboardAvoidingView>
              </TouchableWithoutFeedback>
            );
          }}
        </Formik>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  actionBlock: {
    marginBottom: 16,
  },
  errorText: {
    color: colors.feedbackBad,
  },
  fieldError: {
    marginVertical: 4,
  },
  flex: {
    flex: 1,
  },
  form: {
    marginVertical: 16,
  },
  formItem: {
    paddingVertical: 4,
  },
  labelStyle: {
    color: colors.tertiary,
    fontSize: 16,
    left: -16384,
    position: 'absolute',
  },
  loginHeader: {
    marginHorizontal: 16,
    marginTop: 30,
  },
  loginSubtitle: {
    marginTop: 16,
  },
  nextAction: {
    marginVertical: 8,
  },
  rootContainer: {
    backgroundColor: colors.backgroundPrimary,
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 56,
  },
  titleText: {
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
});

const mapDispatchToProps = {
  setUsername,
};

export default connect(null, mapDispatchToProps)(RegisterScreen);
