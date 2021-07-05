import { BrandedButton } from '@covid/components';
import DropdownField from '@covid/components/DropdownField';
import { FormWrapper } from '@covid/components/Forms';
import { GenericTextField } from '@covid/components/GenericTextField';
import Screen, { Header } from '@covid/components/Screen';
import { ErrorText, HeaderText, SecondaryText } from '@covid/components/Text';
import YesNoField from '@covid/components/YesNoField';
import { fetchStartUpInfo } from '@covid/core/content/state/contentSlice';
import { useAppDispatch } from '@covid/core/state/store';
import { PatientInfosRequest } from '@covid/core/user/dto/UserAPIContracts';
import { editProfileCoordinator } from '@covid/features/multi-profile/edit-profile/EditProfileCoordinator';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import i18n from '@covid/locale/i18n';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Formik } from 'formik';
import * as React from 'react';
import { PickerItemProps, View } from 'react-native';
import * as Yup from 'yup';

type RenderProps = {
  navigation: StackNavigationProp<ScreenParamList, 'EditLocation'>;
  route: RouteProp<ScreenParamList, 'EditLocation'>;
};

type CountryData = {
  code: string;
  name: string;
};

type EditLocationData = {
  postcode: string;
  differentAddress: string;
  stillInUK: string;
  currentPostcode: string;
  currentCountry: string;
};

export const EditLocationScreen: React.FC<RenderProps> = (props) => {
  const [errorMessage, setErrorMessage] = React.useState('');

  const dispatch = useAppDispatch();

  const initialFormValues: EditLocationData = {
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

  const handleLocationUpdate = (formData: EditLocationData) => {
    const infos: Partial<PatientInfosRequest> = {};

    if (formData.differentAddress === 'no') {
      infos.postcode = formData.postcode;
      infos.current_postcode = null;
      infos.current_country_code = null;
    } else if (formData.stillInUK === 'yes') {
      infos.postcode = formData.postcode;
      infos.current_postcode = formData.currentPostcode;
      infos.current_country_code = null;
    } else {
      infos.postcode = formData.postcode;
      infos.current_postcode = null;
      infos.current_country_code = formData.currentCountry;
    }

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

  const countryList: PickerItemProps[] = require('country-list')
    .getData()
    .map((countryData: CountryData) => {
      return {
        label: countryData.name,
        value: countryData.code,
      };
    })
    .sort((a: PickerItemProps, b: PickerItemProps) => (a.label > b.label ? 1 : b.label > a.label ? -1 : 0));

  return (
    <Screen
      simpleCallout
      navigation={props.navigation}
      profile={props.route.params?.patientData?.profile}
      testID="edit-location-screen"
    >
      <Header>
        <HeaderText style={{ marginBottom: 12 }}>{i18n.t('edit-profile.location.title')}</HeaderText>
      </Header>

      <Formik
        initialValues={initialFormValues}
        onSubmit={(formData: EditLocationData) => {
          return handleLocationUpdate(formData);
        }}
        validationSchema={validation}
      >
        {(props) => {
          return (
            <FormWrapper hasRequiredFields>
              <View style={{ marginHorizontal: 16 }}>
                <GenericTextField
                  required
                  showError
                  formikProps={props}
                  inputProps={{ autoCompleteType: 'postal-code' }}
                  label={i18n.t('edit-profile.location.label')}
                  name="postcode"
                  placeholder={i18n.t('placeholder-postcode')}
                />
                <YesNoField
                  required
                  label={i18n.t('edit-profile.location.not-current-address')}
                  onValueChange={props.handleChange('differentAddress')}
                  selectedValue={props.values.differentAddress}
                />
                {props.values.differentAddress === 'yes' ? (
                  <YesNoField
                    required
                    label={i18n.t('edit-profile.location.still-in-country')}
                    onValueChange={props.handleChange('stillInUK')}
                    selectedValue={props.values.stillInUK}
                  />
                ) : null}
                {props.values.stillInUK === 'yes' && props.values.differentAddress === 'yes' ? (
                  <GenericTextField
                    required
                    showError
                    formikProps={props}
                    inputProps={{ autoCompleteType: 'postal-code' }}
                    label={i18n.t('edit-profile.location.other-postcode')}
                    name="currentPostcode"
                    placeholder={i18n.t('placeholder-postcode')}
                  />
                ) : null}
                {props.values.stillInUK === 'no' && props.values.differentAddress === 'yes' ? (
                  <DropdownField
                    required
                    error={props.touched.currentCountry ? props.errors.currentCountry : ''}
                    items={countryList}
                    label={i18n.t('edit-profile.location.select-country')}
                    onValueChange={props.handleChange('currentCountry')}
                    selectedValue={props.values.currentCountry}
                  />
                ) : null}
                <View style={{ height: 100 }} />
                <SecondaryText style={{ paddingHorizontal: 8, textAlign: 'center' }}>
                  {i18n.t('edit-profile.location.disclaimer')}
                </SecondaryText>
                <ErrorText>{errorMessage}</ErrorText>
                <BrandedButton enabled={props.isValid} loading={props.isSubmitting} onPress={props.handleSubmit}>
                  {i18n.t('edit-profile.done')}
                </BrandedButton>
              </View>
            </FormWrapper>
          );
        }}
      </Formik>
    </Screen>
  );
};
