import { Screen } from '@covid/components/Screen';
import { userService } from '@covid/core/user/UserService';
import ResetPasswordForm, { IResetPasswordForm } from '@covid/features/password-reset/fields/ResetPasswordForm';
import i18n from '@covid/locale/i18n';
import { TScreenParamList } from '@covid/routes/types';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors } from '@theme';
import { AxiosError } from 'axios';
import { Formik } from 'formik';
import * as React from 'react';
import * as Yup from 'yup';

type TProps = {
  navigation: StackNavigationProp<TScreenParamList, 'ResetPassword'>;
};

type TState = {
  errorMessage: string;
  enableSubmit: boolean;
};

const initialState: TState = {
  enableSubmit: true,
  errorMessage: '',
};

interface IResetPasswordData {
  email: string;
}

const initialFormValues = { email: '' };

export class ResetPasswordScreen extends React.Component<TProps, TState> {
  constructor(props: TProps) {
    super(props);
    this.state = initialState;
  }

  onSubmit = (values: IResetPasswordData) => {
    if (this.state.enableSubmit) {
      this.setState({ enableSubmit: false });
      userService
        .resetPassword(values.email)
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
      <Screen backgroundColor={colors.backgroundPrimary} testID="reset-password-screen">
        <Formik initialValues={initialFormValues} onSubmit={this.onSubmit} validationSchema={this.registerSchema}>
          {(props: IResetPasswordForm) => <ResetPasswordForm {...props} errorMessage={this.state.errorMessage} />}
        </Formik>
      </Screen>
    );
  }
}
