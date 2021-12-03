/* eslint-env jest */

import { StudiesListScreen } from '@covid/features/study-hub/screens/StudiesListScreen';
import * as React from 'react';

import { createReactTestInstance } from '../../../../../__mocks__/createHelper';
import MockedNavigator from '../../../../../__mocks__/MockedNavigator';

describe('StudiesListScreen tests', () => {
  it('renders correct version for consented users', () => {
    const state = {
      assessment: { patient: 'test123' },
      content: { startupInfo: { wider_health_studies_consent: true } },
    };
    const instance = createReactTestInstance(<MockedNavigator Component={StudiesListScreen} />, {
      state,
    });

    expect(instance.findByProps({ testID: 'study-hub-screen-title' }).props.children).toContain(
      "Studies you're eligible for",
    );
    expect(instance.findByProps({ testID: 'study-hub-reconsent-modal' }).props.visible).toBe(false);
  });

  it('displays the reconsent modal for not consented users', () => {
    const state = {
      assessment: { patient: 'test123' },
      content: { startupInfo: { wider_health_studies_consent: false } },
    };
    const instance = createReactTestInstance(<MockedNavigator Component={StudiesListScreen} />, {
      state,
    });

    expect(instance.findByProps({ testID: 'study-hub-reconsent-modal' }).props.visible).toBe(true);
  });
});
