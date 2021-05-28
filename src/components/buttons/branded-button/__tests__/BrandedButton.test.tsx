import { BrandedButton } from '@covid/components';
import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import renderer from 'react-test-renderer';

describe('branded-button tests', () => {
  it('renders correctly', () => {
    const onPress = jest.fn();
    const tree = renderer.create(<BrandedButton onPress={onPress}>This is a branded button</BrandedButton>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Handles press events', () => {
    const onPress = jest.fn();
    const { getByTestId } = render(<BrandedButton onPress={onPress}>This is a branded button</BrandedButton>);
    expect(onPress).toHaveBeenCalledTimes(0);
    const button = getByTestId('buttonTestID');
    fireEvent.press(button);
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('Does not fire press events when disabled', () => {
    const onPress = jest.fn();
    const { getByTestId } = render(
      <BrandedButton enable={false} onPress={onPress}>
        This is a branded button
      </BrandedButton>,
    );
    expect(onPress).toHaveBeenCalledTimes(0);
    try {
      fireEvent.press(getByTestId('buttonTestID'));
    } catch (_) {}
    expect(onPress).toHaveBeenCalledTimes(0);
  });

  it('Handles style props being passed', () => {
    const onPress = jest.fn();
    const style = { background: 'red' };
    const { getByTestId } = render(
      <BrandedButton enable={false} onPress={onPress} style={style}>
        This is a branded button
      </BrandedButton>,
    );
    expect(getByTestId('buttonTestID').props.style.background).toBe('red');
  });
});
