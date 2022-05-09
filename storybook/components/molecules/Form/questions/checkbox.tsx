import { grid } from '@tracer/branding/grid';
import Column from '@tracer/components/atoms/Column';
import Checkbox, { ICheckboxProps } from '@tracer/components/atoms/Inputs/checkbox';
import Row from '@tracer/components/atoms/Row';
import { FormikValues } from 'formik';
import React from 'react';
import { StyleSheet, Text } from 'react-native';

import FormLabel from '../label';
import { InputValidation } from './validation';

interface IFormCheckboxQuestionProps {
  items: ICheckboxProps[];
  question: string;
  required: boolean;
  validation?: string;
  handleChange?: (id: string) => void;
  form: FormikValues;
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
    form[name] = items[index].label;
  };

  return (
    <Row style={baseStyles.view}>
      <Column>
        <FormLabel label={question} required={required} />
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
