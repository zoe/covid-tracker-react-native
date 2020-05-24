/* eslint-disable @typescript-eslint/no-useless-constructor */
export const mockedLogin = jest.fn();
export const mockedResetPassword = jest.fn();

export const isUSCountry = jest.fn();

// to add other mocked implementations when needed
export default jest.fn().mockImplementation(() => ({
  login: mockedLogin,
  resetPassword: mockedResetPassword,
}));
