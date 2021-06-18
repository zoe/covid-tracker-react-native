import { by, device, element, expect, init } from 'detox';

const countries = ['GB', 'SE', 'US'];
const password = 'manymuffins';
const profileName = `profile ${Math.round(Date.now() / 1000)}`;
const username = 'test@joinzoe.com';

function sleep(milliseconds: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

async function scrollTo(scrollElementId: string, elementId: string) {
  try {
    await waitFor(element(by.id(elementId)))
      .toBeVisible()
      .whileElement(by.id(scrollElementId))
      .scroll(500, 'down');
  } catch (_) {}
}

beforeAll(async () => {
  // @todo: There seems to be a bug with this but it's necessary for the automatic ci/cd tests to complete.
  // await device.launchApp({ permissions: { notifications: 'YES' } });
  await device.launchApp();
});

beforeEach(async () => {
  if (typeof device === 'undefined') {
    await init();
  }
});

// Test the flows on the non-authenticated part of the application

function testWelcomeScreen() {
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
      await expect(element(by.id('create-account-1'))).toExist();
    });
  });
}

function testSelectCountryScreen() {
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
}

function testRegisterScreen() {
  // @todo: The current picker component does not support the testID property.
  describe('Test the register screen for GB', () => {
    it('should open the register screen', async () => {
      await element(by.id('create-account-1')).tap();
      await element(by.id('create-account-2')).tap();
      await element(by.id('country-picker')).tap();
      await element(by.id('picker-item-GB')).tap();
      await device.reloadReactNative();
    });
  });
}

function testLoginScreen(username: string, password: string) {
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
      await element(by.id('login-input-email')).typeText(username);
      await element(by.id('login-input-password')).typeText(password);
    });

    it('should login the user', async () => {
      await element(by.id('login-button')).tap();
      await element(by.id('login-button')).tap();
      await expect(element(by.id('login-button'))).not.toBeVisible();
    });
  });
}

// Test the flows on the authenticated part of the application

function testLogout() {
  describe('Test the logout functionality', () => {
    it('should open the profile screen', async () => {
      await element(by.id('drawer-toggle')).tap();
    });
    it('should logout the user', async () => {
      await element(by.id('menu-item-logout')).tap();
    });
    // It would be better if the user directly goes to the home screen.
    it('should show the select country screen', async () => {
      await expect(element(by.id('select-country-screen'))).toBeVisible();
      await element(by.id('select-country-GB')).tap();
    });
  });
}

function testCreateNewProfile() {
  describe('Test create a new profile', () => {
    it('should open the select profile screen', async () => {
      await element(by.id('button-report-today')).tap();
    });

    it('should be able to create a new profile', async () => {
      await element(by.id('scroll-view-select-profile-screen')).scrollTo('bottom');
      await element(by.id('button-new-profile')).tap();
      await element(by.id('input-profile-name')).typeText(profileName);
      await element(by.id('button-submit')).tap();
      await element(by.id('button-submit')).tap();

      // @todo: Also test button-under-18
      await element(by.id('button-over-18')).tap();
      await element(by.id('checkbox-consent')).tap();
      await element(by.id('button-create-profile')).tap();
    });

    it('should be able to fill in your profile', async () => {
      await element(by.id('input-year-of-birth')).typeText('2000');

      // @todo: The current input component does not support the testID property.
      // await element(by.id('input-sex-at-birth')).tap();
      // await element(by.id('input-gender-identity')).tap();
      // await element(by.id('race-ethnicity-checkbox-prefer_not_to_say')).tap();

      await scrollTo('scroll-view-about-you-screen', 'input-height-feet');
      await element(by.id('input-height-feet')).typeText('6');
      await element(by.id('input-height-inches')).typeText('0');

      await scrollTo('scroll-view-about-you-screen', 'input-weight-kg');
      await element(by.id('input-weight-kg')).typeText('75');

      await scrollTo('scroll-view-about-you-screen', 'input-postal-code');
      await element(by.id('input-postal-code')).typeText('1111AA');

      // @todo: The current input component does not support the testID property.
      // await scrollTo('scroll-view-about-you-screen', 'input-ever-exposed');
      // await element(by.id('input-ever-exposed')).tap();

      await scrollTo('scroll-view-about-you-screen', 'button-submit');
      await element(by.id('button-submit')).tap();
    });
  });
}

function testReportToday() {
  describe('Test report today', () => {
    it('should open the select profile screen', async () => {
      await element(by.id('button-report-today')).tap();
    });

    it('should open the first profile', async () => {
      await element(by.id('profile-card-0')).tap();
    });

    it('should be able to add a COVID-19 test', async () => {
      await element(by.id('button-add-test')).tap();
      await element(by.id('button-yes-covid-test-date-question')).tap();

      // @todo: The current input component does not support the testID property.

      // await scrollTo('scroll-view-covid-test-detail-screen', 'covid-test-mechanism-question');
      // await element(by.id('covid-test-mechanism-question')).tap();

      // await scrollTo('scroll-view-covid-test-detail-screen', 'covid-test-location-question');
      // await element(by.id('covid-test-location-question')).tap();

      // await scrollTo('scroll-view-covid-test-detail-screen', 'covid-test-result-question');
      // await element(by.id('covid-test-result-question')).tap();

      await scrollTo('scroll-view-covid-test-detail-screen', 'button-no-covid-test-is-rapid-question');
      await element(by.id('button-no-covid-test-is-rapid-question')).tap();

      await scrollTo('scroll-view-covid-test-detail-screen', 'button-no-covid-test-invited-question');
      await element(by.id('button-no-covid-test-invited-question')).tap();

      await scrollTo('scroll-view-covid-test-detail-screen', 'button-submit');
      await element(by.id('button-submit')).tap();

      await element(by.id('basic-nav-header-button')).tap();

      await element(by.id('button-covid-test-list-screen')).tap();
    });

    it('should be able to add a COVID-19 vaccine', async () => {
      await element(by.id('button-vaccine-list-screen')).tap();
    });

    it('should set the health status', async () => {
      await element(by.id('button-status-healthy')).tap();
    });

    it('should dismiss the rating modal if present', async () => {
      try {
        await element(by.id('button-rating-yes')).tap();
        await element(by.id('button-rating-rate')).tap();
      } catch (_) {}
    });

    it('should go back to the home screen', async () => {
      await scrollTo('scroll-view-thank-you-screen', 'button-back');
      await element(by.id('button-back')).tap();
    });
  });
}

testReportToday();
