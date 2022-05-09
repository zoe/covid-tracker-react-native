import { IButtonProps } from '@tracer/components/atoms/Button';
import Column from '@tracer/components/atoms/Column';
import Row from '@tracer/components/atoms/Row';
import ButtonGroup from '@tracer/components/molecules/Button/group';
import { FormikValues } from 'formik';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';

import FormLabel from '../label';
import { InputValidation } from './validation';

interface IFormButtonQuestionProps {
  validation?: string;
  label: string;
  required?: boolean;
  buttons: IButtonProps[];
  form: FormikValues;
  handleChange?: (id: string) => void;
  name: string;
}

/**
 * FormButtonQuestion
 *
 * @param label button label text
 * @param required (optional) is button selection required, defaults to false
 * @param validation (optional) button validation text
 * @param buttons buttons to display in group
 * @param onChange button click change handler
 */
export default function FormButtonQuestion({
  handleChange,
  label,
  buttons,
  validation,
  form,
  name,
  required = false,
}: IFormButtonQuestionProps) {
  if (handleChange) handleChange(name);
  const [value, setValue] = useState(-1);

  const onChange = (activeButton: number) => {
    setValue(activeButton);
    form[name] = buttons[activeButton].text;
  };

  return (
    <Row style={baseStyles.view}>
      <Column>
        <FormLabel label={label} required={required} />
        <ButtonGroup active={value} buttonProps={buttons} onChange={onChange} />
        {validation ? <InputValidation state="error" validation={validation} /> : null}
      </Column>
    </Row>
  );
}

const baseStyles = StyleSheet.create({
  view: {
    flex: 1,
  },
});
