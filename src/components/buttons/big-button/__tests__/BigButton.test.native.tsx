import { BigButton } from '@covid/components';
import React from 'react';
import renderer from 'react-test-renderer';

describe('Button', () => {
  it('should match snapshot', () => {
    const component = renderer.create(<BigButton children="Button Text" onPress={() => {}} />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
