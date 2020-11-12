import { FormikProps } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import { StyleSheet, View } from 'react-native';

import i18n from '@covid/locale/i18n';
import { CovidTest } from '@covid/core/user/dto/CovidTestContracts';
import { DietStudyRequest } from '@covid/core/diet-study/dto/DietStudyRequest';
import { RegularText } from '@covid/components/Text';
import { FieldWrapper } from '@covid/components/Screen';
import DropdownField from '@covid/components/DropdownField';

export interface EatingWindowData {
  startHour: string;
  startMinute: string;
  startMeridianIndicator: string;
  endHour: string;
  endMinute: string;
  endMeridianIndicator: string;
}

interface Props {
  formikProps: FormikProps<EatingWindowData>;
}

export interface EatingWindowQuestions<P, Data> extends React.FC<P> {
  initialFormValues: () => Data;
  schema: () => Yup.ObjectSchema;
  createDTO: (data: Data) => Partial<CovidTest>;
}

export const EatingWindowQuestions: EatingWindowQuestions<Props, EatingWindowData> = (props: Props) => {
  const { formikProps } = props;

  const hourItems = [
    { label: '1', value: '01' },
    { label: '2', value: '02' },
    { label: '3', value: '03' },
    { label: '4', value: '04' },
    { label: '5', value: '05' },
    { label: '6', value: '06' },
    { label: '7', value: '07' },
    { label: '8', value: '08' },
    { label: '9', value: '09' },
    { label: '10', value: '10' },
    { label: '11', value: '11' },
    { label: '12', value: '12' },
  ];

  const minItems = [
    { label: '00', value: '00' },
    { label: '15', value: '15' },
    { label: '30', value: '30' },
    { label: '45', value: '45' },
  ];

  const meridianIndicatorItems = [
    { label: 'am', value: 'AM' },
    { label: 'pm', value: 'PM' },
  ];

  return (
    <>
      <FieldWrapper style={styles.fieldWrapper}>
        <RegularText>{i18n.t('diet-study.first-calories-label')}</RegularText>

        <View style={styles.fieldRow}>
          <View style={styles.leftField}>
            <DropdownField
              onlyPicker
              selectedValue={formikProps.values.startHour}
              onValueChange={formikProps.handleChange('startHour')}
              items={hourItems}
            />
          </View>
          <View style={styles.middleField}>
            <DropdownField
              onlyPicker
              selectedValue={formikProps.values.startMinute}
              onValueChange={formikProps.handleChange('startMinute')}
              items={minItems}
            />
          </View>
          <View style={styles.rightField}>
            <DropdownField
              onlyPicker
              selectedValue={formikProps.values.startMeridianIndicator}
              onValueChange={formikProps.handleChange('startMeridianIndicator')}
              items={meridianIndicatorItems}
            />
          </View>
        </View>
      </FieldWrapper>

      <FieldWrapper style={styles.fieldWrapper}>
        <RegularText>{i18n.t('diet-study.last-calories-label')}</RegularText>

        <View style={styles.fieldRow}>
          <View style={styles.leftField}>
            <DropdownField
              onlyPicker
              selectedValue={formikProps.values.endHour}
              onValueChange={formikProps.handleChange('endHour')}
              items={hourItems}
            />
          </View>
          <View style={styles.middleField}>
            <DropdownField
              onlyPicker
              selectedValue={formikProps.values.endMinute}
              onValueChange={formikProps.handleChange('endMinute')}
              items={minItems}
            />
          </View>
          <View style={styles.rightField}>
            <DropdownField
              onlyPicker
              selectedValue={formikProps.values.endMeridianIndicator}
              onValueChange={formikProps.handleChange('endMeridianIndicator')}
              items={meridianIndicatorItems}
            />
          </View>
        </View>
      </FieldWrapper>
    </>
  );
};

EatingWindowQuestions.initialFormValues = (): EatingWindowData => {
  return {
    startHour: '08',
    startMinute: '00',
    startMeridianIndicator: 'AM',
    endHour: '09',
    endMinute: '00',
    endMeridianIndicator: 'PM',
  };
};

EatingWindowQuestions.schema = () => {
  return Yup.object().shape({});
};

EatingWindowQuestions.createDTO = (formData: EatingWindowData): Partial<DietStudyRequest> => {
  function convertTo24(hours: string) {
    const n = (parseInt(hours, 10) + 12) % 24;
    return n.toString();
  }

  function toTime(hours: string, mins: string, meridianIndicator: string): string {
    const hours24 = meridianIndicator === 'PM' ? convertTo24(hours) : hours;
    return `${hours24}:${mins}`;
  }

  return {
    first_calories: toTime(formData.startHour, formData.startMinute, formData.startMeridianIndicator),
    last_calories: toTime(formData.endHour, formData.endMinute, formData.endMeridianIndicator),
  } as Partial<DietStudyRequest>;
};

const styles = StyleSheet.create({
  fieldWrapper: {
    flex: 1,
  },

  fieldRow: {
    flexDirection: 'row',
  },

  leftField: {
    flex: 2,
    marginRight: 4,
  },
  middleField: {
    flex: 2,
    marginHorizontal: 4,
  },
  rightField: {
    flex: 2,
    marginLeft: 4,
  },
});
