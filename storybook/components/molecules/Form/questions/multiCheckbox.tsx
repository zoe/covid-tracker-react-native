import { grid } from '@tracer/branding/grid';
import Column from '@tracer/components/atoms/Column';
import Checkbox, { ICheckboxProps } from '@tracer/components/atoms/Inputs/checkbox';
import Row from '@tracer/components/atoms/Row';
import React, { ReactNode } from 'react';
import { AccessibilityRole, StyleProp, StyleSheet, Text, ViewStyle } from 'react-native';

import FormLabel from '../labels/question';
import { InputValidation } from './validation';

export interface IFormCheckboxItemProps {
  label: string;
  icon?: ReactNode;
  selected: boolean;
  id: string | number;
  style?: StyleProp<ViewStyle>;
  testID?: string;
  accessibilityRole?: AccessibilityRole;
}

interface IFormCheckboxQuestionProps {
  items: IFormCheckboxItemProps[];
  question?: string;
  required?: boolean;
  hideInfo?: boolean;
  validation?: string;
  handleChange: (field: string, value: any, shouldValidate?: boolean) => void;
  children?: any;
  name: string;
}

const FORM_CHECKBOX_ASSIST_TEXT = 'Check all that apply';

export const CheckboxInfoLabel = () => <Text style={baseStyles.infoText}>{FORM_CHECKBOX_ASSIST_TEXT}</Text>;

/**
 * FormCheckboxQuestion
 *
 * @param items checkbox options
 * @param question checkbox label text
 * @param required (optional) is checkbox required, defaults to false
 * @param validation checkbox validation text
 * @param handleChange checkbox change handler
 */
export default function FormCheckboxQuestion({
  items,
  question,
  validation,
  required = false,
  hideInfo = false,
  children,
  name,
  handleChange,
}: IFormCheckboxQuestionProps) {
  const onCheck = (isChecked: boolean, id: string | number | undefined) => {
    console.log(`selecting ${name}`, id);
    if (id) {
      handleChange(`${name}.${id}.state`, isChecked);
      handleChange(`${name}.${id}.display`, items.filter((item) => item.id === id)[0].label);
    }
  };

  return (
    <>
      {question ? <FormLabel label={question} required={required} /> : null}
      {!hideInfo ? <CheckboxInfoLabel /> : null}
      <Column>
        {items.map(({ id, label, icon }: ICheckboxProps, index: number) => (
          <Row style={{ marginVertical: grid.g4 }}>
            <Checkbox
              icon={icon}
              id={id}
              key={`form-checkbox-question-${name}-${index + 1}`}
              label={label}
              onSelect={onCheck}
              selected={false}
            />
          </Row>
        ))}
      </Column>
      {validation ? <InputValidation state="error" validation={validation} /> : null}
      {children}
    </>
  );
}

const baseStyles = StyleSheet.create({
  column: {
    flex: 1,
    flexGrow: 1,
  },
  infoText: {
    fontSize: 14,
    fontWeight: '300',
    lineHeight: 20,
  },
  row: {
    flex: 1,
    flexGrow: 1,
  },
});
