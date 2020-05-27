import { UserNotFoundException } from '@covid/core/Exception';
import * as UserService from '@covid/core/user/UserService';
import i18n from '@covid/locale/i18n';
import { shallow } from 'enzyme';
import { Toast } from 'native-base';
import * as React from 'react';

import { LoginScreen } from '../LoginScreen';

/**
 * MOCKS
 */
const mockedLogin = jest.fn();
jest.mock('@covid/core/user/UserService', () => ({
  __esModule: true,
  ...jest.requireActual('@covid/core/user/UserService'),
  default: jest.fn().mockImplementation(() => ({
    login: mockedLogin,
  })),
  isUSCountry: jest.fn(),
}));

jest.mock('native-base', () => ({
  ...jest.requireActual('native-base'),
  Toast: {
    show: jest.fn(),
  },
}));

/**
 * DEFAULT PROPS
 */
const props: any = {
  navigation: {
    navigate: jest.fn(),
    reset: jest.fn(),
  },
};

beforeEach(() => {
  // reset all the mocks' counters before each test
  jest.clearAllMocks();
});

it('should render', () => {
  expect(shallow(<LoginScreen {...props} />)).toMatchSnapshot();
});

describe('create account functionality', () => {
  it('should navigate to consent', () => {
    // not US
    jest.spyOn(UserService, 'isUSCountry').mockImplementationOnce(() => false);

    const wrapper = shallow(<LoginScreen {...props} />);

    // create account "link"
    const onPress: () => void = wrapper.find('ClickableText').first().prop('onPress');
    onPress();

    expect(props.navigation.navigate).toHaveBeenCalledTimes(1);
    expect(props.navigation.navigate).toHaveBeenCalledWith('Consent', { viewOnly: false });
  });

  it('should navigate to before we start for US', () => {
    // US
    jest.spyOn(UserService, 'isUSCountry').mockImplementationOnce(() => true);

    const wrapper = shallow(<LoginScreen {...props} />);

    // create account "link"
    const onPress: () => void = wrapper.find('ClickableText').first().prop('onPress');
    onPress();

    expect(props.navigation.navigate).toHaveBeenCalledTimes(1);
    expect(props.navigation.navigate).toHaveBeenCalledWith('BeforeWeStartUS');
  });
});

describe('forgot password', () => {
  it('should navigate to reset password', () => {
    const wrapper = shallow(<LoginScreen {...props} />);

    // forgot password "link"
    const onPress: () => void = wrapper.find('ClickableText').last().prop('onPress');
    onPress();

    expect(props.navigation.navigate).toHaveBeenCalledTimes(1);
    expect(props.navigation.navigate).toHaveBeenCalledWith('ResetPassword');
  });
});

describe('username input', () => {
  it('should reset the error state on change text', () => {
    const wrapper = shallow(<LoginScreen {...props} />);
    // click login button to trigger validation
    const onPress: () => void = wrapper.find('BrandedButton').last().prop('onPress');
    onPress();

    // the state should contain the username error
    expect(wrapper.state()).toEqual(
      expect.objectContaining({
        hasUserValidationError: true,
      })
    );

    // write something in the username field
    const onChangeText: (username: string) => void = wrapper.find('Styled(Input)').first().prop('onChangeText');
    onChangeText('info@example.com');

    // the error state should have been reset
    expect(wrapper.state()).toEqual(
      expect.objectContaining({
        hasUserValidationError: false,
      })
    );
  });
});

describe('password input', () => {
  it('should reset the error state on change text', () => {
    const wrapper = shallow(<LoginScreen {...props} />);
    // click login button to trigger validation
    const onPress: () => void = wrapper.find('BrandedButton').last().prop('onPress');
    onPress();

    // the state should contain the password error
    expect(wrapper.state()).toEqual(
      expect.objectContaining({
        hasPassValidationError: true,
      })
    );

    // write something in the password field
    const onChangeText: (password: string) => void = wrapper.find('Styled(Input)').last().prop('onChangeText');
    onChangeText('supersecret');

    // the error state should have been reset
    expect(wrapper.state()).toEqual(
      expect.objectContaining({
        hasPassValidationError: false,
      })
    );
  });
});

describe('login button press', () => {
  it('should not login without username and password', () => {
    const wrapper = shallow(<LoginScreen {...props} />);

    // login button
    const onPress: () => void = wrapper.find('BrandedButton').last().prop('onPress');
    onPress();

    expect(mockedLogin).not.toHaveBeenCalled();
  });

  it('should not login without password', () => {
    const wrapper = shallow(<LoginScreen {...props} />);

    // username input
    const onChangeText: (username: string) => void = wrapper.find('Styled(Input)').first().prop('onChangeText');
    onChangeText('info@example.com');
    // login button
    const onPress: () => void = wrapper.find('BrandedButton').last().prop('onPress');
    onPress();

    expect(mockedLogin).not.toHaveBeenCalled();
  });

  it('should not login without username', () => {
    const wrapper = shallow(<LoginScreen {...props} />);

    // password input
    const onChangeText: (password: string) => void = wrapper.find('Styled(Input)').last().prop('onChangeText');
    onChangeText('supersecret');
    // login button
    const onPress: () => void = wrapper.find('BrandedButton').last().prop('onPress');
    onPress();

    expect(mockedLogin).not.toHaveBeenCalled();
  });

  it('should login with username and password and login successful', async () => {
    // mock a successful login response
    const mockedLoginResponse = {
      user: {
        is_tester: false,
        patients: ['patient_id'],
      },
    };
    mockedLogin.mockImplementationOnce(() => Promise.resolve(mockedLoginResponse));

    const wrapper = shallow(<LoginScreen {...props} />);

    // username input
    const onUsernameChangeText: (username: string) => void = wrapper.find('Styled(Input)').first().prop('onChangeText');
    onUsernameChangeText('info@example.com');
    // password input
    const onPasswordChangeText: (password: string) => void = wrapper.find('Styled(Input)').last().prop('onChangeText');
    onPasswordChangeText('supersecret');
    // login button
    const onPress: () => void = wrapper.find('BrandedButton').last().prop('onPress');
    await onPress();

    expect(mockedLogin).toHaveBeenCalledTimes(1);
    expect(mockedLogin).toHaveBeenCalledWith('info@example.com', 'supersecret');
    expect(props.navigation.reset).toHaveBeenCalledTimes(1);
  });

  it('should login with username and password and login unsuccessful', async () => {
    // mock for the native-base Toast
    const mockedToastShow = jest.spyOn(Toast, 'show');

    const wrapper = shallow(<LoginScreen {...props} />);

    const onUsernameChangeText: (username: string) => void = wrapper.find('Styled(Input)').first().prop('onChangeText');
    const onPasswordChangeText: (password: string) => void = wrapper.find('Styled(Input)').last().prop('onChangeText');
    const onLoginPress: () => void = wrapper.find('BrandedButton').last().prop('onPress');

    // UserNotFoundException case
    mockedLogin.mockImplementationOnce(() => Promise.reject(new UserNotFoundException('User not found')));
    onUsernameChangeText('info@example.com');
    onPasswordChangeText('supersecret');
    await onLoginPress();

    expect(mockedLogin).toHaveBeenCalledTimes(1);
    await expect(mockedLogin).toHaveBeenCalledWith('info@example.com', 'supersecret');
    expect(props.navigation.reset).not.toHaveBeenCalled();
    expect(mockedToastShow).toHaveBeenCalledTimes(1);
    expect(mockedToastShow).toHaveBeenCalledWith(
      expect.objectContaining({ text: i18n.t('login.user-not-found-exception') })
    );
    mockedLogin.mockClear();
    mockedToastShow.mockClear();

    // Generic Error case
    mockedLogin.mockImplementationOnce(() => Promise.reject(new Error('Generic Error')));
    onUsernameChangeText('info@example.com');
    onPasswordChangeText('supersecret');
    await onLoginPress();

    expect(mockedLogin).toHaveBeenCalledTimes(1);
    await expect(mockedLogin).toHaveBeenCalledWith('info@example.com', 'supersecret');
    expect(props.navigation.reset).not.toHaveBeenCalled();
    expect(mockedToastShow).toHaveBeenCalledTimes(1);
    expect(mockedToastShow).toHaveBeenCalledWith(expect.objectContaining({ text: i18n.t('login.exception') }));
  });
});
