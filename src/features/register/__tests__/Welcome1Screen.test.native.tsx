import { usMap, gbMap, svMap, svFlag, usFlag, gbFlag } from '@assets';
import * as UserService from '@covid/core/user/UserService';
import i18n from '@covid/locale/i18n';
import * as React from 'react';
import { render, fireEvent } from 'react-native-testing-library';

import { Welcome1Screen } from '../Welcome1Screen';

jest.mock('@covid/core/user/UserService');
const { mockedGetUserCount } = UserService as any;

const props: any = {
  navigation: {
    navigate: jest.fn(),
  },
};

beforeEach(() => {
  jest.clearAllMocks();
});

mockedGetUserCount.mockImplementation(() => Promise.resolve());

describe('Welcome1Screen', () => {
  it('should render for US', () => {
    i18n.locale = 'en-US';
    const mockedIsUSCountry = jest.spyOn(UserService, 'isUSCountry');
    mockedIsUSCountry.mockImplementation(() => true);
    const { toJSON } = render(<Welcome1Screen {...props} />);
    expect(toJSON()).toMatchSnapshot();
    mockedIsUSCountry.mockReset();
  });

  it('should render for UK', () => {
    i18n.locale = 'en-UK';
    const mockedIsGBCountry = jest.spyOn(UserService, 'isGBCountry');
    mockedIsGBCountry.mockImplementation(() => true);
    const { toJSON } = render(<Welcome1Screen {...props} />);
    expect(toJSON()).toMatchSnapshot();
    mockedIsGBCountry.mockReset();
  });

  it('should render for Sweden', () => {
    i18n.locale = 'sv-SE';
    const mockedIsSECountry = jest.spyOn(UserService, 'isSECountry');
    mockedIsSECountry.mockImplementation(() => true);
    const { toJSON } = render(<Welcome1Screen {...props} />);
    expect(toJSON()).toMatchSnapshot();
    mockedIsSECountry.mockReset();
  });

  it('should display UK flag and map', () => {
    const mockedIsGBCountry = jest.spyOn(UserService, 'isGBCountry');
    mockedIsGBCountry.mockImplementation(() => true);
    const { getByTestId } = render(<Welcome1Screen {...props} />);
    expect(getByTestId('map').props.source).toBe(gbMap);
    expect(getByTestId('flag').props.source).toBe(gbFlag);
    mockedIsGBCountry.mockReset();
  });

  it('should display Swedish flag and map', () => {
    const mockedIsSECountry = jest.spyOn(UserService, 'isSECountry');
    mockedIsSECountry.mockImplementation(() => true);
    const { getByTestId } = render(<Welcome1Screen {...props} />);
    expect(getByTestId('map').props.source).toBe(svMap);
    expect(getByTestId('flag').props.source).toBe(svFlag);
    mockedIsSECountry.mockReset();
  });

  it('should display American flag and map', () => {
    const mockedIsUSCountry = jest.spyOn(UserService, 'isUSCountry');
    mockedIsUSCountry.mockImplementation(() => true);
    const { getByTestId } = render(<Welcome1Screen {...props} />);
    expect(getByTestId('map').props.source).toBe(usMap);
    expect(getByTestId('flag').props.source).toBe(usFlag);
    mockedIsUSCountry.mockReset();
  });

  it('should update the user count on mount', async () => {
    mockedGetUserCount.mockImplementationOnce(() => Promise.resolve(' 123 '));
    const { getByTestId } = await render(<Welcome1Screen {...props} />);
    expect(getByTestId('counter').props.count).toBe(123);
  });

  it('should go to page 2 on press', () => {
    const { getByTestId } = render(<Welcome1Screen {...props} />);
    fireEvent(getByTestId('more'), 'onPress');
    expect(props.navigation.navigate).toHaveBeenLastCalledWith('Welcome2');
  });

  it('should go to the country select page when clicking on the flag', () => {
    const { getByTestId } = render(<Welcome1Screen {...props} />);
    fireEvent(getByTestId('selectCountry'), 'onPress');
    expect(props.navigation.navigate).toHaveBeenLastCalledWith('CountrySelect', { patientId: null });
  });
});
