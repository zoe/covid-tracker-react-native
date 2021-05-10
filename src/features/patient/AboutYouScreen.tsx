import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Formik, FormikProps } from 'formik';
import { Form, Text } from 'native-base';
import React, { Component } from 'react';
import * as Yup from 'yup';
import { View } from 'react-native';

import DropdownField from '@covid/components/DropdownField';
import { GenericTextField } from '@covid/components/GenericTextField';
import ProgressStatus from '@covid/components/ProgressStatus';
import Screen, { Header, ProgressBlock } from '@covid/components/Screen';
import { ErrorText, HeaderText } from '@covid/components/Text';
import { ValidationError } from '@covid/components/ValidationError';
import { IUserService } from '@covid/core/user/UserService';
import { isUSCountry, ILocalisationService } from '@covid/core/localisation/LocalisationService';
import { PatientInfosRequest } from '@covid/core/user/dto/UserAPIContracts';
import { cleanFloatVal, cleanIntegerVal } from '@covid/utils/number';
import i18n from '@covid/locale/i18n';
import patientCoordinator from '@covid/core/patient/PatientCoordinator';
import YesNoField from '@covid/components/YesNoField';
import { lazyInject } from '@covid/provider/services';
import { Services } from '@covid/provider/services.types';
import { IPatientService } from '@covid/core/patient/PatientService';
import { Coordinator, IUpdatePatient } from '@covid/core/Coordinator';
import editProfileCoordinator from '@covid/features/multi-profile/edit-profile/EditProfileCoordinator';
import { isMinorAge } from '@covid/core/patient/PatientState';
import { BrandedButton } from '@covid/components';
import { ScreenParamList } from '@covid/features';

import { IHeightData, HeightQuestion } from './fields/HeightQuestion';
import { IRaceEthnicityData, RaceEthnicityQuestion } from './fields/RaceEthnicityQuestion';
import { IWeightData, WeightQuestion } from './fields/WeightQuestion';

const initialFormValues = {
  yearOfBirth: '',
  sex: '',
  genderIdentity: '',
  genderIdentityDescription: '',
  postcode: '',

  everExposed: '',
  houseboundProblems: 'no',
  needsHelp: 'no',
  helpAvailable: 'no',
  mobilityAid: 'no',
};

export interface IAboutYouData extends IRaceEthnicityData, IHeightData, IWeightData {
  yearOfBirth: string;
  sex: string;
  genderIdentity: string;
  genderIdentityDescription: string;

  postcode: string;

  everExposed: string;
  houseboundProblems: string;
  needsHelp: string;
  helpAvailable: string;
  mobilityAid: string;
}

type AboutYouProps = {
  navigation: StackNavigationProp<ScreenParamList, 'AboutYou'>;
  route: RouteProp<ScreenParamList, 'AboutYou'>;
};

type State = {
  errorMessage: string;
  enableSubmit: boolean;

  showRaceQuestion: boolean;
  showEthnicityQuestion: boolean;
};

const checkFormFilled = (props: FormikProps<IAboutYouData>) => {
  if (Object.keys(props.errors).length) return false;
  if (Object.keys(props.values).length === 0) return false;
  return true;
};

const initialState: State = {
  errorMessage: '',
  enableSubmit: true,

  showRaceQuestion: false,
  showEthnicityQuestion: false,
};

export default class AboutYouScreen extends Component<AboutYouProps, State> {
  @lazyInject(Services.User)
  private readonly userService: IUserService;
  @lazyInject(Services.Patient)
  private readonly patientService: IPatientService;
  @lazyInject(Services.Localisation)
  private readonly localisationService: ILocalisationService;

  private coordinator: Coordinator & IUpdatePatient = this.props.route.params.editing
    ? editProfileCoordinator
    : patientCoordinator;

  constructor(props: AboutYouProps) {
    super(props);
    this.state = initialState;
  }

  async componentDidMount() {
    const features = this.localisationService.getConfig();

    this.setState({
      showRaceQuestion: features.showRaceQuestion,
      showEthnicityQuestion: features.showEthnicityQuestion,
    });
  }

  handleUpdateHealth(formData: IAboutYouData) {
    if (this.state.enableSubmit) {
      this.setState({ enableSubmit: false }); // Stop resubmissions

      const currentPatient = this.coordinator.patientData.patientState;
      var infos = this.createPatientInfos(formData);

      this.coordinator
        .updatePatientInfo(infos)
        .then(() => {
          currentPatient.hasRaceEthnicityAnswer = formData.race.length > 0;
          currentPatient.isFemale = formData.sex !== 'male';
          currentPatient.isPeriodCapable =
            !['', 'male', 'pfnts'].includes(formData.sex) || !['', 'male', 'pfnts'].includes(formData.genderIdentity);
          currentPatient.isMinor = isMinorAge(cleanIntegerVal(formData.yearOfBirth));
          this.coordinator.gotoNextScreen(this.props.route.name);
        })
        .catch(() => {
          this.setState({ errorMessage: i18n.t('something-went-wrong') });
        })
        .then(() => {
          this.setState({ enableSubmit: true });
        });
    }
  }

  private createPatientInfos(formData: IAboutYouData) {
    let infos = {
      year_of_birth: cleanIntegerVal(formData.yearOfBirth),
      gender: formData.sex === 'male' ? 1 : formData.sex === 'female' ? 0 : formData.sex === 'pfnts' ? 2 : 3,
      gender_identity: formData.genderIdentity,
      interacted_with_covid: formData.everExposed,
    } as Partial<PatientInfosRequest>;

    if (!isMinorAge(cleanIntegerVal(formData.yearOfBirth))) {
      infos = {
        ...infos,
        housebound_problems: formData.houseboundProblems === 'yes',
        needs_help: formData.needsHelp === 'yes',
        help_available: formData.helpAvailable === 'yes',
        mobility_aid: formData.mobilityAid === 'yes',
      };
    }

    if (formData.race) {
      infos = {
        ...infos,
        race: formData.race,
      };
    }

    if (formData.ethnicity) {
      infos = {
        ...infos,
        ethnicity: formData.ethnicity,
      };
    }

    if (formData.raceOther) {
      infos = {
        ...infos,
        race_other: formData.raceOther,
      };
    }

    if (formData.postcode) {
      infos = {
        ...infos,
        postcode: formData.postcode,
      };
    }

    if (formData.genderIdentity === 'other' && formData.genderIdentityDescription) {
      infos = { ...infos, gender_identity: formData.genderIdentityDescription };
    } else {
      infos = { ...infos, gender_identity: formData.genderIdentity };
    }

    if (formData.heightUnit === 'ft') {
      let inches = cleanFloatVal(formData.inches);
      if (formData.feet) {
        const feet = cleanFloatVal(formData.feet) || 0;
        inches += feet * 12;
      }
      infos = { ...infos, height_feet: inches / 12.0 };
    } else {
      infos = { ...infos, height_cm: cleanFloatVal(formData.height) };
    }

    if (formData.weightUnit === 'lbs') {
      let pounds = cleanFloatVal(formData.pounds);
      if (formData.stones) {
        const stones = cleanFloatVal(formData.stones) || 0;
        pounds += stones * 14;
      }
      infos = { ...infos, weight_pounds: pounds };
    } else {
      infos = { ...infos, weight_kg: cleanFloatVal(formData.weight) };
    }

    return infos;
  }

  private getPatientFormValues(): IAboutYouData {
    const patientInfo = this.props.route.params.patientData.patientInfo!;

    const patientFormData: IAboutYouData = {
      yearOfBirth: patientInfo.year_of_birth?.toString(),
      sex:
        patientInfo.gender === 1
          ? 'male'
          : patientInfo.gender === 0
          ? 'female'
          : patientInfo.gender === 2
          ? 'pfnts'
          : 'intersex',
      genderIdentity: patientInfo.gender_identity,
      genderIdentityDescription: patientInfo.gender_identity,
      postcode: patientInfo.postcode,
      everExposed: patientInfo.interacted_with_covid,
      houseboundProblems: patientInfo.housebound_problems ? 'yes' : 'no',
      needsHelp: patientInfo.needs_help ? 'yes' : 'no',
      helpAvailable: patientInfo.help_available ? 'yes' : 'no',
      mobilityAid: patientInfo.mobility_aid ? 'yes' : 'no',
      race: patientInfo.race,
      ethnicity: patientInfo.ethnicity ?? '',
      raceOther: patientInfo.race_other ?? '',
      height: patientInfo.height_cm?.toString(),
      heightUnit: patientInfo.height_feet ? 'ft' : 'cm',
      feet: patientInfo.height_feet ? Math.floor(patientInfo.height_feet).toString() : '',
      inches: patientInfo.height_feet
        ? ((patientInfo.height_feet - Math.floor(patientInfo.height_feet)) * 12).toString()
        : '',
      weight: patientInfo.weight_kg?.toString(),
      weightUnit: patientInfo.weight_pounds ? 'lbs' : 'kg',
      pounds: patientInfo.weight_pounds ? Math.floor(patientInfo.weight_pounds).toString() : '',
      stones: patientInfo.weight_pounds
        ? ((patientInfo.weight_pounds - Math.floor(patientInfo.weight_pounds)) * 14).toString()
        : '',
    };

    return patientFormData;
  }

  registerSchema = Yup.object().shape({
    yearOfBirth: Yup.number()
      .typeError(i18n.t('correct-year-of-birth'))
      .required(i18n.t('required-year-of-birth'))
      .integer(i18n.t('correct-year-of-birth'))
      .min(1900, i18n.t('correct-year-of-birth'))
      .max(2020, i18n.t('correct-year-of-birth')),
    sex: Yup.string().required(i18n.t('required-sex-at-birth')),
    genderIdentity: Yup.string()
      .required(i18n.t('required-gender-identity'))
      .test('len', i18n.t('error-gender-identity-length'), (val) => (val && val.length < 30) || !val),
    heightUnit: Yup.string().required(),
    height: Yup.number().when('heightUnit', {
      is: 'cm',
      then: Yup.number().required(i18n.t('required-height-in-cm')),
    }),
    feet: Yup.number().when('heightUnit', {
      is: 'ft',
      then: Yup.number(),
    }),
    inches: Yup.number().when('heightUnit', {
      is: 'ft',
      then: Yup.number().required(i18n.t('required-height-in-ft-in')),
    }),

    weightUnit: Yup.string().required(),
    weight: Yup.number().when('weightUnit', {
      is: 'kg',
      then: Yup.number().required(i18n.t('required-weight-in-kg')),
    }),
    stones: Yup.number().when('weightUnit', {
      is: 'lbs',
      then: Yup.number(),
    }),
    pounds: Yup.number().when('weightUnit', {
      is: 'lbs',
      then: Yup.number().required(i18n.t('required-weight-in-lb')),
    }),
    postcode: Yup.string().when([], {
      is: () => !this.props.route.params.editing,
      then: Yup.string().required(i18n.t('required-postcode')).max(8, i18n.t('postcode-too-long')),
    }),
    everExposed: Yup.string().required(i18n.t('required-ever-exposed')),
    houseboundProblems: Yup.string().required(),
    needsHelp: Yup.string().required(),
    helpAvailable: Yup.string().required(),
    mobilityAid: Yup.string().required(),
    race: Yup.array<string>().when([], {
      is: () => this.state.showRaceQuestion,
      then: Yup.array<string>().min(1, i18n.t('please-select-race')),
    }),
    raceOther: Yup.string().when('race', {
      is: (val: string[]) => val.includes('other'),
      then: Yup.string().required(),
    }),
    ethnicity: Yup.string().when([], {
      is: () => isUSCountry(),
      then: Yup.string().required(),
    }),
  });

  render() {
    const currentPatient = this.coordinator.patientData.patientState;
    const sexAtBirthItems = [
      { label: i18n.t('choose-one-of-these-options'), value: '' },
      { label: i18n.t('sex-at-birth-male'), value: 'male' },
      { label: i18n.t('sex-at-birth-female'), value: 'female' },
      { label: i18n.t('sex-at-birth-intersex'), value: 'intersex' },
      { label: i18n.t('sex-at-birth-pfnts'), value: 'pfnts' },
    ];
    const genderIdentityItems = [
      { label: i18n.t('choose-one-of-these-options'), value: '' },
      { label: i18n.t('gender-identity-male'), value: 'male' },
      { label: i18n.t('gender-identity-female'), value: 'female' },
      { label: i18n.t('gender-identity-pfnts'), value: 'pfnts' },
      { label: i18n.t('gender-identity-other'), value: 'other' },
    ];
    const everExposedItems = [
      { label: i18n.t('choose-one-of-these-options'), value: '' },
      { label: i18n.t('exposed-yes-documented'), value: 'yes_documented' },
      { label: i18n.t('exposed-yes-undocumented'), value: 'yes_suspected' },
      { label: i18n.t('exposed-both'), value: 'yes_documented_suspected' },
      { label: i18n.t('exposed-no'), value: 'no' },
    ];

    const getInitialFormValues = (): IAboutYouData => {
      return {
        ...initialFormValues,
        ...RaceEthnicityQuestion.initialFormValues(),
        ...HeightQuestion.initialFormValues(),
        ...WeightQuestion.initialFormValues(),
      };
    };

    return (
      <Screen profile={currentPatient.profile} navigation={this.props.navigation}>
        <Header>
          <HeaderText>{i18n.t('title-about-you')}</HeaderText>
        </Header>

        <ProgressBlock>
          <ProgressStatus step={2} maxSteps={6} />
        </ProgressBlock>

        <Formik
          initialValues={this.props.route.params.editing ? this.getPatientFormValues() : getInitialFormValues()}
          validationSchema={this.registerSchema}
          onSubmit={(values: IAboutYouData) => {
            return this.handleUpdateHealth(values);
          }}
        >
          {(props) => {
            const isMinor = isMinorAge(cleanIntegerVal(props.values.yearOfBirth));

            return (
              <Form>
                <View style={{ marginHorizontal: 16 }}>
                  <GenericTextField
                    formikProps={props}
                    label={i18n.t('what-year-were-you-born')}
                    placeholder={i18n.t('placeholder-year-of-birth')}
                    name="yearOfBirth"
                    keyboardType="numeric"
                    showError
                  />

                  <DropdownField
                    placeholder={i18n.t('placeholder-sex')}
                    selectedValue={props.values.sex}
                    onValueChange={props.handleChange('sex')}
                    label={i18n.t('your-sex-at-birth')}
                    items={sexAtBirthItems}
                    error={props.touched.sex && props.errors.sex}
                  />

                  <DropdownField
                    selectedValue={props.values.genderIdentity}
                    onValueChange={props.handleChange('genderIdentity')}
                    label={i18n.t('label-gender-identity')}
                    items={genderIdentityItems}
                    error={props.touched.genderIdentity && props.errors.genderIdentity}
                  />

                  {props.values.genderIdentity === 'other' && (
                    <GenericTextField
                      formikProps={props}
                      label={i18n.t('label-gender-identity-other')}
                      name="genderIdentityDescription"
                      placeholder={i18n.t('placeholder-optional')}
                    />
                  )}

                  <RaceEthnicityQuestion
                    showRaceQuestion={this.state.showRaceQuestion}
                    showEthnicityQuestion={this.state.showEthnicityQuestion}
                    formikProps={props as FormikProps<IRaceEthnicityData>}
                  />

                  <HeightQuestion formikProps={props as FormikProps<IHeightData>} />

                  <WeightQuestion formikProps={props as FormikProps<IWeightData>} label={i18n.t('your-weight')} />

                  {!this.props.route.params.editing && (
                    <GenericTextField
                      formikProps={props}
                      label={i18n.t('your-postcode')}
                      placeholder={i18n.t('placeholder-postcode')}
                      name="postcode"
                      inputProps={{ autoCompleteType: 'postal-code' }}
                      showError
                    />
                  )}

                  <DropdownField
                    selectedValue={props.values.everExposed}
                    onValueChange={props.handleChange('everExposed')}
                    label={i18n.t('have-you-been-exposed')}
                    items={everExposedItems}
                    error={props.touched.everExposed && props.errors.everExposed}
                  />

                  {!isMinor && (
                    <>
                      <YesNoField
                        label={i18n.t('housebound-problems')}
                        selectedValue={props.values.houseboundProblems}
                        onValueChange={props.handleChange('houseboundProblems')}
                      />

                      <YesNoField
                        label={i18n.t('needs-help')}
                        selectedValue={props.values.needsHelp}
                        onValueChange={props.handleChange('needsHelp')}
                      />

                      <YesNoField
                        label={i18n.t('help-available')}
                        selectedValue={props.values.helpAvailable}
                        onValueChange={props.handleChange('helpAvailable')}
                      />

                      <YesNoField
                        label={i18n.t('mobility-aid')}
                        selectedValue={props.values.mobilityAid}
                        onValueChange={props.handleChange('mobilityAid')}
                      />
                    </>
                  )}

                  <ErrorText>{this.state.errorMessage}</ErrorText>
                  {!!Object.keys(props.errors).length && props.submitCount > 0 && (
                    <ValidationError error={i18n.t('validation-error-text')} />
                  )}
                </View>

                <BrandedButton
                  onPress={props.handleSubmit}
                  enable={checkFormFilled(props)}
                  hideLoading={!props.isSubmitting}
                >
                  <Text>{this.props.route.params.editing ? i18n.t('edit-profile.done') : i18n.t('next-question')}</Text>
                </BrandedButton>
              </Form>
            );
          }}
        </Formik>
      </Screen>
    );
  }
}
