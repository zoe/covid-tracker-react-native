import { BrandedButton } from '@covid/components';
import { GenericTextField } from '@covid/components/GenericTextField';
import i18n from '@covid/locale/i18n';
import { storiesOf } from '@storybook/react-native';
import { Formik } from 'formik';
import React from 'react';
import { Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const initialValues = {
  input: '',
};

function onSubmit() {}

storiesOf('Text input', module).add('default', () => (
  <ScrollView>
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {(formikProps) => (
        <View style={{ marginHorizontal: 16 }}>
          <View style={{ marginVertical: 16 }}>
            <GenericTextField
              formikProps={formikProps}
              keyboardType="numeric"
              label="Some label"
              name="input"
              placeholder="Some placeholder"
            />
          </View>
          <BrandedButton onPress={formikProps.handleSubmit}>
            <Text>{i18n.t('update-profile')}</Text>
          </BrandedButton>
        </View>
      )}
    </Formik>
  </ScrollView>
));

storiesOf('Text input', module).add('multi-line', () => (
  <ScrollView>
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {(formikProps) => (
        <View style={{ marginHorizontal: 16 }}>
          <View style={{ marginVertical: 16 }}>
            <GenericTextField
              formikProps={formikProps}
              inputProps={{
                multiline: true,
                numberOfLines: 3,
              }}
              keyboardType="numeric"
              label="Some label"
              name="input"
              placeholder="Some placeholder"
            />
          </View>
          <BrandedButton onPress={formikProps.handleSubmit}>
            <Text>{i18n.t('update-profile')}</Text>
          </BrandedButton>
        </View>
      )}
    </Formik>
  </ScrollView>
));
