import Detox, { by, device, element, expect, init } from 'detox';

const countries = ['GB', 'SE', 'US'];
const defaultPassword = 'manymuffins';
const defaultEmailAddress = 'test@joinzoe.com';
const profileName = `profile ${Math.round(Date.now() / 1000)}`;

function sleep(milliseconds: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

async function scrollToElement(scrollElementId: string, element: Detox.NativeElement, direction: Detox.Direction) {
  try {
    await waitFor(element).toBeVisible().whileElement(by.id(scrollElementId)).scroll(500, direction);
  } catch (_) {}
}

async function scrollUpToElement(scrollElementId: string, element: Detox.NativeElement) {
  await scrollToElement(scrollElementId, element, 'up');
}

async function scrollUpToId(scrollElementId: string, elementId: string) {
  return scrollUpToElement(scrollElementId, element(by.id(elementId)));
}

async function scrollDownToElement(scrollElementId: string, element: Detox.NativeElement) {
  await scrollToElement(scrollElementId, element, 'down');
}

async function scrollDownToId(scrollElementId: string, elementId: string) {
  return scrollDownToElement(scrollElementId, element(by.id(elementId)));
}

async function tapInputByElement(element: Detox.NativeElement) {
  // Tap twice to lose the focus from the previous input (if it was a text input).
  await element.tap();
  await element.tap();
}

async function tapInputById(elementId: string) {
  return tapInputByElement(element(by.id(elementId)));
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
      await element(by.id('button-back-navigation')).tap();
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

type TRegisterConfig = {
  emailAddress: string;
  name?: string;
  password: string;
  phoneNumber?: string;
};

function testAboutYouForm() {
  it('should be able to fill in the form about you', async () => {
    await element(by.id('input-year-of-birth')).typeText('2000');

    await tapInputById('input-sex-at-birth-item-pfnts');

    await scrollDownToId('scroll-view-about-you-screen', 'input-gender-identity-item-pfnts');
    await tapInputById('input-gender-identity-item-pfnts');

    await scrollDownToId('scroll-view-about-you-screen', 'checkbox-race-ethnicity-prefer_not_to_say');
    await tapInputById('checkbox-race-ethnicity-prefer_not_to_say');

    await scrollDownToId('scroll-view-about-you-screen', 'input-height-feet');
    await element(by.id('input-height-feet')).typeText('6');
    await element(by.id('input-height-inches')).typeText('0');

    await scrollDownToId('scroll-view-about-you-screen', 'input-weight-kg');
    await element(by.id('input-weight-kg')).typeText('75');

    await scrollDownToId('scroll-view-about-you-screen', 'input-postal-code');
    await element(by.id('input-postal-code')).typeText('SW1A 1AA');

    await scrollDownToId('scroll-view-about-you-screen', 'input-ever-exposed-item-no');
    await tapInputById('input-ever-exposed-item-no');

    await scrollDownToId('scroll-view-about-you-screen', 'button-submit');
    await element(by.id('button-submit').withAncestor(by.id('about-you-screen'))).tap();
  });
}

function testAboutYourWorkForm() {
  it('should be able to fill in the form about your work', async () => {
    await tapInputById('input-healthcare-staff-item-no');

    await element(by.id('button-no-is-carer-question')).tap();

    await scrollDownToId('scroll-view-your-work-screen', 'button-submit');
    await element(by.id('button-submit').withAncestor(by.id('your-work-screen'))).tap();
  });
}

function testAboutYourHealthForm() {
  it('should be able to fill in the form about your health', async () => {
    await scrollDownToId('scroll-view-your-health-screen', 'input-blood-group-item-pfnts');
    await element(by.id('input-blood-group-item-pfnts')).tap();

    await scrollDownToId('scroll-view-your-health-screen', 'button-submit');
    await element(by.id('button-submit').withAncestor(by.id('your-health-screen'))).tap();
  });
}

function testPreviousExposureForm() {
  it('should be able to fill in the form previous exposure', async () => {
    await scrollDownToId('scroll-view-previous-exposure-screen', 'button-submit');
    await element(by.id('button-submit').withAncestor(by.id('previous-exposure-screen'))).tap();
  });
}

function testLongCovidForm() {
  it('should complete the long covid questionnaire (if present)', async () => {
    try {
      await element(by.id('button-footer').withAncestor(by.id('long-covid-start-screen'))).tap();

      await element(by.id('input-had-covid-item-NO')).tap();
      await element(by.id('button-submit').withAncestor(by.id('long-covid-question-screen'))).tap();
    } catch (_) {}
  });
}

function testRegisterScreen(config: TRegisterConfig) {
  // @todo: The current picker component does not support the testID property.
  describe('Test the register screen for GB', () => {
    it('should open the register screen', async () => {
      // Sometimes this screen is not shown.
      try {
        await element(by.id('create-account-1')).tap();
      } catch (_) {}
      await element(by.id('create-account-2')).tap();
      // Somtimes this input is not shown.
      try {
        await element(by.id('input-select-country-item-GB')).tap();
      } catch (_) {}
      await element(by.id('button-agree')).tap();
    });

    it('should fill in the register form', async () => {
      await element(by.id('input-email-address')).typeText(config.emailAddress);
      await element(by.id('input-password')).typeText(config.password);

      await element(by.id('button-submit').withAncestor(by.id('register-screen'))).tap();
    });

    it('should fill in the optional info form', async () => {
      if (config.name) {
        await element(by.id('input-name')).typeText(config.name);
      }
      if (config.phoneNumber) {
        await element(by.id('input-phone')).typeText(config.phoneNumber);
      }

      await element(by.id('button-submit').withAncestor(by.id('optional-info-screen'))).tap();
    });

    testAboutYouForm();
    testAboutYourWorkForm();
    testAboutYourHealthForm();
    testPreviousExposureForm();

    it('should open the vaccine list screen', async () => {
      await element(by.id('button-covid-test-list-screen')).tap();
    });

    it('should open the healthy screen', async () => {
      await element(by.id('button-vaccine-list-screen')).tap();
    });

    it('should set the health status to healthy', async () => {
      await element(by.id('button-status-healthy')).tap();
    });

    testLongCovidForm();

    it('should go to the dashboard screen', async () => {
      await scrollDownToId('scroll-view-thank-you-screen', 'button-complete');
      await element(by.id('button-complete')).tap();
    });
  });
}

type TLoginConfig = {
  emailAddress: string;
  password: string;
};

function testLoginScreen(config: TLoginConfig) {
  describe('Test the login screen', () => {
    it('should open, close and open the login screen', async () => {
      await element(by.id('login-link')).tap();
      await element(by.id('button-back-navigation')).tap();
      await element(by.id('login-link')).tap();
    });

    it('should be able to fill in the input fields', async () => {
      await element(by.id('login-input-email')).typeText(config.emailAddress);
      await element(by.id('login-input-password')).typeText(config.password);
    });

    it('should login the user', async () => {
      await element(by.id('login-button')).tap();
      await element(by.id('login-button')).tap();
      await expect(element(by.id('login-button'))).not.toBeVisible();
    });

    // It would be better if the user directly goes to the dashboard screen.
    it('should complete the select country screen (if present)', async () => {
      try {
        await element(by.id('select-country-GB')).tap();
      } catch (_) {}
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
    it('should complete the select country screen (if present)', async () => {
      try {
        await element(by.id('select-country-GB')).tap();
      } catch (_) {}
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
      await element(by.id('button-submit').withAncestor(by.id('create-profile-screen'))).tap();
      await element(by.id('button-submit').withAncestor(by.id('create-profile-screen'))).tap();

      // @todo: Also test button-under-18
      await element(by.id('button-over-18')).tap();
      await element(by.id('checkbox-consent')).tap();
      await element(by.id('button-create-profile')).tap();
    });

    testAboutYouForm();
    testAboutYourWorkForm();
    testAboutYourHealthForm();
    testPreviousExposureForm();

    it('should reload react native', async () => {
      await device.reloadReactNative();
    });
  });
}

type TReportTodayConfig = {
  addTest: boolean;
  addVaccine: boolean;
  healthy: boolean;
};

function testReportToday(config: TReportTodayConfig) {
  describe(config.healthy ? 'Test report today as healthy' : 'Test report today as not healthy', () => {
    it('should open the select profile screen', async () => {
      await element(by.id('button-report-today')).tap();
    });

    it('should open the first profile', async () => {
      await element(by.id('profile-card-0')).tap();
    });

    function testAddTest() {
      it('should be able to add a COVID-19 test', async () => {
        await element(by.id('button-add-test')).tap();
        await element(by.id('button-yes-covid-test-date-question')).tap();

        await scrollDownToId('scroll-view-covid-test-detail-screen', 'covid-test-mechanism-question');
        await element(by.id('covid-test-mechanism-question-item-spit_tube')).tap();

        await scrollDownToId('scroll-view-covid-test-detail-screen', 'covid-test-location-question');
        await element(by.id('covid-test-location-question-item-home')).tap();

        await scrollDownToId('scroll-view-covid-test-detail-screen', 'covid-test-result-question');
        await element(by.id('covid-test-result-question-item-negative')).tap();

        await scrollDownToId('scroll-view-covid-test-detail-screen', 'button-no-covid-test-is-rapid-question');
        await element(by.id('button-no-covid-test-is-rapid-question')).tap();

        await scrollDownToId('scroll-view-covid-test-detail-screen', 'button-no-covid-test-invited-question');
        await element(by.id('button-no-covid-test-invited-question')).tap();

        await scrollDownToId('scroll-view-covid-test-detail-screen', 'button-submit');
        await element(by.id('button-submit').withAncestor(by.id('covid-test-detail-screen'))).tap();

        // The test can't be completed because the date input is not testable.
        await element(by.id('button-back-navigation').withAncestor(by.id('covid-test-detail-screen'))).tap();
      });
    }
    if (config.addTest) {
      testAddTest();
    }

    it('should open the vaccine list screen', async () => {
      await element(by.id('button-covid-test-list-screen')).tap();
    });

    // 0: Other / I don't know
    // 1: Johnson and Johnson, which has a single shot
    // 2: Pfizer / Moderna / AstraZeneca, which has two shots
    function testAddVaccine(type = 0, secondDose = false) {
      it(`should be able to add a COVID-19 vaccine of type ${type}`, async () => {
        await element(by.id('button-add-vaccine')).tap();

        let itemName = 'not_sure';
        if (type === 1) {
          itemName = 'johnson';
        } else if (type === 2) {
          itemName = 'pfizer';
        }

        await element(
          by.id(`input-your-vaccine-item-${itemName}`).withAncestor(by.id('vaccine-first-dose-question')),
        ).tap();

        // @todo: Calendar input
        await element(by.id('button-calendar-picker').withAncestor(by.id('vaccine-first-dose-question'))).tap();

        if (secondDose && (type === 0 || type === 2)) {
          await scrollDownToElement(
            'scroll-view-about-your-vaccine-screen',
            element(by.id('button-yes').withAncestor(by.id('scroll-view-about-your-vaccine-screen'))),
          );
          await element(by.id('button-yes').withAncestor(by.id('scroll-view-about-your-vaccine-screen'))).tap();

          await scrollDownToElement(
            'scroll-view-about-your-vaccine-screen',
            element(by.id(`input-your-vaccine-item-${itemName}`).withAncestor(by.id('vaccine-second-dose-question'))),
          );
          await element(
            by.id(`input-your-vaccine-item-${itemName}`).withAncestor(by.id('vaccine-second-dose-question')),
          ).tap();

          // @todo: Calendar input
          await scrollDownToElement(
            'scroll-view-about-your-vaccine-screen',
            element(by.id('button-calendar-picker').withAncestor(by.id('vaccine-second-dose-question'))),
          );
          await element(by.id('button-calendar-picker').withAncestor(by.id('vaccine-second-dose-question'))).tap();
        }

        await scrollDownToElement(
          'scroll-view-about-your-vaccine-screen',
          element(by.id('button-submit').withAncestor(by.id('about-your-vaccine-screen'))),
        );
        await element(by.id('button-submit').withAncestor(by.id('about-your-vaccine-screen'))).tap();

        // The test can't be completed because the date input is not testable.
        await element(by.id('button-back-navigation').withAncestor(by.id('about-your-vaccine-screen'))).tap();
      });
    }
    if (config.addVaccine) {
      testAddVaccine(0, false);
      testAddVaccine(0, true);
      testAddVaccine(1);
      testAddVaccine(2, false);
      testAddVaccine(2, true);
    }

    it('should open the healthy screen', async () => {
      await element(by.id('button-vaccine-list-screen')).tap();
    });

    if (config.healthy) {
      it('should set the health status to healthy', async () => {
        await element(by.id('button-status-healthy')).tap();
      });
    } else {
      it('should set the health status to not healthy', async () => {
        await element(by.id('button-status-not-healthy')).tap();
      });

      it('should accept the general symptoms form when empty', async () => {
        await element(by.id('scroll-view-general-symptoms-screen')).scrollTo('bottom');
        await element(by.id('button-submit').withAncestor(by.id('general-symptoms-screen'))).tap();

        await element(by.id('button-back-navigation').withAncestor(by.id('head-symptoms-screen'))).tap();
      });

      it('should be possible to fill in the general symptoms form', async () => {
        await scrollUpToElement(
          'scroll-view-general-symptoms-screen',
          element(by.id('checkbox-item-chills').withAncestor(by.id('general-symptoms-screen'))),
        );
        await element(by.id('checkbox-item-chills').withAncestor(by.id('general-symptoms-screen'))).tap();

        await element(by.id('scroll-view-general-symptoms-screen')).scrollTo('bottom');
        await element(by.id('button-submit').withAncestor(by.id('general-symptoms-screen'))).tap();
      });

      it('should accept the head area symptoms form when empty', async () => {
        await element(by.id('scroll-view-head-symptoms-screen')).scrollTo('bottom');
        await element(by.id('button-submit').withAncestor(by.id('head-symptoms-screen'))).tap();

        await element(by.id('button-back-navigation').withAncestor(by.id('throat-chest-symptoms-screen'))).tap();
      });

      it('should be possible to fill in the head area symptoms form', async () => {
        await scrollUpToElement(
          'scroll-view-head-symptoms-screen',
          element(by.id('checkbox-item-dizzy').withAncestor(by.id('head-symptoms-screen'))),
        );
        await element(by.id('checkbox-item-dizzy').withAncestor(by.id('head-symptoms-screen'))).tap();

        await element(by.id('scroll-view-head-symptoms-screen')).scrollTo('bottom');
        await element(by.id('button-submit').withAncestor(by.id('head-symptoms-screen'))).tap();
      });

      it('should accept the throat/chest area symptoms form when empty', async () => {
        await element(by.id('scroll-view-throat-chest-symptoms-screen')).scrollTo('bottom');
        await element(by.id('button-submit').withAncestor(by.id('throat-chest-symptoms-screen'))).tap();

        await element(by.id('button-back-navigation').withAncestor(by.id('gut-stomach-symptoms-screen'))).tap();
      });

      it('should be possible to fill in the throat/chest area symptoms form', async () => {
        await scrollUpToElement(
          'scroll-view-throat-chest-symptoms-screen',
          element(by.id('checkbox-item-soreThroat').withAncestor(by.id('throat-chest-symptoms-screen'))),
        );
        await element(by.id('checkbox-item-soreThroat').withAncestor(by.id('throat-chest-symptoms-screen'))).tap();

        await element(by.id('scroll-view-throat-chest-symptoms-screen')).scrollTo('bottom');
        await element(by.id('button-submit').withAncestor(by.id('throat-chest-symptoms-screen'))).tap();
      });

      it('should accept the gut/stomach area symptoms form when empty', async () => {
        await element(by.id('scroll-view-gut-stomach-symptoms-screen')).scrollTo('bottom');
        await element(by.id('button-submit').withAncestor(by.id('gut-stomach-symptoms-screen'))).tap();

        await element(by.id('button-back-navigation').withAncestor(by.id('other-symptoms-screen'))).tap();
      });

      it('should be possible to fill in the gut/stomach area symptoms form', async () => {
        await scrollUpToElement(
          'scroll-view-gut-stomach-symptoms-screen',
          element(by.id('checkbox-item-abdominalPain').withAncestor(by.id('gut-stomach-symptoms-screen'))),
        );
        await element(by.id('checkbox-item-abdominalPain').withAncestor(by.id('gut-stomach-symptoms-screen'))).tap();

        await element(by.id('scroll-view-gut-stomach-symptoms-screen')).scrollTo('bottom');
        await element(by.id('button-submit').withAncestor(by.id('gut-stomach-symptoms-screen'))).tap();
      });

      it('should accept the other symptoms form when empty', async () => {
        await element(by.id('scroll-view-other-symptoms-screen')).scrollTo('bottom');
        await element(by.id('button-submit').withAncestor(by.id('other-symptoms-screen'))).tap();

        await element(by.id('button-back-navigation').withAncestor(by.id('where-are-you-screen'))).tap();
      });

      it('should be possible to fill in the other symptoms form', async () => {
        await scrollUpToElement(
          'scroll-view-other-symptoms-screen',
          element(by.id('input-other-symptoms').withAncestor(by.id('other-symptoms-screen'))),
        );
        await element(by.id('input-other-symptoms').withAncestor(by.id('other-symptoms-screen'))).typeText('Test');

        await element(by.id('scroll-view-other-symptoms-screen')).scrollTo('bottom');
        // Double tap to lose the focus from the text input above.
        await element(by.id('button-submit').withAncestor(by.id('other-symptoms-screen'))).tap();
        await element(by.id('button-submit').withAncestor(by.id('other-symptoms-screen'))).tap();
      });

      it('should be possible to select my location', async () => {
        await element(by.id('button-location-home').withAncestor(by.id('where-are-you-screen'))).tap();
      });
    }

    it('should dismiss the rating modal (if present)', async () => {
      try {
        await element(by.id('button-rating-yes')).tap();
        await element(by.id('button-rating-later')).tap();
      } catch (_) {}
    });

    testLongCovidForm();

    it('should go to the dashboard screen', async () => {
      await scrollDownToId('scroll-view-thank-you-screen', 'button-complete');
      await element(by.id('button-complete')).tap();
    });
  });
}

const timestamp = Math.round(Date.now() / 1000);
const tempEmailAddress = `test-${timestamp}@joinzoe.com`;
const tempPhoneNumber = `+44 7900 ${timestamp}`;

testWelcomeScreen();
testSelectCountryScreen();
testRegisterScreen({
  emailAddress: tempEmailAddress,
  password: defaultPassword,
  phoneNumber: tempPhoneNumber,
});
testLogout();
testLoginScreen({
  emailAddress: defaultEmailAddress,
  password: defaultPassword,
});
testCreateNewProfile();
testReportToday({
  addTest: false,
  addVaccine: false,
  healthy: false,
});
testReportToday({
  addTest: true,
  addVaccine: true,
  healthy: true,
});
testLogout();
