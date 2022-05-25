import { grid } from '@tracer/branding/grid';
import Button from '@tracer/components/atoms/Button';
import { ButtonType } from '@tracer/components/atoms/Button/styles';
import Column from '@tracer/components/atoms/Column';
import Row from '@tracer/components/atoms/Row';
import React from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';

interface IActionGroupButton {
  text: string;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  buttonType?: ButtonType; // make into type in storybook
  onPress: () => void;
}

interface IUsualSelfActionCardButtonGroup {
  topButton: IActionGroupButton;
  topButtonDisabled?: boolean;
  bottomButton?: IActionGroupButton;
  btnGroupStyle?: StyleProp<ViewStyle>;
}

export default function UsualSelfActionCardButtonGroup({
  topButton,
  bottomButton,
  btnGroupStyle,
  topButtonDisabled,
}: IUsualSelfActionCardButtonGroup) {
  const { style, ...topButtonProps } = topButton;
  return (
    <Column style={[{ flexGrow: 1, justifyContent: 'center' }, btnGroupStyle]}>
      <Row style={[baseStyle.actionCardButtonRow]}>
        <Button
          style={[baseStyle.actionCardButton]}
          textStyle={[baseStyle.actionCardButtonText]}
          {...topButtonProps}
          pseudoDisable={topButtonDisabled}
        />
      </Row>
      {bottomButton ? (
        <Row style={[baseStyle.actionCardButtonRow]}>
          <Button style={[baseStyle.actionCardButton]} textStyle={[baseStyle.actionCardButtonText]} {...bottomButton} />
        </Row>
      ) : null}
    </Column>
  );
}

const baseStyle = StyleSheet.create({
  actionCardButton: {
    flex: 1,
  },
  actionCardButtonRow: {
    marginVertical: grid.g8,
    paddingHorizontal: grid.g24,
  },
  actionCardButtonText: {
    textTransform: 'none',
  },
});
