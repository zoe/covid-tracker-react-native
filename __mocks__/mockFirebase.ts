/* eslint-disable no-undef */
jest.mock('@covid/core/firebase/analytics', () => ({
  firebaseAnalytics: jest.fn(() => ({
    isInitialized: jest.fn(() => true),
    logEvent: jest.fn(() => Promise.resolve(null)),
    logScreenView: jest.fn(() => Promise.resolve(null)),
    setUserProperties: jest.fn(() => Promise.resolve(null)),
  })),
}));
