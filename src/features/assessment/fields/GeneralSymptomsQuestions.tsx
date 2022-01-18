import { CheckboxList } from '@covid/components/Checkbox';
import DropdownField from '@covid/components/DropdownField';
import { RegularText } from '@covid/components/Text';
import { ValidatedTextInput } from '@covid/components/ValidatedTextInput';
import { TAssessmentInfosRequest } from '@covid/core/assessment/dto/AssessmentInfosRequest';
import {
  createSymptomCheckboxes,
  ISymptomQuestions,
  TSymptomCheckBoxData,
} from '@covid/features/assessment/fields/SymptomsTypes';
import i18n from '@covid/locale/i18n';
import { sizes } from '@covid/themes';
import { cleanFloatVal } from '@covid/utils/number';
import { FormikProps } from 'formik';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import * as Yup from 'yup';

export type TGeneralSymptomsData = TGeneralSymptomsCheckBoxData & TGeneralSymptomsFollowUpData;

type TGeneralSymptomsCheckBoxData = {
  fever: boolean;
  chills: boolean;
  fatigue: boolean;
  rash: boolean;
  blisters: boolean;
  welts: boolean;
  skinBurning: boolean;
  hairLoss: boolean;
  lowerBackPain: boolean;
  musclePains: boolean;
  jointPains: boolean;
  feelingDown: boolean;
  brainFog: boolean;
  delirium: boolean;
  typicalHayFever: boolean;
};

type TGeneralSymptomsFollowUpData = {
  fatigueFollowUp: string;
  temperature: string; // Temperature: 37.3
  temperatureUnit: string;
};

type TProps = {
  formikProps: FormikProps<TGeneralSymptomsData>;
  hasHayfever: boolean;
};

export const GeneralSymptomsQuestions: ISymptomQuestions<TProps, TGeneralSymptomsData> = (props: TProps) => {
  const feverCheckbox: TSymptomCheckBoxData<TGeneralSymptomsCheckBoxData, TGeneralSymptomsFollowUpData>[] = [
    { label: i18n.t('describe-symptoms.general-fever'), value: 'fever' },
  ];

  const checkboxes: TSymptomCheckBoxData<TGeneralSymptomsCheckBoxData, TGeneralSymptomsFollowUpData>[] = [
    { label: i18n.t('describe-symptoms.general-chills'), value: 'chills' },
    {
      followUp: {
        label: i18n.t('describe-symptoms.general-fatigue-follow-up'),
        options: [
          { label: i18n.t('describe-symptoms.picker-fatigue-mild'), value: 'mild' },
          { label: i18n.t('describe-symptoms.picker-fatigue-severe'), value: 'severe' },
        ],
        value: 'fatigueFollowUp',
      },
      label: i18n.t('describe-symptoms.general-fatigue'),
      value: 'fatigue',
    },
    { label: i18n.t('describe-symptoms.general-rash'), value: 'rash' },
    { label: i18n.t('describe-symptoms.general-foot-sores'), value: 'blisters' },
    { label: i18n.t('describe-symptoms.general-face-welts'), value: 'welts' },
    { label: i18n.t('describe-symptoms.general-skin-burning'), value: 'skinBurning' },
    { label: i18n.t('describe-symptoms.general-hair-loss'), value: 'hairLoss' },
    { label: i18n.t('describe-symptoms.general-lower-back-pain'), value: 'lowerBackPain' },
    { label: i18n.t('describe-symptoms.general-muscle-pain'), value: 'musclePains' },
    { label: i18n.t('describe-symptoms.general-joint-pain'), value: 'jointPains' },
    { label: i18n.t('describe-symptoms.general-feeling-down'), value: 'feelingDown' },
    { label: i18n.t('describe-symptoms.general-brain-fog'), value: 'brainFog' },
    { label: i18n.t('describe-symptoms.general-delirium'), value: 'delirium' },
  ];

  if (props.hasHayfever) {
    checkboxes.push({ label: i18n.t('describe-symptoms.general-allergy-increase'), value: 'typicalHayFever' });
  }

  const temperatureItems = [
    { label: i18n.t('describe-symptoms.picker-celsius'), value: 'C' },
    { label: i18n.t('describe-symptoms.picker-fahrenheit'), value: 'F' },
  ];

  return (
    <View style={{ marginBottom: sizes.xl, marginTop: sizes.m }}>
      <RegularText style={{ paddingVertical: sizes.m }}>{i18n.t('describe-symptoms.check-all-that-apply')}</RegularText>

      <CheckboxList>{createSymptomCheckboxes(feverCheckbox, props.formikProps)}</CheckboxList>

      {props.formikProps.values.fever ? (
        <View style={{ margin: sizes.m }}>
          <RegularText>{i18n.t('describe-symptoms.question-your-temperature')}</RegularText>
          <View style={styles.fieldRow}>
            <View style={styles.primaryField}>
              <ValidatedTextInput
                error={props.formikProps.touched.temperature && !!props.formikProps.errors.temperature}
                keyboardType="numeric"
                onBlur={props.formikProps.handleBlur('temperature')}
                onChangeText={props.formikProps.handleChange('temperature')}
                onSubmitEditing={() => {}}
                placeholder={i18n.t('describe-symptoms.placeholder-temperature')}
                returnKeyType="next"
                value={props.formikProps.values.temperature}
              />
            </View>
            <View style={styles.secondaryField}>
              <DropdownField
                hideLabel
                error={props.formikProps.touched.temperatureUnit ? props.formikProps.errors.temperatureUnit : ''}
                items={temperatureItems}
                onValueChange={props.formikProps.handleChange('temperatureUnit')}
                selectedValue={props.formikProps.values.temperatureUnit}
              />
            </View>
          </View>
        </View>
      ) : null}

      <CheckboxList>{createSymptomCheckboxes(checkboxes, props.formikProps)}</CheckboxList>
    </View>
  );
};

GeneralSymptomsQuestions.getInitialFormValues = (defaultTemperatureUnit = 'C'): TGeneralSymptomsData => {
  return {
    blisters: false,
    brainFog: false,
    chills: false,
    delirium: false,
    fatigue: false,
    fatigueFollowUp: '',
    feelingDown: false,
    fever: false,
    hairLoss: false,
    jointPains: false,
    lowerBackPain: false,
    musclePains: false,
    rash: false,
    skinBurning: false,
    temperature: '',
    temperatureUnit: defaultTemperatureUnit,
    typicalHayFever: false,
    welts: false,
  };
};

GeneralSymptomsQuestions.createValidationSchema = () => {
  return Yup.object().shape({
    fatigueFollowUp: Yup.string().when('fatigue', {
      is: true,
      then: Yup.string().required(i18n.t('describe-symptoms.follow-up-required')),
    }),
  });
};

GeneralSymptomsQuestions.createAssessment = (
  formData: TGeneralSymptomsData,
  hasHayfever: boolean,
): Partial<TAssessmentInfosRequest> => {
  let assessment: Partial<TAssessmentInfosRequest> = {
    blisters_on_feet: formData.blisters,
    brain_fog: formData.brainFog,
    chills_or_shivers: formData.chills,
    delirium: formData.delirium,
    fatigue: formData.fatigue ? formData.fatigueFollowUp : 'no',
    feeling_down: formData.feelingDown,
    fever: formData.fever,
    hair_loss: formData.hairLoss,
    lower_back_pain: formData.lowerBackPain,
    rash: formData.rash,
    red_welts_on_face_or_lips: formData.welts,
    skin_burning: formData.skinBurning,
    unusual_joint_pains: formData.jointPains,
    unusual_muscle_pains: formData.musclePains,
  };

  if (hasHayfever) {
    assessment = {
      ...assessment,
      typical_hayfever: formData.typicalHayFever,
    };
  }

  if (formData.temperature) {
    // Temperature is optional.
    assessment = {
      ...assessment,
      temperature: cleanFloatVal(formData.temperature),
      temperature_unit: formData.temperatureUnit,
    };
  }

  return assessment;
};

const styles = StyleSheet.create({
  fieldRow: {
    flexDirection: 'row',
  },
  primaryField: {
    flex: 3,
    marginRight: sizes.xxs,
  },
  secondaryField: {
    flex: 1,
    marginLeft: sizes.xxs,
    marginTop: -16,
  },
});
