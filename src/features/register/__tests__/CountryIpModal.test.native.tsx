import { AsyncStorageService } from '@covid/core/AsyncStorageService';
import * as UserService from '@covid/core/user/UserService';
import * as React from 'react';
import { render, fireEvent } from 'react-native-testing-library';

import CountryIpModal from '../CountryIpModal';

const props: any = {
  closeModal: jest.fn(),
  navigation: {
    reset: jest.fn(),
  },
};

jest.mock('@covid/core/user/UserService');
const { mockedSetUserCountry } = UserService as any;

beforeEach(() => {
  jest.clearAllMocks();
});

it('should render', () => {
  const { toJSON } = render(<CountryIpModal {...props} />);
  expect(toJSON()).toMatchSnapshot();
});

it('should close the modal', () => {
  const { getByTestId } = render(<CountryIpModal {...props} />);
  fireEvent(getByTestId('closeModal'), 'onPress');
  expect(props.closeModal).toHaveBeenCalledTimes(1);
});

it('should set the country for US', async () => {
  const mockedSetAskedCountryConfirmation = jest.spyOn(AsyncStorageService, 'setAskedCountryConfirmation');
  const { getByTestId } = render(<CountryIpModal {...props} />);
  await fireEvent(getByTestId('countryPicker'), 'onValueChange', 'US');

  expect(props.closeModal).toHaveBeenCalledTimes(1);
  expect(mockedSetAskedCountryConfirmation).toHaveBeenCalledTimes(1);
  expect(mockedSetUserCountry).toHaveBeenLastCalledWith('US');
  expect(props.navigation.reset).toHaveBeenLastCalledWith({
    index: 0,
    routes: [
      { name: 'Welcome', params: {} },
      { name: 'BeforeWeStartUS', params: {} },
    ],
  });
});

it('should set the country for non-US', async () => {
  const mockedSetAskedCountryConfirmation = jest.spyOn(AsyncStorageService, 'setAskedCountryConfirmation');
  const { getByTestId } = render(<CountryIpModal {...props} />);
  await fireEvent(getByTestId('countryPicker'), 'onValueChange', 'GB');

  expect(props.closeModal).toHaveBeenCalledTimes(1);
  expect(mockedSetAskedCountryConfirmation).toHaveBeenCalledTimes(1);
  expect(mockedSetUserCountry).toHaveBeenLastCalledWith('GB');
  expect(props.navigation.reset).toHaveBeenLastCalledWith({
    index: 0,
    routes: [
      { name: 'Welcome', params: {} },
      { name: 'Consent', params: {} },
    ],
  });
});
