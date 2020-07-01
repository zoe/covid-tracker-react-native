const detox = require('detox');
const adapter = require('detox/runners/jest/adapter');
const specReporter = require('detox/runners/jest/specReporter');

const config = require('../.detoxrc.json');

// Set the default timeout
jest.setTimeout(120000);
// @ts-ignore
// eslint-disable-next-line no-undef
jasmine.getEnv().addReporter(adapter);

// This takes care of generating status logs on a per-spec basis. By default, jest only reports at file-level.
// This is strictly optional.
// eslint-disable-next-line no-undef
jasmine.getEnv().addReporter(specReporter);

beforeAll(async () => {
  try {
    await detox.init(config);
  } catch (error) {
    console.log('Detox init error', error);
  }
});

beforeEach(async () => {
  await adapter.beforeEach();
});

afterAll(async () => {
  await adapter.afterAll();
  await detox.cleanup();
});
