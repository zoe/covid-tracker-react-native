/* eslint-env jest */

import { DashboardUKScreen } from '@covid/features/dashboard/DashboardUKScreen';
import { ProfileScreen } from '@covid/features/profile/screens/ProfileScreen';
import { StudiesListScreen } from '@covid/features/study-hub/screens/StudiesListScreen';
import TabNavigator from '@covid/features/tab-navigation/TabNavigator';
import * as React from 'react';

import { createReactTestInstance } from '../../../../__mocks__/createHelper';
import MockedNavigator from '../../../../__mocks__/MockedNavigator';

// users_count state needed to render dashboard component
const state = {
  content: { startupInfo: { show_assessment_flow_v0: true, users_count: 1 } },
};

// @ts-expect-error
const instance = createReactTestInstance(<MockedNavigator Component={TabNavigator} />, { state });

describe('Tab Navigator tests', () => {
  it('renders without crashing', () => {
    expect(instance).toBeDefined();
  });

  it('renders the Home, Studies and Profile tabs', () => {
    expect(instance.findByProps({ testID: 'tab-home' })).toBeDefined();
    expect(instance.findByProps({ testID: 'tab-studies' })).toBeDefined();
    expect(instance.findByProps({ testID: 'tab-profile' })).toBeDefined();
  });

  it('shows Home screen stack when selected', () => {
    expect(instance.findAllByType(DashboardUKScreen).length).toBe(1);
    expect(instance.findAllByType(StudiesListScreen).length).toBe(0);
  });

  it('shows Studies screen stack when selected', () => {
    instance.findByProps({ testID: 'tab-studies' }).props.onPress();
    expect(instance.findAllByType(StudiesListScreen).length).toBe(1);
  });

  it('shows Profile screen stack when selected', () => {
    instance.findByProps({ testID: 'tab-profile' }).props.onPress();
    expect(instance.findAllByType(ProfileScreen).length).toBe(1);
  });
});
