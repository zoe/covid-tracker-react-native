import { grid } from '@tracer/branding/grid';
import Button from '@tracer/components/atoms/Button';
import Row from '@tracer/components/atoms/Row';
import React from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';

interface IFormSubmitButtonProps {
  text: string;
  onSubmit: () => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * FormSubmitButton
 *
 * @param text button text
 * @param onSubmit button click handler
 * @param style custom styling, overrides default styles
 */
export default function FormSubmitButton({ onSubmit, text, style }: IFormSubmitButtonProps) {
  return (
    <Row style={baseStyles.view}>
      <Button onPress={onSubmit} style={[baseStyles.button, style]} text={text} />
    </Row>
  );
}

const baseStyles = StyleSheet.create({
  button: { width: '100%' },
  view: {
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: grid.g24,
  },
});
