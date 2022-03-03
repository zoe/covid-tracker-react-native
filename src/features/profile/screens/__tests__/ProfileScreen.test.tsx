/* eslint-env jest */

import { fireEvent, render } from '@testing-library/react-native';
import * as React from 'react';
import { act } from 'react-test-renderer';

import { createMockedElement } from '../../../../../__mocks__/createHelper';
import MockedNavigator from '../../../../../__mocks__/MockedNavigator';
import { ProfileScreen } from '../ProfileScreen';

jest.mock('@covid/features/AppCoordinator', () => {
  return {
    appCoordinator: {
      startAssessmentFlow: jest.fn(),
      startAssessmentFlowThroughVaccines: jest.fn(),
      startEditProfileNoRedirect: jest.fn(),
    },
  };
});

jest.mock('@covid/features/multi-profile/edit-profile/EditProfileCoordinator', () => {
  return {
    editProfileCoordinator: {
      goToEditLocation: jest.fn(),
      startEditProfileOther: jest.fn(),
    },
  };
});

jest.mock('@covid/NavigatorService', () => {
  return {
    navigate: jest.fn(),
  };
});

const startAssessmentFlowMock = require('@covid/features/AppCoordinator').appCoordinator.startAssessmentFlow;
const startAssessmentFlowVaccinesMock = require('@covid/features/AppCoordinator').appCoordinator
  .startAssessmentFlowThroughVaccines;
const editLocationMock = require('@covid/features/multi-profile/edit-profile/EditProfileCoordinator')
  .editProfileCoordinator.goToEditLocation;
const editProfileOtherMock = require('@covid/features/multi-profile/edit-profile/EditProfileCoordinator')
  .editProfileCoordinator.startEditProfileOther;
const navigateMock = require('@covid/NavigatorService').navigate;

beforeEach(() => {
  startAssessmentFlowMock.mockClear();
  startAssessmentFlowVaccinesMock.mockClear();
  editLocationMock.mockClear();
  editProfileOtherMock.mockClear();
  navigateMock.mockClear();
});

const currentPatient = {
  patientState: {
    shouldShowVaccineList: true,
  },
  profile: {
    avatar_name: 'profile1',
    id: 'ee265aab-3dfb-48d7-91b4-5e92b3ffbdc3',
    name: 'Me',
    reported_by_another: false,
  },
};

const state = {
  content: {
    startupInfo: {
      primary_patient_date_joined: '2022-03-02T18:08:07.062000Z',
    },
  },
  user: { currentPatient },
};

// @ts-expect-error
const mockedElement = createMockedElement(<MockedNavigator Component={ProfileScreen} />, { state });

describe('Profile Screen tests', () => {
  it('displays the correct patient joining date', async () => {
    const renderAPI = render(mockedElement);
    const date = renderAPI.getByText('Joined: 2nd of March, 2022');
    expect(date).toBeDefined();
  });

  it('COVID tests card onPress starts the assessment flow for the primary patient', async () => {
    const renderAPI = render(mockedElement);

    await act(async () => {
      const card = renderAPI.getByText('COVID-19 tests');
      await fireEvent.press(card);
      expect(startAssessmentFlowMock).toHaveBeenCalledWith(currentPatient);
    });
  });

  it('Vaccines card onPress starts the assessment flow for the primary patient', async () => {
    const renderAPI = render(mockedElement);

    await act(async () => {
      const card = renderAPI.getByText('Vaccines');
      await fireEvent.press(card);
      expect(startAssessmentFlowVaccinesMock).toHaveBeenCalledWith(currentPatient);
    });
  });

  it('Location onPress triggers the edit location function', async () => {
    const renderAPI = render(mockedElement);

    await act(async () => {
      const link = renderAPI.getByText('Location');
      await fireEvent.press(link);
      expect(editLocationMock).toHaveBeenCalled();
    });
  });

  it('Other onPress triggers the other settings function', async () => {
    const renderAPI = render(mockedElement);

    await act(async () => {
      const link = renderAPI.getByText('Other');
      await fireEvent.press(link);
      expect(editProfileOtherMock).toHaveBeenCalled();
    });
  });

  it('Secondary profiles onPress navigates to the select profile screen', async () => {
    const renderAPI = render(mockedElement);

    await act(async () => {
      const link = renderAPI.getByText('View / edit secondary profiles');
      await fireEvent.press(link);
      expect(navigateMock).toHaveBeenCalledWith('SelectProfile', { assessmentFlow: false });
    });
  });
});
