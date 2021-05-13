/* eslint-disable @typescript-eslint/no-useless-constructor */
export const mockedLogin = jest.fn();
export const mockedResetPassword = jest.fn();
export const mockedSetConsentSigned = jest.fn();
export const mockedGetUserCount = jest.fn();
export const mockedGetConfig = jest.fn();
export const mockedShouldAskCountryConfirmation = jest.fn();
export const mockedSetUserCountry = jest.fn();

export const isUSCountry = jest.fn();
export const isGBCountry = jest.fn();
export const isSECountry = jest.fn();

// to add other mocked implementations when needed
export default jest.fn().mockImplementation(() => ({
  getConfig: mockedGetConfig,
  getUserCount: mockedGetUserCount,
  login: mockedLogin,
  resetPassword: mockedResetPassword,
  setConsentSigned: mockedSetConsentSigned,
  setUserCountry: mockedSetUserCountry,
  shouldAskCountryConfirmation: mockedShouldAskCountryConfirmation,
}));
