import { BrandedButton } from '@covid/components';
import { DiabetesQuestions, IDiabetesData } from '@covid/features/patient/fields/DiabetesQuestions';
import i18n from '@covid/locale/i18n';
import { storiesOf } from '@storybook/react-native';
import { Formik, FormikProps } from 'formik';
import { View } from 'native-base';
import React from 'react';
import { Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

function onSubmit() {}

storiesOf('DiabetesQuestions', module).add('default view', () => {
  const initialValues = DiabetesQuestions.initialFormValues();
  const validationSchema = DiabetesQuestions.schema();
  return (
    <ScrollView>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        {(formikProps) => (
          <View style={{ marginHorizontal: 16 }}>
            <DiabetesQuestions formikProps={formikProps as FormikProps<IDiabetesData>} />
            <BrandedButton onPress={formikProps.handleSubmit}>
              <Text>{i18n.t('update-profile')}</Text>
            </BrandedButton>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
});
