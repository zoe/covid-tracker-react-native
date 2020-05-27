import UserService from '@covid/core/user/UserService';
import i18n from '@covid/locale/i18n';
import { StackNavigationProp } from '@react-navigation/stack';
import { AxiosError } from 'axios';
import { Formik } from 'formik';
import React, { Component } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback } from 'react-native';
import * as Yup from 'yup';

import { ScreenParamList } from '../../ScreenParamList';
import ResetPasswordForm, { Props as FormProps } from './ResetPasswordForm';
import styles from './styles';

type PropsType = {
  navigation: StackNavigationProp<ScreenParamList, 'ResetPassword'>;
};

type State = {
  errorMessage: string;
  enableSubmit: boolean;
};

const initialState: State = {
  errorMessage: '',
  enableSubmit: true,
};

interface ResetPasswordData {
  email: string;
}

export class ResetPasswordScreen extends Component<PropsType, State> {
  constructor(props: PropsType) {
    super(props);
    this.state = initialState;

    this.handleClick = this.handleClick.bind(this);
  }

  private handleClick(formData: ResetPasswordData) {
    if (this.state.enableSubmit) {
      this.setState({ enableSubmit: false }); // Stop resubmissions
      const userService = new UserService(); // todo get global var
      userService
        .resetPassword(formData.email)
        .then(() => this.props.navigation.navigate('ResetPasswordConfirm'))
        .catch((err: AxiosError) => {
          this.setState({ errorMessage: i18n.t('reset-password.error', { msg: err.message }) });
          this.setState({ enableSubmit: true });
        });
    }
  }

  registerSchema = Yup.object().shape({
    email: Yup.string().email().required(),
  });

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView style={styles.rootContainer} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <Formik initialValues={{ email: '' }} validationSchema={this.registerSchema} onSubmit={this.handleClick}>
            {(props: FormProps) => <ResetPasswordForm {...props} errorMessage={this.state.errorMessage} />}
          </Formik>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    );
  }
}
