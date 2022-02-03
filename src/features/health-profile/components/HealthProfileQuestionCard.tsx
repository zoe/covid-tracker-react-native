import { Card, Tag } from '@covid/components';
import { TimeField } from '@covid/components/inputs/TimeField';
import { FormFieldPlayback } from '@covid/components/inputsRedesigned/FormFieldPlayback';
import { GenericTextField } from '@covid/components/inputsRedesigned/GenericTextField';
import { MultiSelectField, TItemCheckbox } from '@covid/components/inputsRedesigned/MultiSelectField';
import { RadioInput } from '@covid/components/inputsRedesigned/RadioInput';
import { YesNoField } from '@covid/components/inputsRedesigned/YesNoField';
import { HeightQuestion, IHeightData } from '@covid/features/patient/fields/HeightQuestion';
import { ImmunodeficiencyQuestion } from '@covid/features/patient/fields/ImmunodeficiencyQuestion';
import { IWeightData, WeightQuestion } from '@covid/features/patient/fields/WeightQuestion';
import i18n from '@covid/locale/i18n';
import { sizes } from '@covid/themes';
import { colors } from '@theme';
import { FormikProps } from 'formik';
import * as React from 'react';
import { KeyboardType, StyleProp, StyleSheet, ViewStyle } from 'react-native';

export enum EFieldType {
  HEIGHT = 'Height',
  IMMUNODEFICIENCY = 'Immunodeficiency',
  MULTISELECT = 'MultiSelect',
  POSTCODE = 'Postcode',
  RADIO = 'Radio',
  TEXT = 'Text',
  TIME = 'Time',
  WEIGHT = 'Weight',
  YESNO = 'YesNo',
}

export enum EHealthProfileQuestionCardStatus {
  EDIT_ANSWER = 'editAnswer',
  NOT_ANSWERED = 'notAnswered',
  PLAYBACK = 'playback',
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
  keyboardType?: KeyboardType;
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
      showPnts: boolean;
    }
  | {
      fieldType: EFieldType.YESNO;
      items: null;
      propertyName: string;
      showPnts: boolean;
    }
  | {
      fieldType: EFieldType.TEXT;
      items: null;
      propertyName: string;
      showPnts: boolean;
    }
  | {
      fieldType: EFieldType.MULTISELECT;
      items: TItemCheckbox[];
      propertyName: string;
      showPnts: boolean;
    }
  | {
      fieldType: EFieldType.WEIGHT;
      items: null;
      propertyName: null;
      showPnts: boolean;
    }
  | {
      fieldType: EFieldType.TIME;
      items: null;
      propertyName: string;
    }
  | {
      fieldType: EFieldType.HEIGHT;
      items: null;
      propertyName: null;
      showPnts: boolean;
    }
  | {
      fieldType: EFieldType.POSTCODE;
      items: null;
      propertyName: string;
      showPnts: boolean;
    }
  | {
      fieldType: EFieldType.IMMUNODEFICIENCY;
      items: TItemCheckbox[];
      propertyName: string;
      showPnts: boolean;
    };

type TProps = TCommonProps & TFieldTypeProps;

export default function HealthProfileQuestionCard(props: TProps) {
  function renderField() {
    switch (props.fieldType) {
      case EFieldType.TIME:
        if (props.isEditing) {
          return (
            <TimeField
              required
              label={props.label}
              onValueChange={props.formikProps.handleChange(props.propertyName)}
              testID={props.testID}
              value={props.formikProps.values[props.propertyName]}
            />
          );
        }
        let value = Number.parseInt(props.formikProps.values[props.propertyName], 10);
        if (Number.isNaN(value) || value < 0) {
          value = 0;
        }
        const hours = Math.floor(value / 60);
        const minutes = value % 60;
        const playbackValue = `${hours}hrs ${minutes}min`;
        return (
          <FormFieldPlayback
            required
            editOnPress={props.editOnPress}
            label={props.label}
            playbackValue={playbackValue}
            testID={props.testID}
          />
        );
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
            showPnts={props.showPnts}
            testID={props.testID}
          />
        );
      case EFieldType.TEXT:
        return props.isEditing ? (
          <GenericTextField
            required
            // If we want to show errors immediately, uncomment below
            // showError
            formikProps={props.formikProps}
            keyboardType={props.keyboardType || 'default'}
            label={props.label}
            name={props.propertyName}
            placeholder={props.placeholder || ''}
            showPnts={props.showPnts}
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
      case EFieldType.IMMUNODEFICIENCY:
        return props.isEditing ? (
          <ImmunodeficiencyQuestion
            formikProps={props.formikProps}
            items={props.items}
            label={props.label}
            propertyName={props.propertyName}
            selectedValue={props.formikProps.values[props.propertyName]}
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
