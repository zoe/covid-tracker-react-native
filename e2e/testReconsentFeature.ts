/* eslint-disable no-await-in-loop */

import { feedback } from '@covid/features/reconsent/data/feedback';
import { diseasePreferences } from '@covid/features/wider-health-studies/data/diseases';
import { by, element, expect } from 'detox';

import { scrollDownToId, submitForm } from './helpers';

type TReconsentConfig = {
  consent: boolean;
  fillInAllFeedback: boolean;
  fillInFeedback?: string[];
  privacyPolicyView: boolean;
  reconsider: boolean;
  selectAllDiseases: boolean;
  selectDiseases?: string[];
};

export function testReconsentFeature(config: TReconsentConfig) {
  it('should not be possible to go back on the introduction screen', async () => {
    await expect(
      element(by.id('button-back-navigation').withAncestor(by.id('reconsent-introduction-screen'))),
    ).not.toBeVisible();
  });

  it('should be able to finish the introduction screen', async () => {
    await submitForm(
      'reconsent-introduction-screen',
      'scroll-view-reconsent-introduction-screen',
      'button-cta-reconsent-introduction-screen',
    );
  });

  it('should be able to continue without selecting any disease', async () => {
    await submitForm(
      'reconsent-disease-preferences-screen',
      'scroll-view-reconsent-disease-preferences-screen',
      'button-cta-disease-preferences-submit',
    );

    await expect(element(by.id('reconsent-disease-summary-screen'))).toBeVisible();
    await element(by.id('button-back-navigation').withAncestor(by.id('reconsent-disease-summary-screen'))).tap();
  });

  if (config.selectAllDiseases || config.selectDiseases) {
    it(`should be able to select ${config.selectAllDiseases ? 'all' : 'some'} diseases`, async () => {
      await element(by.id('scroll-view-reconsent-disease-preferences-screen')).scrollTo('top');
      for (const disease of diseasePreferences) {
        if (config.selectDiseases && !config.selectDiseases.includes(disease.name)) {
          // eslint-disable-next-line no-continue
          continue;
        }
        await scrollDownToId('scroll-view-reconsent-disease-preferences-screen', `disease-card-${disease.name}`);
        await element(by.id(`disease-card-${disease.name}`)).tap();
      }
    });
  }

  it('should be able to finish the disease preferences screen', async () => {
    await submitForm(
      'reconsent-disease-preferences-screen',
      'scroll-view-reconsent-disease-preferences-screen',
      'button-cta-disease-preferences-submit',
    );
  });

  it('should be able to finish the summary screen', async () => {
    await submitForm(
      'reconsent-disease-summary-screen',
      'scroll-view-reconsent-disease-summary-screen',
      'button-cta-reconsent-disease-summary-screen',
    );
  });

  if (config.privacyPolicyView) {
    it('should be able to view the privacy notice', async () => {
      await scrollDownToId('scroll-view-reconsent-request-consent-screen', 'button-privacy-notice');
      await element(by.id('button-privacy-notice')).tap();
      await expect(element(by.id('privacy-policy-uk-screen'))).toBeVisible();
      await element(by.id('button-back-navigation').withAncestor(by.id('privacy-policy-uk-screen'))).tap();
    });
  }

  function testConsent() {
    it('should be possible to consent', async () => {
      await scrollDownToId('scroll-view-reconsent-request-consent-screen', 'button-yes');
      await element(by.id('button-yes')).tap();
    });
    it('should not be possible to go back on the thank you screen', async () => {
      await expect(
        element(by.id('button-back-navigation').withAncestor(by.id('reconsent-newsletter-signup-screen'))),
      ).not.toBeVisible();
    });
    it('should be able to opt-in and opt-out of the newsletter', async () => {
      await scrollDownToId('scroll-view-reconsent-newsletter-signup-screen', 'button-opt-in');
      await element(by.id('button-opt-in')).tap();
      await element(by.id('button-opt-out')).tap();
      await element(by.id('button-opt-in')).tap();
    });
    it('should be possible to finish the reconsent', async () => {
      await submitForm(
        'reconsent-newsletter-signup-screen',
        'scroll-view-reconsent-newsletter-signup-screen',
        'button-cta-reconsent-newsletter-signup-screen',
      );
    });
  }

  if (config.consent) {
    testConsent();
  } else {
    it('should be possible to not consent', async () => {
      await scrollDownToId('scroll-view-reconsent-request-consent-screen', 'button-no');
      await element(by.id('button-no')).tap();
    });
    it('should be possible to go back to the consent screen', async () => {
      await element(by.id('button-back-navigation').withAncestor(by.id('reconsent-feedback-screen'))).tap();
      await scrollDownToId('scroll-view-reconsent-request-consent-screen', 'button-no');
      await element(by.id('button-no')).tap();
    });
    if (config.fillInAllFeedback || config.fillInFeedback) {
      it(`should be able to fill in ${config.fillInAllFeedback ? 'all' : 'some'} feedback`, async () => {
        let pressedBefore = false;
        for (let i = 0; i < feedback.length; i += 1) {
          if (config.fillInFeedback && !config.fillInFeedback.includes(feedback[i].id)) {
            // eslint-disable-next-line no-continue
            continue;
          }
          await scrollDownToId('scroll-view-reconsent-feedback-screen', `checkbox-${feedback[i].id}`);
          // Press in an extra time because of the previous input focus
          if (pressedBefore) {
            await element(by.id(`checkbox-${feedback[i].id}`).withAncestor(by.id('reconsent-feedback-screen'))).tap();
          }
          await element(by.id(`checkbox-${feedback[i].id}`).withAncestor(by.id('reconsent-feedback-screen'))).tap();
          await scrollDownToId('scroll-view-reconsent-feedback-screen', `textarea-${feedback[i].id}`);
          await element(by.id(`textarea-${feedback[i].id}`).withAncestor(by.id('reconsent-feedback-screen'))).typeText(
            'test',
          );
          pressedBefore = true;
        }
      });
    }
    it('should be possible to finish the feedback screen', async () => {
      await submitForm(
        'reconsent-feedback-screen',
        'scroll-view-reconsent-feedback-screen',
        'button-cta-reconsent-feedback-screen',
      );
    });
    if (config.reconsider) {
      it('should be possible to reconsider', async () => {
        await scrollDownToId('scroll-view-reconsent-reconsider-screen', 'button-positive');
        await element(by.id('button-positive')).tap();
      });
      testConsent();
    } else {
      it('should be possible to end the reconsent', async () => {
        await scrollDownToId('scroll-view-reconsent-reconsider-screen', 'button-negative');
        await element(by.id('button-negative')).tap();
      });
    }
  }
}
