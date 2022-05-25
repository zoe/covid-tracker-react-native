import { colors } from '@tracer/branding/colors';
import { grid } from '@tracer/branding/grid';
import Column from '@tracer/components/atoms/Column';
import InputText from '@tracer/components/atoms/Inputs/text';
import Row from '@tracer/components/atoms/Row';
import React from 'react';
import { StyleSheet } from 'react-native';

import { InputError, InputSuccess, InputValidation, TInputState } from './validation';

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
    <Column style={[{ flex: 1, flexGrow: 1 }]}>
      <Row style={[baseStyles.view]}>
        <InputText
          label={question}
          onValueChange={onChange}
          placeholder={placeholder}
          value=""
          viewStyle={inputStateStyle}
        >
          {state === 'error' ? <InputError style={baseStyles.inputStateOffset} /> : null}
          {state === 'success' ? <InputSuccess style={baseStyles.inputStateOffset} /> : null}
        </InputText>
      </Row>
      <Row style={baseStyles.validationView}>
        {validation && validation.length > 0 ? <InputValidation state={state} validation={validation} /> : null}
      </Row>
    </Column>
  );
}

const baseStyles = StyleSheet.create({
  default: {},
  error: {
    borderColor: colors.tags.critical,
  },
  inputStateOffset: {
    marginTop: -44,
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
