import InfoCircle from '@assets/icons/InfoCircle';
import { TextareaWithCharCount } from '@covid/components';
import { CheckboxList } from '@covid/components/Checkbox';
import { RegularText } from '@covid/components/Text';
import { DoseSymptomsRequest } from '@covid/core/vaccine/dto/VaccineRequest';
import { createSymptomCheckboxes, TSymptomCheckBoxData } from '@covid/features/assessment/fields/SymptomsTypes';
import i18n from '@covid/locale/i18n';
import { colors } from '@covid/themes/theme/colors';
import { FormikProps } from 'formik';
import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import * as Yup from 'yup';

export type TDoseSymptomsData = TDoseSymptomsCheckBoxData & TDoseSymptomsFollowUpData;

type TDoseSymptomsCheckBoxData = {
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

type TDoseSymptomsFollowUpData = {
  otherSymptoms: string;
};

type TProps = {
  formikProps: FormikProps<TDoseSymptomsData>;
  style?: StyleProp<ViewStyle>;
};

export function DoseSymptomsQuestions(props: TProps) {
  const checkboxes: TSymptomCheckBoxData<TDoseSymptomsCheckBoxData, TDoseSymptomsFollowUpData>[] = [
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
    <View style={props.style}>
      <RegularText style={styles.paddingBottom}>{i18n.t('vaccines.dose-symptoms.check-all-that-apply')}</RegularText>
      <CheckboxList>{createSymptomCheckboxes(checkboxes, props.formikProps)}</CheckboxList>

      {props.formikProps.values.other ? (
        <>
          <View style={styles.view}>
            <View style={styles.paddingRight}>
              <InfoCircle color={colors.burgundy.main.bgColor} />
            </View>
            <View>
              <RegularText style={styles.color}>{i18n.t('vaccines.dose-symptoms.other-info')}</RegularText>
            </View>
          </View>

          <TextareaWithCharCount
            bordered
            maxLength={500}
            onChangeText={props.formikProps.handleChange('otherSymptoms')}
            placeholder={i18n.t('vaccines.dose-symptoms.other-placeholder')}
            rowSpan={4}
            style={styles.borderRadius}
            value={props.formikProps.values.otherSymptoms}
          />
        </>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  borderRadius: {
    borderRadius: 8,
  },
  color: {
    color: colors.burgundy.main.bgColor,
  },
  paddingBottom: {
    paddingBottom: 8,
  },
  paddingRight: {
    paddingRight: 8,
  },
  view: {
    flexDirection: 'row',
    marginVertical: 16,
    paddingRight: 32,
  },
});

export const validationSchema = Yup.object().shape({}).concat(Yup.object());

export const initialValues = {
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

export function createDoseSymptoms(formData: TDoseSymptomsData, dose: string): Partial<DoseSymptomsRequest> {
  const doseSymptoms: Partial<DoseSymptomsRequest> = {
    bruising: formData.bruising,
    dose,
    itch: formData.itch,
    pain: formData.pain,
    redness: formData.redness,
    swelling: formData.swelling,
    swollen_armpit_glands: formData.glands,
    tenderness: formData.tenderness,
    warmth: formData.warmth,
  };
  if (formData.other) {
    doseSymptoms.other = formData.otherSymptoms;
  }
  return doseSymptoms;
}
