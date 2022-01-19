import { Card, Tag } from '@covid/components';
import { FormFieldPlayback } from '@covid/components/inputsRedesigned/FormFieldPlayback';
import { GenericTextField } from '@covid/components/inputsRedesigned/GenericTextField';
import { MultiSelectField, TItemCheckbox } from '@covid/components/inputsRedesigned/MultiSelectField';
import { RadioInput } from '@covid/components/inputsRedesigned/RadioInput';
import { YesNoField } from '@covid/components/inputsRedesigned/YesNoField';
import i18n from '@covid/locale/i18n';
import { sizes } from '@covid/themes';
import { colors } from '@theme';
import { FormikProps } from 'formik';
import * as React from 'react';
import { KeyboardType, StyleProp, StyleSheet, TextInputProps, ViewStyle } from 'react-native';

export enum EFieldType {
  YesNo = 'YesNo',
  Text = 'Text',
  MultiSelect = 'MultiSelect',
  Radio = 'Radio',
  Custom = 'Custom',
}

type TItemRadio = {
  label: string;
  value: string;
};

interface ICommonProps {
  description?: string;
  isEditing: boolean;
  label: string;
  new?: boolean;
  testID?: string;
  style?: StyleProp<ViewStyle>;
}

type TFieldTypeProps =
  | {
      fieldType: EFieldType.Radio;
      error?: string;
      items: TItemRadio[];
      onValueChange: (value: any) => void;
      selectedValue: string;
      playbackValue: string;
    }
  | {
      fieldType: EFieldType.YesNo;
      error?: string;
      items?: never;
      onValueChange: (value: any) => void;
      selectedValue: string;
    }
  | {
      fieldType: EFieldType.Text;
      formikProps: FormikProps<any>;
      inputProps?: TextInputProps;
      items?: never;
      keyboardType?: KeyboardType;
      name: string;
      placeholder?: string;
      showError?: boolean;
    }
  | {
      fieldType: EFieldType.MultiSelect;
      error?: string;
      formikProps: FormikProps<any>;
      items: TItemCheckbox[];
      placeholder?: string;
      playbackValues: string[];
    }
  | {
      fieldType: EFieldType.Custom;
      component: React.ReactElement;
      playbackMultipleSelect: true;
      playbackValues: string[];
    }
  | {
      fieldType: EFieldType.Custom;
      component: React.ReactElement;
      playbackMultipleSelect?: false;
      playbackValue: string;
    };

type TProps = ICommonProps & TFieldTypeProps;

export default function HealthProfileQuestionCard(props: TProps) {
  function renderField() {
    switch (props.fieldType) {
      case EFieldType.YesNo:
        return (
          <YesNoField
            required
            description={props.description}
            error={props.error}
            label={props.label}
            onValueChange={props.onValueChange}
            selectedValue={props.selectedValue}
            testID={props.testID}
          />
        );
      case EFieldType.Text:
        return props.isEditing ? (
          <GenericTextField
            required
            showError
            formikProps={props.formikProps}
            inputProps={props.inputProps}
            keyboardType={props.keyboardType || 'default'}
            label={props.label}
            name={props.name}
            placeholder={props.placeholder}
            testID={props.testID}
          />
        ) : (
          <FormFieldPlayback
            required
            description={props.description}
            label={props.label}
            playbackValue={props.formikProps.values[props.name]}
            testID={props.testID}
          />
        );
      case EFieldType.MultiSelect:
        return props.isEditing ? (
          <MultiSelectField
            required
            error={props.error}
            formikProps={props.formikProps}
            items={props.items}
            label={props.label}
            testID={props.testID}
          />
        ) : (
          <FormFieldPlayback
            multiSelect
            required
            description={props.description}
            label={props.label}
            playbackValues={props.playbackValues}
            testID={props.testID}
          />
        );
      case EFieldType.Radio:
        return props.isEditing ? (
          <RadioInput
            required
            description={props.description}
            error={props.error}
            items={props.items}
            label={props.label}
            onValueChange={props.onValueChange}
            selectedValue={props.selectedValue}
            testID={props.testID}
          />
        ) : (
          <FormFieldPlayback
            required
            description={props.description}
            label={props.label}
            playbackValue={props.playbackValue}
            testID={props.testID}
          />
        );
      case EFieldType.Custom:
        return props.isEditing ? (
          props.component
        ) : props.playbackMultipleSelect ? (
          <FormFieldPlayback
            multiSelect
            required
            label={props.label}
            playbackValues={props.playbackValues}
            testID={props.testID}
          />
        ) : (
          <FormFieldPlayback label={props.label} playbackValue={props.playbackValue} testID={props.testID} />
        );

      default:
        return null;
    }
  }

  return (
    <Card useShadow padding={sizes.m} style={[styles.paddingVertical, props.style]}>
      {props.new ? <Tag color={colors.accent} style={styles.tag} text={i18n.t('new')} /> : null}
      {renderField()}
    </Card>
  );
}

const styles = StyleSheet.create({
  marginTop: {
    marginTop: sizes.xs,
  },
  paddingVertical: {
    paddingVertical: sizes.l,
  },
  tag: {
    alignSelf: 'flex-start',
    marginBottom: sizes.s,
  },
});
