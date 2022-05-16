import Button, { IButtonProps } from '@tracer/components/atoms/Button';
import Column from '@tracer/components/atoms/Column';
import Row from '@tracer/components/atoms/Row';
import React, { ReactNode, useEffect, useState } from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';

import { colors } from '../../../branding/colors';
import { grid } from '../../../branding/grid';

export interface IButtonGroupProps {
  buttonProps?: IButtonProps[];
  onChange: (activeButtons: number[]) => void;
  active: number[];
  buttonCustom?: ReactNode[];
  space?: boolean;
  multiSelect?: boolean;
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
  active,
  buttonProps,
  buttonCustom,
  multiSelect = false,
  style,
  ...props
}: IButtonGroupProps) {
  const [activeButtons, setActiveButtons] = useState<number[]>();

  const updateActiveButtons = (selectedIndex: number) => {
    if (activeButtons && activeButtons.includes(selectedIndex)) {
      let newActiveButtons = activeButtons;
      const indexToRemove = newActiveButtons.indexOf(selectedIndex);

      if (indexToRemove > -1) {
        newActiveButtons = newActiveButtons.splice(indexToRemove, 1);
      }

      return newActiveButtons;
    }
    const newActiveButtons = activeButtons ? activeButtons.concat([selectedIndex]) : [selectedIndex];
    return newActiveButtons;
  };

  type ButtonPressParams = {
    index: number;
    callback?: Function;
  };

  const handleSingleSelect = (params: ButtonPressParams) => {
    const { index, callback } = params;
    if (buttonProps && index < buttonProps.length && buttonProps[index]) {
      if (callback) callback(index);
      const newButtons = updateActiveButtons(index);
      onChange(newButtons);
    }
  };

  const handleMultiSelect = (params: ButtonPressParams): void => {
    const { index, callback } = params;
    if (callback) callback(index);
    const newButtons = updateActiveButtons(index);
    onChange(newButtons);
  };

  const handleButtonPress = (params: ButtonPressParams): void => {
    if (multiSelect) {
      handleMultiSelect(params);
    } else {
      handleSingleSelect(params);
    }
  };

  useEffect(() => {
    setActiveButtons(active);
  }, [active]);

  console.log(buttonProps);
  return (
    <Row style={[style]} testID={props.testID ?? 'ButtonGroup-test-id'}>
      {buttonCustom
        ? buttonCustom.map((button, index) => <Column key={`button-group-${index + 1}-custom-btn`}>{button}</Column>)
        : null}
      {buttonProps
        ? buttonProps.map((buttonProp, index) => {
            const { onPress, ...rest } = buttonProp;
            const buttonType = activeButtons && activeButtons.includes(index) ? 'primary' : 'secondary';
            return (
              <Button
                key={`button-group${index % 2}-${index + 1}-${buttonType}-btn`}
                style={baseStyle.button}
                {...rest}
                buttonType={buttonType}
                onPress={() => handleButtonPress({ callback: onPress, index })}
              />
            );
          })
        : null}
    </Row>
  );
}

const baseStyle = StyleSheet.create({
  button: {
    borderRadius: grid.g48 / 2,
    marginHorizontal: 6,
    marginVertical: grid.g8,
    paddingHorizontal: grid.g12,
  },
  view: {
    backgroundColor: colors.white,
  },
});
