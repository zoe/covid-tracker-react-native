import { Icon } from '@covid/components';
import { colors } from '@tracer/branding/colors';
import Button from '@tracer/components/atoms/Button';
import { ButtonType } from '@tracer/components/atoms/Button/styles';
import React from 'react';
import { StyleSheet } from 'react-native';

export interface IIconButtonProps {
  children?: any;
  iconName?: string;
  buttonType?: ButtonType;
  testID?: string;
  onPress: () => void;
}

/**
 * IconButton
 *
 * @param style custom styling, overrides all other styles
 */
export default function IconButton({
  children,
  buttonType = 'primary',
  iconName = 'none',
  onPress = () => {},
  testID = 'IconButton-test-id',
}: IIconButtonProps) {
  return (
    <Button buttonType={buttonType} onPress={onPress} style={baseStyle.button} testID={testID}>
      {children || <Icon color="black" iconName={iconName} />}
    </Button>
  );
}

const baseStyle = StyleSheet.create({
  button: {
    backgroundColor: colors.transparent,
    borderColor: colors.transparent,
    height: 0,
    margin: 0,
  },
});
