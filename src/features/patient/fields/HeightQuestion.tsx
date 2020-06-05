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

export interface HeightData {
  height: string;
  feet: string;
  inches: string;
  heightUnit: string;
}

interface Props {
  formikProps: FormikProps<HeightData>;
}

export class HeightQuestion extends Component<Props, object> {
  static initialFormValues = () => {
    const features = userService.getConfig();
    return {
      height: '',
      feet: '',
      inches: '',
      heightUnit: features.defaultHeightUnit,
    };
  };

  render() {
    const props = this.props.formikProps;
    return (
      <FieldWrapper>
        <Item stackedLabel style={styles.textItemStyle}>
          <Label>{i18n.t('your-height')}</Label>
          {isUSCountry() ? (
            <View style={styles.primaryFieldRow}>
              <View style={styles.tertiaryField}>
                <ValidatedTextInput
                  placeholder={i18n.t('placeholder-feet')}
                  value={props.values.feet}
                  onChangeText={props.handleChange('feet')}
                  onBlur={props.handleBlur('feet')}
                  error={props.touched.feet && props.errors.feet}
                  returnKeyType="next"
                  onSubmitEditing={() => {}}
                  keyboardType="numeric"
                />
              </View>
              <View style={styles.tertiaryField}>
                <ValidatedTextInput
                  placeholder={i18n.t('placeholder-inches')}
                  value={props.values.inches}
                  onChangeText={props.handleChange('inches')}
                  onBlur={props.handleBlur('inches')}
                  error={props.touched.inches && props.errors.inches}
                  returnKeyType="next"
                  onSubmitEditing={() => {}}
                  keyboardType="numeric"
                />
              </View>
            </View>
          ) : (
            <View style={styles.fieldRow}>
              {props.values.heightUnit === 'cm' ? (
                <View style={styles.primaryField}>
                  <ValidatedTextInput
                    placeholder={i18n.t('placeholder-height')}
                    value={props.values.height}
                    onChangeText={props.handleChange('height')}
                    onBlur={props.handleBlur('height')}
                    error={props.touched.height && props.errors.height}
                    returnKeyType="next"
                    onSubmitEditing={() => {}}
                    keyboardType="numeric"
                  />
                </View>
              ) : (
                <View style={styles.primaryFieldRow}>
                  <View style={styles.tertiaryField}>
                    <ValidatedTextInput
                      placeholder={i18n.t('placeholder-feet')}
                      value={props.values.feet}
                      onChangeText={props.handleChange('feet')}
                      onBlur={props.handleBlur('feet')}
                      error={props.touched.feet && props.errors.feet}
                      returnKeyType="next"
                      onSubmitEditing={() => {}}
                      keyboardType="numeric"
                    />
                  </View>
                  <View style={styles.tertiaryField}>
                    <ValidatedTextInput
                      placeholder={i18n.t('placeholder-inches')}
                      value={props.values.inches}
                      onChangeText={props.handleChange('inches')}
                      onBlur={props.handleBlur('inches')}
                      error={props.touched.inches && props.errors.inches}
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
                  selectedValue={props.values.heightUnit}
                  onValueChange={props.handleChange('heightUnit')}
                  items={[
                    { label: 'ft', value: 'ft' },
                    { label: 'cm', value: 'cm' },
                  ]}
                />
              </View>
            </View>
          )}
        </Item>
        {props.touched.height && props.errors.height && <ValidationError error={props.errors.height} />}
        {props.touched.feet && props.errors.feet && <ValidationError error={props.errors.feet} />}
        {props.touched.inches && props.errors.inches && <ValidationError error={props.errors.inches} />}
        {props.touched.heightUnit && props.errors.heightUnit && <ValidationError error={props.errors.heightUnit} />}
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
