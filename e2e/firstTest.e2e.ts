import { by, expect, element, init, device } from 'detox';

describe('Welcome page content', () => {
  beforeAll(async () => {
    // Required to dismiss the permissions popup
    // await device.launchApp({newInstance: true, permissions: {notifications: 'YES'}});
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
    await expect(element(by.id('selectCountrySE'))).toBeVisible();
  });

  it('should show correct text on welcome screen', async () => {
    await expect(element(by.text('Take 1 minute each day and help fight the outbreak in your community.'))).toExist();
  });

  it('should show a create account button', async () => {
    await expect(element(by.id('createAccount'))).toExist();
  });
});

describe('Login from welcome page', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    if (typeof device == 'undefined') {
      await init();
    }
    await device.reloadReactNative();
  });

  it('should show a login button which links to login page with header, email/password/submit inputs', async () => {
    await expect(element(by.id('loginLink'))).toBeVisible();
    await element(by.id('loginLink')).tap();
    await expect(element(by.id('loginPageHeaderText'))).toBeVisible();
    await expect(element(by.id('loginInputEmail'))).toBeVisible();
    await expect(element(by.id('loginInputPassword'))).toBeVisible();
    await expect(element(by.id('loginButton'))).toBeVisible();
  });

  it('should login to staging with dummy data', async () => {
    await element(by.id('loginLink')).tap();
    // This connects/logs in to staging directly.
    // Still undecided if this is good strategy or not
    // e2e test is about testing flow, so failures on staging, backend, don't necessarily need isolating
    await element(by.id('loginInputEmail')).typeText('detox@joinzoe.com');
    await element(by.id('loginInputPassword')).typeText('password');
    await element(by.id('loginButton')).tap();
    await expect(element(by.text("Report today, even if you're well"))).toBeVisible();
  });
});
