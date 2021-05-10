import { FormikProps } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import { StyleSheet, View } from 'react-native';

import i18n from '@covid/locale/i18n';
import { RegularText } from '@covid/components/Text';
import { CheckboxList } from '@covid/components/Checkbox';
import { AssessmentInfosRequest } from '@covid/core/assessment/dto/AssessmentInfosRequest';
import {
  createSymptomCheckboxes,
  SymptomCheckBoxData,
  ISymptomQuestions,
} from '@covid/features/assessment/fields/SymptomsTypes';
import { ValidatedTextInput } from '@covid/components/ValidatedTextInput';
import DropdownField from '@covid/components/DropdownField';
import { cleanFloatVal } from '@covid/utils/number';

export type GeneralSymptomsData = GeneralSymptomsCheckBoxData & GeneralSymptomsFollowUpData;

type GeneralSymptomsCheckBoxData = {
  fever: boolean;
  chills: boolean;
  fatigue: boolean;
  rash: boolean;
  blisters: boolean;
  welts: boolean;
  skinBurning: boolean;
  hairLoss: boolean;
  musclePains: boolean;
  jointPains: boolean;
  feelingDown: boolean;
  brainFog: boolean;
  delirium: boolean;
  typicalHayFever: boolean;
};

type GeneralSymptomsFollowUpData = {
  fatigueFollowUp: string;
  temperature: string; // Temperature: 37.3
  temperatureUnit: string;
};

type Props = {
  formikProps: FormikProps<GeneralSymptomsData>;
  hasHayfever: boolean;
};

export const GeneralSymptomsQuestions: ISymptomQuestions<Props, GeneralSymptomsData> = (props: Props) => {
  const { formikProps } = props;

  const fever_checkbox: SymptomCheckBoxData<GeneralSymptomsCheckBoxData, GeneralSymptomsFollowUpData>[] = [
    { label: i18n.t('describe-symptoms.general-fever'), value: 'fever' },
  ];

  const checkboxes: SymptomCheckBoxData<GeneralSymptomsCheckBoxData, GeneralSymptomsFollowUpData>[] = [
    { label: i18n.t('describe-symptoms.general-chills'), value: 'chills' },
    {
      label: i18n.t('describe-symptoms.general-fatigue'),
      value: 'fatigue',
      followUp: {
        label: i18n.t('describe-symptoms.general-fatigue-follow-up'),
        value: 'fatigueFollowUp',
        options: [
          { label: i18n.t('describe-symptoms.picker-fatigue-mild'), value: 'mild' },
          { label: i18n.t('describe-symptoms.picker-fatigue-severe'), value: 'severe' },
        ],
      },
    },
    { label: i18n.t('describe-symptoms.general-rash'), value: 'rash' },
    { label: i18n.t('describe-symptoms.general-foot-sores'), value: 'blisters' },
    { label: i18n.t('describe-symptoms.general-face-welts'), value: 'welts' },
    { label: i18n.t('describe-symptoms.general-skin-burning'), value: 'skinBurning' },
    { label: i18n.t('describe-symptoms.general-hair-loss'), value: 'hairLoss' },
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
    <View style={{ marginTop: 16, marginBottom: 32 }}>
      <RegularText style={{ paddingTop: 16 }}>{i18n.t('describe-symptoms.check-all-that-apply')}</RegularText>

      <CheckboxList>{createSymptomCheckboxes(fever_checkbox, formikProps)}</CheckboxList>

      {formikProps.values.fever && (
        <View style={{ marginVertical: 16 }}>
          <RegularText>{i18n.t('describe-symptoms.question-your-temperature')}</RegularText>
          <View style={styles.fieldRow}>
            <View style={styles.primaryField}>
              <ValidatedTextInput
                placeholder={i18n.t('describe-symptoms.placeholder-temperature')}
                value={formikProps.values.temperature}
                onChangeText={formikProps.handleChange('temperature')}
                onBlur={formikProps.handleBlur('temperature')}
                error={formikProps.touched.temperature && formikProps.errors.temperature}
                returnKeyType="next"
                onSubmitEditing={() => {}}
                keyboardType="numeric"
              />
            </View>
            <View style={styles.secondaryField}>
              <DropdownField
                selectedValue={formikProps.values.temperatureUnit}
                onValueChange={formikProps.handleChange('temperatureUnit')}
                error={formikProps.touched.temperatureUnit && formikProps.errors.temperatureUnit}
                items={temperatureItems}
                onlyPicker
              />
            </View>
          </View>
        </View>
      )}

      <CheckboxList>{createSymptomCheckboxes(checkboxes, formikProps)}</CheckboxList>
    </View>
  );
};

GeneralSymptomsQuestions.initialFormValues = (defaultTemperatureUnit = 'C'): GeneralSymptomsData => {
  return {
    fever: false,
    temperature: '',
    temperatureUnit: defaultTemperatureUnit,
    chills: false,
    fatigue: false,
    fatigueFollowUp: '',
    rash: false,
    blisters: false,
    welts: false,
    skinBurning: false,
    hairLoss: false,
    musclePains: false,
    jointPains: false,
    feelingDown: false,
    brainFog: false,
    delirium: false,
    typicalHayFever: false,
  };
};

GeneralSymptomsQuestions.schema = () => {
  return Yup.object().shape({
    fatigueFollowUp: Yup.string().when('fatigue', {
      is: true,
      then: Yup.string().required(i18n.t('describe-symptoms.follow-up-required')),
    }),
  });
};

GeneralSymptomsQuestions.createAssessment = (
  formData: GeneralSymptomsData,
  hasHayfever: boolean,
): Partial<AssessmentInfosRequest> => {
  let assessment: Partial<AssessmentInfosRequest> = {
    fever: formData.fever,
    chills_or_shivers: formData.chills,
    fatigue: formData.fatigue ? formData.fatigueFollowUp : 'no',
    rash: formData.rash,
    blisters_on_feet: formData.blisters,
    red_welts_on_face_or_lips: formData.welts,
    skin_burning: formData.skinBurning,
    hair_loss: formData.hairLoss,
    unusual_muscle_pains: formData.musclePains,
    unusual_joint_pains: formData.jointPains,
    feeling_down: formData.feelingDown,
    brain_fog: formData.brainFog,
    delirium: formData.delirium,
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

  fieldWrapper: {
    flex: 1,
    marginHorizontal: 16,
  },

  textItemStyle: {
    borderColor: 'transparent',
  },

  primaryField: {
    flex: 3,
    marginRight: 4,
  },

  secondaryField: {
    flex: 1,
    marginLeft: 4,
    marginTop: -8,
  },
});
