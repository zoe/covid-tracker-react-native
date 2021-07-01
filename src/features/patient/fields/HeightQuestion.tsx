import DropdownField from '@covid/components/DropdownField';
import { requiredFormMarker } from '@covid/components/Forms';
import { FieldWrapper } from '@covid/components/Screen';
import { RegularText } from '@covid/components/Text';
import { ValidatedTextInput } from '@covid/components/ValidatedTextInput';
import { ValidationError } from '@covid/components/ValidationError';
import { isUSCountry, localisationService } from '@covid/core/localisation/LocalisationService';
import i18n from '@covid/locale/i18n';
import { FormikProps } from 'formik';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';

export interface IHeightData {
  height: string;
  feet: string;
  inches: string;
  heightUnit: string;
}

interface FCWithStatic<P> extends React.FC<P> {
  initialFormValues: () => IHeightData;
}

interface Props {
  formikProps: FormikProps<IHeightData>;
}

const HeightInInches: React.FC<Props> = ({ formikProps }) => {
  return (
    <View style={styles.primaryFieldRow}>
      <View style={styles.feetField}>
        <ValidatedTextInput
          error={formikProps.touched.feet && formikProps.errors.feet}
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
          error={formikProps.touched.inches && formikProps.errors.inches}
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

const HeightInCm: React.FC<Props> = ({ formikProps }) => {
  return (
    <View style={styles.cmField}>
      <ValidatedTextInput
        error={formikProps.touched.height && formikProps.errors.height}
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

export const HeightQuestion: FCWithStatic<Props> = ({ formikProps }) => {
  return (
    <FieldWrapper style={styles.fieldWrapper}>
      <RegularText>
        {i18n.t('your-height')}
        {requiredFormMarker}
      </RegularText>
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
    </FieldWrapper>
  );
};

HeightQuestion.initialFormValues = () => {
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
    marginRight: 4,
  },

  feetField: {
    flex: 5,
    marginRight: 4,
  },

  fieldRow: {
    flexDirection: 'row',
  },

  fieldWrapper: {
    flex: 1,
  },

  inchesField: {
    flex: 5,
    marginHorizontal: 4,
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
    marginLeft: 4,
    marginTop: -8,
  },
});
