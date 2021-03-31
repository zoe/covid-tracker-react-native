import { by, expect, element, init, device } from 'detox';

describe('Example', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    if (typeof device == 'undefined') {
      await init();
    }
    await device.reloadReactNative();
  });

  it('should show a map', async () => {
    await expect(element(by.id('map'))).toBeVisible();
  });

  it('should show a login button', async () => {
    await expect(element(by.id('loginLink'))).toBeVisible();
  });

  it('should show a selectCountry button, which on tap shows 3 flag options', async () => {
    await expect(element(by.id('selectCountry'))).toBeVisible();
    await element(by.id('selectCountry')).tap();
    await expect(element(by.text('Select country of residence'))).toExist();
    await expect(element(by.id('selectCountryUS'))).toBeVisible();
    await expect(element(by.id('selectCountryGB'))).toBeVisible();
    await expect(element(by.id('selectCountrySV'))).toBeVisible();
  });

  it('should show correct text on welcome screen', async () => {
    await expect(element(by.text('Take 1 minute each day and help fight the outbreak in your community.'))).toExist();
  });

  it('should show a create account button', async () => {
    await expect(element(by.id('createAccount'))).toExist();
  });
});
