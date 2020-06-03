import { userService } from '@covid/Services';
import DropdownField from '@covid/components/DropdownField';
import { FieldWrapper } from '@covid/components/Screen';
import { ValidatedTextInput } from '@covid/components/ValidatedTextInput';
import { ValidationError } from '@covid/components/ValidationError';
import { isUSCountry } from '@covid/core/user/UserService';
import i18n from '@covid/locale/i18n';
import { FormikProps } from 'formik';
import { Item, Label } from 'native-base';
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

export interface WeightData {
  weight: string;
  stones: string;
  pounds: string;
  weightUnit: string;
}

interface Props {
  formikProps: FormikProps<WeightData>;
}

export class WeightQuestion extends Component<Props, object> {
  static initialFormValues = () => {
    const features = userService.getConfig();
    return {
      weight: '',
      stones: '',
      pounds: '',
      weightUnit: features.defaultWeightUnit,
    };
  };

  render() {
    const props = this.props.formikProps;
    return (
      <FieldWrapper>
        <Item stackedLabel style={styles.textItemStyle}>
          <Label>{i18n.t('your-weight')}</Label>
          {isUSCountry() ? (
            <ValidatedTextInput
              placeholder={i18n.t('placeholder-pounds')}
              value={props.values.pounds}
              onChangeText={props.handleChange('pounds')}
              onBlur={props.handleBlur('pounds')}
              error={props.touched.pounds && props.errors.pounds}
              returnKeyType="next"
              onSubmitEditing={() => {}}
              keyboardType="numeric"
            />
          ) : (
            <View style={styles.fieldRow}>
              {props.values.weightUnit === 'kg' ? (
                <View style={styles.primaryField}>
                  <ValidatedTextInput
                    placeholder={i18n.t('placeholder-weight')}
                    value={props.values.weight}
                    onChangeText={props.handleChange('weight')}
                    onBlur={props.handleBlur('weight')}
                    error={props.touched.weight && props.errors.weight}
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
                      value={props.values.stones}
                      onChangeText={props.handleChange('stones')}
                      onBlur={props.handleBlur('stones')}
                      error={props.touched.stones && props.errors.stones}
                      returnKeyType="next"
                      onSubmitEditing={() => {}}
                      keyboardType="numeric"
                    />
                  </View>
                  <View style={styles.tertiaryField}>
                    <ValidatedTextInput
                      placeholder={i18n.t('placeholder-pounds')}
                      value={props.values.pounds}
                      onChangeText={props.handleChange('pounds')}
                      onBlur={props.handleBlur('pounds')}
                      error={props.touched.pounds && props.errors.pounds}
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
                  selectedValue={props.values.weightUnit}
                  onValueChange={props.handleChange('weightUnit')}
                  items={[
                    { label: 'lbs', value: 'lbs' },
                    { label: 'kg', value: 'kg' },
                  ]}
                />
              </View>
            </View>
          )}
        </Item>
        {props.touched.weight && props.errors.weight && <ValidationError error={props.errors.weight} />}
        {props.touched.pounds && props.errors.pounds && <ValidationError error={props.errors.pounds} />}
        {props.touched.stones && props.errors.stones && <ValidationError error={props.errors.stones} />}
        {props.touched.weightUnit && props.errors.weightUnit && <ValidationError error={props.errors.weightUnit} />}
      </FieldWrapper>
    );
  }
}

const styles = StyleSheet.create({
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
  },
});
