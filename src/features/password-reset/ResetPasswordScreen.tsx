import { IUserService } from '@covid/core/user/UserService';
import { ScreenParamList } from '@covid/features';
import ResetPasswordForm, { IResetPasswordForm } from '@covid/features/password-reset/fields/ResetPasswordForm';
import i18n from '@covid/locale/i18n';
import { lazyInject } from '@covid/provider/services';
import { Services } from '@covid/provider/services.types';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors } from '@theme';
import { AxiosError } from 'axios';
import { Formik, FormikHelpers } from 'formik';
import React, { Component } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import * as Yup from 'yup';

type PropsType = {
  navigation: StackNavigationProp<ScreenParamList, 'ResetPassword'>;
};

type State = {
  errorMessage: string;
  enableSubmit: boolean;
};

const initialState: State = {
  enableSubmit: true,
  errorMessage: '',
};

interface ResetPasswordData {
  email: string;
}

const initialValues = { email: '' };

export class ResetPasswordScreen extends Component<PropsType, State> {
  @lazyInject(Services.User)
  private userService: IUserService;

  state = initialState;

  onSubmit = async (values: ResetPasswordData, formikHelpers: FormikHelpers<ResetPasswordData>) => {
    if (this.state.enableSubmit) {
      this.setState({ enableSubmit: false });
      try {
        await this.userService.resetPassword(values.email);
        this.props.navigation.navigate('ResetPasswordConfirm');
      } catch (error: any) {
        this.setState({ errorMessage: i18n.t('reset-password.error', { msg: (error as AxiosError).message }) });
        this.setState({ enableSubmit: true });
      }
      formikHelpers.setSubmitting(false);
    }
  };

  validationSchema = Yup.object().shape({
    email: Yup.string().email().required(),
  });

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.rootContainer}>
          <Formik initialValues={initialValues} onSubmit={this.onSubmit} validationSchema={this.validationSchema}>
            {(formikProps: IResetPasswordForm) => (
              <ResetPasswordForm {...formikProps} errorMessage={this.state.errorMessage} />
            )}
          </Formik>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  rootContainer: {
    backgroundColor: colors.backgroundPrimary,
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 56,
  },
});
