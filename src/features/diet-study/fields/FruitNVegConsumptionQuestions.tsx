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
  error?: any;
  formikProps: FormikProps<FruitNVegConsumptionData>;
}

const Dropdown: React.FC<DropdownProps> = ({ label, items, selectedValue, fieldKey, error, formikProps }) => (
  <FieldWrapper style={styles.fieldWrapper}>
    <RegularText>{label}</RegularText>
    <View style={styles.fieldRow}>
      <DropdownField
        onlyPicker
        selectedValue={selectedValue}
        onValueChange={formikProps.handleChange(fieldKey)}
        items={items}
        error={error}
      />
    </View>
  </FieldWrapper>
);

type Keys = keyof FruitNVegConsumptionData;

export const FruitNVegConsumptionQuestions: FormQuestion<Props, FruitNVegConsumptionData, CovidTest> = (
  props: Props
) => {
  const { formikProps } = props;

  const items = [{ label: 'Empty', value: '1' }];

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
      {dropdowns().map((dropdown) => {
        const key = dropdown.fieldKey as Keys;
        return <Dropdown key={key} error={formikProps.touched[key] && formikProps.errors[key]} {...dropdown} />;
      })}
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
  return Yup.object().shape({
    portions_of_fruit: Yup.number().required(),
    glasses_of_juice: Yup.number().required(),
    portions_of_veg: Yup.number().required(),
  });
};

FruitNVegConsumptionQuestions.createDTO = (formData: FruitNVegConsumptionData): Partial<DietStudyRequest> => {
  const { portions_of_fruit, glasses_of_juice, portions_of_veg } = formData;

  return {
    portions_of_fruit,
    glasses_of_juice,
    portions_of_veg,
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
