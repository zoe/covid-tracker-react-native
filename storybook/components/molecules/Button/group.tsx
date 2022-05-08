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
export default function ButtonGroup({ buttonProps, buttonCustom, style, ...props }: IButtonGroupProps) {
  const [activeButton, setActiveButton] = useState<number>(-1);

  const handleButtonPress = (index: number, callback?: Function) => {
    if (buttonProps && index < buttonProps.length && buttonProps[index]) {
      setActiveButton(index);
      if (callback) callback();
    }
  };

  useEffect(() => {
    setActiveButton(0);
  }, []);

  return (
    <View style={[baseStyle.view, style]} testID={props.testID ?? 'ButtonGroup-test-id'}>
      <Row>
        {buttonCustom
          ? buttonCustom.map((button, index) => <Column key={`button-group-${index + 1}-custom-btn`}>{button}</Column>)
          : null}
        {buttonProps
          ? buttonProps.map((buttonProp, index) => {
              const { onPress, ...rest } = buttonProp;
              const buttonType = index === activeButton ? 'primary' : 'secondary';
              return (
                <Spacer key={`button-group-${index + 1}-${buttonType}-btn`} style={baseStyle.spacer}>
                  <Column>
                    <Button {...rest} buttonType={buttonType} onPress={() => handleButtonPress(index, onPress)} />
                  </Column>
                </Spacer>
              );
            })
          : null}
      </Row>
    </View>
  );
}

const baseStyle = StyleSheet.create({
  spacer: {
    paddingHorizontal: grid.g8,
    paddingVertical: grid.g8,
  },
  view: {
    backgroundColor: colors.white,
  },
});
