const { device, element, by } = require('detox');

describe('Welcome', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should have static map asset', async () => {
    await expect(element(by.id('map'))).toBeVisible();
  });

  it('can change country to US', async () => {
    await element(by.id('select-country')).tap();
    await element(by.id('us-flag')).tap();
    // Works in Expo
    await expect(element(by.id('welcome-label'))).toBeVisible();
    // Apprently this doesn't work because on Expo managed app, might need to run expo eject.
    await expect(element(by.id('welcome-label'))).toHaveText(
      'Take 1 minute each day and help fight the outbreak in your community.'
    );
  });

  it('can change country to GB', async () => {
    await element(by.id('select-country')).tap();
    await element(by.id('gb-flag')).tap();
    await expect(element(by.id('welcome-label'))).toHaveText('Take 1 minute each day and help fight the outbreak.');
  });

  it('can change country to SV', async () => {
    await element(by.id('select-country')).tap();
    await element(by.id('sv-flag')).tap();
    await expect(element(by.id('welcome-label'))).toHaveText(
      'Lägg 1 minut om dagen på att hjälpa oss bekämpa covid-19.'
    );
  });
});
