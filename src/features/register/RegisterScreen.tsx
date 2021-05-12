import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AxiosError } from 'axios';
import { Formik } from 'formik';
import { Form, Label } from 'native-base';
import React, { Component } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import * as Yup from 'yup';
import { connect } from 'react-redux';

import { colors } from '@theme';
import i18n from '@covid/locale/i18n';
import { IUserService } from '@covid/core/user/UserService';
import Analytics, { events } from '@covid/core/Analytics';
import { ValidatedTextInput } from '@covid/components/ValidatedTextInput';
import { ClickableText, ErrorText, HeaderLightText, RegularText } from '@covid/components/Text';
import { Field, FieldError } from '@covid/components/Forms';
import { lazyInject } from '@covid/provider/services';
import { Services } from '@covid/provider/services.types';
import { setUsername } from '@covid/core/state/user';
import { ScreenParamList } from '@covid/features';
import { BrandedButton } from '@covid/components';

import appCoordinator from '../AppCoordinator';

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
  errorMessage: '',
  enableSubmit: false,
  accountExists: false,
};

interface RegistrationData {
  email: string;
  password: string;
}

const initialRegistrationValues = {
  email: '',
  password: '',
};

class RegisterScreen extends Component<PropsType, State> {
  @lazyInject(Services.User)
  private readonly userService: IUserService;

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
      this.userService
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
              errorMessage: i18n.t('create-account.already-registered'),
              accountExists: true,
            });
          } else if (err.response?.status === 400) {
            this.setState({
              errorMessage: i18n.t('create-account.password-too-simple'),
              accountExists: false,
            });
          } else {
            this.setState({
              errorMessage: i18n.t('create-account.something-went-wrong', { msg: err.response?.status }),
              accountExists: false,
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
      <Formik
        initialValues={initialRegistrationValues}
        validationSchema={this.registerSchema}
        onSubmit={(values: RegistrationData) => this.handleCreateAccount(values)}>
        {(props) => {
          return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <KeyboardAvoidingView
                style={styles.rootContainer}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
                <View>
                  <View style={styles.loginHeader}>
                    <HeaderLightText>{i18n.t('create-account.title')}</HeaderLightText>
                    <View style={styles.loginSubtitle}>
                      <RegularText>
                        {i18n.t('create-account.if-you-have-an-account')}{' '}
                        <ClickableText onPress={() => this.props.navigation.navigate('Login')}>
                          {i18n.t('create-account.login')}
                        </ClickableText>
                      </RegularText>
                    </View>
                  </View>

                  <Form style={styles.form}>
                    <View style={styles.formItem}>
                      <Field>
                        <Label style={styles.labelStyle}>{i18n.t('create-account.email')}</Label>
                        <ValidatedTextInput
                          keyboardType="email-address"
                          autoCapitalize="none"
                          autoCompleteType="email"
                          placeholder={i18n.t('create-account.email')}
                          value={props.values.email}
                          onChangeText={(text) => {
                            // this.setState({ enableSubmit: true });
                            props.handleChange('email')(text);
                            this.setIsEnabled(text, props.values.password);
                          }}
                          onBlur={props.handleBlur('email')}
                          error={(props.touched.email && props.errors.email) || this.state.accountExists}
                          returnKeyType="next"
                          onSubmitEditing={() => {
                            this.passwordComponent.focus();
                          }}
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
                          ref={(input) => (this.passwordComponent = input)}
                          secureTextEntry
                          placeholder={i18n.t('create-account.password')}
                          returnKeyType="go"
                          value={props.values.password}
                          onChangeText={(text) => {
                            props.handleChange('password')(text);
                            this.setIsEnabled(props.values.email, text);
                          }}
                          onBlur={props.handleBlur('password')}
                          onSubmitEditing={(event) => props.handleSubmit()}
                          error={props.touched.password && props.errors.password}
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
                        <ClickableText onPress={this.gotoLogin}>{i18n.t('create-account.login')}</ClickableText>{' '}
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
                      onPress={props.handleSubmit}
                      hideLoading={!props.isSubmitting}
                      enable={this.state.enableSubmit}>
                      {i18n.t('create-account.btn')}
                    </BrandedButton>
                  </View>
                </View>
              </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
          );
        }}
      </Formik>
    );
  }
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: colors.backgroundPrimary,
    paddingHorizontal: 24,
    paddingTop: 56,
  },
  loginHeader: {
    marginTop: 30,
    marginHorizontal: 16,
  },
  loginSubtitle: {
    marginTop: 16,
  },
  titleText: {
    paddingHorizontal: 16,
    paddingBottom: 16,
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
    position: 'absolute',
    left: -16384,
  },
  fieldError: {
    marginVertical: 4,
  },
  errorText: {
    color: colors.feedbackBad,
  },
  actionBlock: {
    marginBottom: 16,
  },
  nextAction: {
    marginVertical: 8,
  },
});

const mapDispatchToProps = {
  setUsername,
};

export default connect(null, mapDispatchToProps)(RegisterScreen);
