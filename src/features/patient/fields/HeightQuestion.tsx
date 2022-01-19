import DropdownField from '@covid/components/DropdownField';
import { requiredFormMarker } from '@covid/components/Form';
import { FieldLabelRedesigned, RegularText } from '@covid/components/Text';
import { ValidatedTextInput } from '@covid/components/ValidatedTextInput';
import { ValidationError } from '@covid/components/ValidationError';
import { isUSCountry, localisationService } from '@covid/core/localisation/LocalisationService';
import i18n from '@covid/locale/i18n';
import { sizes } from '@covid/themes';
import { FormikProps } from 'formik';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';

export interface IHeightData {
  height: string;
  feet: string;
  inches: string;
  heightUnit: string;
}

interface IFCWithStatic<P> extends React.FC<P> {
  getInitialFormValues: () => IHeightData;
}

interface IProps {
  formikProps: FormikProps<IHeightData>;
  label?: string;
  redesign?: boolean;
}

const HeightInInches: React.FC<IProps> = ({ formikProps }) => {
  return (
    <View style={styles.primaryFieldRow}>
      <View style={styles.feetField}>
        <ValidatedTextInput
          error={formikProps.touched.feet && !!formikProps.errors.feet}
          keyboardType="numeric"
          onBlur={formikProps.handleBlur('feet')}
          onChangeText={formikProps.handleChange('feet')}
          onSubmitEditing={() => {}}
          placeholder={i18n.t('placeholder-feet')}
          returnKeyType="next"
          testID="input-height-feet"
          value={formikProps.values.feet}
        />
      </View>
      <View style={styles.inchesField}>
        <ValidatedTextInput
          error={formikProps.touched.inches && !!formikProps.errors.inches}
          keyboardType="numeric"
          onBlur={formikProps.handleBlur('inches')}
          onChangeText={formikProps.handleChange('inches')}
          onSubmitEditing={() => {}}
          placeholder={i18n.t('placeholder-inches')}
          returnKeyType="next"
          testID="input-height-inches"
          value={formikProps.values.inches}
        />
      </View>
    </View>
  );
};

const HeightInCm: React.FC<IProps> = ({ formikProps }) => {
  return (
    <View style={styles.cmField}>
      <ValidatedTextInput
        error={formikProps.touched.height && !!formikProps.errors.height}
        keyboardType="numeric"
        onBlur={formikProps.handleBlur('height')}
        onChangeText={formikProps.handleChange('height')}
        onSubmitEditing={() => {}}
        placeholder={i18n.t('placeholder-height')}
        returnKeyType="next"
        testID="input-height-cm"
        value={formikProps.values.height}
      />
    </View>
  );
};

export const HeightQuestion: IFCWithStatic<IProps> = ({ formikProps, label, redesign }) => {
  return (
    <View style={redesign ? styles.viewRedesign : styles.view}>
      {redesign ? (
        <FieldLabelRedesigned>
          {label}
          {requiredFormMarker}
        </FieldLabelRedesigned>
      ) : (
        <RegularText>
          {i18n.t('your-height')}
          {requiredFormMarker}
        </RegularText>
      )}

      {isUSCountry() ? (
        <HeightInInches formikProps={formikProps} />
      ) : (
        <View style={styles.fieldRow}>
          {formikProps.values.heightUnit === 'cm' ? (
            <HeightInCm formikProps={formikProps} />
          ) : (
            <HeightInInches formikProps={formikProps} />
          )}
          <View style={styles.unitsField}>
            <DropdownField
              hideLabel
              items={[
                { label: 'ft', value: 'ft' },
                { label: 'cm', value: 'cm' },
              ]}
              onValueChange={formikProps.handleChange('heightUnit')}
              selectedValue={formikProps.values.heightUnit}
              style={redesign ? styles.noMarginBottom : null}
            />
          </View>
        </View>
      )}
      {formikProps.touched.height && formikProps.errors.height ? (
        <ValidationError error={formikProps.errors.height} />
      ) : null}
      {formikProps.touched.feet && formikProps.errors.feet ? <ValidationError error={formikProps.errors.feet} /> : null}
      {formikProps.touched.inches && formikProps.errors.inches ? (
        <ValidationError error={formikProps.errors.inches} />
      ) : null}
      {formikProps.touched.heightUnit && formikProps.errors.heightUnit ? (
        <ValidationError error={formikProps.errors.heightUnit} />
      ) : null}
    </View>
  );
};

HeightQuestion.getInitialFormValues = () => {
  const config = localisationService.getConfig();
  return {
    feet: '',
    height: '',
    heightUnit: config?.defaultHeightUnit || '',
    inches: '',
  };
};

const styles = StyleSheet.create({
  cmField: {
    flex: 6,
    marginRight: sizes.xxs,
  },
  feetField: {
    flex: 5,
    marginRight: sizes.xxs,
  },
  fieldRow: {
    flexDirection: 'row',
  },
  inchesField: {
    flex: 5,
    marginHorizontal: sizes.xxs,
  },
  noMarginBottom: {
    marginBottom: 0,
  },
  primaryFieldRow: {
    flex: 6,
    flexDirection: 'row',
  },
  textItemStyle: {
    borderColor: 'transparent',
  },
  unitsField: {
    flex: 2,
    marginLeft: sizes.xxs,
    marginTop: -16,
  },
  view: {
    flex: 1,
    marginVertical: sizes.m,
  },
  viewRedesign: {
    flex: 1,
  },
});
