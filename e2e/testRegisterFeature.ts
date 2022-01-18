/* eslint-env jest */

import { by, element } from 'detox';

import { scrollDownToId } from './helpers';
import {
  testAboutYouForm,
  testAboutYourHealthForm,
  testAboutYourWorkForm,
  testLongCovidForm,
  testPingdemicForm,
  testPreviousExposureForm,
} from './testForms';
import { testMentalHealthPlaybackModal } from './testModals';

type TRegisterConfig = {
  emailAddress: string;
  name?: string;
  password: string;
  phoneNumber?: string;
};

export function testRegisterFeature(config: TRegisterConfig) {
  // @todo: The current picker component does not support the testID property.
  describe('Test the register screen for GB', () => {
    it('should open the register screen', async () => {
      // Sometimes this screen is not shown.
      try {
        await element(by.id('create-account-1')).tap();
      } catch (_) {}
      await element(by.id('create-account-2')).tap();

      // Sometimes this input is not shown.
      try {
        await element(by.id('input-select-country-item-GB')).tap();
      } catch (_) {}

      await scrollDownToId('scroll-view-consent-screen', 'button-agree');
      // The agree button sometimes appears just off screen
      await element(by.id('scroll-view-consent-screen')).scroll(150, 'down');
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
    testPingdemicForm();

    testMentalHealthPlaybackModal();

    it('should finish the thank you screen (if present)', async () => {
      try {
        await scrollDownToId('scroll-view-thank-you-screen', 'button-complete');
        await element(by.id('button-complete')).tap();
      } catch (_) {}
    });
  });
}
