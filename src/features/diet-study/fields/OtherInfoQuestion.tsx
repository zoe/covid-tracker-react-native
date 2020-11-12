import { FormikProps } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import { StyleSheet } from 'react-native';

import i18n from '@covid/locale/i18n';
import { CovidTest } from '@covid/core/user/dto/CovidTestContracts';
import { DietStudyRequest } from '@covid/core/diet-study/dto/DietStudyRequest';
import { GenericTextField } from '@covid/components/GenericTextField';
import { CaptionText } from '@covid/components/Text';

export interface OtherInfoData {
  other_info: string;
}

interface Props {
  formikProps: FormikProps<OtherInfoData>;
}

const CHAR_LIMIT = 1000;

export interface OtherInfoQuestion<P, Data> extends React.FC<P> {
  initialFormValues: () => Data;
  schema: () => Yup.ObjectSchema;
  createDTO: (data: Data) => Partial<CovidTest>;
}

export const OtherInfoQuestion: OtherInfoQuestion<Props, OtherInfoData> = (props: Props) => {
  const { formikProps } = props;
  return (
    <>
      <GenericTextField
        formikProps={formikProps}
        label={i18n.t('diet-study.other-info.label')}
        name="other_info"
        inputProps={{
          multiline: true,
          numberOfLines: 5,
          maxLength: CHAR_LIMIT,
        }}
        wrapperStyle={styles.input}
      />
      <CaptionText style={styles.limit}>
        {i18n.t('diet-study.other-info.text-limit-caption', { count: CHAR_LIMIT })}
      </CaptionText>
    </>
  );
};

OtherInfoQuestion.initialFormValues = (): OtherInfoData => ({ other_info: '' });

OtherInfoQuestion.schema = () =>
  Yup.object().shape({
    other_info: Yup.string()
      .required(i18n.t('diet-study.required'))
      .max(CHAR_LIMIT, i18n.t('diet-study.other-info.text-limit', { count: CHAR_LIMIT })),
  });

OtherInfoQuestion.createDTO = (formData: OtherInfoData): Partial<DietStudyRequest> => {
  return {
    other_info: formData.other_info,
  } as Partial<DietStudyRequest>;
};

const styles = StyleSheet.create({
  input: {
    marginVertical: 12,
  },
  limit: {
    paddingLeft: 16,
  },
});
