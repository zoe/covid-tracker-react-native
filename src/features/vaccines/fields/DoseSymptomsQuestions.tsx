import { FormikProps } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import { View } from 'react-native';
import { Textarea } from 'native-base';

import i18n from '@covid/locale/i18n';
import { RegularText } from '@covid/components/Text';
import { CheckboxList } from '@covid/components/Checkbox';
import {
  createSymptomCheckboxes,
  DoseSymptomQuestions,
  SymptomCheckBoxData,
} from '@covid/features/assessment/fields/SymptomsTypes';
import { DoseSymptomsRequest } from '@covid/core/vaccine/dto/VaccineRequest';
import { colors } from '@covid/themes/theme/colors';
import InfoCircle from '@assets/icons/InfoCircle';

export type DoesSymptomsData = DoesSymptomsCheckBoxData & DoesSymptomsFollowUpData;

type DoesSymptomsCheckBoxData = {
  pain: boolean;
  redness: boolean;
  swelling: boolean;
  glands: boolean;
  warmth: boolean;
  itch: boolean;
  tenderness: boolean;
  other: boolean;
};

type DoesSymptomsFollowUpData = {
  otherSymptoms: string;
};

type Props = {
  formikProps: FormikProps<DoesSymptomsData>;
};

export const DoesSymptomsQuestions: DoseSymptomQuestions<Props, DoesSymptomsData> = (props: Props) => {
  const { formikProps } = props;

  const checkboxes: SymptomCheckBoxData<DoesSymptomsCheckBoxData, DoesSymptomsFollowUpData>[] = [
    { label: i18n.t('vaccines.dose-symptoms.pain'), value: 'pain' },
    { label: i18n.t('vaccines.dose-symptoms.redness'), value: 'redness' },
    { label: i18n.t('vaccines.dose-symptoms.swelling'), value: 'swelling' },
    { label: i18n.t('vaccines.dose-symptoms.glands'), value: 'glands' },
    { label: i18n.t('vaccines.dose-symptoms.warmth'), value: 'warmth' },
    { label: i18n.t('vaccines.dose-symptoms.itch'), value: 'itch' },
    { label: i18n.t('vaccines.dose-symptoms.tenderness'), value: 'tenderness' },
    { label: i18n.t('vaccines.dose-symptoms.other'), value: 'other' },
  ];

  return (
    <View style={{ marginVertical: 8 }}>
      <RegularText style={{ paddingBottom: 8 }}>{i18n.t('vaccines.dose-symptoms.check-all-that-apply')}</RegularText>
      <CheckboxList>{createSymptomCheckboxes(checkboxes, formikProps)}</CheckboxList>

      {formikProps.values.other && (
        <>
          <View style={{ flexDirection: 'row', marginVertical: 16, paddingRight: 32 }}>
            <View style={{ paddingRight: 8 }}>
              <InfoCircle color={colors.burgundy.main.bgColor} />
            </View>
            <View>
              <RegularText style={{ color: colors.burgundy.main.bgColor }}>
                {i18n.t('vaccines.dose-symptoms.other-info')}
              </RegularText>
            </View>
          </View>

          <Textarea
            rowSpan={4}
            bordered
            maxLength={500}
            placeholder={i18n.t('vaccines.dose-symptoms.other-placeholder')}
            value={formikProps.values.otherSymptoms}
            onChangeText={formikProps.handleChange('otherSymptoms')}
            underline={false}
            style={{ borderRadius: 8 }}
          />
        </>
      )}
    </View>
  );
};

DoesSymptomsQuestions.initialFormValues = (): DoesSymptomsData => {
  return {
    pain: false,
    redness: false,
    swelling: false,
    glands: false,
    warmth: false,
    itch: false,
    tenderness: false,
    other: false,
    otherSymptoms: '',
  };
};

DoesSymptomsQuestions.schema = () => {
  return Yup.object();
};

DoesSymptomsQuestions.createDoseSymptoms = (formData: DoesSymptomsData): Partial<DoseSymptomsRequest> => {
  return {
    pain: formData.pain,
    redness: formData.redness,
    swelling: formData.swelling,
    swollen_armpit_glands: formData.glands,
    warmth: formData.warmth,
    itch: formData.itch,
    tenderness: formData.tenderness,
    ...(formData.other && { other: formData.otherSymptoms }),
  };
};
