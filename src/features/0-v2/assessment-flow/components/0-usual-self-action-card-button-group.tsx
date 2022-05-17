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
        <Button style={[baseStyle.actionCardButton]} textStyle={[baseStyle.actionCardButtonText]} {...topButton} />
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
    flexGrow: 1,
    justifyContent: 'center',
    marginVertical: grid.g8,
    paddingHorizontal: grid.g24,
  },
  actionCardButtonText: {
    textTransform: 'none',
  },
});
