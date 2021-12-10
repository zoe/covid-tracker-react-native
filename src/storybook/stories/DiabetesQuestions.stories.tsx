import { BrandedButton } from '@covid/components';
import { DiabetesQuestions, IDiabetesData } from '@covid/features/patient/fields/DiabetesQuestions';
import i18n from '@covid/locale/i18n';
import { sizes } from '@covid/themes';
import { storiesOf } from '@storybook/react-native';
import { Formik, FormikProps } from 'formik';
import * as React from 'react';
import { ScrollView, Text, View } from 'react-native';

const onSubmit = () => {};

storiesOf('DiabetesQuestions', module).add('default view', () => {
  return (
    <ScrollView>
      <Formik
        initialValues={{
          ...DiabetesQuestions.getInitialFormValues(),
        }}
        onSubmit={onSubmit}
        validationSchema={DiabetesQuestions.createValidationSchema()}
      >
        {(props) => (
          <View style={{ marginHorizontal: sizes.m }}>
            <DiabetesQuestions formikProps={props as FormikProps<IDiabetesData>} />
            <BrandedButton onPress={props.handleSubmit}>
              <Text>{i18n.t('update-profile')}</Text>
            </BrandedButton>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
});
