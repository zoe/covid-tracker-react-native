/* eslint-env jest */

import { by, element, expect } from 'detox';

import { testMentalHealthPlaybackModal } from './testModals';

type TLoginConfig = {
  emailAddress: string;
  password: string;
};

export function testLoginScreen(config: TLoginConfig) {
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
      await expect(element(by.id('login-button'))).not.toBeVisible();
    });

    testMentalHealthPlaybackModal();

    // It would be better if the user directly goes to the dashboard screen.
    it('should complete the select country screen (if present)', async () => {
      try {
        await element(by.id('select-country-GB')).tap();
      } catch (_) {}
    });
  });
}
