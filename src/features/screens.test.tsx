/* eslint-env jest */

import * as screens from '@covid/features/screens';
import * as React from 'react';
import renderer, { act } from 'react-test-renderer';

import { createMockedElement } from '../../__mocks__/createHelper';
import MockedNavigator from '../../__mocks__/MockedNavigator';

describe('Test if the screens render without error', () =>
  Object.entries(screens).forEach(([name, Component]: [string, any]) => {
    test(`${name} renders without error`, async () => {
      await act(async () => {
        const mockedElement = createMockedElement(<MockedNavigator Component={Component} />);
        expect(renderer.create(mockedElement).toJSON()).toBeDefined();
      });
    });
  }));
