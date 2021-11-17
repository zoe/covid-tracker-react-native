import { BrandedButton } from '@covid/components';
import DropdownField from '@covid/components/DropdownField';
import { Form } from '@covid/components/Form';
import { GenericTextField } from '@covid/components/GenericTextField';
import { YesNoField } from '@covid/components/inputs/YesNoField';
import { Screen } from '@covid/components/Screen';
import { ErrorText, HeaderText, SecondaryText } from '@covid/components/Text';
import { fetchLocalTrendline, fetchStartUpInfo } from '@covid/core/state/contentSlice';
import { TPatientInfosRequest } from '@covid/core/user/dto/UserAPIContracts';
import { editProfileCoordinator } from '@covid/features/multi-profile/edit-profile/EditProfileCoordinator';
import { TScreenParamList } from '@covid/features/ScreenParamList';
import i18n from '@covid/locale/i18n';
import { sizes } from '@covid/themes';
import { RouteProp } from '@react-navigation/native';
import { Formik } from 'formik';
import * as React from 'react';
import { PickerItemProps, View } from 'react-native';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

type TProps = {
  route: RouteProp<TScreenParamList, 'EditLocation'>;
};

type TCountryData = {
  code: string;
  name: string;
};

type TEditLocationData = {
  postcode: string;
  differentAddress: string;
  stillInUK: string;
  currentPostcode: string;
  currentCountry: string;
};

export const EditLocationScreen: React.FC<TProps> = (props) => {
  const [errorMessage, setErrorMessage] = React.useState('');

  const dispatch = useDispatch();

  const initialFormValues: TEditLocationData = {
    currentCountry: props.route.params?.patientData?.patientInfo!.current_country_code ?? '',
    currentPostcode: props.route.params?.patientData?.patientInfo!.current_postcode ?? '',
    differentAddress: props.route.params?.patientData?.patientInfo!.current_postcode
      ? 'yes'
      : props.route.params?.patientData?.patientInfo!.current_country_code
      ? 'yes'
      : 'no',
    postcode: props.route.params?.patientData?.patientInfo!.postcode,
    stillInUK: props.route.params?.patientData?.patientInfo!.current_country_code ? 'no' : 'yes',
  };

  const validation = Yup.object().shape({
    currentCountry: Yup.string().when(['stillInUK', 'differentAddress'], {
      is: (stillInUK: string, differentAddress: string) => {
        return stillInUK === 'no' && differentAddress === 'yes';
      },
      then: Yup.string().required(i18n.t('edit-profile.location.select-country')),
    }),
    currentPostcode: Yup.string().when(['stillInUK', 'differentAddress'], {
      is: (stillInUK: string, differentAddress: string) => {
        return stillInUK === 'yes' && differentAddress === 'yes';
      },
      then: Yup.string().required(i18n.t('required-postcode')).max(8, i18n.t('postcode-too-long')),
    }),
    differentAddress: Yup.string().required(),
    postcode: Yup.string().required(i18n.t('required-postcode')).max(8, i18n.t('postcode-too-long')),
    stillInUK: Yup.string().when('differentAddress', {
      is: 'no',
      then: Yup.string().required(),
    }),
  });

  const onSubmit = async (values: TEditLocationData) => {
    const infos: Partial<TPatientInfosRequest> = {};

    if (values.differentAddress === 'no') {
      infos.postcode = values.postcode;
      infos.current_postcode = null;
      infos.current_country_code = null;
    } else if (values.stillInUK === 'yes') {
      infos.postcode = values.postcode;
      infos.current_postcode = values.currentPostcode;
      infos.current_country_code = null;
    } else {
      infos.postcode = values.postcode;
      infos.current_postcode = null;
      infos.current_country_code = values.currentCountry;
    }

    try {
      await editProfileCoordinator.updatePatientInfo(infos);
      // Refresh the trend line data because a new postcode corresponds to different trend line data.
      await dispatch(fetchLocalTrendline());
      // Refresh the startup info because a new postcode corresponds to changes in the local data.
      await dispatch(fetchStartUpInfo());
      editProfileCoordinator.gotoNextScreen(props.route.name);
    } catch (_) {
      setErrorMessage(i18n.t('something-went-wrong'));
    }
  };

  const countryList: PickerItemProps[] = require('country-list')
    .getData()
    .map((countryData: TCountryData) => {
      return {
        label: countryData.name,
        value: countryData.code,
      };
    })
    .sort((a: PickerItemProps, b: PickerItemProps) => (a.label > b.label ? 1 : b.label > a.label ? -1 : 0));

  return (
    <Screen simpleCallout profile={props.route.params?.patientData?.profile} testID="edit-location-screen">
      <HeaderText style={{ marginBottom: sizes.s }}>{i18n.t('edit-profile.location.title')}</HeaderText>

      <Formik initialValues={initialFormValues} onSubmit={onSubmit} validationSchema={validation}>
        {(formikProps) => {
          return (
            <Form>
              <GenericTextField
                required
                showError
                formikProps={formikProps}
                inputProps={{ autoCompleteType: 'postal-code' }}
                label={i18n.t('edit-profile.location.label')}
                name="postcode"
                placeholder={i18n.t('placeholder-postcode')}
              />
              <YesNoField
                required
                label={i18n.t('edit-profile.location.not-current-address')}
                onValueChange={formikProps.handleChange('differentAddress')}
                selectedValue={formikProps.values.differentAddress}
              />
              {formikProps.values.differentAddress === 'yes' ? (
                <YesNoField
                  required
                  label={i18n.t('edit-profile.location.still-in-country')}
                  onValueChange={formikProps.handleChange('stillInUK')}
                  selectedValue={formikProps.values.stillInUK}
                />
              ) : null}
              {formikProps.values.stillInUK === 'yes' && formikProps.values.differentAddress === 'yes' ? (
                <GenericTextField
                  required
                  showError
                  formikProps={formikProps}
                  inputProps={{ autoCompleteType: 'postal-code' }}
                  label={i18n.t('edit-profile.location.other-postcode')}
                  name="currentPostcode"
                  placeholder={i18n.t('placeholder-postcode')}
                />
              ) : null}
              {formikProps.values.stillInUK === 'no' && formikProps.values.differentAddress === 'yes' ? (
                <DropdownField
                  required
                  error={formikProps.touched.currentCountry ? formikProps.errors.currentCountry : ''}
                  items={countryList}
                  label={i18n.t('edit-profile.location.select-country')}
                  onValueChange={formikProps.handleChange('currentCountry')}
                  selectedValue={formikProps.values.currentCountry}
                />
              ) : null}
              <View style={{ flex: 1 }} />
              <SecondaryText style={{ textAlign: 'center' }}>
                {i18n.t('edit-profile.location.disclaimer')}
              </SecondaryText>
              <ErrorText>{errorMessage}</ErrorText>
              <BrandedButton
                enabled={formikProps.isValid}
                loading={formikProps.isSubmitting}
                onPress={formikProps.handleSubmit}
              >
                {i18n.t('edit-profile.done')}
              </BrandedButton>
            </Form>
          );
        }}
      </Formik>
    </Screen>
  );
};
