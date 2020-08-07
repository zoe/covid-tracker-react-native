import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { Form, Text } from 'native-base';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { PickerItemProps, View } from 'react-native';

import { GenericTextField } from '@covid/components/GenericTextField';
import Screen, { Header } from '@covid/components/Screen';
import { BrandedButton, ErrorText, HeaderText, SecondaryText } from '@covid/components/Text';
import i18n from '@covid/locale/i18n';
import editProfileCoordinator from '@covid/features/multi-profile/edit-profile/EditProfileCoordinator';
import { PatientInfosRequest } from '@covid/core/user/dto/UserAPIContracts';
import YesNoField from '@covid/components/YesNoField';
import DropdownField from '@covid/components/DropdownField';

import { ScreenParamList } from '../../ScreenParamList';

type RenderProps = {
  navigation: StackNavigationProp<ScreenParamList, 'EditLocation'>;
  route: RouteProp<ScreenParamList, 'EditLocation'>;
};

type CountryData = {
  code: string;
  name: string;
};

export const EditLocationScreen: React.FC<RenderProps> = (props) => {
  const [errorMessage, setErrorMessage] = useState('');

  const handlePostcodeUpdate = (postcode: string) => {
    //TODO Handle other field updates

    const infos: Partial<PatientInfosRequest> = {
      postcode,
    };

    editProfileCoordinator
      .updatePatientInfo(infos)
      .then(() => {
        editProfileCoordinator.gotoNextScreen(props.route.name);
      })
      .catch((error) => {
        setErrorMessage(i18n.t('something-went-wrong'));
      });
  };

  const countryList: PickerItemProps[] = require('country-list')
    .getData()
    .map((countryData: CountryData) => {
      return {
        label: countryData.name,
        value: countryData.code,
      };
    });

  return (
    <>
      <Screen profile={props.route.params.patientData.profile} navigation={props.navigation} simpleCallout>
        <Header>
          <HeaderText style={{ marginBottom: 12 }}>{i18n.t('edit-profile.location.title')}</HeaderText>
        </Header>

        <Formik
          initialValues={{
            postcode: editProfileCoordinator.patientData.patientInfo!.postcode,
            differentAddress: editProfileCoordinator.patientData.patientInfo!.current_postcode
              ? 'yes'
              : editProfileCoordinator.patientData.patientInfo!.current_country
              ? 'yes'
              : 'no',
            stillInUK: editProfileCoordinator.patientData.patientInfo!.current_country ? 'no' : 'yes',
            currentLocation: editProfileCoordinator.patientData.patientInfo!.current_postcode,
            currentCountry: editProfileCoordinator.patientData.patientInfo!.current_country,
          }}
          validationSchema={Yup.object().shape({
            postcode: Yup.string().required(i18n.t('required-postcode')).max(8, i18n.t('postcode-too-long')),
            differentAddress: Yup.string().required(),
            stillInUK: Yup.string().when('differentAddress', {
              is: 'no',
              then: Yup.string().required(),
            }),
            currentLocation: Yup.string().when(['stillInUK', 'differentAddress'], {
              is: (stillInUK: string, differentAddress: string) => {
                return stillInUK === 'yes' && differentAddress === 'yes';
              },
              then: Yup.string().required(),
            }),
            currentCountry: Yup.string().when('stillInUK', {
              is: (stillInUK: string, differentAddress: string) => {
                return stillInUK === 'no' && differentAddress === 'yes';
              },
              then: Yup.string().required(),
            }),
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
                <YesNoField
                  label={i18n.t('edit-profile.location.not-current-address')}
                  selectedValue={props.values.differentAddress}
                  onValueChange={props.handleChange('differentAddress')}
                />
                {props.values.differentAddress === 'yes' && (
                  <YesNoField
                    label={i18n.t('edit-profile.location.still-in-country')}
                    selectedValue={props.values.stillInUK}
                    onValueChange={props.handleChange('stillInUK')}
                  />
                )}
                {props.values.stillInUK === 'yes' && props.values.differentAddress === 'yes' && (
                  <GenericTextField
                    formikProps={props}
                    label={i18n.t('edit-profile.location.other-postcode')}
                    placeholder={i18n.t('placeholder-postcode')}
                    name="currentLocation"
                    inputProps={{ autoCompleteType: 'postal-code' }}
                    showError
                  />
                )}
                {props.values.stillInUK === 'no' && props.values.differentAddress === 'yes' && (
                  <DropdownField
                    selectedValue={props.values.currentCountry}
                    onValueChange={props.handleChange('currentCountry')}
                    label={i18n.t('edit-profile.location.select-country')}
                    items={countryList}
                    error={props.touched.currentCountry && props.errors.currentCountry}
                  />
                )}
                <View style={{ height: 100 }} />
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
