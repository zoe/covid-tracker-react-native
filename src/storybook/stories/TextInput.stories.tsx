import { BrandedButton } from '@covid/components';
import { GenericTextField } from '@covid/components/GenericTextField';
import i18n from '@covid/locale/i18n';
import { sizes } from '@covid/themes';
import { storiesOf } from '@storybook/react-native';
import { Formik } from 'formik';
import * as React from 'react';
import { ScrollView, Text, View } from 'react-native';

const onSubmit = () => {};

storiesOf('Text input', module).add('default', () => (
  <ScrollView overScrollMode="never">
    <Formik
      initialValues={{
        input: '',
      }}
      onSubmit={onSubmit}
    >
      {(props) => (
        <View style={{ marginHorizontal: sizes.m }}>
          <View style={{ marginVertical: sizes.m }}>
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
  <ScrollView overScrollMode="never">
    <Formik
      initialValues={{
        input: '',
      }}
      onSubmit={onSubmit}
    >
      {(props) => (
        <View style={{ marginHorizontal: sizes.m }}>
          <View style={{ marginVertical: sizes.m }}>
            <GenericTextField
              formikProps={props}
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
          <BrandedButton onPress={props.handleSubmit}>
            <Text>{i18n.t('update-profile')}</Text>
          </BrandedButton>
        </View>
      )}
    </Formik>
  </ScrollView>
));
