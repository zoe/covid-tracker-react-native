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
import { FormQuestion } from '@covid/components/Inputs/FormQuestion.interface';

export interface FruitNVegConsumptionData {
  portions_of_fruit: number;
  glasses_of_juice: number;
  portions_of_veg: number;
}

interface Props {
  formikProps: FormikProps<FruitNVegConsumptionData>;
}

interface CheckBoxData {
  label: string;
  value: string;
}

interface DropdownProps {
  label: string;
  items: CheckBoxData[];
  selectedValue?: any;
  fieldKey: string;
  formikProps: FormikProps<FruitNVegConsumptionData>;
}

const Dropdown: React.FC<DropdownProps> = ({ label, items, selectedValue, fieldKey, formikProps }) => (
  <FieldWrapper style={styles.fieldWrapper}>
    <RegularText>{label}</RegularText>
    <View style={styles.fieldRow}>
      <DropdownField
        onlyPicker
        selectedValue={selectedValue}
        onValueChange={formikProps.handleChange(fieldKey)}
        items={items}
      />
    </View>
  </FieldWrapper>
);

export const FruitNVegConsumptionQuestions: FormQuestion<Props, FruitNVegConsumptionData, CovidTest> = (
  props: Props
) => {
  const { formikProps } = props;

  const items = [{ label: 'Empty', value: '0' }];

  const dropdown = (key: keyof FruitNVegConsumptionData): DropdownProps => ({
    label: i18n.t(`diet-study.typical-diet.${key}-label`),
    items,
    selectedValue: formikProps.values[key],
    fieldKey: key,
    formikProps,
  });

  const dropdowns = (): DropdownProps[] => [
    dropdown('portions_of_fruit'),
    dropdown('glasses_of_juice'),
    dropdown('portions_of_veg'),
  ];

  return (
    <>
      {dropdowns().map((dropdown) => (
        <Dropdown {...dropdown} />
      ))}
    </>
  );
};

FruitNVegConsumptionQuestions.initialFormValues = (): FruitNVegConsumptionData => {
  return {
    portions_of_fruit: 0,
    glasses_of_juice: 0,
    portions_of_veg: 0,
  };
};

FruitNVegConsumptionQuestions.schema = () => {
  return Yup.object().shape({});
};

FruitNVegConsumptionQuestions.createDTO = (formData: FruitNVegConsumptionData): Partial<DietStudyRequest> => {
  return {
    // first_calories: toTime(formData.startHour, formData.startMinute, formData.startMeridianIndicator),
    // last_calories: toTime(formData.endHour, formData.endMinute, formData.endMeridianIndicator),
  } as Partial<DietStudyRequest>;
};

const styles = StyleSheet.create({
  fieldWrapper: {
    flex: 1,
    marginHorizontal: 16,
  },

  fieldRow: {
    flexDirection: 'row',
    margin: -16,
    marginVertical: 0,
  },

  textItemStyle: {
    borderColor: 'transparent',
  },
});
