import { by, element } from 'detox';

import { scrollDownToId, submitForm, tapInputById } from './helpers';

export function testAboutYouForm() {
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

    await submitForm('about-you-screen', 'scroll-view-about-you-screen', 'button-submit');
  });
}

export function testAboutYourWorkForm() {
  it('should be able to fill in the form about your work', async () => {
    await tapInputById('input-healthcare-staff-item-no');

    await element(by.id('button-no-is-carer-question')).tap();

    await submitForm('your-work-screen', 'scroll-view-your-work-screen', 'button-submit');
  });
}

export function testAboutYourHealthForm() {
  it('should be able to fill in the form about your health', async () => {
    await scrollDownToId('scroll-view-your-health-screen', 'input-blood-group-item-unsure');
    await element(by.id('input-blood-group-item-unsure')).tap();

    await submitForm('your-health-screen', 'scroll-view-your-health-screen', 'button-submit');
  });
}

export function testPreviousExposureForm() {
  it('should be able to fill in the form previous exposure', async () => {
    await submitForm('previous-exposure-screen', 'scroll-view-previous-exposure-screen', 'button-submit');
  });
}
