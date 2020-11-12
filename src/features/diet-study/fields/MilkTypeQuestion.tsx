import { FormikProps } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import { Item } from 'native-base';
import { StyleSheet, View } from 'react-native';

import i18n from '@covid/locale/i18n';
import { CovidTest } from '@covid/core/user/dto/CovidTestContracts';
import { DietStudyRequest } from '@covid/core/diet-study/dto/DietStudyRequest';
import { FieldLabel } from '@covid/components/Text';
import { CheckboxItem, CheckboxList } from '@covid/components/Checkbox';

enum MilkTypes {
  WHOLE = 'milk_whole',
  SEMI_SKIMMED = 'milk_semi_skimmed',
  SKIMMED = 'milk_skimmed',
  RARELY_NEVER = 'milk_rarely_never',
  PLANT = 'milk_plant',
  OTHER = 'milk_other',
}

export interface MilkTypesData {
  milk_whole: boolean;
  milk_semi_skimmed: boolean;
  milk_skimmed: boolean;
  milk_rarely_never: boolean;
  milk_plant: boolean;
  milk_other: boolean;
}

interface Props {
  formikProps: FormikProps<MilkTypesData>;
}

export interface MilkTypeQuestion<P, Data> extends React.FC<P> {
  initialFormValues: () => Data;
  schema: () => Yup.ObjectSchema;
  createDTO: (data: Data) => Partial<CovidTest>;
}

type CheckBoxData = {
  label: string;
  value: MilkTypes;
};

const createCheckboxes = (data: CheckBoxData[], props: FormikProps<MilkTypesData>) => {
  return data.map((item) => {
    return (
      <CheckboxItem
        key={item.label}
        value={props.values[item.value]}
        onChange={(checked: boolean) => {
          props.setFieldValue(item.value, checked);
        }}>
        {item.label}
      </CheckboxItem>
    );
  });
};

export const MilkTypeQuestion: MilkTypeQuestion<Props, MilkTypesData> = (props: Props) => {
  const { formikProps } = props;

  const checkboxes = [
    { label: i18n.t('diet-study.typical-diet.milk-whole'), value: MilkTypes.WHOLE },
    { label: i18n.t('diet-study.typical-diet.milk-semi'), value: MilkTypes.SEMI_SKIMMED },
    { label: i18n.t('diet-study.typical-diet.milk-skimmed'), value: MilkTypes.SKIMMED },
    { label: i18n.t('diet-study.typical-diet.milk-rarely-never'), value: MilkTypes.RARELY_NEVER },
    { label: i18n.t('diet-study.typical-diet.milk-plant'), value: MilkTypes.PLANT },
    { label: i18n.t('diet-study.typical-diet.milk-other'), value: MilkTypes.OTHER },
  ];

  return (
    <View>
      <FieldLabel style={{ marginBottom: 4 }}>{i18n.t('diet-study.typical-diet.milk-label')}</FieldLabel>
      <CheckboxList>{createCheckboxes(checkboxes, formikProps)}</CheckboxList>
    </View>
  );
};

MilkTypeQuestion.initialFormValues = (): MilkTypesData => {
  return {
    milk_whole: false,
    milk_semi_skimmed: false,
    milk_skimmed: false,
    milk_rarely_never: false,
    milk_plant: false,
    milk_other: false,
  };
};

MilkTypeQuestion.schema = () => Yup.object().shape({});

MilkTypeQuestion.createDTO = (formData: MilkTypesData): Partial<DietStudyRequest> => formData;
