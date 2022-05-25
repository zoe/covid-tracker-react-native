import { grid } from '@tracer/branding/grid';
import Column from '@tracer/components/atoms/Column';
import Radio from '@tracer/components/atoms/Inputs/radio';
import Row from '@tracer/components/atoms/Row';
import React, { useState } from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';

import FormLabel from '../labels/question';
import { InputValidation } from './validation';

export interface IFormRadioItemProps {
  value: string;
  label: string;
  selected: boolean;
}

interface IFormRadioQuestionProps {
  items: IFormRadioItemProps[];
  question?: string;
  required?: boolean;
  validation?: string;
  labelStyle?: StyleProp<ViewStyle>;
  flow?: boolean;
  handleChange: (field: string, value: any, shouldValidate?: boolean) => void;
  name: string;
}

/**
 * FormRadioQuestion
 *
 * @param items radio options
 * @param question (optional) radio label text
 * @param required (optional) radio required, defaults to false
 * @param validation (optional) radio validation text
 * @param handleChange radio change handler
 */
export default function FormRadioQuestion({
  handleChange,
  name,
  items,
  question,
  labelStyle,
  validation,
  flow,
  required = false,
}: IFormRadioQuestionProps) {
  const [active, setActive] = useState(-1);
  const onSelect = (index: number) => {
    setActive(index);
    if (flow) {
      handleChange(`${name}.value`, items[index].value);
      handleChange(`${name}.display`, items[index].label);
      return;
    }
    handleChange(name, index);
  };

  return (
    <Row style={baseStyles.view}>
      <Column>
        {question ? <FormLabel label={question} required={required} /> : null}
        <Column style={baseStyles.radioGroupView}>
          {items.map((props, index) => (
            <Row key={`radio-group-${index + 1}`} style={baseStyles.radioRowView}>
              <Radio {...props} labelStyle={labelStyle} onSelect={() => onSelect(index)} selected={active === index} />
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
