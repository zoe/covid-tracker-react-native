import { BasicPage } from '@covid/components';
import { userService } from '@covid/core/user/UserService';
import { ScreenParamList } from '@covid/features';
import ResetPasswordForm, { IResetPasswordForm } from '@covid/features/password-reset/fields/ResetPasswordForm';
import i18n from '@covid/locale/i18n';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors } from '@theme';
import { AxiosError } from 'axios';
import { Formik } from 'formik';
import * as React from 'react';
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

export class ResetPasswordScreen extends React.Component<PropsType, State> {
  constructor(props: PropsType) {
    super(props);
    this.state = initialState;
  }

  handleClick = (formData: ResetPasswordData) => {
    if (this.state.enableSubmit) {
      this.setState({ enableSubmit: false });
      userService
        .resetPassword(formData.email)
        .then(() => this.props.navigation.navigate('ResetPasswordConfirm'))
        .catch((err: AxiosError) => {
          this.setState({ errorMessage: i18n.t('reset-password.error', { msg: err.message }) });
          this.setState({ enableSubmit: true });
        });
    }
  };

  registerSchema = Yup.object().shape({
    email: Yup.string().email().required(),
  });

  render() {
    return (
      <BasicPage style={{ backgroundColor: colors.white }} withFooter={false}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.rootContainer}>
            <Formik initialValues={{ email: '' }} onSubmit={this.handleClick} validationSchema={this.registerSchema}>
              {(props: IResetPasswordForm) => <ResetPasswordForm {...props} errorMessage={this.state.errorMessage} />}
            </Formik>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </BasicPage>
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
