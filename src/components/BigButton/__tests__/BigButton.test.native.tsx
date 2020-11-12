import React from 'react';
import renderer from 'react-test-renderer';
import { fireEvent, queryByTestId, render } from '@testing-library/react-native';

import { BigButton } from '@covid/components/BigButton';

describe('Button', () => {
  it('should match snapshot', () => {
    const component = renderer.create(<BigButton onPress={() => {}} children="Button Text" />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
