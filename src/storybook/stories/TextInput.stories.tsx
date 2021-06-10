import { BrandedButton } from '@covid/components';
import { GenericTextField } from '@covid/components/GenericTextField';
import i18n from '@covid/locale/i18n';
import { action, HandlerFunction } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react-native';
import { Formik } from 'formik';
import React from 'react';
import { Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const ValueChangeHandler = (): HandlerFunction => action('submit');

storiesOf('Text input', module).add('default', () => (
  <ScrollView>
    <Formik
      initialValues={{
        input: '',
      }}
      onSubmit={(values: any) => {}}
    >
      {(props) => (
        <View style={{ marginHorizontal: 16 }}>
          <View style={{ marginVertical: 16 }}>
            <GenericTextField
              formikProps={props}
              keyboardType="numeric"
              label="Some label"
              name="input"
              placeholder="Some placeholder"
            />
          </View>
          <BrandedButton onPress={props.handleSubmit}>
            <Text>{i18n.t('update-profile')}</Text>
          </BrandedButton>
        </View>
      )}
    </Formik>
  </ScrollView>
));

storiesOf('Text input', module).add('multi-line', () => (
  <ScrollView>
    <Formik
      initialValues={{
        input: '',
      }}
      onSubmit={(values: any) => {}}
    >
      {(props) => (
        <View style={{ marginHorizontal: 16 }}>
          <View style={{ marginVertical: 16 }}>
            <GenericTextField
              formikProps={props}
              keyboardType="numeric"
              label="Some label"
              name="input"
              placeholder="Some placeholder"
              textInputProps={{
                multiline: true,
                numberOfLines: 3,
              }}
            />
          </View>
          <BrandedButton onPress={props.handleSubmit}>
            <Text>{i18n.t('update-profile')}</Text>
          </BrandedButton>
        </View>
      )}
    </Formik>
  </ScrollView>
));
