/* eslint-env jest */

import { by, element, expect } from 'detox';

import { scrollDownToId, scrollUpToElement, submitForm } from './helpers';
import { testCovidTestListOnboardingModal } from './testModals';

type TReportTodayConfig = {
  addTest: boolean;
  addAndUpdateGovUKTest?: boolean;
  addVaccines: boolean;
  healthy: boolean;
  updateTest: boolean;
};

export function testReportTodayFeature(config: TReportTodayConfig) {
  describe(config.healthy ? 'Test report today as healthy' : 'Test report today as not healthy', () => {
    it('should open the select profile screen', async () => {
      await element(by.id('button-report-today')).tap();
    });

    it('should open the first profile', async () => {
      await element(by.id('profile-card-0')).tap();
    });

    testCovidTestListOnboardingModal();

    function testAddTest() {
      it('should be able to add a COVID-19 test', async () => {
        await element(by.id('button-add-test')).tap();

        await scrollDownToId('scroll-view-covid-test-detail-screen', 'covid-test-mechanism-question');
        await element(by.id('covid-test-mechanism-question-item-lateral_flow')).tap();

        await element(by.id('scroll-view-covid-test-detail-screen')).scroll(150, 'down');
        await element(by.text('1')).tap();

        await scrollDownToId('scroll-view-covid-test-detail-screen', 'covid-test-result-question');
        await element(by.id('covid-test-result-question-item-negative')).tap();

        await expect(element(by.id('covid-test-dual-result-question'))).not.toExist();

        await submitForm('covid-test-detail-screen', 'scroll-view-covid-test-detail-screen', 'button-submit');
      });
    }
    if (config.addTest) {
      testAddTest();
    }

    function testUpdateTest() {
      it('should be able to update a COVID-19 test', async () => {
        await element(by.id('covid-test-row-nose_throat_swab-0')).atIndex(0).tap();

        await scrollDownToId('scroll-view-covid-test-detail-screen', 'covid-test-mechanism-question');
        await element(by.id('covid-test-mechanism-question-item-blood_sample_needle_draw')).tap();

        await scrollDownToId('scroll-view-covid-test-detail-screen', 'covid-test-antibody-question');
        await element(by.id('covid-test-antibody-question-item-anti_n')).tap();

        await element(by.id('scroll-view-covid-test-detail-screen')).scroll(150, 'down');
        await element(by.text('1')).tap();

        await scrollDownToId('scroll-view-covid-test-detail-screen', 'covid-test-result-question');
        await element(by.id('covid-test-result-question-item-positive')).tap();

        await expect(element(by.id('covid-test-dual-result-question'))).not.toExist();

        await submitForm('covid-test-detail-screen', 'scroll-view-covid-test-detail-screen', 'button-submit');
      });
    }
    if (config.updateTest) {
      testUpdateTest();
    }

    function testAddAndUpdateGovUKTest() {
      it('should be able to add and update a gov.uk finger prick antibody test', async () => {
        await element(by.id('button-add-test')).tap();

        await scrollDownToId('scroll-view-covid-test-detail-screen', 'covid-test-mechanism-question');
        await element(by.id('covid-test-mechanism-question-item-blood_sample_finger_prick')).tap();

        await scrollDownToId('scroll-view-covid-test-detail-screen', 'button-yes-covid-test-booked-via-gov-question');
        await element(by.id('button-yes-covid-test-booked-via-gov-question')).tap();

        await element(by.id('scroll-view-covid-test-detail-screen')).scroll(300, 'down');

        await element(by.text('1')).tap();

        await expect(element(by.id('covid-test-antibody-question'))).not.toExist();
        await expect(element(by.id('covid-test-result-question'))).not.toExist();

        await scrollDownToId('scroll-view-covid-test-detail-screen', 'covid-test-dual-result-question');
        await element(by.id('covid-test-dual-result-question-item-negative')).tap();

        await submitForm('covid-test-detail-screen', 'scroll-view-covid-test-detail-screen', 'button-submit');

        await element(by.id('covid-test-row-blood_sample_finger_prick-0')).atIndex(0).tap();

        await scrollDownToId('scroll-view-covid-test-detail-screen', 'button-no-covid-test-booked-via-gov-question');
        await element(by.id('button-no-covid-test-booked-via-gov-question')).tap();

        await scrollDownToId('scroll-view-covid-test-detail-screen', 'covid-test-antibody-question');
        await element(by.id('covid-test-antibody-question-item-anti_s')).tap();

        await scrollDownToId('scroll-view-covid-test-detail-screen', 'covid-test-result-question');
        await element(by.id('covid-test-result-question-item-negative')).tap();

        await expect(element(by.id('covid-test-dual-result-question'))).not.toExist();

        await submitForm('covid-test-detail-screen', 'scroll-view-covid-test-detail-screen', 'button-submit');
      });
    }
    if (config.addAndUpdateGovUKTest) {
      testAddAndUpdateGovUKTest();
    }

    it('should open the vaccine list screen', async () => {
      await element(by.id('button-covid-test-list-screen')).tap();
    });

    function testAddCovidVaccine() {
      it(`should be able to add a COVID-19 vaccine`, async () => {
        // Dismiss flu vaccine onboarding modal if present
        try {
          await element(by.text('OK')).tap();
        } catch (_) {}

        await element(by.id('button-add-vaccine')).tap();

        await element(by.id(`input-your-vaccine-type-item-covid_vaccine`)).tap();
        await element(by.id(`input-your-vaccine-item-pfizer`)).tap();

        await element(by.id('scroll-view-about-your-vaccine-screen')).scroll(150, 'down');
        await element(by.text('1')).tap();

        await submitForm('about-your-vaccine-screen', 'scroll-view-about-your-vaccine-screen', 'button-submit');
      });
    }

    function testAddFluVaccine() {
      it(`should be able to add a flu vaccine`, async () => {
        // Dismiss vaccine efficacy modal if present
        try {
          await element(by.text('Cancel')).tap();
        } catch (_) {}

        await element(by.id('button-add-vaccine')).tap();

        await element(by.id(`input-your-vaccine-type-item-flu_seasonal`)).tap();

        await element(by.id('scroll-view-about-your-vaccine-screen')).scroll(150, 'down');
        await element(by.text('1')).tap();

        await submitForm('about-your-vaccine-screen', 'scroll-view-about-your-vaccine-screen', 'button-submit');
      });
    }
    if (config.addVaccines) {
      testAddCovidVaccine();
      testAddFluVaccine();
    }

    it('should dismiss the vaccine efficacy modal (if present)', async () => {
      try {
        await element(by.text('Cancel')).tap();
      } catch (_) {}
    });

    it('should open the healthy screen (or vaccine adverse effects screen if present)', async () => {
      await element(by.id('button-vaccine-list-screen')).tap();
    });

    it('should fill in the vaccine adverse effects form (if present)', async () => {
      try {
        await submitForm('vaccine-dose-symptoms-screen', 'scroll-view-vaccine-dose-symptoms-screen', 'button-test-ID');
      } catch (_) {}
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
        await submitForm('general-symptoms-screen', 'scroll-view-general-symptoms-screen', 'button-submit');

        await element(by.id('button-back-navigation').withAncestor(by.id('head-symptoms-screen'))).tap();
      });

      it('should be possible to fill in the general symptoms form', async () => {
        await scrollUpToElement(
          'scroll-view-general-symptoms-screen',
          element(by.id('checkbox-item-chills').withAncestor(by.id('general-symptoms-screen'))),
        );
        await element(by.id('checkbox-item-chills').withAncestor(by.id('general-symptoms-screen'))).tap();

        await submitForm('general-symptoms-screen', 'scroll-view-general-symptoms-screen', 'button-submit');
      });

      it('should accept the head area symptoms form when empty', async () => {
        await submitForm('head-symptoms-screen', 'scroll-view-head-symptoms-screen', 'button-submit');

        await element(by.id('button-back-navigation').withAncestor(by.id('throat-chest-symptoms-screen'))).tap();
      });

      it('should be possible to fill in the head area symptoms form', async () => {
        await scrollUpToElement(
          'scroll-view-head-symptoms-screen',
          element(by.id('checkbox-item-dizzy').withAncestor(by.id('head-symptoms-screen'))),
        );
        await element(by.id('checkbox-item-dizzy').withAncestor(by.id('head-symptoms-screen'))).tap();

        await submitForm('head-symptoms-screen', 'scroll-view-head-symptoms-screen', 'button-submit');
      });

      it('should accept the throat/chest area symptoms form when empty', async () => {
        await submitForm('throat-chest-symptoms-screen', 'scroll-view-throat-chest-symptoms-screen', 'button-submit');

        await element(by.id('button-back-navigation').withAncestor(by.id('gut-stomach-symptoms-screen'))).tap();
      });

      it('should be possible to fill in the throat/chest area symptoms form', async () => {
        await scrollUpToElement(
          'scroll-view-throat-chest-symptoms-screen',
          element(by.id('checkbox-item-soreThroat').withAncestor(by.id('throat-chest-symptoms-screen'))),
        );
        await element(by.id('checkbox-item-soreThroat').withAncestor(by.id('throat-chest-symptoms-screen'))).tap();

        await submitForm('throat-chest-symptoms-screen', 'scroll-view-throat-chest-symptoms-screen', 'button-submit');
      });

      it('should accept the gut/stomach area symptoms form when empty', async () => {
        await submitForm('gut-stomach-symptoms-screen', 'scroll-view-gut-stomach-symptoms-screen', 'button-submit');

        await element(by.id('button-back-navigation').withAncestor(by.id('other-symptoms-screen'))).tap();
      });

      it('should be possible to fill in the gut/stomach area symptoms form', async () => {
        await scrollUpToElement(
          'scroll-view-gut-stomach-symptoms-screen',
          element(by.id('checkbox-item-abdominalPain').withAncestor(by.id('gut-stomach-symptoms-screen'))),
        );
        await element(by.id('checkbox-item-abdominalPain').withAncestor(by.id('gut-stomach-symptoms-screen'))).tap();

        await submitForm('gut-stomach-symptoms-screen', 'scroll-view-gut-stomach-symptoms-screen', 'button-submit');
      });

      it('should accept the other symptoms form when empty', async () => {
        await submitForm('other-symptoms-screen', 'scroll-view-other-symptoms-screen', 'button-submit');

        await element(by.id('button-back-navigation').withAncestor(by.id('where-are-you-screen'))).tap();
      });

      it('should be possible to fill in the other symptoms form', async () => {
        await scrollUpToElement(
          'scroll-view-other-symptoms-screen',
          element(by.id('input-other-symptoms').withAncestor(by.id('other-symptoms-screen'))),
        );
        await element(by.id('input-other-symptoms').withAncestor(by.id('other-symptoms-screen'))).typeText('Test');

        await submitForm('other-symptoms-screen', 'scroll-view-other-symptoms-screen', 'button-submit');
      });

      it('should be possible to select my location', async () => {
        await element(by.id('button-location-home').withAncestor(by.id('where-are-you-screen'))).tap();
      });
    }

    it('should complete the anti-pingdemic form (if present)', async () => {
      try {
        await scrollDownToId('scroll-view-pingdemic-screen', 'input-radio-asked-by-app-item-pfnts');
        await element(by.id('input-radio-asked-by-app-item-pfnts')).tap();
        await submitForm('pingdemic-screen', 'scroll-view-pingdemic-screen', 'button-submit');
      } catch (_) {}
    });

    it('should dismiss the rating modal (if present)', async () => {
      try {
        await element(by.id('button-rating-yes')).tap();
        await element(by.id('button-rating-later')).tap();
      } catch (_) {}
    });

    it('should go to the dashboard screen', async () => {
      await scrollDownToId('scroll-view-thank-you-screen', 'button-complete');
      await element(by.id('button-complete')).tap();
    });
  });
}
