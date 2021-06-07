import { by, device, element, expect, init } from 'detox';

const countries = ['GB', 'SE', 'US'];

beforeAll(async () => {
  await device.launchApp();
});

// beforeEach(async () => {
//   if (typeof device === 'undefined') {
//     await init();
//   }
//   await device.reloadReactNative();
// });

// Test the flows on the non-authenticated part of the application

describe('Test the welcome screen', () => {
  it('should show a map', async () => {
    await expect(element(by.id('map'))).toBeVisible();
  });

  it('should show a login button', async () => {
    await expect(element(by.id('login-link'))).toBeVisible();
  });

  it('should show a select country button', async () => {
    await expect(element(by.id('select-country'))).toBeVisible();
  });

  it('should show a create account button', async () => {
    await expect(element(by.id('create-account'))).toExist();
  });
});

describe('Test the select country screen', () => {
  it('should open the select country screen', async () => {
    await expect(element(by.id('select-country'))).toBeVisible();
    await element(by.id('select-country')).tap();
  });

  it('should show all the select country buttons', async () => {
    for (const country of countries) {
      // eslint-disable-next-line no-await-in-loop
      await expect(element(by.id(`select-country-${country}`))).toBeVisible();
    }
  });

  it('should go to the login screen after clicking the back button', async () => {
    await element(by.id('basic-nav-header-button')).tap();
    await expect(element(by.id('select-country'))).toExist();
  });

  countries.reverse().forEach((country) => {
    it(`should change the country to ${country}`, async () => {
      await element(by.id('select-country')).tap();
      await element(by.id(`select-country-${country}`)).tap();
      await expect(element(by.id(`flag-${country}`))).toBeVisible();
    });
  });
});

describe('Test the login screen', () => {
  it('should open, close and open the login screen', async () => {
    await expect(element(by.id('login-link'))).toBeVisible();
    await element(by.id('login-link')).tap();
    await element(by.id('basic-nav-header-button')).tap();
    await element(by.id('login-link')).tap();
  });

  test('that the inputs and submit button is visible', async () => {
    await expect(element(by.id('login-input-email'))).toBeVisible();
    await expect(element(by.id('login-input-password'))).toBeVisible();
    await expect(element(by.id('login-button'))).toBeVisible();
  });

  // @todo: Test that the submit button is only enabled when both inputs are filled in.
  // it("shouldn't be possible to submit the button with an empty input", async () => {
  //   await element(by.id('login-button'));
  // });

  it('should be able to fill in the input fields', async () => {
    await element(by.id('login-input-email')).typeText('test@joinzoe.com');
    await element(by.id('login-input-password')).typeText('manymuffins');
  });
});
