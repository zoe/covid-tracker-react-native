import { svFlag, usFlag, gbFlag } from '@assets';
import * as UserService from '@covid/core/user/UserService';
import i18n from '@covid/locale/i18n';
import * as React from 'react';
import { Linking } from 'react-native';
import { render, fireEvent } from 'react-native-testing-library';

import { Welcome2Screen } from '../Welcome2Screen';

jest.mock('@covid/core/user/UserService');
const { mockedShouldAskCountryConfirmation } = UserService as any;

const props: any = {
  navigation: {
    navigate: jest.fn(),
  },
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Welcome2Screen', () => {
  it('should render for US', () => {
    i18n.locale = 'en-US';
    const mockedIsUSCountry = jest.spyOn(UserService, 'isUSCountry');
    mockedIsUSCountry.mockImplementation(() => true);
    const { toJSON } = render(<Welcome2Screen {...props} />);
    expect(toJSON()).toMatchSnapshot();
    mockedIsUSCountry.mockReset();
  });

  it('should render for UK', () => {
    i18n.locale = 'en-GB';
    const mockedIsGBCountry = jest.spyOn(UserService, 'isGBCountry');
    mockedIsGBCountry.mockImplementation(() => true);
    const { toJSON } = render(<Welcome2Screen {...props} />);
    expect(toJSON()).toMatchSnapshot();
    mockedIsGBCountry.mockReset();
  });

  it('should render for Sweden', () => {
    i18n.locale = 'sv-SE';
    const mockedIsSECountry = jest.spyOn(UserService, 'isSECountry');
    mockedIsSECountry.mockImplementation(() => true);
    const { toJSON } = render(<Welcome2Screen {...props} />);
    expect(toJSON()).toMatchSnapshot();
    mockedIsSECountry.mockReset();
  });

  it('should display UK flag', () => {
    const mockedIsGBCountry = jest.spyOn(UserService, 'isGBCountry');
    mockedIsGBCountry.mockImplementation(() => true);
    const { getByTestId } = render(<Welcome2Screen {...props} />);
    expect(getByTestId('flag').props.source).toBe(gbFlag);
    mockedIsGBCountry.mockReset();
  });

  it('should display Swedish flag', () => {
    const mockedIsSECountry = jest.spyOn(UserService, 'isSECountry');
    mockedIsSECountry.mockImplementation(() => true);
    const { getByTestId } = render(<Welcome2Screen {...props} />);
    expect(getByTestId('flag').props.source).toBe(svFlag);
    mockedIsSECountry.mockReset();
  });

  it('should display American flag', () => {
    const mockedIsUSCountry = jest.spyOn(UserService, 'isUSCountry');
    mockedIsUSCountry.mockImplementation(() => true);
    const { getByTestId } = render(<Welcome2Screen {...props} />);
    expect(getByTestId('flag').props.source).toBe(usFlag);
    mockedIsUSCountry.mockReset();
  });

  it('should navigate to the login page', () => {
    const { getByTestId } = render(<Welcome2Screen {...props} />);
    fireEvent(getByTestId('login'), 'onPress');
    expect(props.navigation.navigate).toHaveBeenCalledWith('Login');
  });

  it('should open disclaimer link for UK', () => {
    const mockedIsGBCountry = jest.spyOn(UserService, 'isGBCountry').mockImplementation(() => true);
    const { getByTestId } = render(<Welcome2Screen {...props} />);
    fireEvent(getByTestId('disclaimer'), 'onPress');
    const mockedOpenUrl = jest.spyOn(Linking, 'openURL');
    expect(mockedOpenUrl).toHaveBeenCalledWith('https://www.nhs.uk/conditions/coronavirus-covid-19/');
    mockedIsGBCountry.mockReset();
  });

  it('should open disclaimer link for Sweden', () => {
    const mockedIsSECountry = jest.spyOn(UserService, 'isSECountry').mockImplementation(() => true);
    const { getByTestId } = render(<Welcome2Screen {...props} />);
    fireEvent(getByTestId('disclaimer'), 'onPress');
    const mockedOpenUrl = jest.spyOn(Linking, 'openURL');
    expect(mockedOpenUrl).toHaveBeenCalledWith('https://www.1177.se');
    mockedIsSECountry.mockReset();
  });

  it('should navigate to the country selection page', () => {
    const { getByTestId } = render(<Welcome2Screen {...props} />);
    fireEvent(getByTestId('selectCountry'), 'onPress');
    expect(props.navigation.navigate).toHaveBeenCalledWith('CountrySelect', { patientId: null });
  });

  it('should show ip modal when create account is pressed', async () => {
    mockedShouldAskCountryConfirmation.mockImplementationOnce(() => Promise.resolve(true));
    const { getByTestId } = render(<Welcome2Screen {...props} />);
    await fireEvent(getByTestId('createAccount'), 'onPress');
    const { props: modalProps } = getByTestId('countryIpModal');
    expect(modalProps.isModalVisible).toBe(true);
  });

  it('should go to consent page if not US', async () => {
    const { getByTestId } = render(<Welcome2Screen {...props} />);
    await fireEvent(getByTestId('createAccount'), 'onPress');
    expect(props.navigation.navigate).toHaveBeenCalledWith('Consent', { viewOnly: false });
  });

  it('should go to before we start page for US', async () => {
    const mockedIsUSCountry = jest.spyOn(UserService, 'isUSCountry');
    mockedIsUSCountry.mockImplementation(() => true);
    mockedShouldAskCountryConfirmation.mockImplementationOnce(() => Promise.resolve(false));
    const { getByTestId } = render(<Welcome2Screen {...props} />);
    await fireEvent(getByTestId('createAccount'), 'onPress');
    expect(props.navigation.navigate).toHaveBeenCalledWith('BeforeWeStartUS');
    mockedIsUSCountry.mockReset();
  });
});
