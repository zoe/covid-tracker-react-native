import { CalendarIcon } from '@assets';
import CalendarPicker from '@covid/components/CalendarPicker';
import { requiredFormMarker } from '@covid/components/Forms';
import { ErrorText, RegularText, SecondaryText } from '@covid/components/Text';
import { ValidatedTextInput } from '@covid/components/ValidatedTextInput';
import { ValidationError } from '@covid/components/ValidationError';
import { isGBCountry, isUSCountry } from '@covid/core/localisation/LocalisationService';
import { VaccineBrands } from '@covid/core/vaccine/dto/VaccineRequest';
import i18n from '@covid/locale/i18n';
import { colors } from '@theme';
import { FormikProps } from 'formik';
import moment, { Moment } from 'moment';
import * as React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import * as Yup from 'yup';

import { VaccineNameQuestion } from './VaccineNameQuestion';

export interface IVaccineDoseData {
  firstDoseDate: Date | undefined;
  firstBatchNumber: string | undefined;
  firstBrand: VaccineBrands | undefined | null;
  firstDescription: string | undefined;
  secondDoseDate: Date | undefined;
  secondBatchNumber: string | undefined;
  secondBrand: VaccineBrands | undefined | null;
  secondDescription: string | undefined;
  hasSecondDose: boolean;
}

interface IProps {
  firstDose: boolean;
  formikProps: FormikProps<IVaccineDoseData>;
  testID?: string;
}

interface IVaccineDoseQuestion<P, Data> extends React.FC<P> {
  schema: () => Yup.ObjectSchema;
}

export const VaccineDoseQuestion: IVaccineDoseQuestion<IProps, IVaccineDoseData> = (props: IProps) => {
  const { formikProps } = props;
  const [showPicker, setShowPicker] = React.useState(false);

  function convertToDate(selectedDate: Moment) {
    const offset = selectedDate.utcOffset();
    selectedDate.add(offset, 'minutes');
    return selectedDate.toDate();
  }

  function setDoseDate(selectedDate: Moment): void {
    if (props.firstDose) {
      formikProps.setFieldValue('firstDoseDate', convertToDate(selectedDate));
    } else {
      formikProps.setFieldValue('secondDoseDate', convertToDate(selectedDate));
    }
    setShowPicker(false);
  }

  const renderPicker = () => {
    const dateField: Date | undefined = props.firstDose
      ? formikProps.values.firstDoseDate
      : formikProps.values.secondDoseDate;
    let maxDate: Date | undefined;
    let minDate: Date | undefined;

    if (isGBCountry()) {
      minDate = new Date('2020-12-08');
    }
    if (isUSCountry()) {
      minDate = new Date('2020-12-11');
    }

    // Validate dates for overlap - easier to to do here than in the Yup validation schema
    // set the max date of first dose to the same date as the second dose
    if (props.firstDose && formikProps.values.secondDoseDate) {
      maxDate = formikProps.values.secondDoseDate;
    }
    // set the min date of second dose to the same date as the first dose
    if (!props.firstDose && formikProps.values.firstDoseDate) {
      minDate = formikProps.values.firstDoseDate;
    }

    return (
      <CalendarPicker
        initialDate={dateField}
        maxDate={maxDate}
        minDate={minDate}
        onDateChange={setDoseDate}
        selectedStartDate={dateField}
      />
    );
  };

  const renderCalenderButton = () => {
    const dateField: Date | undefined = props.firstDose
      ? formikProps.values.firstDoseDate
      : formikProps.values.secondDoseDate;
    const errorField: string | undefined = props.firstDose
      ? formikProps.errors.firstDoseDate
      : formikProps.errors.secondDoseDate;
    const touched: boolean | undefined = props.firstDose
      ? formikProps.touched.firstDoseDate
      : formikProps.touched.secondDoseDate;

    return (
      <>
        <TouchableOpacity onPress={() => setShowPicker(true)} style={styles.dateBox} testID="button-calendar-picker">
          <CalendarIcon />
          {dateField ? (
            <RegularText style={{ marginStart: 8 }}>{moment(dateField).format('MMMM D, YYYY')}</RegularText>
          ) : (
            <RegularText style={{ marginStart: 8 }}>{i18n.t('vaccines.your-vaccine.select-date')}</RegularText>
          )}
        </TouchableOpacity>
        <ErrorText>{errorField && touched ? i18n.t('validation-error-text-required') : ''}</ErrorText>
      </>
    );
  };

  const renderBatchNumber = () =>
    props.firstDose ? (
      <ValidatedTextInput
        error={formikProps.touched.firstBatchNumber && formikProps.errors.firstBatchNumber}
        onBlur={props.formikProps.handleBlur('firstBatchNumber')}
        onChangeText={props.formikProps.handleChange('firstBatchNumber')}
        onSubmitEditing={() => {}}
        placeholder={i18n.t('vaccines.your-vaccine.placeholder-batch')}
        returnKeyType="next"
        value={props.formikProps.values.firstBatchNumber}
      />
    ) : (
      <ValidatedTextInput
        error={formikProps.touched.secondBatchNumber && formikProps.errors.secondBatchNumber}
        onBlur={props.formikProps.handleBlur('secondBatchNumber')}
        onChangeText={props.formikProps.handleChange('secondBatchNumber')}
        onSubmitEditing={() => {}}
        placeholder={i18n.t('vaccines.your-vaccine.placeholder-batch')}
        returnKeyType="next"
        value={props.formikProps.values.secondBatchNumber}
      />
    );

  const renderNameError = () => {
    if (formikProps.submitCount === 0 || !!Object.keys(formikProps.errors).length) {
      return null;
    }
    if (props.firstDose && (formikProps.errors.firstBrand || formikProps.errors.firstDescription)) {
      return <ValidationError error={i18n.t('validation-error-text')} />;
    }
    if (!props.firstDose && (formikProps.errors.secondBrand || formikProps.errors.secondDescription)) {
      return <ValidationError error={i18n.t('validation-error-text')} />;
    }
    return null;
  };

  return (
    <View testID={props.testID}>
      <View style={{ marginBottom: 16 }}>
        <View style={{ marginBottom: 16 }}>
          <VaccineNameQuestion firstDose={props.firstDose} formikProps={formikProps as FormikProps<IVaccineDoseData>} />
          {renderNameError()}
        </View>
        <SecondaryText>
          {i18n.t('vaccines.your-vaccine.when-injection')}
          {requiredFormMarker}
        </SecondaryText>
        {showPicker ? renderPicker() : renderCalenderButton()}
      </View>
      <RegularText>{i18n.t('vaccines.your-vaccine.label-batch')}</RegularText>
      {renderBatchNumber()}
    </View>
  );
};

const styles = StyleSheet.create({
  dateBox: {
    backgroundColor: colors.backgroundTertiary,
    borderRadius: 8,
    flexDirection: 'row',
    marginVertical: 8,
    padding: 16,
  },
});

VaccineDoseQuestion.schema = () => {
  return Yup.object().shape(
    {
      firstBatchNumber: Yup.string().nullable(),

      firstBrand: Yup.string().when('firstDescription', {
        is: undefined,
        then: Yup.string().required(i18n.t('validation-error-please-select-option')),
      }),

      firstDescription: Yup.string()
        .when('firstBrand', {
          is: 'not_sure',
          then: Yup.string().required(i18n.t('validation-error-please-select-option')),
        })
        .nullable(),
      // Dose 1
      firstDoseDate: Yup.date().required(),

      // Tracks if second dose yes/no
      hasSecondDose: Yup.bool(),

      secondBatchNumber: Yup.string().nullable(),

      secondBrand: Yup.string().when(['hasSecondDose', 'secondDescription'], {
        is: (hasSecondDose, secondDescription) => hasSecondDose && !secondDescription,
        then: Yup.string().required(i18n.t('validation-error-please-select-option')),
      }),

      secondDescription: Yup.string()
        .when(['hasSecondDose', 'secondBrand'], {
          is: (hasSecondDose, secondBrand) => hasSecondDose && secondBrand === 'not_sure',
          then: Yup.string().required(i18n.t('validation-error-please-select-option')),
        })
        .nullable(),
      // Dose 2
      secondDoseDate: Yup.date().when('hasSecondDose', {
        is: true,
        then: Yup.date().required(i18n.t('validation-error-daterequired')),
      }),
    },
    // These are to flag against circular dependency errors:
    [
      ['firstBrand', 'firstDescription'],
      ['secondBrand', 'secondDescription'],
    ],
  );
};
