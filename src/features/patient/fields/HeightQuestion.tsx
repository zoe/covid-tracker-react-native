import { FormikProps } from 'formik';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import DropdownField from '@covid/components/DropdownField';
import { FieldWrapper } from '@covid/components/Screen';
import { ValidatedTextInput } from '@covid/components/ValidatedTextInput';
import { ValidationError } from '@covid/components/ValidationError';
import { isUSCountry, ICoreService } from '@covid/core/user/UserService';
import i18n from '@covid/locale/i18n';
import { RegularText } from '@covid/components/Text';
import { container } from '@covid/provider/services';
import { Services } from '@covid/provider/services.types';

export interface HeightData {
  height: string;
  feet: string;
  inches: string;
  heightUnit: string;
}

interface FCWithStatic<P> extends React.FC<P> {
  initialFormValues: () => HeightData;
}

interface Props {
  formikProps: FormikProps<HeightData>;
}

const HeightInInches: React.FC<Props> = ({ formikProps }) => {
  return (
    <View style={styles.primaryFieldRow}>
      <View style={styles.feetField}>
        <ValidatedTextInput
          placeholder={i18n.t('placeholder-feet')}
          value={formikProps.values.feet}
          onChangeText={formikProps.handleChange('feet')}
          onBlur={formikProps.handleBlur('feet')}
          error={formikProps.touched.feet && formikProps.errors.feet}
          returnKeyType="next"
          onSubmitEditing={() => {}}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.inchesField}>
        <ValidatedTextInput
          placeholder={i18n.t('placeholder-inches')}
          value={formikProps.values.inches}
          onChangeText={formikProps.handleChange('inches')}
          onBlur={formikProps.handleBlur('inches')}
          error={formikProps.touched.inches && formikProps.errors.inches}
          returnKeyType="next"
          onSubmitEditing={() => {}}
          keyboardType="numeric"
        />
      </View>
    </View>
  );
};

const HeightInCm: React.FC<Props> = ({ formikProps }) => {
  return (
    <View style={styles.cmField}>
      <ValidatedTextInput
        placeholder={i18n.t('placeholder-height')}
        value={formikProps.values.height}
        onChangeText={formikProps.handleChange('height')}
        onBlur={formikProps.handleBlur('height')}
        error={formikProps.touched.height && formikProps.errors.height}
        returnKeyType="next"
        onSubmitEditing={() => {}}
        keyboardType="numeric"
      />
    </View>
  );
};

export const HeightQuestion: FCWithStatic<Props> = ({ formikProps }) => {
  return (
    <FieldWrapper style={styles.fieldWrapper}>
      <RegularText>{i18n.t('your-height')}</RegularText>
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
              onlyPicker
              selectedValue={formikProps.values.heightUnit}
              onValueChange={formikProps.handleChange('heightUnit')}
              items={[
                { label: 'ft', value: 'ft' },
                { label: 'cm', value: 'cm' },
              ]}
            />
          </View>
        </View>
      )}
      {formikProps.touched.height && formikProps.errors.height && <ValidationError error={formikProps.errors.height} />}
      {formikProps.touched.feet && formikProps.errors.feet && <ValidationError error={formikProps.errors.feet} />}
      {formikProps.touched.inches && formikProps.errors.inches && <ValidationError error={formikProps.errors.inches} />}
      {formikProps.touched.heightUnit && formikProps.errors.heightUnit && (
        <ValidationError error={formikProps.errors.heightUnit} />
      )}
    </FieldWrapper>
  );
};

HeightQuestion.initialFormValues = () => {
  const features = container.get<ICoreService>(Services.User).getConfig();
  return {
    height: '',
    feet: '',
    inches: '',
    heightUnit: features.defaultHeightUnit,
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

  cmField: {
    flex: 6,
  },

  primaryFieldRow: {
    flex: 6,
    flexDirection: 'row',
  },

  feetField: {
    flex: 5,
    marginRight: 4,
  },

  inchesField: {
    marginLeft: 4,
    flex: 5,
  },

  unitsField: {
    flex: 2,
    margin: -8,
  },
});
