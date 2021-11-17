/* eslint-env jest */

import { BigButton } from '@covid/components';
import * as React from 'react';
import renderer from 'react-test-renderer';

describe('Button', () => {
  it('should match snapshot', () => {
    const component = renderer.create(<BigButton onPress={() => {}}>Button Text</BigButton>);
    // @ts-expect-error
    expect(component.toJSON()).toMatchSnapshot();
  });
});
