/* eslint-env jest */

import TabNavigator from '@covid/features/tab-navigation/TabNavigator';
import * as React from 'react';

import { createReactTestInstance } from '../../../../__mocks__/createHelper';
import MockedNavigator from '../../../../__mocks__/MockedNavigator';

describe('Profile Tab tests', () => {
  it('shows the onboarding overlay when profile_tab_onboarding_seen is false', async () => {
    // users_count state needed to render dashboard component
    const state = {
      content: { startupInfo: { profile_tab_onboarding_seen: false, users_count: 1 } },
    };

    // @ts-expect-error
    const instance = createReactTestInstance(<MockedNavigator Component={TabNavigator} />, { state });

    setTimeout(() => {
      expect(instance.findByProps({ testID: 'profile-tab-overlay-description' })).toBeDefined();
    }, 2000);
  });

  it('does not show the onboarding overlay when profile_tab_onboarding_seen is true', async () => {
    const state = {
      content: { startupInfo: { profile_tab_onboarding_seen: true, users_count: 1 } },
    };

    // @ts-expect-error
    const instance = createReactTestInstance(<MockedNavigator Component={TabNavigator} />, { state });

    setTimeout(() => {
      expect(instance.findByProps({ testID: 'profile-tab-overlay-description' })).not.toBeDefined();
    }, 2000);
  });
});
