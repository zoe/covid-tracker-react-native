import { BrandedButton } from '@covid/components';
import { DiabetesQuestions, IDiabetesData } from '@covid/features/patient/fields/DiabetesQuestions';
import i18n from '@covid/locale/i18n';
import { storiesOf } from '@storybook/react-native';
import { Formik, FormikProps } from 'formik';
import React from 'react';
import { Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

storiesOf('DiabetesQuestions', module).add('default view', () => {
  return (
    <ScrollView>
      <Formik
        initialValues={{
          ...DiabetesQuestions.initialFormValues(),
        }}
        onSubmit={() => {}}
        validationSchema={DiabetesQuestions.schema()}
      >
        {(props) => (
          <View style={{ marginHorizontal: 16 }}>
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
