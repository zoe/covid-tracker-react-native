import i18n from '@covid/locale/i18n';
import FormCheckboxQuestion, {
  IFormCheckboxItemProps,
} from '@tracer/components/molecules/Form/questions/multiCheckbox';
import FormRadioQuestion from '@tracer/components/molecules/Form/questions/radio';
import { FormikProps, FormikValues } from 'formik';
import React from 'react';

import { TSymptomReason } from '../../usual-self/types';

const KNOWS_REASON = [
  { label: i18n.t('No, I don`t know why'), selected: false },
  { label: i18n.t('Yes, I may know why'), selected: false },
];

const makeReasonCheckboxItems = (reasons: TSymptomReason[]): IFormCheckboxItemProps[] =>
  reasons.map((reason) => ({
    id: reason.id,
    label: reason.display_name,
    selected: false,
  }));

interface ILogSymptomReasonsProps {
  formikProps: FormikProps<FormikValues>;
  showReasons: boolean;
  reasons: TSymptomReason[];
}

export default function LogSymptomReasons({ formikProps, showReasons, reasons }: ILogSymptomReasonsProps) {
  const { setFieldValue } = formikProps;
  return (
    <>
      <FormRadioQuestion handleChange={setFieldValue} items={KNOWS_REASON} name="knows_reason" />
      {showReasons ? (
        <FormCheckboxQuestion handleChange={setFieldValue} items={makeReasonCheckboxItems(reasons)} name="reasons" />
      ) : null}
    </>
  );
}
