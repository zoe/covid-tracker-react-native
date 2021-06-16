import { BrandedButton } from '@covid/components';
import { Field, FieldError } from '@covid/components/Forms';
import { ClickableText, ErrorText, HeaderLightText, RegularText } from '@covid/components/Text';
import { ValidatedTextInput } from '@covid/components/ValidatedTextInput';
import Analytics, { events } from '@covid/core/Analytics';
import { setUsername } from '@covid/core/state/user';
import { IUserService } from '@covid/core/user/UserService';
import { ScreenParamList } from '@covid/features';
import appCoordinator from '@covid/features/AppCoordinator';
import i18n from '@covid/locale/i18n';
import { lazyInject } from '@covid/provider/services';
import { Services } from '@covid/provider/services.types';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors } from '@theme';
import { AxiosError } from 'axios';
import { Formik, FormikHelpers } from 'formik';
import { Label } from 'native-base';
import React, { Component } from 'react';
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

class RegisterScreen extends Component<PropsType, State> {
  @lazyInject(Services.User)
  private readonly userService: IUserService;

  private passwordComponent: any;

  constructor(props: PropsType) {
    super(props);
    this.state = initialState;
  }

  private async onSubmit(values: RegistrationData, formikHelpers: FormikHelpers<RegistrationData>) {
    if (this.state.enableSubmit) {
      this.setState({ enableSubmit: false });
      try {
        const response = await this.userService.register(values.email, values.password);
        const isTester = response.user.is_tester;
        Analytics.identify({ isTester });
        Analytics.track(events.SIGNUP);
        this.props.setUsername(response.user.username);
        const patientId = response.user.patients[0];
        await appCoordinator.setPatientById(patientId);
        await appCoordinator.fetchInitialData();
        appCoordinator.gotoNextScreen(this.props.route.name);
      } catch (error: any) {
        // TODO - These error messages are misleading and we could display what the server sends back
        //
        // (In version 2 of the register endpoint we receive 403 FORBIDDEN if account has already
        // been registered.  In version 1 it was a 500, which is not an error we should ever return
        // deliberately!)
        if ((error as AxiosError).response?.status === 403) {
          this.setState({
            accountExists: true,
            errorMessage: i18n.t('create-account.already-registered'),
          });
        } else if ((error as AxiosError).response?.status === 400) {
          this.setState({
            accountExists: false,
            errorMessage: i18n.t('create-account.password-too-simple'),
          });
        } else {
          this.setState({
            accountExists: false,
            errorMessage: i18n.t('create-account.something-went-wrong', {
              msg: (error as AxiosError).response?.status,
            }),
          });
        }
      }
      formikHelpers.setSubmitting(false);
    }
  }

  gotoLogin = () => {
    this.props.navigation.replace('Login', { terms: '' });
  };

  registerSchema = Yup.object().shape({
    email: Yup.string().required(i18n.t('create-account.email-required')).email(i18n.t('create-account.email-error')),
    password: Yup.string()
      .required(i18n.t('create-account.password-required'))
      .min(8, i18n.t('create-account.password-too-simple')),
  });

  setIsEnabled(user: string, pass: string) {
    const enableSubmit = user.length > 0 && pass.length > 7;
    this.setState({ enableSubmit });
  }

  render() {
    return (
      <Formik initialValues={initialRegistrationValues} onSubmit={this.onSubmit} validationSchema={this.registerSchema}>
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
                          {i18n.t('create-account.login')}
                        </ClickableText>
                      </RegularText>
                    </View>
                  </View>

                  <View style={styles.form}>
                    <View style={styles.formItem}>
                      <Field>
                        <Label style={styles.labelStyle}>{i18n.t('create-account.email')}</Label>
                        <ValidatedTextInput
                          autoCapitalize="none"
                          autoCompleteType="email"
                          error={(props.touched.email && props.errors.email) || this.state.accountExists}
                          keyboardType="email-address"
                          onBlur={props.handleBlur('email')}
                          onChangeText={(text) => {
                            props.handleChange('email')(text);
                            this.setIsEnabled(text, props.values.password);
                          }}
                          onSubmitEditing={() => {
                            this.passwordComponent.focus();
                          }}
                          placeholder={i18n.t('create-account.email')}
                          returnKeyType="next"
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
                          value={props.values.password}
                        />
                        {!!props.touched.password && !!props.errors.password ? (
                          <FieldError>{props.errors.password}</FieldError>
                        ) : null}
                      </Field>
                    </View>
                  </View>

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
                      enable={this.state.enableSubmit}
                      hideLoading={!props.isSubmitting}
                      onPress={props.handleSubmit}
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
