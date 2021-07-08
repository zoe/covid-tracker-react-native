import { BrandedButton } from '@covid/components';
import { FormWrapper } from '@covid/components/Forms';
import { GenericTextField } from '@covid/components/GenericTextField';
import Screen, { Header } from '@covid/components/Screen';
import { HeaderText, SecondaryText } from '@covid/components/Text';
import { ScreenParamList } from '@covid/features';
import i18n from '@covid/locale/i18n';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Formik } from 'formik';
import * as React from 'react';
import { View } from 'react-native';
import * as Yup from 'yup';

const initialFormValues = {
  name: '',
};

interface FormData {
  name: string;
}

type RenderProps = {
  navigation: StackNavigationProp<ScreenParamList, 'CreateProfile'>;
  route: RouteProp<ScreenParamList, 'CreateProfile'>;
};

export default class CreateProfileScreen extends React.Component<RenderProps> {
  registerSchema = Yup.object().shape({
    name: Yup.string().required().max(32, i18n.t('profile-name-too-long')),
  });

  handleClick = (formData: FormData) => {
    this.props.navigation.navigate('AdultOrChild', {
      avatarName: this.props.route.params?.avatarName,
      profileName: formData.name,
    });
  };

  render() {
    return (
      <Screen showBackButton navigation={this.props.navigation} testID="create-profile-screen">
        <Header>
          <HeaderText style={{ marginBottom: 12 }}>{i18n.t('create-profile-title')}</HeaderText>
          <SecondaryText>{i18n.t('create-profile-text')}</SecondaryText>
        </Header>

        <Formik
          validateOnBlur
          validateOnChange
          validateOnMount
          initialValues={initialFormValues}
          onSubmit={(values: FormData) => {
            return this.handleClick(values);
          }}
          validationSchema={this.registerSchema}
        >
          {(props) => {
            return (
              <FormWrapper hasRequiredFields>
                <View style={{ marginHorizontal: 16 }}>
                  <GenericTextField
                    required
                    formikProps={props}
                    name="name"
                    placeholder={i18n.t('create-profile-placeholder')}
                    testID="input-profile-name"
                  />
                </View>
                <BrandedButton enabled={props.isValid} onPress={props.handleSubmit} testID="button-submit">
                  {i18n.t('create-profile-button')}
                </BrandedButton>
              </FormWrapper>
            );
          }}
        </Formik>
      </Screen>
    );
  }
}
