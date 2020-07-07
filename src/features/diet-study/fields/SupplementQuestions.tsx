import { FormikProps } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import { Item, Label } from 'native-base';
import { StyleSheet } from 'react-native';

import i18n from '@covid/locale/i18n';
import { CovidTest } from '@covid/core/user/dto/CovidTestContracts';
import { DietStudyRequest } from '@covid/core/diet-study/dto/DietStudyRequest';
import { RegularText } from '@covid/components/Text';
import { FieldWrapper } from '@covid/components/Screen';
import YesNoField from '@covid/components/YesNoField';
import { CheckboxItem, CheckboxList } from '@covid/components/Checkbox';

export interface SupplementData {
  takesSupplements: string;
  supplements: string[];
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
    { label: i18n.t('diet-study.supplements.live-probiotic'), value: 'supplements_live_probiotic_fermented' },
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
        <RegularText>{i18n.t('diet-study.takes-supplements-label')}</RegularText>
        <YesNoField
          selectedValue={formikProps.values.takesSupplements}
          onValueChange={formikProps.handleChange('takesSupplements')}
          error={formikProps.touched.takesSupplements && formikProps.errors.takesSupplements}
        />
      </FieldWrapper>

      {formikProps.values.takesSupplements === 'yes' && (
        <>
          <Item stackedLabel style={styles.textItemStyle}>
            <Label>{i18n.t('diet-study.supplements.label')}</Label>
            <CheckboxList>{createSupplementCheckboxes(checkboxes, formikProps)}</CheckboxList>
          </Item>
        </>
      )}
    </>
  );
};

SupplementQuestions.initialFormValues = (): SupplementData => {
  return {
    takesSupplements: '',
    supplements: [] as string[],
  };
};

SupplementQuestions.schema = () => {
  return Yup.object().shape({
    takesSupplements: Yup.string().required(),
  });
};

SupplementQuestions.createDTO = (formData: SupplementData): Partial<DietStudyRequest> => {
  function getSupplementDoc(formData: SupplementData) {
    const supplements = {
      supplements_fibre: false,
      supplements_probiotic: false,
      supplements_live_probiotic_fermented: false,
      supplements_iron: false,
      supplements_calcium: false,
      supplements_vitamin_d: false,
      supplements_zinc: false,
      supplements_multivitamin: false,
      supplements_omega3: false,
      supplements_garlic: false,
      supplements_pfnts: false,
      supplements_other: false,
    } as any;

    formData.supplements.forEach((item: string) => {
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
