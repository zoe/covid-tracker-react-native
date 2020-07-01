const { reloadApp } = require('detox-expo-helpers');
const { element, by } = require('detox');

describe('WelcomeScreen', () => {
  beforeEach(async () => {
    await reloadApp();
  });

  it('should have static map asset', async () => {
    await expect(element(by.id('map'))).toBeVisible();
  });

  // it('should show hello screen after tap', async () => {
  //   // await element(by.id('hello_button')).tap();
  //   // await expect(element(by.text('Hello!!!'))).toBeVisible();
  // });

  // it('should show world screen after tap', async () => {
  //   // await element(by.id('world_button')).tap();
  //   // await expect(element(by.text('World!!!'))).toBeVisible();
  // });
});
