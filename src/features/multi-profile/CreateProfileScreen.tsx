import { BrandedButton } from '@covid/components';
import { Form } from '@covid/components/Form';
import { GenericTextField } from '@covid/components/GenericTextField';
import { Screen } from '@covid/components/Screen';
import { HeaderText, SecondaryText } from '@covid/components/Text';
import i18n from '@covid/locale/i18n';
import { TScreenParamList } from '@covid/routes/types';
import { styling } from '@covid/themes';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Formik } from 'formik';
import * as React from 'react';
import * as Yup from 'yup';

const initialFormValues = {
  name: '',
};

interface IFormData {
  name: string;
}

type TProps = {
  navigation: StackNavigationProp<TScreenParamList, 'CreateProfile'>;
  route: RouteProp<TScreenParamList, 'CreateProfile'>;
};

export default class CreateProfileScreen extends React.Component<TProps> {
  registerSchema = Yup.object().shape({
    name: Yup.string().required().max(20, i18n.t('profile-name-too-long')),
  });

  onSubmit = (values: IFormData) => {
    this.props.navigation.navigate('AdultOrChild', {
      avatarName: this.props.route.params?.avatarName,
      profileName: values.name,
    });
  };

  render() {
    return (
      <Screen testID="create-profile-screen">
        <HeaderText style={styling.marginBottom}>{i18n.t('create-profile-title')}</HeaderText>

        <SecondaryText style={styling.marginBottomHuge}>{i18n.t('create-profile-text')}</SecondaryText>

        <Formik
          validateOnBlur
          validateOnChange
          validateOnMount
          initialValues={initialFormValues}
          onSubmit={this.onSubmit}
          validationSchema={this.registerSchema}
        >
          {(formikProps) => {
            return (
              <Form>
                <GenericTextField
                  required
                  formikProps={formikProps}
                  label={i18n.t('create-profile-label')}
                  maxLength={20}
                  name="name"
                  placeholder={i18n.t('create-profile-placeholder')}
                  style={styling.marginBottomHuge}
                  testID="input-profile-name"
                />
                <BrandedButton
                  enabled={formikProps.isValid}
                  onPress={formikProps.handleSubmit}
                  style={styling.marginTopAuto}
                  testID="button-submit"
                >
                  {i18n.t('create-profile-button')}
                </BrandedButton>
              </Form>
            );
          }}
        </Formik>
      </Screen>
    );
  }
}
