import { grid } from '@tracer/branding/grid';
import Column from '@tracer/components/atoms/Column';
import Radio from '@tracer/components/atoms/Inputs/radio';
import Row from '@tracer/components/atoms/Row';
import { FormikValues } from 'formik';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';

import FormLabel from '../label';
import { InputValidation } from './validation';

export interface IFormRadioItemProps {
  label: string;
  selected: boolean;
}

interface IFormRadioQuestionProps {
  items: IFormRadioItemProps[];
  question?: string;
  required?: boolean;
  validation?: string;
  handleChange?: (id: string) => void;
  /* this property is dynamically added later if wrapped bt the Form organism component  */
  form?: FormikValues;
  name: string;
}

/**
 * FormRadioQuestion
 *
 * @param items radio options
 * @param question radio label text
 * @param required (optional) is radio required, defaults to false
 * @param validation radio validation text
 * @param onChange radio change handler
 */
export default function FormRadioQuestion({
  handleChange,
  name,
  items,
  question,
  form,
  validation,
  required = false,
}: IFormRadioQuestionProps) {
  const [active, setActive] = useState(-1);
  if (handleChange) handleChange(name);

  const onSelect = (index: number) => {
    setActive(index);
    if (form) form[name] = items[index].label;
  };

  return (
    <Row style={baseStyles.view}>
      <Column>
        {question ? <FormLabel label={question} required={required} /> : null}
        <Column style={baseStyles.radioGroupView}>
          {items.map((props, index) => (
            <Row key={`radio-group-${index + 1}`} style={baseStyles.radioRowView}>
              <Radio {...props} onSelect={() => onSelect(index)} selected={active === index} />
            </Row>
          ))}
        </Column>
        {validation ? <InputValidation state="error" validation={validation} /> : null}
      </Column>
    </Row>
  );
}

const baseStyles = StyleSheet.create({
  radioGroupView: {
    paddingVertical: grid.g16,
  },

  radioRowView: {
    marginBottom: grid.g16,
  },
  view: {
    flex: 1,
  },
});
