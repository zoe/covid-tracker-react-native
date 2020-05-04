import { shallow } from 'enzyme';
import React from 'react';

import { BrandedButton } from '..';

describe('BrandedButton tests', () => {
  it('Handles press events', () => {
    const onPress = jest.fn();
    const component = shallow(<BrandedButton onPress={onPress}>This is a branded button</BrandedButton>);
    expect(onPress).toHaveBeenCalledTimes(0);
    component.simulate('press');
    expect(onPress).toHaveBeenCalledTimes(1);
  });
  it('Does not fire press events when disabled', () => {
    const onPress = jest.fn();
    const component = shallow(
      <BrandedButton onPress={onPress} enable={false}>
        This is a branded button
      </BrandedButton>
    );
    expect(onPress).toHaveBeenCalledTimes(0);
    component.simulate('press');
    expect(onPress).toHaveBeenCalledTimes(0);
  });
  it('Handles style props being passed', () => {
    const onPress = jest.fn();
    const style = { background: 'red' };
    const component = shallow(
      <BrandedButton style={style} onPress={onPress} enable={false}>
        This is a branded button
      </BrandedButton>
    );
    expect(component.props().style[1]).toBe(style);
  });
  it('Shows loading if disabled', () => {
    const onPress = jest.fn();
    const component = shallow(
      <BrandedButton onPress={onPress} enable={false}>
        This is a branded button
      </BrandedButton>
    );
    expect(component.find('ActivityIndicator')).toHaveLength(1);
  });
  it('Can hide loading when disabled', () => {
    const onPress = jest.fn();
    const component = shallow(
      <BrandedButton onPress={onPress} enable={false} hideLoading>
        This is a branded button
      </BrandedButton>
    );
    expect(component.find('ActivityIndicator')).toHaveLength(0);
  });
});
