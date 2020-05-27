import i18n from '@covid/locale/i18n';
import { shallow } from 'enzyme';
import * as React from 'react';

import { ResetPasswordScreen } from '../ResetPassword';
import ResetPasswordForm, { Props as FormProps } from '../ResetPassword/ResetPasswordForm';

/**
 * MOCKS
 */
const mockedResetPassword = jest.fn();
jest.mock('@covid/core/user/UserService', () => ({
  __esModule: true,
  ...jest.requireActual('@covid/core/user/UserService'),
  default: jest.fn().mockImplementation(() => ({
    resetPassword: mockedResetPassword,
  })),
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe('ResetPasswordForm tests', () => {
  /**
   * DEFAULT PROPS
   */
  const mockedHandleChange = jest.fn();
  const mockedHandleBlur = jest.fn();

  const props: FormProps = {
    values: {
      email: 'info@example.com',
    },
    touched: {
      email: false,
    },
    errors: {},
    handleChange: jest.fn().mockImplementation(() => mockedHandleChange),
    handleBlur: jest.fn().mockImplementation(() => mockedHandleBlur),
    handleSubmit: jest.fn(),
  };

  it('should render with a valid email and no errors', () => {
    expect(shallow(<ResetPasswordForm {...props} />)).toMatchSnapshot();
    expect(props.handleChange).toHaveBeenLastCalledWith('email');
    expect(props.handleBlur).toHaveBeenLastCalledWith('email');
  });

  it('should render with invalid email and errors', () => {
    const wrapper = shallow(
      <ResetPasswordForm
        {...props}
        values={{ email: 'invalid@' }}
        touched={{ email: true }}
        errors={{ email: 'invalid' }}
        errorMessage="Invalid Password"
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should call handleChange when email changes', () => {
    const wrapper = shallow(<ResetPasswordForm {...props} />);
    const onChangeText = wrapper.find('ValidatedTextInput').prop('onChangeText') as (text: string) => void;
    onChangeText('info@exam');

    expect(mockedHandleChange).toHaveBeenLastCalledWith('info@exam');
  });

  it('should call handleBlur when email loses focus', () => {
    const wrapper = shallow(<ResetPasswordForm {...props} />);
    const onBlur = wrapper.find('ValidatedTextInput').prop('onBlur') as () => void;
    onBlur();

    expect(mockedHandleBlur).toHaveBeenCalledTimes(1);
  });

  it('should call handleSubmit when reset password button is pressed', () => {
    const wrapper = shallow(<ResetPasswordForm {...props} />);
    const onPress = wrapper.find('BrandedButton').prop('onPress') as () => void;
    onPress();

    expect(props.handleSubmit).toHaveBeenCalledTimes(1);
  });
});

describe('ResetPasswordScreen tests', () => {
  /**
   * DEFAULT PROPS
   */
  const props: any = {
    navigation: {
      navigate: jest.fn(),
      // reset: jest.fn(),
    },
  };

  it('should navigate successfully to the reset password confirmation screen', async () => {
    mockedResetPassword.mockImplementationOnce(() => Promise.resolve());

    const wrapper = shallow(<ResetPasswordScreen {...props} />);
    const onSubmit = wrapper.find('Formik').prop('onSubmit') as (data: any) => void;
    await onSubmit({ email: 'info@example' });

    await expect(mockedResetPassword).toHaveBeenCalledTimes(1);
    expect(props.navigation.navigate).toHaveBeenLastCalledWith('ResetPasswordConfirm');
  });

  it('should generate an error if the api returns an error', async () => {
    mockedResetPassword.mockImplementationOnce(() => Promise.reject(new Error('API Error')));

    const wrapper = shallow(<ResetPasswordScreen {...props} />);
    const onSubmit = wrapper.find('Formik').prop('onSubmit') as (data: any) => void;
    await onSubmit({ email: 'info@example' });

    expect(wrapper.state('enableSubmit')).toBe(false);

    await expect(mockedResetPassword).toHaveBeenCalledTimes(1);
    expect(props.navigation.navigate).toHaveBeenCalledTimes(0);
    expect(wrapper.state()).toEqual({
      errorMessage: i18n.t('reset-password.error', { msg: 'API Error' }),
      enableSubmit: true,
    });
  });
});
