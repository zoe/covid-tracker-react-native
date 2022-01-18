/* eslint-env jest */
import { LinkItem } from '@covid/features/menu/LinkItem';
import * as React from 'react';

import { createReactTestInstance } from '../../../../__mocks__/createHelper';
import MockedNavigator from '../../../../__mocks__/MockedNavigator';
import { LinksSection } from '../LinksSection';

describe('LinksSection tests', () => {
  it('shows the testing mode link when is_tester is true', async () => {
    const state = { content: { startupInfo: { is_tester: true } } };
    const instance = createReactTestInstance(<MockedNavigator Component={LinksSection} />, {
      state,
    });
    expect(
      instance
        .findAllByType(LinkItem)
        .filter((linkItemInstance) => linkItemInstance.props.analyticsName === 'TESTING_MODE').length,
    ).toEqual(1);
  });

  it('does not show the testing mode link when is_tester is false', async () => {
    const state = { content: { startupInfo: { is_tester: false } } };
    const instance = createReactTestInstance(<MockedNavigator Component={LinksSection} />, {
      state,
    });
    expect(
      instance
        .findAllByType(LinkItem)
        .filter((linkItemInstance) => linkItemInstance.props.analyticsName === 'TESTING_MODE').length,
    ).toEqual(0);
  });
});
