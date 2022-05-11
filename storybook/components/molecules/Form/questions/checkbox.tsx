import { grid } from '@tracer/branding/grid';
import Column from '@tracer/components/atoms/Column';
import Checkbox from '@tracer/components/atoms/Inputs/checkbox';
import Row from '@tracer/components/atoms/Row';
import { FormikValues } from 'formik';
import React, { ReactNode } from 'react';
import { AccessibilityRole, StyleProp, StyleSheet, Text, ViewStyle } from 'react-native';

import FormLabel from '../label';
import { InputValidation } from './validation';

export interface IFormCheckboxItemProps {
  label: string;
  children?: ReactNode;
  selected: boolean;
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
 * @param onChange checkbox change handler
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
    if (form) form[name] = items[index].label;
  };

  return (
    <Row style={baseStyles.view}>
      <Column>
        {question ? <FormLabel label={question} required={required} /> : null}
        <Text style={baseStyles.infoText}>{FORM_CHECKBOX_ASSIST_TEXT}</Text>
        {items.map((props, index) => (
          <Checkbox
            key={`form-checkbox-question-${name}-${index + 1}`}
            {...props}
            onSelect={(isChecked) => onCheck(isChecked, index)}
            selected={false}
          />
        ))}
        {validation ? <InputValidation state="error" validation={validation} /> : null}
      </Column>
    </Row>
  );
}

const baseStyles = StyleSheet.create({
  infoText: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
    paddingVertical: grid.g24,
  },
  view: {
    flex: 1,
  },
});
