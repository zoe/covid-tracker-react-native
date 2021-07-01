import DropdownField from '@covid/components/DropdownField';
import { requiredFormMarker } from '@covid/components/Forms';
import { FieldWrapper } from '@covid/components/Screen';
import { RegularText } from '@covid/components/Text';
import { ValidatedTextInput } from '@covid/components/ValidatedTextInput';
import { isUSCountry, localisationService } from '@covid/core/localisation/LocalisationService';
import i18n from '@covid/locale/i18n';
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

interface FCWithStatic<P> extends React.FC<P> {
  initialFormValues: () => IWeightData;
  schema: () => Yup.ObjectSchema;
}

interface Props {
  formikProps: FormikProps<IWeightData>;
  label: string;
}

export const WeightQuestion: FCWithStatic<Props> = ({ formikProps, label }) => {
  return (
    <FieldWrapper style={styles.fieldWrapper}>
      <RegularText>
        {label}
        {requiredFormMarker}
      </RegularText>
      {isUSCountry() ? (
        <ValidatedTextInput
          error={formikProps.touched.pounds && formikProps.errors.pounds}
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
                error={formikProps.touched.weight && formikProps.errors.weight}
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
                  error={formikProps.touched.stones && formikProps.errors.stones}
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
                  error={formikProps.touched.pounds && formikProps.errors.pounds}
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
            />
          </View>
        </View>
      )}
    </FieldWrapper>
  );
};

WeightQuestion.initialFormValues = () => {
  const config = localisationService.getConfig();
  return {
    pounds: '',
    stones: '',
    weight: '',
    weightUnit: config?.defaultWeightUnit || '',
  };
};

WeightQuestion.schema = () => {
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
  },

  fieldWrapper: {
    flex: 1,
  },

  poundsField: {
    flex: 5,
    marginHorizontal: 4,
  },

  primaryField: {
    flex: 6,
    marginRight: 4,
  },

  primaryFieldRow: {
    flex: 6,
    flexDirection: 'row',
  },

  secondaryField: {
    flex: 2,
    marginLeft: 4,
    marginTop: -8,
  },

  stonesField: {
    flex: 5,
    marginRight: 4,
  },

  tertiaryField: {
    flex: 5,
    marginRight: 8,
  },

  textItemStyle: {
    borderColor: 'transparent',
  },
});
