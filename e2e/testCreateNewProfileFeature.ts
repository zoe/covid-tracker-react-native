/* eslint-env jest */

import { by, element } from 'detox';

import {
  testAboutYouForm,
  testAboutYourHealthForm,
  testAboutYourWorkForm,
  testPreviousExposureForm,
} from './testForms';

type TCreateNewProfileConfig = {
  profileName: string;
};

export function testCreateNewProfileFeature(config: TCreateNewProfileConfig) {
  describe('Test create a new profile', () => {
    it('should open the select profile screen', async () => {
      await element(by.id('button-report-today')).tap();
    });

    it('should be able to create a new profile', async () => {
      await element(by.id('scroll-view-select-profile-screen')).scrollTo('bottom');
      await element(by.id('button-new-profile')).tap();
      await element(by.id('input-profile-name')).typeText(config.profileName);
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
