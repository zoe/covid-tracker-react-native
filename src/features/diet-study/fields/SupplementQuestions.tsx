import { FormikProps } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import { Item } from 'native-base';
import { StyleSheet, View } from 'react-native';

import i18n from '@covid/locale/i18n';
import { CovidTest } from '@covid/core/user/dto/CovidTestContracts';
import { DietStudyRequest } from '@covid/core/diet-study/dto/DietStudyRequest';
import { FieldLabel } from '@covid/components/Text';
import { FieldWrapper } from '@covid/components/Screen';
import YesNoField from '@covid/components/YesNoField';
import { CheckboxItem, CheckboxList } from '@covid/components/Checkbox';
import { GenericTextField } from '@covid/components/GenericTextField';

export interface SupplementData {
  takesSupplements: string;
  supplements: string[];
  supplements_other: string;
}

interface Props {
  formikProps: FormikProps<SupplementData>;
}

export interface SupplementQuestions<P, Data> extends React.FC<P> {
  initialFormValues: () => Data;
  schema: () => Yup.ObjectSchema;
  createDTO: (data: Data) => Partial<CovidTest>;
}

type SupplementCheckBoxData = {
  label: string;
  value: string;
};

const createSupplementCheckboxes = (data: SupplementCheckBoxData[], props: FormikProps<SupplementData>) => {
  return data.map((checkBoxData) => {
    return (
      <CheckboxItem
        key={checkBoxData.value}
        value={props.values.supplements.includes(checkBoxData.value)}
        onChange={(checked: boolean) => {
          let supplementArray = props.values.supplements;
          if (checked) {
            supplementArray.push(checkBoxData.value);
          } else {
            supplementArray = supplementArray.filter((val) => val !== checkBoxData.value);
          }
          props.setFieldValue('supplements', supplementArray);
        }}>
        {checkBoxData.label}
      </CheckboxItem>
    );
  });
};

export const SupplementQuestions: SupplementQuestions<Props, SupplementData> = (props: Props) => {
  const { formikProps } = props;

  const checkboxes = [
    { label: i18n.t('diet-study.supplements.fiber'), value: 'supplements_fibre' },
    { label: i18n.t('diet-study.supplements.probiotic'), value: 'supplements_probiotic' },
    { label: i18n.t('diet-study.supplements.iron'), value: 'supplements_iron' },
    { label: i18n.t('diet-study.supplements.calcium'), value: 'supplements_calcium' },
    { label: i18n.t('diet-study.supplements.vitamin-d'), value: 'supplements_vitamin_d' },
    { label: i18n.t('diet-study.supplements.zinc'), value: 'supplements_zinc' },
    { label: i18n.t('diet-study.supplements.vitamin-c'), value: 'supplements_vitamin_c' },
    { label: i18n.t('diet-study.supplements.multivitamin'), value: 'supplements_multivitamin' },
    { label: i18n.t('diet-study.supplements.omega3'), value: 'supplements_omega3' },
    { label: i18n.t('diet-study.supplements.garlic'), value: 'supplements_garlic' },
    { label: i18n.t('diet-study.supplements.other'), value: 'supplements_other' },
    { label: i18n.t('diet-study.supplements.pfnts'), value: 'supplements_pfnts' },
  ];

  return (
    <>
      <FieldWrapper>
        <FieldLabel>{i18n.t('diet-study.takes-supplements-label')}</FieldLabel>
        <YesNoField
          selectedValue={formikProps.values.takesSupplements}
          onValueChange={formikProps.handleChange('takesSupplements')}
          error={formikProps.touched.takesSupplements && formikProps.errors.takesSupplements}
        />
      </FieldWrapper>

      {formikProps.values.takesSupplements === 'yes' && (
        <View style={{ marginVertical: 16 }}>
          <FieldLabel style={{ marginBottom: 4 }}>{i18n.t('diet-study.supplements.label')}</FieldLabel>
          <CheckboxList>{createSupplementCheckboxes(checkboxes, formikProps)}</CheckboxList>
        </View>
      )}

      {formikProps.values.supplements.includes('supplements_other') && (
        <GenericTextField
          formikProps={formikProps}
          label={i18n.t('diet-study.supplements.specify')}
          name="supplements_other"
        />
      )}
    </>
  );
};

SupplementQuestions.initialFormValues = (): SupplementData => {
  return {
    takesSupplements: '',
    supplements: [] as string[],
    supplements_other: '',
  };
};

SupplementQuestions.schema = () => {
  return Yup.object().shape({
    takesSupplements: Yup.string().required(i18n.t('please-select-option')),
  });
};

SupplementQuestions.createDTO = (formData: SupplementData): Partial<DietStudyRequest> => {
  function getSupplementDoc(formData: SupplementData) {
    const supplements = {
      supplements_fibre: false,
      supplements_probiotic: false,
      supplements_iron: false,
      supplements_calcium: false,
      supplements_vitamin_d: false,
      supplements_zinc: false,
      supplements_multivitamin: false,
      supplements_omega3: false,
      supplements_garlic: false,
      supplements_pfnts: false,
      supplements_other: formData.supplements_other,
    } as any;

    formData.supplements.forEach((item: string) => {
      if (item === 'supplements_other') {
        return;
      }
      supplements[item] = true;
    });

    return supplements;
  }

  return {
    takes_supplements: formData.takesSupplements === 'yes',
    ...(formData.takesSupplements === 'yes' && getSupplementDoc(formData)),
  } as Partial<DietStudyRequest>;
};

const styles = StyleSheet.create({
  textItemStyle: {
    borderColor: 'transparent',
  },
});
