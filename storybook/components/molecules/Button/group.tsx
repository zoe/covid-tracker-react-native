import Button, { IButtonProps } from '@tracer/components/atoms/Button';
import Column from '@tracer/components/atoms/Column';
import Row from '@tracer/components/atoms/Row';
import Spacer from '@tracer/components/atoms/Spacer';
import React, { ReactNode, useEffect, useState } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { colors } from '../../../branding/colors';
import { grid } from '../../../branding/grid';

export interface IButtonGroupProps {
  buttonProps?: IButtonProps[];
  onChange: (input: number) => void;
  active?: number;
  buttonCustom?: ReactNode[];
  space?: boolean;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

/**
 * ButtonGroup
 *
 * @param style custom styling, overrides all other styles
 */
export default function ButtonGroup({
  onChange,
  active = -1,
  buttonProps,
  buttonCustom,
  style,
  ...props
}: IButtonGroupProps) {
  const [activeButton, setActiveButton] = useState<number>(active);

  const handleButtonPress = (index: number, callback?: Function) => {
    if (buttonProps && index < buttonProps.length && buttonProps[index]) {
      setActiveButton(index);
      if (callback) callback(index);
      onChange(index);
    }
  };

  useEffect(() => {
    if (active) setActiveButton(active);
  }, [active]);

  return (
    <View style={[baseStyle.view, style]} testID={props.testID ?? 'ButtonGroup-test-id'}>
      <Row style={baseStyle.buttonContainer}>
        {buttonCustom
          ? buttonCustom.map((button, index) => <Column key={`button-group-${index + 1}-custom-btn`}>{button}</Column>)
          : null}
        {buttonProps
          ? buttonProps.map((buttonProp, index) => {
              const { onPress, ...rest } = buttonProp;
              const buttonType = index === activeButton ? 'primary' : 'secondary';
              return (
                <Spacer key={`button-group-${index + 1}-${buttonType}-btn`} style={baseStyle.spacer}>
                  <Button
                    style={baseStyle.button}
                    {...rest}
                    buttonType={buttonType}
                    onPress={() => handleButtonPress(index, onPress)}
                  />
                </Spacer>
              );
            })
          : null}
      </Row>
    </View>
  );
}

const baseStyle = StyleSheet.create({
  button: {
    borderRadius: grid.g8,
    paddingHorizontal: grid.g12,
  },
  buttonContainer: {
    justifyContent: 'space-evenly',
  },
  spacer: {
    flex: 1,
    paddingHorizontal: grid.g4,
    paddingVertical: grid.g16,
  },
  view: {
    backgroundColor: colors.white,
  },
});
