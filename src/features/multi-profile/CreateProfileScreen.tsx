import { BrandedButton } from '@covid/components';
import { GenericTextField } from '@covid/components/GenericTextField';
import Screen, { Header } from '@covid/components/Screen';
import { HeaderText, SecondaryText } from '@covid/components/Text';
import { ScreenParamList } from '@covid/features';
import i18n from '@covid/locale/i18n';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Formik, FormikHelpers } from 'formik';
import { Form } from 'native-base';
import React from 'react';
import { View } from 'react-native';
import * as Yup from 'yup';

const initialValues = {
  name: '',
};

interface FormData {
  name: string;
}

type TProps = {
  navigation: StackNavigationProp<ScreenParamList, 'CreateProfile'>;
  route: RouteProp<ScreenParamList, 'CreateProfile'>;
};

export default function CreateProfileScreen(props: TProps) {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required().max(32, i18n.t('profile-name-too-long')),
  });

  function onSubmit(values: FormData, formikHelpers: FormikHelpers<FormData>) {
    props.navigation.navigate('AdultOrChild', {
      avatarName: props.route.params.avatarName,
      profileName: values.name,
    });
    formikHelpers.setSubmitting(false);
  }

  return (
    <Screen showBackButton navigation={props.navigation}>
      <Header>
        <HeaderText style={{ marginBottom: 12 }}>{i18n.t('create-profile-title')}</HeaderText>
        <SecondaryText>{i18n.t('create-profile-text')}</SecondaryText>
      </Header>

      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        {(formikProps) => {
          return (
            <Form>
              <View style={{ marginHorizontal: 16 }}>
                <GenericTextField
                  formikProps={formikProps}
                  name="name"
                  placeholder={i18n.t('create-profile-placeholder')}
                />
              </View>

              <BrandedButton onPress={formikProps.handleSubmit}>{i18n.t('create-profile-button')}</BrandedButton>
            </Form>
          );
        }}
      </Formik>
    </Screen>
  );
}
