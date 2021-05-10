import InfoCircle from '@assets/icons/InfoCircle';
import { CheckboxList } from '@covid/components/Checkbox';
import { RegularText } from '@covid/components/Text';
import { DoseSymptomsRequest } from '@covid/core/vaccine/dto/VaccineRequest';
import {
  createSymptomCheckboxes,
  IDoseSymptomQuestions,
  SymptomCheckBoxData,
} from '@covid/features/assessment/fields/SymptomsTypes';
import i18n from '@covid/locale/i18n';
import { colors } from '@covid/themes/theme/colors';
import { FormikProps } from 'formik';
import { Textarea } from 'native-base';
import React from 'react';
import { View } from 'react-native';
import * as Yup from 'yup';

export type DoesSymptomsData = DoesSymptomsCheckBoxData & DoesSymptomsFollowUpData;

type DoesSymptomsCheckBoxData = {
  pain: boolean;
  redness: boolean;
  swelling: boolean;
  glands: boolean;
  warmth: boolean;
  itch: boolean;
  tenderness: boolean;
  bruising: boolean;
  other: boolean;
};

type DoesSymptomsFollowUpData = {
  otherSymptoms: string;
};

type Props = {
  formikProps: FormikProps<DoesSymptomsData>;
};

export const DoesSymptomsQuestions: IDoseSymptomQuestions<Props, DoesSymptomsData> = (props: Props) => {
  const { formikProps } = props;

  const checkboxes: SymptomCheckBoxData<DoesSymptomsCheckBoxData, DoesSymptomsFollowUpData>[] = [
    { label: i18n.t('vaccines.dose-symptoms.pain'), value: 'pain' },
    { label: i18n.t('vaccines.dose-symptoms.redness'), value: 'redness' },
    { label: i18n.t('vaccines.dose-symptoms.swelling'), value: 'swelling' },
    { label: i18n.t('vaccines.dose-symptoms.glands'), value: 'glands' },
    { label: i18n.t('vaccines.dose-symptoms.warmth'), value: 'warmth' },
    { label: i18n.t('vaccines.dose-symptoms.itch'), value: 'itch' },
    { label: i18n.t('vaccines.dose-symptoms.tenderness'), value: 'tenderness' },
    { label: i18n.t('vaccines.dose-symptoms.bruising'), value: 'bruising' },
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
            bordered
            maxLength={500}
            onChangeText={formikProps.handleChange('otherSymptoms')}
            placeholder={i18n.t('vaccines.dose-symptoms.other-placeholder')}
            rowSpan={4}
            style={{ borderRadius: 8 }}
            underline={false}
            value={formikProps.values.otherSymptoms}
          />
        </>
      )}
    </View>
  );
};

DoesSymptomsQuestions.initialFormValues = (): DoesSymptomsData => {
  return {
    bruising: false,
    glands: false,
    itch: false,
    other: false,
    otherSymptoms: '',
    pain: false,
    redness: false,
    swelling: false,
    tenderness: false,
    warmth: false,
  };
};

DoesSymptomsQuestions.schema = () => {
  return Yup.object();
};

DoesSymptomsQuestions.createDoseSymptoms = (formData: DoesSymptomsData): Partial<DoseSymptomsRequest> => {
  return {
    bruising: formData.bruising,
    itch: formData.itch,
    pain: formData.pain,
    redness: formData.redness,
    swelling: formData.swelling,
    swollen_armpit_glands: formData.glands,
    tenderness: formData.tenderness,
    warmth: formData.warmth,
    ...(formData.other && { other: formData.otherSymptoms }),
  };
};
