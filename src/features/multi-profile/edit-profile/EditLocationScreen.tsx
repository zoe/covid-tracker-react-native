import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { Form, Text } from 'native-base';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { GenericTextField } from '@covid/components/GenericTextField';
import Screen, { Header } from '@covid/components/Screen';
import { BrandedButton, ErrorText, HeaderText, RegularText, SecondaryText } from '@covid/components/Text';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import { Services } from '@covid/provider/services.types';
import { ICoreService } from '@covid/core/user/UserService';
import { useInjection } from '@covid/provider/services.hooks';

import { ScreenParamList } from '../../ScreenParamList';

type RenderProps = {
  navigation: StackNavigationProp<ScreenParamList, 'EditLocation'>;
  route: RouteProp<ScreenParamList, 'EditLocation'>;
};

export const EditLocationScreen: React.FC<RenderProps> = (props) => {
  const profile = props.route.params.profile;
  const patientInfo = props.route.params.patientInfo;

  const userService = useInjection<ICoreService>(Services.User);

  const [errorMessage, setErrorMessage] = useState('');

  const handlePostcodeUpdate = (postcode: string) => {
    const infos = {
      postcode,
    };

    userService
      .updatePatient(profile.id, infos)
      .then(() => {
        NavigatorService.goBack();
        patientInfo.postcode = postcode;
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage(i18n.t('something-went-wrong'));
      });
  };

  return (
    <>
      <Screen profile={profile} navigation={props.navigation} simpleCallout>
        <Header>
          <HeaderText style={{ marginBottom: 12 }}>{i18n.t('edit-profile.location.title')}</HeaderText>
        </Header>

        <Formik
          initialValues={{ postcode: patientInfo.postcode }}
          validationSchema={Yup.object().shape({
            postcode: Yup.string().required(i18n.t('required-postcode')).max(8, i18n.t('postcode-too-long')),
          })}
          onSubmit={(values) => {
            return handlePostcodeUpdate(values.postcode);
          }}>
          {(props) => {
            return (
              <Form>
                <GenericTextField
                  formikProps={props}
                  label={i18n.t('edit-profile.location.label')}
                  placeholder={i18n.t('placeholder-postcode')}
                  name="postcode"
                  inputProps={{ autoCompleteType: 'postal-code' }}
                  showError
                />
                {
                  // TODO : How to push below to the bottom simply?
                }
                <SecondaryText style={{ textAlign: 'center' }}>
                  {i18n.t('edit-profile.location.disclaimer')}
                </SecondaryText>
                <ErrorText>{errorMessage}</ErrorText>
                <BrandedButton onPress={props.handleSubmit} hideLoading={!props.isSubmitting}>
                  <Text>{i18n.t('edit-profile.done')}</Text>
                </BrandedButton>
              </Form>
            );
          }}
        </Formik>
      </Screen>
    </>
  );
};
