import { device, init } from 'detox';

// import { testCreateNewProfileFeature } from './testCreateNewProfileFeature';
// import { testLoginScreen } from './testLoginScreen';
// import { testLogoutFeature } from './testLogoutFeature';
import { testRegisterFeature } from './testRegisterFeature';
// import { testReportTodayFeature } from './testReportTodayFeature';
// import { testSelectCountryScreen } from './testSelectCountryScreen';
import { testWelcomeScreen } from './testWelcomeScreen';

jest.setTimeout(60000);

const defaultPassword = 'manymuffins';
const defaultEmailAddress = 'test@joinzoe.com';
const profileName = `profile ${Math.round(Date.now() / 1000)}`;

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
// testSelectCountryScreen({
//   endWithCountry: 'GB',
//   testAllCountries: false,
// });
testRegisterFeature({
  emailAddress: tempEmailAddress,
  password: defaultPassword,
  phoneNumber: tempPhoneNumber,
});
// testLogoutFeature();
// testLoginScreen({
//   emailAddress: defaultEmailAddress,
//   password: defaultPassword,
// });
// testCreateNewProfileFeature({
//   profileName,
// });
// testReportTodayFeature({
//   addAndUpdateZoeInviteTest: false,
//   addTest: false,
//   addVaccines: false,
//   healthy: false,
//   updateTest: false,
//   addAndUpdateGovUKTest: true,
// });
// testLogoutFeature();
