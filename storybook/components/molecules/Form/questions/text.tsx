import { colors } from '@tracer/branding/colors';
import { grid } from '@tracer/branding/grid';
import InputText from '@tracer/components/atoms/Inputs/text';
import Row from '@tracer/components/atoms/Row';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { InputValidation, TInputState } from './validation';

interface IFormInputTextQuestionProps {
  validation?: string;
  question?: string;
  state?: TInputState;
  multiline?: boolean;
  placeholder?: string;
  handleChange: (field: string, value: string, shouldValidate?: boolean) => void;
  name: string;
}

const inputStyle = (state: TInputState) => {
  if (state === 'error') return baseStyles.error;
  if (state === 'success') return baseStyles.success;
  return baseStyles.default;
};

/**
 * FormInputTextQuestion
 *
 * @param question input label text
 * @param required (optional) is input required, defaults to false
 * @param validation input validation text
 * @param placeholder input placeholder text
 * @param handleChange input change handler
 */
export default function FormInputTextQuestion({
  handleChange,
  name,
  multiline,
  question = '',
  placeholder = 'Please describe',
  validation = '',
  state = 'default',
}: IFormInputTextQuestionProps) {
  const inputStateStyle = inputStyle(state);

  const onChange = (update: string) => {
    handleChange(name, update);
  };

  return (
    <Row style={[baseStyles.view]}>
      <InputText
        label={question}
        onValueChange={onChange}
        placeholder={placeholder}
        value=""
        viewStyle={inputStateStyle}
      >
        {/* {state === 'error' ? <InputError /> : null} */}
        {/* {state === 'success' ? <InputSuccess /> : null} */}
      </InputText>
      <View style={baseStyles.validationView}>
        {validation && validation.length > 0 ? <InputValidation state={state} validation={validation} /> : null}
      </View>
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
    flexGrow: 1,
  },
});
