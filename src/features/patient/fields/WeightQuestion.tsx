import { FormikProps } from 'formik';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import DropdownField from '@covid/components/DropdownField';
import { FieldWrapper } from '@covid/components/Screen';
import { ValidatedTextInput } from '@covid/components/ValidatedTextInput';
import { ValidationError } from '@covid/components/ValidationError';
import { isUSCountry } from '@covid/core/user/UserService';
import i18n from '@covid/locale/i18n';
import { userService } from '@covid/Services';
import { RegularText } from '@covid/components/Text';

export interface WeightData {
  weight: string;
  stones: string;
  pounds: string;
  weightUnit: string;
}

interface FCWithStatic<P> extends React.FC<P> {
  initialFormValues: () => WeightData;
}

interface Props {
  formikProps: FormikProps<WeightData>;
}

export const WeightQuestion: FCWithStatic<Props> = ({ formikProps }) => {
  return (
    <FieldWrapper style={styles.fieldWrapper}>
      <RegularText>{i18n.t('your-weight')}</RegularText>
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
              <View style={styles.tertiaryField}>
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
              <View style={styles.tertiaryField}>
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
      {formikProps.touched.weight && formikProps.errors.weight && <ValidationError error={formikProps.errors.weight} />}
      {formikProps.touched.pounds && formikProps.errors.pounds && <ValidationError error={formikProps.errors.pounds} />}
      {formikProps.touched.stones && formikProps.errors.stones && <ValidationError error={formikProps.errors.stones} />}
      {formikProps.touched.weightUnit && formikProps.errors.weightUnit && (
        <ValidationError error={formikProps.errors.weightUnit} />
      )}
    </FieldWrapper>
  );
};

WeightQuestion.initialFormValues = () => {
  const features = userService.getConfig();
  return {
    weight: '',
    stones: '',
    pounds: '',
    weightUnit: features.defaultWeightUnit,
  };
};

const styles = StyleSheet.create({
  fieldWrapper: {
    flex: 1,
    marginHorizontal: 16,
  },

  fieldRow: {
    flexDirection: 'row',
  },

  textItemStyle: {
    borderColor: 'transparent',
  },

  primaryField: {
    flex: 6,
  },

  primaryFieldRow: {
    flex: 6,
    flexDirection: 'row',
  },

  tertiaryField: {
    flex: 5,
    marginRight: 8,
  },

  secondaryField: {
    flex: 2,
    margin: -8,
  },
});
