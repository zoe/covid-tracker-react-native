import { BrandedButton } from '@covid/components';
import { GenericTextField } from '@covid/components/GenericTextField';
import Screen, { Header } from '@covid/components/Screen';
import { HeaderText, SecondaryText } from '@covid/components/Text';
import { ScreenParamList } from '@covid/features';
import i18n from '@covid/locale/i18n';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Formik } from 'formik';
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import * as Yup from 'yup';

const initialFormValues = {
  name: '',
};

interface IFormData {
  name: string;
}

type TProps = {
  navigation: StackNavigationProp<ScreenParamList, 'CreateProfile'>;
  route: RouteProp<ScreenParamList, 'CreateProfile'>;
};

export default class CreateProfileScreen extends Component<TProps> {
  registerSchema = Yup.object().shape({
    name: Yup.string().required().max(32, i18n.t('profile-name-too-long')),
  });

  onSubmit = (values: IFormData) => {
    this.props.navigation.navigate('AdultOrChild', {
      avatarName: this.props.route.params.avatarName,
      profileName: values.name,
    });
  };

  render() {
    return (
      <Screen showBackButton navigation={this.props.navigation}>
        <Header>
          <HeaderText style={{ marginBottom: 12 }}>{i18n.t('create-profile-title')}</HeaderText>
          <SecondaryText>{i18n.t('create-profile-text')}</SecondaryText>
        </Header>

        <Formik initialValues={initialFormValues} onSubmit={this.onSubmit} validationSchema={this.registerSchema}>
          {(props) => {
            return (
              <View style={styles.view}>
                <GenericTextField
                  formikProps={props}
                  name="name"
                  placeholder={i18n.t('create-profile-placeholder')}
                  testID="input-profile-name"
                />

                <BrandedButton onPress={props.handleSubmit} testID="button-submit">
                  {i18n.t('create-profile-button')}
                </BrandedButton>
              </View>
            );
          }}
        </Formik>
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    paddingHorizontal: 16,
  },
});
