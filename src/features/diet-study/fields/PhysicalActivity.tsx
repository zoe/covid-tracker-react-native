import { FormikProps } from 'formik';
import React from 'react';
import * as Yup from 'yup';

import i18n from '@covid/locale/i18n';
import { CovidTest } from '@covid/core/user/dto/CovidTestContracts';
import { DietStudyRequest } from '@covid/core/diet-study/dto/DietStudyRequest';
import { FieldLabel } from '@covid/components/Text';
import { FieldWrapper } from '@covid/components/Screen';
import { PhysicalActivityOptions } from '@covid/core/diet-study/dto/DietStudyTypes';
import DropdownField from '@covid/components/DropdownField';

export interface PhysicalActivityData {
  physicalActivity: string;
}

interface Props {
  formikProps: FormikProps<PhysicalActivityData>;
}

export interface PhysicalActivityQuestion<P, Data> extends React.FC<P> {
  initialFormValues: () => Data;
  schema: () => Yup.ObjectSchema;
  createDTO: (data: Data) => Partial<CovidTest>;
}

export const PhysicalActivityQuestion: PhysicalActivityQuestion<Props, PhysicalActivityData> = (props: Props) => {
  const { formikProps } = props;

  const items = [
    {
      label: i18n.t('diet-study.physical-activity.less-than-once-a-month'),
      value: PhysicalActivityOptions.LESS_THAN_ONCE_A_MONTH,
    },
    {
      label: i18n.t('diet-study.physical-activity.less-than-once-a-week'),
      value: PhysicalActivityOptions.LESS_THAN_ONCE_A_WEEK,
    },
    { label: i18n.t('diet-study.physical-activity.once-a-week'), value: PhysicalActivityOptions.ONCE_A_WEEK },
    { label: i18n.t('diet-study.physical-activity.twice-a-week'), value: PhysicalActivityOptions.TWICE_A_WEEK },
    {
      label: i18n.t('diet-study.physical-activity.three-to-four-times-a-week'),
      value: PhysicalActivityOptions.THREE_TO_FOUR_A_WEEK,
    },
    { label: i18n.t('diet-study.physical-activity.five-or-more'), value: PhysicalActivityOptions.FIVE_OR_MORE },
    { label: i18n.t('diet-study.physical-activity.pfnts'), value: PhysicalActivityOptions.PFNTS },
  ];

  return (
    <FieldWrapper>
      <FieldLabel>{i18n.t('diet-study.physical-activity.label')}</FieldLabel>
      <DropdownField
        selectedValue={formikProps.values.physicalActivity}
        onValueChange={formikProps.handleChange('physicalActivity')}
        error={formikProps.touched.physicalActivity && formikProps.errors.physicalActivity}
        items={items}
      />
    </FieldWrapper>
  );
};

PhysicalActivityQuestion.initialFormValues = (): PhysicalActivityData => {
  return {
    physicalActivity: '',
  };
};

PhysicalActivityQuestion.schema = () => {
  return Yup.object().shape({
    physicalActivity: Yup.string().required(i18n.t('please-select-option')),
  });
};

PhysicalActivityQuestion.createDTO = (formData: PhysicalActivityData): Partial<DietStudyRequest> => {
  return {
    physical_activity: formData.physicalActivity,
  } as Partial<DietStudyRequest>;
};
