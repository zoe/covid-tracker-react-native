import React from 'react';
import { Formik } from 'formik';
import { View, Text } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import { action, HandlerFunction } from '@storybook/addon-actions';
import { ScrollView } from 'react-native-gesture-handler';

import { GenericTextField } from '@covid/components/GenericTextField';
import { BrandedButton } from '@covid/components/Text';
import i18n from '@covid/locale/i18n';

const ValueChangeHandler = (): HandlerFunction => action('submit');

storiesOf('Text input', module).add('default', () => (
  <ScrollView>
    <Formik
      initialValues={{
        input: '',
      }}
      onSubmit={(values: any) => {}}>
      {(props) => (
        <View style={{ marginHorizontal: 16 }}>
          <View style={{ marginVertical: 16 }}>
            <GenericTextField
              formikProps={props}
              placeholder="Some placeholder"
              label="Some label"
              name="input"
              keyboardType="numeric"
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
      onSubmit={(values: any) => {}}>
      {(props) => (
        <View style={{ marginHorizontal: 16 }}>
          <View style={{ marginVertical: 16 }}>
            <GenericTextField
              formikProps={props}
              placeholder="Some placeholder"
              label="Some label"
              name="input"
              keyboardType="numeric"
              inputProps={{
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
