import { colors } from '@tracer/branding/colors';
import { grid } from '@tracer/branding/grid';
import Column from '@tracer/components/atoms/Column';
import InputText from '@tracer/components/atoms/Inputs/text';
import Row from '@tracer/components/atoms/Row';
import { FormikValues } from 'formik';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { InputError, InputSuccess, InputValidation, TInputState } from './validation';

interface IFormInputTextQuestionProps {
  validation: string;
  question: string;
  state: TInputState;
  placeholder: string;
  form: FormikValues;
  handleChange?: (input: string) => void;
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
 * @param onChange input change handler
 */
export default function FormInputTextQuestion({
  handleChange,
  name,
  question,
  placeholder,
  validation,
  form,
  state,
}: IFormInputTextQuestionProps) {
  const inputStateStyle = inputStyle(state);

  if (handleChange) handleChange(name);

  const onChange = (update: string) => {
    form[name] = update;
  };

  return (
    <Row style={baseStyles.view}>
      <Column>
        <InputText
          label={question}
          onValueChange={onChange}
          placeholder={placeholder}
          value={form[name]}
          viewStyle={inputStateStyle}
        >
          {state === 'error' ? <InputError /> : null}
          {state === 'success' ? <InputSuccess /> : null}
        </InputText>
        <View style={baseStyles.validationView}>
          <InputValidation state={state} validation={validation} />
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
