import CalendarPicker from '@covid/components/CalendarPicker';
import { requiredFormMarker } from '@covid/components/Form';
import { LabelText } from '@covid/components/Text';
import { ValidatedTextInput } from '@covid/components/ValidatedTextInput';
import { isGBCountry, isSECountry, isUSCountry } from '@covid/core/localisation/LocalisationService';
import {
  EPlaceboStatus,
  EVaccineBrands,
  EVaccineMechanisms,
  EVaccineTypes,
} from '@covid/core/vaccine/dto/VaccineRequest';
import i18n from '@covid/locale/i18n';
import { sizes } from '@covid/themes';
import { colors } from '@theme';
import { FormikProps } from 'formik';
import { Moment } from 'moment';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import * as Yup from 'yup';

import { VaccineFluMechanismQuestion } from './VaccineFluMechanismQuestion';
import { VaccineNameQuestion } from './VaccineNameQuestion';
import { VaccineTypeQuestion } from './VaccineTypeQuestion';

const MIN_DATE_TRIAL = new Date('2020-01-01');
const MIN_DATE_NOT_TRIAL_US = new Date('2020-12-11');
const MIN_DATE_NOT_TRIAL = new Date('2020-12-08');

const setMinDateFromConsts = (formikProps: FormikProps<IVaccineDoseData>) => {
  let minNotTrialDate;
  if (isGBCountry()) {
    minNotTrialDate = MIN_DATE_NOT_TRIAL;
  }
  if (isUSCountry()) {
    minNotTrialDate = MIN_DATE_NOT_TRIAL_US;
  }
  return formikProps.values.brand === EVaccineBrands.TRIAL ? MIN_DATE_TRIAL : minNotTrialDate;
};

export interface IVaccineDoseData {
  doseDate: Date | undefined;
  batchNumber: string | undefined;
  brand: EVaccineBrands | undefined | null;
  placebo: EPlaceboStatus | undefined;
  vaccineType: EVaccineTypes | undefined;
  vaccineMechanism: EVaccineMechanisms | undefined;
}

interface IProps {
  formikProps: FormikProps<IVaccineDoseData>;
  testID?: string;
  isChild?: boolean;
}

interface IVaccineDoseQuestion<P> extends React.FC<P> {
  schema: (isChild: boolean) => Yup.ObjectSchema;
}

export const VaccineDoseQuestion: IVaccineDoseQuestion<IProps> = (props: IProps) => {
  const { formikProps } = props;

  function convertToDate(selectedDate: Moment) {
    const offset = selectedDate.utcOffset();
    selectedDate.add(offset, 'minutes');
    return selectedDate.toDate();
  }

  function setDoseDate(selectedDate: Moment): void {
    formikProps.setFieldValue('doseDate', convertToDate(selectedDate));
  }

  const renderPicker = () => {
    const dateField: Date | undefined = formikProps.values.doseDate;
    const minDate = setMinDateFromConsts(formikProps);
    const maxDate = new Date();
    const keyWithDateStringToForceReRender = `date-picker-${minDate?.toDateString()}`;

    return (
      <View key={keyWithDateStringToForceReRender} style={styles.calendar}>
        <CalendarPicker
          initialDate={dateField}
          maxDate={maxDate}
          minDate={minDate}
          onDateChange={setDoseDate}
          selectedStartDate={dateField}
        />
      </View>
    );
  };

  const renderBatchNumber = () => (
    <ValidatedTextInput
      error={formikProps.touched.batchNumber && !!formikProps.errors.batchNumber}
      onBlur={props.formikProps.handleBlur('batchNumber')}
      onChangeText={props.formikProps.handleChange('batchNumber')}
      onSubmitEditing={() => {}}
      placeholder={i18n.t('vaccines.your-vaccine.placeholder-batch')}
      returnKeyType="next"
      value={props.formikProps.values.batchNumber}
    />
  );

  const renderDateQuestion = () => {
    if (formikProps.values.brand === EVaccineBrands.TRIAL) {
      return i18n.t('vaccines.your-vaccine.when-vaccine-trial');
    }
    return i18n.t('vaccines.your-vaccine.when-vaccine');
  };

  const renderCovidVaccineQuestions = () => (
    <>
      <View style={{ marginBottom: sizes.m }}>
        <VaccineNameQuestion formikProps={formikProps as FormikProps<IVaccineDoseData>} />
      </View>

      <LabelText style={styles.label}>
        {renderDateQuestion()}
        {requiredFormMarker}
      </LabelText>
      {renderPicker()}
      <LabelText style={styles.label}>{i18n.t('vaccines.your-vaccine.label-batch')}</LabelText>
      {renderBatchNumber()}
    </>
  );

  const renderFluVaccineQuestions = () => {
    const hideMechanismQuestion = isSECountry() || !props.isChild;
    return (
      <>
        {hideMechanismQuestion ? null : (
          <View style={{ marginBottom: sizes.m }}>
            <VaccineFluMechanismQuestion formikProps={formikProps as FormikProps<IVaccineDoseData>} />
          </View>
        )}
        <LabelText style={[styles.label, hideMechanismQuestion ? styles.marginTop : null]}>
          {renderDateQuestion()}
          {requiredFormMarker}
        </LabelText>
        {renderPicker()}
      </>
    );
  };

  return (
    <View testID={props.testID}>
      <VaccineTypeQuestion formikProps={formikProps as FormikProps<IVaccineDoseData>} />

      {formikProps.values.vaccineType === EVaccineTypes.COVID_VACCINE ? renderCovidVaccineQuestions() : null}
      {formikProps.values.vaccineType === EVaccineTypes.SEASONAL_FLU ? renderFluVaccineQuestions() : null}
    </View>
  );
};

const styles = StyleSheet.create({
  calendar: {
    marginBottom: sizes.m,
  },
  dateBox: {
    backgroundColor: colors.backgroundTertiary,
    borderRadius: sizes.xs,
    flexDirection: 'row',
    marginVertical: sizes.xs,
    padding: sizes.m,
  },
  label: {
    marginBottom: sizes.m,
  },
  marginTop: {
    marginTop: sizes.m,
  },
});

VaccineDoseQuestion.schema = (isChild) => {
  return Yup.object().shape({
    batchNumber: Yup.string().nullable(),
    brand: Yup.string().when('vaccineType', {
      is: EVaccineTypes.COVID_VACCINE,
      then: Yup.string().required(i18n.t('validation-error-please-select-option')),
    }),
    doseDate: Yup.date().required(),
    placebo: Yup.string().when('brand', {
      is: 'vaccine_trial',
      then: Yup.string().required(i18n.t('validation-error-please-select-option')),
    }),
    vaccineMechanism: Yup.string().when('vaccineType', {
      is: (vaccineType) => {
        return vaccineType === EVaccineTypes.SEASONAL_FLU && isChild;
      },
      then: Yup.string().required(i18n.t('validation-error-please-select-option')),
    }),
    vaccineType: Yup.string().required(),
  });
};
