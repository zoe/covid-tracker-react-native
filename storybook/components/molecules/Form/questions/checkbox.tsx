import { grid } from '@tracer/branding/grid';
import Checkbox, { ICheckboxProps } from '@tracer/components/atoms/Inputs/checkbox';
import { FormikValues } from 'formik';
import React, { ReactNode } from 'react';
import { AccessibilityRole, StyleProp, StyleSheet, Text, ViewStyle } from 'react-native';

import FormLabel from '../label';
import { InputValidation } from './validation';

export interface IFormCheckboxItemProps {
  label: string;
  icon?: ReactNode;
  selected: boolean;
  id: string | number;
  style?: StyleProp<ViewStyle>;
  testID?: string;
  accessibilityRole?: AccessibilityRole;
}

interface IFormCheckboxQuestionProps {
  items: IFormCheckboxItemProps[];
  question?: string;
  required?: boolean;
  validation?: string;
  handleChange?: (id: string) => void;
  /* this property is dynamically added later if wrapped bt the Form organism component  */
  form?: FormikValues;
  name: string;
}

const FORM_CHECKBOX_ASSIST_TEXT = 'Check all that apply';

/**
 * FormCheckboxQuestion
 *
 * @param items checkbox options
 * @param question checkbox label text
 * @param required (optional) is checkbox required, defaults to false
 * @param validation checkbox validation text
 * @param handleChange checkbox change handler
 */
export default function FormCheckboxQuestion({
  items,
  question,
  validation,
  required = false,
  form,
  name,
  handleChange,
}: IFormCheckboxQuestionProps) {
  if (handleChange) handleChange(name);

  const onCheck = (isChecked: boolean, index: number) => {
    if (!isChecked) return;
    if (form) form[name][index] = items[index].label;
  };

  return (
    <>
      {question ? <FormLabel label={question} required={required} /> : null}
      <Text style={baseStyles.infoText}>{FORM_CHECKBOX_ASSIST_TEXT}</Text>
      {items.map(({ label, icon }: ICheckboxProps, index: number) => (
        <Checkbox
          icon={icon}
          key={`form-checkbox-question-${name}-${index + 1}`}
          label={label}
          onSelect={(isChecked) => onCheck(isChecked, index)}
          selected={false}
        />
      ))}
      {validation ? <InputValidation state="error" validation={validation} /> : null}
    </>
  );
}

const baseStyles = StyleSheet.create({
  column: {
    flex: 1,
    flexGrow: 1,
  },
  infoText: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
    paddingVertical: grid.g24,
  },
  row: {
    flex: 1,
    flexGrow: 1,
  },
});
