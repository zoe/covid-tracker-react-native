import { FormikProps } from 'formik';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import * as Yup from 'yup';

import DropdownField from '@covid/components/DropdownField';
import { FieldWrapper } from '@covid/components/Screen';
import { ValidatedTextInput } from '@covid/components/ValidatedTextInput';
import { isUSCountry, ILocalisationService } from '@covid/core/localisation/LocalisationService';
import i18n from '@covid/locale/i18n';
import { RegularText } from '@covid/components/Text';
import { container } from '@covid/provider/services';
import { Services } from '@covid/provider/services.types';

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
      <RegularText>{label}</RegularText>
      {isUSCountry() ? (
        <ValidatedTextInput
          placeholder={i18n.t('placeholder-pounds')}
          value={formikProps.values.pounds}
          onChangeText={formikProps.handleChange('pounds')}
          onBlur={formikProps.handleBlur('pounds')}
          error={formikProps.touched.pounds && formikProps.errors.pounds}
          returnKeyType="next"
          onSubmitEditing={() => {}}
          keyboardType="numeric"
        />
      ) : (
        <View style={styles.fieldRow}>
          {formikProps.values.weightUnit === 'kg' ? (
            <View style={styles.primaryField}>
              <ValidatedTextInput
                placeholder={i18n.t('placeholder-weight')}
                value={formikProps.values.weight}
                onChangeText={formikProps.handleChange('weight')}
                onBlur={formikProps.handleBlur('weight')}
                error={formikProps.touched.weight && formikProps.errors.weight}
                returnKeyType="next"
                onSubmitEditing={() => {}}
                keyboardType="numeric"
              />
            </View>
          ) : (
            <View style={styles.primaryFieldRow}>
              <View style={styles.stonesField}>
                <ValidatedTextInput
                  placeholder={i18n.t('placeholder-stones')}
                  value={formikProps.values.stones}
                  onChangeText={formikProps.handleChange('stones')}
                  onBlur={formikProps.handleBlur('stones')}
                  error={formikProps.touched.stones && formikProps.errors.stones}
                  returnKeyType="next"
                  onSubmitEditing={() => {}}
                  keyboardType="numeric"
                />
              </View>
              <View style={styles.poundsField}>
                <ValidatedTextInput
                  placeholder={i18n.t('placeholder-pounds')}
                  value={formikProps.values.pounds}
                  onChangeText={formikProps.handleChange('pounds')}
                  onBlur={formikProps.handleBlur('pounds')}
                  error={formikProps.touched.pounds && formikProps.errors.pounds}
                  returnKeyType="next"
                  onSubmitEditing={() => {}}
                  keyboardType="numeric"
                />
              </View>
            </View>
          )}
          <View style={styles.secondaryField}>
            <DropdownField
              onlyPicker
              selectedValue={formikProps.values.weightUnit}
              onValueChange={formikProps.handleChange('weightUnit')}
              items={[
                { label: 'lbs', value: 'lbs' },
                { label: 'kg', value: 'kg' },
              ]}
            />
          </View>
        </View>
      )}
    </FieldWrapper>
  );
};

WeightQuestion.initialFormValues = () => {
  const features = container.get<ILocalisationService>(Services.Localisation).getConfig();
  return {
    weight: '',
    stones: '',
    pounds: '',
    weightUnit: features.defaultWeightUnit,
  };
};

WeightQuestion.schema = () => {
  return Yup.object().shape({
    weight: Yup.number().min(0),
    stones: Yup.number().min(0),
    pounds: Yup.number().min(0),
    weightUnit: Yup.string(),
  });
};

const styles = StyleSheet.create({
  fieldWrapper: {
    flex: 1,
  },

  fieldRow: {
    flexDirection: 'row',
  },

  textItemStyle: {
    borderColor: 'transparent',
  },

  primaryField: {
    flex: 6,
    marginRight: 4,
  },

  primaryFieldRow: {
    flex: 6,
    flexDirection: 'row',
  },

  tertiaryField: {
    flex: 5,
    marginRight: 8,
  },

  stonesField: {
    flex: 5,
    marginRight: 4,
  },

  poundsField: {
    flex: 5,
    marginHorizontal: 4,
  },

  secondaryField: {
    flex: 2,
    marginTop: -8,
    marginLeft: 4,
  },
});
