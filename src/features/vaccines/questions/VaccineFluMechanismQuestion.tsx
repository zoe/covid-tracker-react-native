import { RadioInput } from '@covid/components/inputs/RadioInput';
import { EVaccineMechanisms, TVaccineRequest } from '@covid/core/vaccine/dto/VaccineRequest';
import { IVaccineDoseData } from '@covid/features/vaccines/questions/VaccineDoseQuestion';
import i18n from '@covid/locale/i18n';
import { FormikProps } from 'formik';
import * as React from 'react';

interface IProps {
  formikProps: FormikProps<IVaccineDoseData>;
}

interface IVaccineFluMechanismQuestion<P, Data> extends React.FC<P> {
  getInitialFormValues: (vaccine?: TVaccineRequest) => Partial<Data>;
}

const mechanismOptions = [
  { label: i18n.t('vaccines.your-vaccine.flu-mechanism-arm-injection'), value: EVaccineMechanisms.ARM_INJECTION },
  { label: i18n.t('vaccines.your-vaccine.flu-mechanism-nasal-spray'), value: EVaccineMechanisms.NASAL_SPRAY },
  { label: i18n.t('vaccines.your-vaccine.flu-mechanism-dont-know'), value: EVaccineMechanisms.DONT_KNOW },
];

export const VaccineFluMechanismQuestion: IVaccineFluMechanismQuestion<IProps, IVaccineDoseData> = (props: IProps) => {
  return (
    <RadioInput
      required
      error={props.formikProps.touched.vaccineMechanism ? props.formikProps.errors.vaccineMechanism : ''}
      items={mechanismOptions}
      label={i18n.t('vaccines.your-vaccine.flu-mechanism')}
      onValueChange={props.formikProps.handleChange('vaccineMechanism')}
      selectedValue={props.formikProps.values.vaccineMechanism}
      testID="input-your-vaccine-flu-mechanism"
    />
  );
};

VaccineFluMechanismQuestion.getInitialFormValues = (vaccine?: TVaccineRequest): Partial<IVaccineDoseData> => {
  return {
    vaccineMechanism: vaccine?.mechanism,
  };
};
