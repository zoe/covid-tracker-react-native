import { FormikProps } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import { Item, Label, Textarea } from 'native-base';
import { StyleSheet } from 'react-native';

import i18n from '@covid/locale/i18n';
import { CovidTest } from '@covid/core/user/dto/CovidTestContracts';
import { DietStudyRequest } from '@covid/core/diet-study/dto/DietStudyRequest';
import { FieldWrapper } from '@covid/components/Screen';

export interface OtherInfoData {
  other_info: string;
}

interface Props {
  formikProps: FormikProps<OtherInfoData>;
}

export interface OtherInfoQuestion<P, Data> extends React.FC<P> {
  initialFormValues: () => Data;
  schema: () => Yup.ObjectSchema;
  createDTO: (data: Data) => Partial<CovidTest>;
}

export const OtherInfoQuestion: OtherInfoQuestion<Props, OtherInfoData> = (props: Props) => {
  const { formikProps } = props;

  return (
    <FieldWrapper style={{ marginVertical: 64 }}>
      <Item stackedLabel>
        <Label style={{ marginBottom: 16 }}>{i18n.t('diet-study.other-info.label')}</Label>
        <Textarea
          style={styles.textarea}
          rowSpan={5}
          bordered
          placeholder={i18n.t('diet-study.other-info.placeholder')}
          value={formikProps.values.other_info}
          onChangeText={formikProps.handleChange('other_info')}
          underline={false}
        />
      </Item>
    </FieldWrapper>
  );
};

OtherInfoQuestion.initialFormValues = (): OtherInfoData => ({ other_info: '' });

OtherInfoQuestion.schema = () =>
  Yup.object().shape({
    other_info: Yup.string().required(i18n.t('diet-study.required')),
  });

OtherInfoQuestion.createDTO = (formData: OtherInfoData): Partial<DietStudyRequest> => {
  return {
    other_info: formData.other_info,
  } as Partial<DietStudyRequest>;
};

const styles = StyleSheet.create({
  textarea: {
    width: '100%',
  },
});
