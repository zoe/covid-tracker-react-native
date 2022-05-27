import Checkbox from '@tracer/components/atoms/Inputs/checkbox';
import React, { ReactNode } from 'react';
import { AccessibilityRole, StyleProp, TextStyle, ViewStyle } from 'react-native';

import { InputValidation } from './validation';

export interface IFormSingleCheckboxItemProps {
  label: string;
  icon?: ReactNode;
  selected: boolean;
  id: string | number;
  style?: StyleProp<ViewStyle>;
  testID?: string;
  accessibilityRole?: AccessibilityRole;
}

interface IFormSingleCheckboxProps {
  item: IFormSingleCheckboxItemProps;
  required?: boolean;
  validation?: string;
  handleChange: (field: string, value: any, shouldValidate?: boolean) => void;
  children?: any;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  name: string;
  selected?: boolean;
}

/**
 * FormCheckboxQuestion
 *
 * @param item checkbox option
 * @param name unique identifier for form
 * @param required (optional) is checkbox required, defaults to false
 * @param validation (optional) checkbox validation text
 * @param handleChange checkbox change handler
 */
export default function FormSingleCheckboxQuestion({
  item,
  validation,
  required,
  children,
  name,
  style,
  textStyle,
  handleChange,
  selected = false,
}: IFormSingleCheckboxProps) {
  const onCheck = (isChecked: boolean, id: string | number | undefined) => {
    console.log(`selecting ${name}`, id);
    handleChange(`${name}.${id}.state`, isChecked);
    handleChange(`${name}.${id}.display`, item.label);
  };

  const { id, label, icon } = item;
  return (
    <>
      <Checkbox
        icon={icon}
        id={id}
        key={`form-checkbox-question-${name}-${id}`}
        label={label}
        onSelect={onCheck}
        selected={selected}
        style={style}
        textStyle={textStyle}
      >
        {children}
      </Checkbox>
      {required && validation ? <InputValidation state="error" validation={validation} /> : null}
    </>
  );
}
