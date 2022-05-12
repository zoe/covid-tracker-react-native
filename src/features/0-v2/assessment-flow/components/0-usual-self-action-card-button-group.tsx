import { grid } from '@tracer/branding/grid';
import Button from '@tracer/components/atoms/Button';
import { ButtonType } from '@tracer/components/atoms/Button/styles';
import Column from '@tracer/components/atoms/Column';
import Row from '@tracer/components/atoms/Row';
import React from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';

interface IActionGroupButton {
  text: string;
  buttonType?: ButtonType; // make into type in storybook
  onPress: () => void;
}

interface IUsualSelfActionCardButtonGroup {
  topButton: IActionGroupButton;
  bottomButton?: IActionGroupButton;
  style?: StyleProp<ViewStyle>;
}

export default function UsualSelfActionCardButtonGroup({
  topButton,
  bottomButton,
  style,
}: IUsualSelfActionCardButtonGroup) {
  return (
    <Column style={style}>
      <Row style={[baseStyle.actionCardButtonRow]}>
        <Button {...topButton} style={[baseStyle.actionCardButton]} textStyle={[baseStyle.actionCardButtonText]} />
      </Row>
      {bottomButton ? (
        <Row style={[baseStyle.actionCardButtonRow]}>
          <Button {...bottomButton} style={[baseStyle.actionCardButton]} textStyle={[baseStyle.actionCardButtonText]} />
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
