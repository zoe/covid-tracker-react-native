import { FormikProps } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import { StyleSheet, View } from 'react-native';

import i18n from '@covid/locale/i18n';
import { CovidTest } from '@covid/core/user/dto/CovidTestContracts';
import { DietStudyRequest } from '@covid/core/diet-study/dto/DietStudyRequest';
import { RegularText } from '@covid/components/Text';
import { FieldWrapper } from '@covid/components/Screen';
import { FormQuestion } from '@covid/components/Inputs/FormQuestion.interface';
import { ValidatedTextInput } from '@covid/components/ValidatedTextInput';

export interface FruitNVegConsumptionData {
  portions_of_fruit: number | null;
  glasses_of_juice: number | null;
  portions_of_veg: number | null;
}

type Keys = keyof FruitNVegConsumptionData;

interface Props {
  formikProps: FormikProps<FruitNVegConsumptionData>;
}

interface InputProps {
  label: string;
  placeholder: string;
  fieldKey: Keys;
  formikProps: FormikProps<FruitNVegConsumptionData>;
}

const Input: React.FC<InputProps> = ({ label, placeholder, fieldKey, formikProps }) => (
  <FieldWrapper style={styles.fieldWrapper}>
    <RegularText>{label}</RegularText>
    <View style={{}}>
      <ValidatedTextInput
        placeholder={placeholder}
        value={formikProps.values[fieldKey] ? `${formikProps.values[fieldKey]}` : ''}
        onChangeText={formikProps.handleChange(fieldKey)}
        onBlur={formikProps.handleBlur(fieldKey)}
        error={formikProps.touched[fieldKey] && formikProps.errors[fieldKey]}
        returnKeyType="next"
        onSubmitEditing={() => {}}
        keyboardType="numeric"
      />
    </View>
  </FieldWrapper>
);

export const FruitNVegConsumptionQuestions: FormQuestion<Props, FruitNVegConsumptionData, CovidTest> = (
  props: Props
) => {
  const { formikProps } = props;

  const input = (key: keyof FruitNVegConsumptionData): InputProps => ({
    label: i18n.t(`diet-study.typical-diet.${key}-label`),
    placeholder: i18n.t(`diet-study.typical-diet.${key}-placeholder`),
    fieldKey: key,
    formikProps,
  });

  const inputs = (): InputProps[] => [input('portions_of_fruit'), input('glasses_of_juice'), input('portions_of_veg')];

  return (
    <>
      {inputs().map((input) => {
        const key = input.fieldKey as Keys;
        return <Input key={key} {...input} />;
      })}
    </>
  );
};

FruitNVegConsumptionQuestions.initialFormValues = (): FruitNVegConsumptionData => {
  return {
    portions_of_fruit: null,
    glasses_of_juice: null,
    portions_of_veg: null,
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
  },

  inputField: {},

  textItemStyle: {
    borderColor: 'transparent',
  },
});
