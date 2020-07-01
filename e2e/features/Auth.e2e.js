const { device, element, by } = require('detox');

describe('Auth', () => {
  const user = {
    email: '',
    password: '',
  };

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should be able to login & out', async () => {
    // Go to login
    await element(by.id('more')).tap();
    await element(by.id('login')).tap();
    await expect(element(by.id('email'))).toBeVisible();
    await expect(element(by.id('password'))).toBeVisible();

    // Login
    await element(by.id('email')).typeText(user.email);
    await element(by.id('password')).typeText(user.password);
    await element(by.id('login-button')).tap();

    // Check is logged in
    await expect(element(by.id('report-button'))).toBeVisible();

    // Logout
    await element(by.id('drawer-toggle')).tap();
    await element(by.id('logout-nav-item')).tap();

    await expect(element(by.id('more'))).toBeVisible();
  });
});
