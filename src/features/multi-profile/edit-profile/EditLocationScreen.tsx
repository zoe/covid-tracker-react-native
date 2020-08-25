import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { Form, Text } from 'native-base';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { GenericTextField } from '@covid/components/GenericTextField';
import Screen, { Header } from '@covid/components/Screen';
import { BrandedButton, ErrorText, HeaderText, SecondaryText } from '@covid/components/Text';
import i18n from '@covid/locale/i18n';
import editProfileCoordinator from '@covid/features/multi-profile/edit-profile/EditProfileCoordinator';
import { PatientInfosRequest } from '@covid/core/user/dto/UserAPIContracts';
import { useAppDispatch } from '@covid/core/state/store';
import { fetchStartUpInfo } from '@covid/core/content/state/slices';
import { ScreenParamList } from '@covid/features/ScreenParamList';

type RenderProps = {
  navigation: StackNavigationProp<ScreenParamList, 'EditLocation'>;
  route: RouteProp<ScreenParamList, 'EditLocation'>;
};

export const EditLocationScreen: React.FC<RenderProps> = (props) => {
  const [errorMessage, setErrorMessage] = useState('');

  const dispatch = useAppDispatch();

  const handlePostcodeUpdate = (postcode: string) => {
    const infos: Partial<PatientInfosRequest> = {
      postcode,
    };

    editProfileCoordinator
      .updatePatientInfo(infos)
      .then(() => {
        dispatch(fetchStartUpInfo());
        editProfileCoordinator.gotoNextScreen(props.route.name);
      })
      .catch(() => {
        setErrorMessage(i18n.t('something-went-wrong'));
      });
  };

  return (
    <>
      <Screen profile={props.route.params.patientData.profile} navigation={props.navigation} simpleCallout>
        <Header>
          <HeaderText style={{ marginBottom: 12 }}>{i18n.t('edit-profile.location.title')}</HeaderText>
        </Header>

        <Formik
          initialValues={{ postcode: editProfileCoordinator.patientData.patientInfo!.postcode }}
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
