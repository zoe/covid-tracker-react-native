import { FormikProps } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import { View } from 'react-native';

import i18n from '@covid/locale/i18n';
import { CovidTest } from '@covid/core/user/dto/CovidTestContracts';
import { DietStudyRequest } from '@covid/core/diet-study/dto/DietStudyRequest';
import { FieldLabel } from '@covid/components/Text';
import { FieldWrapper } from '@covid/components/Screen';
import { AlcoholFrequencyOptions, AlcoholUnitsOptions } from '@covid/core/diet-study/dto/DietStudyTypes';
import DropdownField from '@covid/components/DropdownField';
import { AlcoholUnitInfo } from '@covid/components/Cards/AlcoholUnitInfo';

export interface AlcoholData {
  alcoholFrequency: string;
  alcoholUnits: string;
}

interface Props {
  formikProps: FormikProps<AlcoholData>;
}

export interface AlcoholQuestions<P, Data> extends React.FC<P> {
  initialFormValues: () => Data;
  schema: () => Yup.ObjectSchema;
  createDTO: (data: Data) => Partial<CovidTest>;
}

export const AlcoholQuestions: AlcoholQuestions<Props, AlcoholData> = (props: Props) => {
  const { formikProps } = props;

  const frequencyItems = [
    {
      label: i18n.t('diet-study.alcohol-frequency.never'),
      value: AlcoholFrequencyOptions.NEVER,
    },
    {
      label: i18n.t('diet-study.alcohol-frequency.monthly'),
      value: AlcoholFrequencyOptions.MONTHLY,
    },
    {
      label: i18n.t('diet-study.alcohol-frequency.two-to-four-a-month'),
      value: AlcoholFrequencyOptions.TWO_TO_FOUR_A_MONTH,
    },
    {
      label: i18n.t('diet-study.alcohol-frequency.two-to-three-a-week'),
      value: AlcoholFrequencyOptions.TWO_TO_THREE_A_WEEK,
    },
    {
      label: i18n.t('diet-study.alcohol-frequency.four-or-more-a-week'),
      value: AlcoholFrequencyOptions.FOUR_OR_MORE_A_WEEK,
    },
    {
      label: i18n.t('diet-study.alcohol-frequency.pfnts'),
      value: AlcoholFrequencyOptions.PFNTS,
    },
  ];

  const unitsItems = [
    {
      label: i18n.t('diet-study.alcohol-units.one-to-two'),
      value: AlcoholUnitsOptions.ONE_TO_TWO,
    },
    {
      label: i18n.t('diet-study.alcohol-units.three-to-four'),
      value: AlcoholUnitsOptions.THREE_TO_FOUR,
    },
    {
      label: i18n.t('diet-study.alcohol-units.five-to-six'),
      value: AlcoholUnitsOptions.FIVE_TO_SIX,
    },
    {
      label: i18n.t('diet-study.alcohol-units.seven-to-nine'),
      value: AlcoholUnitsOptions.SEVEN_TO_NINE,
    },
    {
      label: i18n.t('diet-study.alcohol-units.ten-or-more'),
      value: AlcoholUnitsOptions.TEN_OR_MORE,
    },
    {
      label: i18n.t('diet-study.alcohol-units.pfnts'),
      value: AlcoholUnitsOptions.PFNTS,
    },
  ];

  return (
    <>
      <FieldWrapper>
        <FieldLabel>{i18n.t('diet-study.alcohol-frequency.label')}</FieldLabel>
        <DropdownField
          selectedValue={formikProps.values.alcoholFrequency}
          onValueChange={formikProps.handleChange('alcoholFrequency')}
          error={formikProps.touched.alcoholFrequency && formikProps.errors.alcoholFrequency}
          items={frequencyItems}
        />
      </FieldWrapper>

      {formikProps.values.alcoholFrequency !== '' &&
        formikProps.values.alcoholFrequency !== AlcoholFrequencyOptions.NEVER && (
          <>
            <AlcoholUnitInfo />
            <FieldWrapper>
              <FieldLabel>{i18n.t('diet-study.alcohol-units.label')}</FieldLabel>
              <DropdownField
                selectedValue={formikProps.values.alcoholUnits}
                onValueChange={formikProps.handleChange('alcoholUnits')}
                error={formikProps.touched.alcoholUnits && formikProps.errors.alcoholUnits}
                items={unitsItems}
              />
            </FieldWrapper>
          </>
        )}
    </>
  );
};

AlcoholQuestions.initialFormValues = (): AlcoholData => {
  return {
    alcoholFrequency: '',
    alcoholUnits: '',
  };
};

AlcoholQuestions.schema = () => {
  return Yup.object().shape({
    alcoholFrequency: Yup.string().required(i18n.t('please-select-option')),
    alcoholUnits: Yup.string().when('alcoholFrequency', {
      is: (alcoholFrequency: string) => alcoholFrequency !== '' && alcoholFrequency !== AlcoholFrequencyOptions.NEVER,
      then: Yup.string().required(i18n.t('please-select-option')),
      otherwise: Yup.string(),
    }),
  });
};

AlcoholQuestions.createDTO = (formData: AlcoholData): Partial<DietStudyRequest> => {
  return {
    alcohol_frequency: formData.alcoholFrequency,
    alcohol_units: formData.alcoholUnits,
  } as Partial<DietStudyRequest>;
};
