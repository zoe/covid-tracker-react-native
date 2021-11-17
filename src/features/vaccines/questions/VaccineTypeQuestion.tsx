import { RadioInput } from '@covid/components/inputs/RadioInput';
import { EVaccineTypes, TVaccineRequest } from '@covid/core/vaccine/dto/VaccineRequest';
import { IVaccineDoseData } from '@covid/features/vaccines/questions/VaccineDoseQuestion';
import i18n from '@covid/locale/i18n';
import { FormikProps } from 'formik';
import * as React from 'react';

interface IProps {
  formikProps: FormikProps<IVaccineDoseData>;
}

interface IVaccineTypeQuestion<P, Data> extends React.FC<P> {
  initialFormValues: (vaccine?: TVaccineRequest) => Partial<Data>;
}

export const VaccineTypeQuestion: IVaccineTypeQuestion<IProps, IVaccineDoseData> = (props: IProps) => {
  const vaccineTypeOptions = [
    { label: i18n.t('vaccines.your-vaccine.vaccine-type-covid'), value: EVaccineTypes.COVID_VACCINE },
    { label: i18n.t('vaccines.your-vaccine.vaccine-type-flu'), value: EVaccineTypes.SEASONAL_FLU },
  ];

  return (
    <RadioInput
      required
      description={i18n.t('vaccines.your-vaccine.vaccine-type-description')}
      error={props.formikProps.touched.vaccineType ? props.formikProps.errors.vaccineType : ''}
      items={vaccineTypeOptions}
      label={i18n.t('vaccines.your-vaccine.vaccine-type')}
      onValueChange={props.formikProps.handleChange('vaccineType')}
      selectedValue={props.formikProps.values.vaccineType}
      testID="input-your-vaccine-type"
    />
  );
};

VaccineTypeQuestion.initialFormValues = (vaccine?: TVaccineRequest): Partial<IVaccineDoseData> => {
  return {
    vaccineType: vaccine?.vaccine_type,
  };
};
