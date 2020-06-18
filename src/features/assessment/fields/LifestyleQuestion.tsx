import { FormikProps } from 'formik';
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import i18n from '@covid/locale/i18n';
import { FieldWrapper } from '@covid/components/Screen';
import DropdownField from '@covid/components/DropdownField';
import { LifestyleRequest } from '@covid/core/assessment/dto/LifestyleRequest';
import { isUSCountry } from '@covid/core/user/UserService';
import { ValidatedTextInput } from '@covid/components/ValidatedTextInput';
import { userService } from '@covid/Services';
import { cleanFloatVal } from '@covid/core/utils/number';

export interface LifestyleData {
  weightChange: string;
  dietChange: string;
  snackingChange: string;
  activityChange: string;
  alcoholChange: string;
  pounds: string;
  stones: string;
  weight: string;
  weightUnit: string;
}

interface Props {
  formikProps: FormikProps<LifestyleData>;
}

export enum ChangeValue {
  INCREASED = 'increased',
  DECREASED = 'decreased',
  SAME = 'same',
  PFNTS = 'pfnts',
  NO_ALCOHOL = 'no_alcohol',
}

export class LifestyleQuestion extends Component<Props, object> {
  static initialFormValues = (): LifestyleData => {
    const features = userService.getConfig();

    return {
      weightChange: '',
      dietChange: '',
      snackingChange: '',
      activityChange: '',
      alcoholChange: '',
      weight: '',
      stones: '',
      pounds: '',
      weightUnit: features.defaultWeightUnit,
    };
  };

  static createMasksDTO = (formData: LifestyleData) => {
    let dto = {
      weight_change: formData.weightChange,
      diet_change: formData.dietChange,
      snacking_change: formData.snackingChange,
      activity_change: formData.activityChange,
      alcohol_change: formData.alcoholChange,
    } as Partial<LifestyleRequest>;

    if (formData.weightUnit === 'lbs') {
      let pounds = cleanFloatVal(formData.pounds);
      if (formData.stones) {
        const stones = cleanFloatVal(formData.stones) || 0;
        pounds += stones * 14;
      }
      dto = { ...dto, weight_change_pounds: pounds };
    } else {
      dto = { ...dto, weight_change_kg: cleanFloatVal(formData.weight) };
    }
    return dto;
  };

  weightChangeOptions = [
    { label: i18n.t('lifestyle.weight-change.increased'), value: ChangeValue.INCREASED },
    { label: i18n.t('lifestyle.weight-change.decreased'), value: ChangeValue.DECREASED },
    { label: i18n.t('lifestyle.weight-change.same'), value: ChangeValue.SAME },
    { label: i18n.t('lifestyle.weight-change.pfnts'), value: ChangeValue.PFNTS },
  ];

  dietChangeOptions = [
    { label: i18n.t('lifestyle.diet-change.increased'), value: ChangeValue.INCREASED },
    { label: i18n.t('lifestyle.diet-change.decreased'), value: ChangeValue.DECREASED },
    { label: i18n.t('lifestyle.diet-change.same'), value: ChangeValue.SAME },
    { label: i18n.t('lifestyle.diet-change.pfnts'), value: ChangeValue.PFNTS },
  ];

  snackChangeOptions = [
    { label: i18n.t('lifestyle.snacking-change.increased'), value: ChangeValue.INCREASED },
    { label: i18n.t('lifestyle.snacking-change.decreased'), value: ChangeValue.DECREASED },
    { label: i18n.t('lifestyle.snacking-change.same'), value: ChangeValue.SAME },
    { label: i18n.t('lifestyle.snacking-change.pfnts'), value: ChangeValue.PFNTS },
  ];

  alcoholChangeOptions = [
    { label: i18n.t('lifestyle.alcohol-change.increased'), value: ChangeValue.INCREASED },
    { label: i18n.t('lifestyle.alcohol-change.decreased'), value: ChangeValue.DECREASED },
    { label: i18n.t('lifestyle.alcohol-change.no-alcohol'), value: ChangeValue.NO_ALCOHOL },
    { label: i18n.t('lifestyle.alcohol-change.same'), value: ChangeValue.SAME },
    { label: i18n.t('lifestyle.alcohol-change.pfnts'), value: ChangeValue.PFNTS },
  ];

  activityChangeOptions = [
    { label: i18n.t('lifestyle.activity-change.increased'), value: ChangeValue.INCREASED },
    { label: i18n.t('lifestyle.activity-change.decreased'), value: ChangeValue.DECREASED },
    { label: i18n.t('lifestyle.activity-change.same'), value: ChangeValue.SAME },
    { label: i18n.t('lifestyle.activity-change.pfnts'), value: ChangeValue.PFNTS },
  ];

  render() {
    const { formikProps } = this.props;
    return (
      <FieldWrapper>
        <DropdownField
          label={i18n.t('lifestyle.weight-change.question')}
          selectedValue={formikProps.values.weightChange}
          onValueChange={formikProps.handleChange('weightChange')}
          error={formikProps.touched.weightChange && formikProps.errors.weightChange}
          items={this.weightChangeOptions}
        />

        {(formikProps.values.weightChange === ChangeValue.INCREASED ||
          formikProps.values.weightChange === ChangeValue.DECREASED) && (
          <>
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
          </>
        )}

        <DropdownField
          label={i18n.t('lifestyle.diet-change.question')}
          selectedValue={formikProps.values.dietChange}
          onValueChange={formikProps.handleChange('dietChange')}
          error={formikProps.touched.dietChange && formikProps.errors.dietChange}
          items={this.dietChangeOptions}
        />

        <DropdownField
          label={i18n.t('lifestyle.snacking-change.question')}
          selectedValue={formikProps.values.snackingChange}
          onValueChange={formikProps.handleChange('snackingChange')}
          error={formikProps.touched.snackingChange && formikProps.errors.snackingChange}
          items={this.snackChangeOptions}
        />

        <DropdownField
          label={i18n.t('lifestyle.alcohol-change.question')}
          selectedValue={formikProps.values.alcoholChange}
          onValueChange={formikProps.handleChange('alcoholChange')}
          error={formikProps.touched.alcoholChange && formikProps.errors.alcoholChange}
          items={this.alcoholChangeOptions}
        />

        <DropdownField
          label={i18n.t('lifestyle.activity-change.question')}
          selectedValue={formikProps.values.activityChange}
          onValueChange={formikProps.handleChange('activityChange')}
          error={formikProps.touched.activityChange && formikProps.errors.activityChange}
          items={this.activityChangeOptions}
        />
      </FieldWrapper>
    );
  }
}

const styles = StyleSheet.create({
  fieldRow: {
    flexDirection: 'row',
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

  stonesField: {
    flex: 5,
    marginRight: 4,
  },

  poundsField: {
    flex: 5,
    marginLeft: 4,
  },

  secondaryField: {
    flex: 2,
    margin: -8,
  },
});
