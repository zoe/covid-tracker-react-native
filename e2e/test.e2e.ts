import { device, init } from 'detox';

// import { testCreateNewProfileFeature } from './testCreateNewProfileFeature';
// import { testLoginScreen } from './testLoginScreen';
// import { testLogoutFeature } from './testLogoutFeature';
import { testRegisterFeature } from './testRegisterFeature';
// import { testReportTodayFeature } from './testReportTodayFeature';
import { testSelectCountryScreen } from './testSelectCountryScreen';
import { testWelcomeScreen } from './testWelcomeScreen';

jest.setTimeout(60000);

const defaultPassword = 'manymuffins';
const defaultEmailAddress = 'test@joinzoe.com';
const profileName = `profile ${Math.round(Date.now() / 1000)}`;

// NOTE: These Detox tests work, but the latest native app upgrade including Firebase has caused Detox to run into an infinite wait (I think because
// it's waiting to connect to firebase apis). This needs to be fixed to get Detox to work. To verify this, comment out all firebase code in both
// analytics files in src/core and src/core/firebase.

beforeAll(async () => {
  await device.launchApp({
    newInstance: true,
    permissions: { notifications: 'YES' },
  });
});

beforeEach(async () => {
  if (typeof device === 'undefined') {
    await init();
  }
});

const timestamp = Math.round(Date.now() / 1000);
const tempEmailAddress = `test-${timestamp}@test.com`;
const tempPhoneNumber = `+44 7900 ${timestamp}`;

testWelcomeScreen();
testSelectCountryScreen({
  endWithCountry: 'GB',
  testAllCountries: false,
});
testRegisterFeature({
  emailAddress: tempEmailAddress,
  password: defaultPassword,
  phoneNumber: tempPhoneNumber,
});

// These are the remaining e2e tests to be tested in sequence. They need updating for the latest UI changes to work though.

// testLogoutFeature();
// testLoginScreen({
//   emailAddress: defaultEmailAddress,
//   password: defaultPassword,
// });
// testCreateNewProfileFeature({
//   profileName,
// });
// testReportTodayFeature({
//   addAndUpdateGovUKTest: true,
//   addTest: false,
//   addVaccines: false,
//   healthy: false,
//   updateTest: false,
// });
// testLogoutFeature();
