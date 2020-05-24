import { usMap, gbMap, svMap, svFlag, usFlag, gbFlag } from '@assets';
import * as UserService from '@covid/core/user/UserService';
import * as React from 'react';
import { render, fireEvent } from 'react-native-testing-library';

import { Welcome2Screen } from '../Welcome2Screen';
import i18n from '@covid/locale/i18n';

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
    // const mockedIsUSCountry = jest.spyOn(UserService, 'isUSCountry');
    // mockedIsUSCountry.mockImplementation(() => false);
    // mockedShouldAskCountryConfirmation.mockImplementationOnce(() => Promise.resolve(false));
    const { getByTestId } = render(<Welcome2Screen {...props} />);
    await fireEvent(getByTestId('createAccount'), 'onPress');
    expect(props.navigation.navigate).toHaveBeenCalledWith('Consent', { viewOnly: false });
    // mockedIsUSCountry.mockReset();
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
