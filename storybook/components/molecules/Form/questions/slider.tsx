import { colors } from '@tracer/branding/colors';
import { grid } from '@tracer/branding/grid';
import Column from '@tracer/components/atoms/Column';
import Row from '@tracer/components/atoms/Row';
import React, { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import Slider, { SliderOption } from '../../Slider';
import { InputValidation } from './validation';

interface IFormSliderQuestionProps {
  name: string;
  title: ReactNode;
  options: SliderOption[];
  handleChange: (field: string, value: any, shouldValidate?: boolean) => void;
  required?: boolean;
  validation?: string;
}

/**
 * FormSliderQuestion
 *
 * @param name unique identifier for question in form values
 * @param title input label text
 * @param options slider options with label and value
 * @param handleChange input change handler
 * @param required (optional) is input required, defaults to false
 * @param validation (optional) input validation text
 */
export default function FormSliderQuestion({
  handleChange,
  name,
  title,
  options,
  required = false,
  validation,
}: IFormSliderQuestionProps) {
  const onSelect = (update: string | number) => {
    handleChange(name, { value: update });
  };

  return (
    <Row style={baseStyles.view}>
      <Column>
        <Slider name={name} onSelect={onSelect} options={options} title={title} />
        <View style={baseStyles.validationView}>
          {required && validation ? <InputValidation state="error" validation={validation} /> : null}
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
    flexGrow: 1,
  },
});
