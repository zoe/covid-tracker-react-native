import * as UserService from '@covid/core/user/UserService';
import * as React from 'react';
import { Linking } from 'react-native';
import { render, fireEvent } from 'react-native-testing-library';

import { ConsentScreen } from '../ConsentScreen';
import {
  consentVersionSE,
  consentVersionUK,
  consentVersionUS,
  privacyPolicyVersionSE,
  privacyPolicyVersionUK,
  privacyPolicyVersionUS,
} from '../constants';

jest.mock('@covid/core/user/UserService');
const { mockedSetConsentSigned } = UserService as any;
mockedSetConsentSigned.mockImplementation(() => Promise.resolve());

const props: any = {
  route: {
    params: {
      viewOnly: false,
    },
  },
  navigation: {
    replace: jest.fn(),
    navigate: jest.fn(),
    setOptions: jest.fn(),
  },
};

beforeEach(() => {
  // reset all the mocks' counters before each test
  jest.clearAllMocks();
});

describe('US', () => {
  it('should render with viewOnly false', () => {
    const mockedIsUSCountry = jest.spyOn(UserService, 'isUSCountry').mockImplementation(() => true);
    const { toJSON } = render(<ConsentScreen {...props} />);
    expect(toJSON()).toMatchSnapshot();
    mockedIsUSCountry.mockReset();
  });

  it('should render with viewOnly true', () => {
    const mockedIsUSCountry = jest.spyOn(UserService, 'isUSCountry').mockImplementation(() => true);
    const { toJSON } = render(<ConsentScreen {...props} route={{ params: { viewOnly: true } }} />);
    expect(toJSON()).toMatchSnapshot();
    mockedIsUSCountry.mockReset();
  });

  it('should open nurse consent', () => {
    const mockedIsUSCountry = jest.spyOn(UserService, 'isUSCountry').mockImplementation(() => true);
    const { getByTestId } = render(<ConsentScreen {...props} />);
    fireEvent(getByTestId('nurseConsent'), 'onPress');
    expect(props.navigation.replace).toHaveBeenLastCalledWith('NursesConsentUS', { viewOnly: false });
    mockedIsUSCountry.mockReset();
  });

  it('should open info link', () => {
    const mockedIsUSCountry = jest.spyOn(UserService, 'isUSCountry').mockImplementation(() => true);
    const mockedLinking = jest.spyOn(Linking, 'openURL');
    const { getByTestId } = render(<ConsentScreen {...props} />);
    fireEvent(getByTestId('infoLink'), 'onPress');
    expect(mockedLinking).toHaveBeenLastCalledWith('https://www.cdc.gov/coronavirus/2019-ncov/index.html');
    mockedIsUSCountry.mockReset();
  });

  it('should open privacy links', () => {
    const mockedIsUSCountry = jest.spyOn(UserService, 'isUSCountry').mockImplementation(() => true);
    const { getByTestId } = render(<ConsentScreen {...props} />);
    fireEvent(getByTestId('privacyPolicy1'), 'onPress');
    expect(props.navigation.navigate).toHaveBeenLastCalledWith('PrivacyPolicyUS', { viewOnly: false });
    fireEvent(getByTestId('privacyPolicy2'), 'onPress');
    expect(props.navigation.navigate).toHaveBeenLastCalledWith('PrivacyPolicyUS', { viewOnly: false });
    fireEvent(getByTestId('privacyPolicy3'), 'onPress');
    expect(props.navigation.navigate).toHaveBeenLastCalledWith('PrivacyPolicyUS', { viewOnly: false });
    mockedIsUSCountry.mockReset();
  });

  it('should check processing and terms of use', () => {
    const mockedIsUSCountry = jest.spyOn(UserService, 'isUSCountry').mockImplementation(() => true);
    const { getByTestId } = render(<ConsentScreen {...props} />);

    const processingCheck = getByTestId('processingCheck');
    expect(processingCheck.props.value).toBe(false);
    fireEvent(processingCheck, 'onChange');
    expect(processingCheck.props.value).toBe(true);

    const termsOfUseCheck = getByTestId('termsOfUseCheck');
    expect(termsOfUseCheck.props.value).toBe(false);
    fireEvent(termsOfUseCheck, 'onChange');
    expect(termsOfUseCheck.props.value).toBe(true);

    fireEvent(getByTestId('termsOfUse'), 'onPress');
    expect(props.navigation.navigate).toHaveBeenLastCalledWith('TermsOfUseUS', { viewOnly: false });

    mockedIsUSCountry.mockReset();
  });

  it('should have agree button enabled and clickable', async () => {
    const mockedIsUSCountry = jest.spyOn(UserService, 'isUSCountry').mockImplementation(() => true);
    const { getByTestId } = render(<ConsentScreen {...props} />);

    const agreeButton = getByTestId('agree');
    expect(agreeButton.props.enable).toBe(false);
    fireEvent(getByTestId('processingCheck'), 'onChange');
    fireEvent(getByTestId('termsOfUseCheck'), 'onChange');
    expect(agreeButton.props.enable).toBe(true);

    fireEvent(agreeButton, 'onPress');
    await expect(mockedSetConsentSigned).toHaveBeenLastCalledWith('US', consentVersionUS, privacyPolicyVersionUS);
    expect(props.navigation.navigate).toHaveBeenLastCalledWith('Register');

    mockedIsUSCountry.mockReset();
  });
});

describe('UK', () => {
  it('should render with viewOnly false', () => {
    const mockedIsGBCountry = jest.spyOn(UserService, 'isGBCountry').mockImplementation(() => true);
    const { toJSON } = render(<ConsentScreen {...props} />);
    expect(toJSON()).toMatchSnapshot();
    mockedIsGBCountry.mockReset();
  });

  it('should render with viewOnly true', () => {
    const mockedIsGBCountry = jest.spyOn(UserService, 'isGBCountry').mockImplementation(() => true);
    const { toJSON } = render(<ConsentScreen {...props} route={{ params: { viewOnly: true } }} />);
    expect(toJSON()).toMatchSnapshot();
    mockedIsGBCountry.mockReset();
  });

  it('should open info link', () => {
    const mockedIsGBCountry = jest.spyOn(UserService, 'isGBCountry').mockImplementation(() => true);
    const mockedLinking = jest.spyOn(Linking, 'openURL');
    const { getByTestId } = render(<ConsentScreen {...props} />);
    fireEvent(getByTestId('infoLink'), 'onPress');
    expect(mockedLinking).toHaveBeenLastCalledWith('https://www.nhs.uk/conditions/coronavirus-covid-19/');
    mockedIsGBCountry.mockReset();
  });

  it('should open privacy links', () => {
    const mockedIsGBCountry = jest.spyOn(UserService, 'isGBCountry').mockImplementation(() => true);
    const { getByTestId } = render(<ConsentScreen {...props} />);
    fireEvent(getByTestId('privacyPolicy1'), 'onPress');
    expect(props.navigation.navigate).toHaveBeenLastCalledWith('PrivacyPolicyUK', { viewOnly: false });
    fireEvent(getByTestId('privacyPolicy2'), 'onPress');
    expect(props.navigation.navigate).toHaveBeenLastCalledWith('PrivacyPolicyUK', { viewOnly: false });
    mockedIsGBCountry.mockReset();
  });

  it('should have agree button enabled and clickable', async () => {
    const mockedIsGBCountry = jest.spyOn(UserService, 'isGBCountry').mockImplementation(() => true);
    const { getByTestId } = render(<ConsentScreen {...props} />);

    const agreeButton = getByTestId('agree');
    expect(agreeButton.props.enable).toBe(true);

    fireEvent(agreeButton, 'onPress');
    await expect(mockedSetConsentSigned).toHaveBeenLastCalledWith('UK', consentVersionUK, privacyPolicyVersionUK);
    expect(props.navigation.navigate).toHaveBeenLastCalledWith('Register');

    mockedIsGBCountry.mockReset();
  });
});

describe('Sweden', () => {
  it('should render with viewOnly false', () => {
    const mockedIsSECountry = jest.spyOn(UserService, 'isSECountry').mockImplementation(() => true);
    const { toJSON } = render(<ConsentScreen {...props} />);
    expect(toJSON()).toMatchSnapshot();
    expect(props.navigation.setOptions).toHaveBeenLastCalledWith({ title: 'Information till studiedeltagare' });
    mockedIsSECountry.mockReset();
  });

  it('should render with viewOnly true', () => {
    const mockedIsSECountry = jest.spyOn(UserService, 'isSECountry').mockImplementation(() => true);
    const { toJSON } = render(<ConsentScreen {...props} route={{ params: { viewOnly: true } }} />);
    expect(toJSON()).toMatchSnapshot();
    mockedIsSECountry.mockReset();
  });

  it('should open info links', () => {
    const mockedIsSECountry = jest.spyOn(UserService, 'isSECountry').mockImplementation(() => true);
    const mockedLinking = jest.spyOn(Linking, 'openURL');
    const { getByTestId } = render(<ConsentScreen {...props} />);
    fireEvent(getByTestId('infoLink1'), 'onPress');
    expect(mockedLinking).toHaveBeenLastCalledWith('https://Covid19app.lu.se');
    fireEvent(getByTestId('infoLink2'), 'onPress');
    expect(mockedLinking).toHaveBeenLastCalledWith(
      'https://www.datainspektionen.se/vagledningar/for-dig-som-privatperson/klagomal-och-tips/'
    );
    fireEvent(getByTestId('infoLink3'), 'onPress');
    expect(mockedLinking).toHaveBeenLastCalledWith('https://Covid19app.lu.se');
    mockedIsSECountry.mockReset();
  });

  it('should open privacy links', () => {
    const mockedIsSECountry = jest.spyOn(UserService, 'isSECountry').mockImplementation(() => true);
    const { getByTestId } = render(<ConsentScreen {...props} />);
    fireEvent(getByTestId('privacyPolicy'), 'onPress');
    expect(props.navigation.navigate).toHaveBeenLastCalledWith('PrivacyPolicySV', { viewOnly: false });
    mockedIsSECountry.mockReset();
  });

  it('should check partecipate, processing and agree', () => {
    const mockedIsSECountry = jest.spyOn(UserService, 'isSECountry').mockImplementation(() => true);
    const { getByTestId } = render(<ConsentScreen {...props} />);

    const partecipateCheck = getByTestId('partecipateCheck');
    expect(partecipateCheck.props.value).toBe(false);
    fireEvent(partecipateCheck, 'onChange');
    expect(partecipateCheck.props.value).toBe(true);

    const processingCheck = getByTestId('processingCheck');
    expect(processingCheck.props.value).toBe(false);
    fireEvent(processingCheck, 'onChange');
    expect(processingCheck.props.value).toBe(true);

    const agreeCheck = getByTestId('agreeCheck');
    expect(agreeCheck.props.value).toBe(false);
    fireEvent(agreeCheck, 'onChange');
    expect(agreeCheck.props.value).toBe(true);

    mockedIsSECountry.mockReset();
  });

  it('should have agree button enabled and clickable', async () => {
    const mockedIsSECountry = jest.spyOn(UserService, 'isSECountry').mockImplementation(() => true);
    const { getByTestId } = render(<ConsentScreen {...props} />);

    const agreeButton = getByTestId('agree');
    expect(agreeButton.props.enable).toBe(false);
    fireEvent(getByTestId('partecipateCheck'), 'onChange');
    fireEvent(getByTestId('processingCheck'), 'onChange');
    fireEvent(getByTestId('agreeCheck'), 'onChange');
    expect(agreeButton.props.enable).toBe(true);

    fireEvent(agreeButton, 'onPress');
    await expect(mockedSetConsentSigned).toHaveBeenLastCalledWith('SE', consentVersionSE, privacyPolicyVersionSE);
    expect(props.navigation.navigate).toHaveBeenLastCalledWith('Register');

    mockedIsSECountry.mockReset();
  });
});
