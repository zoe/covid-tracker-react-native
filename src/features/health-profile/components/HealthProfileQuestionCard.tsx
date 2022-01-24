import { Card, Tag } from '@covid/components';
import { FormFieldPlayback } from '@covid/components/inputsRedesigned/FormFieldPlayback';
import { GenericTextField } from '@covid/components/inputsRedesigned/GenericTextField';
import { MultiSelectField, TItemCheckbox } from '@covid/components/inputsRedesigned/MultiSelectField';
import { RadioInput } from '@covid/components/inputsRedesigned/RadioInput';
import { YesNoField } from '@covid/components/inputsRedesigned/YesNoField';
import { HeightQuestion, IHeightData } from '@covid/features/patient/fields/HeightQuestion';
import { IWeightData, WeightQuestion } from '@covid/features/patient/fields/WeightQuestion';
import i18n from '@covid/locale/i18n';
import { sizes } from '@covid/themes';
import { colors } from '@theme';
import { FormikProps } from 'formik';
import * as React from 'react';
import { KeyboardType, StyleProp, StyleSheet, ViewStyle } from 'react-native';

export enum EFieldType {
  YESNO = 'YesNo',
  TEXT = 'Text',
  MULTISELECT = 'MultiSelect',
  RADIO = 'Radio',
  WEIGHT = 'Weight',
  HEIGHT = 'Height',
  POSTCODE = 'Postcode',
}

export type TItemRadio = {
  label: string;
  value: string;
};

type TCommonProps = {
  description: string | null;
  editOnPress: () => void;
  formikProps: FormikProps<any>;
  isEditing: boolean;
  keyboardType: KeyboardType | null;
  label: string;
  new: boolean;
  placeholder: string | null;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

type TFieldTypeProps =
  | {
      fieldType: EFieldType.RADIO;
      items: TItemRadio[];
      propertyName: string;
    }
  | {
      fieldType: EFieldType.YESNO;
      items: null;
      propertyName: string;
    }
  | {
      fieldType: EFieldType.TEXT;
      items: null;
      propertyName: string;
    }
  | {
      fieldType: EFieldType.MULTISELECT;
      items: TItemCheckbox[];
      propertyName: string;
    }
  | {
      fieldType: EFieldType.WEIGHT;
      items: null;
      propertyName: null;
    }
  | {
      fieldType: EFieldType.HEIGHT;
      items: null;
      propertyName: null;
    }
  | {
      fieldType: EFieldType.POSTCODE;
      items: null;
      propertyName: string;
    };

type TProps = TCommonProps & TFieldTypeProps;

export default function HealthProfileQuestionCard(props: TProps) {
  function renderField() {
    switch (props.fieldType) {
      case EFieldType.YESNO:
        return (
          <YesNoField
            required
            description={props.description}
            // If we want to show errors immediately, uncomment below
            // error={(props.formikProps.errors[props.propertyName] as string) || ''}
            label={props.label}
            onValueChange={props.formikProps.handleChange(props.propertyName)}
            selectedValue={props.formikProps.values[props.propertyName]}
            testID={props.testID}
          />
        );
      case EFieldType.TEXT:
        return props.isEditing ? (
          <GenericTextField
            required
            showError
            formikProps={props.formikProps}
            keyboardType={props.keyboardType || 'default'}
            label={props.label}
            name={props.propertyName}
            placeholder={props.placeholder || ''}
            testID={props.testID}
          />
        ) : (
          <FormFieldPlayback
            required
            description={props.description}
            editOnPress={props.editOnPress}
            label={props.label}
            playbackValue={props.formikProps.values[props.propertyName]}
            testID={props.testID}
          />
        );
      case EFieldType.MULTISELECT:
        return props.isEditing ? (
          <MultiSelectField
            required
            // error={(props.formikProps.errors[props.propertyName] as string) || ''}
            formikProps={props.formikProps}
            items={props.items}
            label={props.label}
            propertyName={props.propertyName}
            selectedValue={props.formikProps.values[props.propertyName]}
            testID={props.testID}
          />
        ) : (
          <FormFieldPlayback
            multiSelect
            required
            description={props.description}
            editOnPress={props.editOnPress}
            label={props.label}
            playbackValues={
              props.items
                .filter((item) => props.formikProps.values[item.name] === true)
                .map((answer) => answer.label) || ''
            }
            testID={props.testID}
          />
        );
      case EFieldType.RADIO:
        return props.isEditing ? (
          <RadioInput
            required
            description={props.description}
            // error={(props.formikProps.errors[props.propertyName] as string) || ''}
            items={props.items}
            label={props.label}
            onValueChange={props.formikProps.handleChange(props.propertyName)}
            selectedValue={props.formikProps.values[props.propertyName]}
            testID={props.testID}
          />
        ) : (
          <FormFieldPlayback
            required
            description={props.description}
            editOnPress={props.editOnPress}
            label={props.label}
            playbackValue={
              props.items.find((item) => item.value === props.formikProps.values[props.propertyName])?.label || ''
            }
            testID={props.testID}
          />
        );
      case EFieldType.WEIGHT:
        return props.isEditing ? (
          <WeightQuestion
            redesign
            formikProps={props.formikProps as unknown as FormikProps<IWeightData>}
            label={props.label}
          />
        ) : (
          <FormFieldPlayback
            editOnPress={props.editOnPress}
            label={props.label}
            playbackValue={
              props.formikProps.values.weightUnit === 'kg'
                ? props.formikProps.values.weight + props.formikProps.values.weightUnit
                : props.formikProps.values.stones + 'st ' + props.formikProps.values.pounds + 'lbs'
            }
            testID={props.testID}
          />
        );
      case EFieldType.HEIGHT:
        return props.isEditing ? (
          <HeightQuestion
            redesign
            formikProps={props.formikProps as unknown as FormikProps<IHeightData>}
            label={props.label}
          />
        ) : (
          <FormFieldPlayback
            editOnPress={props.editOnPress}
            label={props.label}
            playbackValue={
              props.formikProps.values.heightUnit === 'cm'
                ? props.formikProps.values.height + props.formikProps.values.heightUnit
                : props.formikProps.values.feet + 'ft ' + props.formikProps.values.inches + 'in'
            }
            testID={props.testID}
          />
        );
      case EFieldType.POSTCODE:
        return props.isEditing ? (
          <GenericTextField
            required
            showError
            formikProps={props.formikProps}
            inputProps={{ autoCompleteType: 'postal-code' }}
            keyboardType="default"
            label={props.label}
            name={props.propertyName}
            placeholder={props.placeholder || ''}
            testID={props.testID}
          />
        ) : (
          <FormFieldPlayback
            required
            editOnPress={props.editOnPress}
            label={props.label}
            playbackValue={props.formikProps.values[props.propertyName]}
            testID={props.testID}
          />
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
