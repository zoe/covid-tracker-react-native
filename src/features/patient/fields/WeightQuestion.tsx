import DropdownField from '@covid/components/DropdownField';
import { requiredFormMarker } from '@covid/components/Form';
import { FieldLabelRedesigned, RegularText } from '@covid/components/Text';
import { ValidatedTextInput } from '@covid/components/ValidatedTextInput';
import { isUSCountry, localisationService } from '@covid/core/localisation/LocalisationService';
import i18n from '@covid/locale/i18n';
import { sizes } from '@covid/themes';
import { FormikProps } from 'formik';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import * as Yup from 'yup';

export interface IWeightData {
  weight: string;
  stones: string;
  pounds: string;
  weightUnit: string;
}

interface IFCWithStatic<P> extends React.FC<P> {
  getInitialFormValues: () => IWeightData;
  createValidationSchema: () => Yup.ObjectSchema;
}

interface IProps {
  formikProps: FormikProps<IWeightData>;
  label: string;
  redesign?: boolean; // TODO: Remove once we merge design
}

export const WeightQuestion: IFCWithStatic<IProps> = ({ formikProps, label, redesign }) => {
  return (
    <View style={redesign ? styles.viewRedesign : styles.view}>
      {redesign ? (
        <FieldLabelRedesigned>
          {label}
          {requiredFormMarker}
        </FieldLabelRedesigned>
      ) : (
        <RegularText>
          {label}
          {requiredFormMarker}
        </RegularText>
      )}
      {isUSCountry() ? (
        <ValidatedTextInput
          error={formikProps.touched.pounds && !!formikProps.errors.pounds}
          keyboardType="numeric"
          onBlur={formikProps.handleBlur('pounds')}
          onChangeText={formikProps.handleChange('pounds')}
          onSubmitEditing={() => {}}
          placeholder={i18n.t('placeholder-pounds')}
          returnKeyType="next"
          testID="input-weight-pounds"
          value={formikProps.values.pounds}
        />
      ) : (
        <View style={styles.fieldRow}>
          {formikProps.values.weightUnit === 'kg' ? (
            <View style={styles.primaryField}>
              <ValidatedTextInput
                error={formikProps.touched.weight && !!formikProps.errors.weight}
                keyboardType="numeric"
                onBlur={formikProps.handleBlur('weight')}
                onChangeText={formikProps.handleChange('weight')}
                onSubmitEditing={() => {}}
                placeholder={i18n.t('placeholder-weight')}
                returnKeyType="next"
                testID="input-weight-kg"
                value={formikProps.values.weight}
              />
            </View>
          ) : (
            <View style={styles.primaryFieldRow}>
              <View style={styles.stonesField}>
                <ValidatedTextInput
                  error={formikProps.touched.stones && !!formikProps.errors.stones}
                  keyboardType="numeric"
                  onBlur={formikProps.handleBlur('stones')}
                  onChangeText={formikProps.handleChange('stones')}
                  onSubmitEditing={() => {}}
                  placeholder={i18n.t('placeholder-stones')}
                  returnKeyType="next"
                  testID="input-weight-stones"
                  value={formikProps.values.stones}
                />
              </View>
              <View style={styles.poundsField}>
                <ValidatedTextInput
                  error={formikProps.touched.pounds && !!formikProps.errors.pounds}
                  keyboardType="numeric"
                  onBlur={formikProps.handleBlur('pounds')}
                  onChangeText={formikProps.handleChange('pounds')}
                  onSubmitEditing={() => {}}
                  placeholder={i18n.t('placeholder-pounds')}
                  returnKeyType="next"
                  testID="input-weight-pounds"
                  value={formikProps.values.pounds}
                />
              </View>
            </View>
          )}
          <View style={styles.secondaryField}>
            <DropdownField
              hideLabel
              items={[
                { label: 'lbs', value: 'lbs' },
                { label: 'kg', value: 'kg' },
              ]}
              onValueChange={formikProps.handleChange('weightUnit')}
              selectedValue={formikProps.values.weightUnit}
              style={redesign ? styles.noMarginBottom : null}
            />
          </View>
        </View>
      )}
    </View>
  );
};

WeightQuestion.getInitialFormValues = () => {
  const config = localisationService.getConfig();
  return {
    pounds: '',
    stones: '',
    weight: '',
    weightUnit: config?.defaultWeightUnit || '',
  };
};

WeightQuestion.createValidationSchema = () => {
  return Yup.object().shape({
    pounds: Yup.number().min(0),
    stones: Yup.number().min(0),
    weight: Yup.number().min(0),
    weightUnit: Yup.string(),
  });
};

const styles = StyleSheet.create({
  fieldRow: {
    flexDirection: 'row',
    paddingBottom: 0,
  },
  noMarginBottom: {
    marginBottom: 0,
  },
  poundsField: {
    flex: 5,
    marginHorizontal: sizes.xxs,
  },
  primaryField: {
    flex: 6,
    marginRight: sizes.xxs,
  },
  primaryFieldRow: {
    flex: 6,
    flexDirection: 'row',
  },
  secondaryField: {
    flex: 2,
    marginLeft: sizes.xxs,
    marginTop: -16,
  },
  stonesField: {
    flex: 5,
    marginRight: sizes.xxs,
  },
  tertiaryField: {
    flex: 5,
    marginRight: sizes.xs,
  },
  view: {
    flex: 1,
    marginVertical: sizes.m,
  },
  viewRedesign: {
    flex: 1,
  },
});
