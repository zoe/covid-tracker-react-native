import { colors } from '@tracer/branding/colors';
import { grid } from '@tracer/branding/grid';
import Column from '@tracer/components/atoms/Column';
import Row from '@tracer/components/atoms/Row';
import { FormikValues } from 'formik';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import Slider, { SliderOption } from '../../Slider';
import { InputValidation } from './validation';

interface IFormSliderQuestionProps {
  validation?: string;
  question: string;
  required?: boolean;
  options: SliderOption[];
  /* this property is dynamically added later if wrapped bt the Form organism component  */
  form?: FormikValues;
  handleChange?: (input: string) => void;
  name: string;
}

/**
 * FormSliderQuestion
 *
 * @param question input label text
 * @param required (optional) is input required, defaults to false
 * @param options slider options with label and value
 * @param validation input validation text
 * @param onChange input change handler
 */
export default function FormSliderQuestion({
  handleChange,
  name,
  question,
  options,
  required = false,
  validation,
  form,
}: IFormSliderQuestionProps) {
  if (handleChange) handleChange(name);

  const onSelect = (update: string | number) => {
    if (form) form[name] = update;
  };

  return (
    <Row style={baseStyles.view}>
      <Column>
        <Slider showLabels name={form ? form[name] : ''} onSelect={onSelect} options={options} title={question} />
        <View style={baseStyles.validationView}>
          {required && form && !form[name] && validation ? (
            <InputValidation state="error" validation={validation} />
          ) : null}
        </View>
      </Column>
    </Row>
  );
}

const baseStyles = StyleSheet.create({
  default: {},
  error: {
    borderColor: colors.tags.critical,
  },
  secondary: {
    color: colors.text.secondary,
    fontSize: grid.g12,
    textTransform: 'capitalize',
  },
  success: {
    borderColor: colors.tags.success,
  },
  validationView: {
    marginVertical: grid.g8,
  },
  view: {
    flex: 1,
  },
});
