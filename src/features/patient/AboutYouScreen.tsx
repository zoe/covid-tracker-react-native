import { BrandedButton } from '@covid/components';
import { FormWrapper } from '@covid/components/Forms';
import { GenericTextField } from '@covid/components/GenericTextField';
import { RadioInput } from '@covid/components/inputs/RadioInput';
import ProgressStatus from '@covid/components/ProgressStatus';
import Screen, { Header, ProgressBlock } from '@covid/components/Screen';
import { ErrorText, HeaderText } from '@covid/components/Text';
import { ValidationError } from '@covid/components/ValidationError';
import YesNoField from '@covid/components/YesNoField';
import { Coordinator, IUpdatePatient } from '@covid/core/Coordinator';
import { isUSCountry, localisationService } from '@covid/core/localisation/LocalisationService';
import { patientCoordinator } from '@covid/core/patient/PatientCoordinator';
import { isMinorAge } from '@covid/core/patient/PatientState';
import { PatientInfosRequest } from '@covid/core/user/dto/UserAPIContracts';
import { ScreenParamList } from '@covid/features';
import { editProfileCoordinator } from '@covid/features/multi-profile/edit-profile/EditProfileCoordinator';
import i18n from '@covid/locale/i18n';
import { cleanFloatVal, cleanIntegerVal } from '@covid/utils/number';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Formik, FormikProps } from 'formik';
import * as React from 'react';
import { View } from 'react-native';
import * as Yup from 'yup';

import { HeightQuestion, IHeightData } from './fields/HeightQuestion';
import { IRaceEthnicityData, RaceEthnicityQuestion } from './fields/RaceEthnicityQuestion';
import { IWeightData, WeightQuestion } from './fields/WeightQuestion';

const initialFormValues = {
  everExposed: '',
  genderIdentity: '',
  genderIdentityDescription: '',
  helpAvailable: 'no',
  houseboundProblems: 'no',
  mobilityAid: 'no',
  needsHelp: 'no',
  postcode: '',
  sex: '',
  yearOfBirth: '',
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

const initialState: State = {
  enableSubmit: true,
  errorMessage: '',

  showEthnicityQuestion: false,
  showRaceQuestion: false,
};

export default class AboutYouScreen extends React.Component<AboutYouProps, State> {
  private coordinator: Coordinator & IUpdatePatient = this.props.route.params?.editing
    ? editProfileCoordinator
    : patientCoordinator;

  constructor(props: AboutYouProps) {
    super(props);
    this.state = initialState;
  }

  async componentDidMount() {
    const config = localisationService.getConfig();

    this.setState({
      showEthnicityQuestion: !!config?.showEthnicityQuestion,
      showRaceQuestion: !!config?.showRaceQuestion,
    });
  }

  handleUpdateHealth(formData: IAboutYouData) {
    if (this.state.enableSubmit) {
      this.setState({ enableSubmit: false }); // Stop resubmissions

      const currentPatient = this.coordinator.patientData?.patientState;
      const infos = this.createPatientInfos(formData);

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
      gender: formData.sex === 'male' ? 1 : formData.sex === 'female' ? 0 : formData.sex === 'pfnts' ? 2 : 3,
      gender_identity: formData.genderIdentity,
      interacted_with_covid: formData.everExposed,
      year_of_birth: cleanIntegerVal(formData.yearOfBirth),
    } as Partial<PatientInfosRequest>;

    if (!isMinorAge(cleanIntegerVal(formData.yearOfBirth))) {
      infos = {
        ...infos,
        help_available: formData.helpAvailable === 'yes',
        housebound_problems: formData.houseboundProblems === 'yes',
        mobility_aid: formData.mobilityAid === 'yes',
        needs_help: formData.needsHelp === 'yes',
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
    const patientInfo = this.props.route.params?.patientData.patientInfo!;

    const patientFormData: IAboutYouData = {
      ethnicity: patientInfo.ethnicity ?? '',
      everExposed: patientInfo.interacted_with_covid,
      feet: patientInfo.height_feet ? Math.floor(patientInfo.height_feet).toString() : '',
      genderIdentity: patientInfo.gender_identity,
      genderIdentityDescription: patientInfo.gender_identity,
      height: patientInfo.height_cm?.toString(),
      heightUnit: patientInfo.height_feet ? 'ft' : 'cm',
      helpAvailable: patientInfo.help_available ? 'yes' : 'no',
      houseboundProblems: patientInfo.housebound_problems ? 'yes' : 'no',
      inches: patientInfo.height_feet
        ? ((patientInfo.height_feet - Math.floor(patientInfo.height_feet)) * 12).toString()
        : '',
      mobilityAid: patientInfo.mobility_aid ? 'yes' : 'no',
      needsHelp: patientInfo.needs_help ? 'yes' : 'no',
      postcode: patientInfo.postcode,
      pounds: patientInfo.weight_pounds ? Math.floor(patientInfo.weight_pounds).toString() : '',
      race: patientInfo.race,
      raceOther: patientInfo.race_other ?? '',
      sex:
        patientInfo.gender === 1
          ? 'male'
          : patientInfo.gender === 0
          ? 'female'
          : patientInfo.gender === 2
          ? 'pfnts'
          : 'intersex',
      stones: patientInfo.weight_pounds
        ? ((patientInfo.weight_pounds - Math.floor(patientInfo.weight_pounds)) * 14).toString()
        : '',
      weight: patientInfo.weight_kg?.toString(),
      weightUnit: patientInfo.weight_pounds ? 'lbs' : 'kg',
      yearOfBirth: patientInfo.year_of_birth?.toString(),
    };

    return patientFormData;
  }

  registerSchema = Yup.object().shape({
    ethnicity: Yup.string().when([], {
      is: () => isUSCountry(),
      then: Yup.string().required(),
    }),
    everExposed: Yup.string().required(i18n.t('required-ever-exposed')),
    feet: Yup.number().when('heightUnit', {
      is: 'ft',
      then: Yup.number(),
    }),
    genderIdentity: Yup.string()
      .required(i18n.t('required-gender-identity'))
      .test('len', i18n.t('error-gender-identity-length'), (val) => (val && val.length < 30) || !val),
    height: Yup.number().when('heightUnit', {
      is: 'cm',
      then: Yup.number().required(i18n.t('required-height-in-cm')),
    }),
    heightUnit: Yup.string().required(),
    helpAvailable: Yup.string().required(),

    houseboundProblems: Yup.string().required(),
    inches: Yup.number().when('heightUnit', {
      is: 'ft',
      then: Yup.number().required(i18n.t('required-height-in-ft-in')),
    }),
    mobilityAid: Yup.string().required(),
    needsHelp: Yup.string().required(),
    postcode: Yup.string().when([], {
      is: () => !this.props.route.params?.editing,
      then: Yup.string().required(i18n.t('required-postcode')).max(8, i18n.t('postcode-too-long')),
    }),
    pounds: Yup.number().when('weightUnit', {
      is: 'lbs',
      then: Yup.number().required(i18n.t('required-weight-in-lb')),
    }),
    race: Yup.array<string>().when([], {
      is: () => this.state.showRaceQuestion,
      then: Yup.array<string>().min(1, i18n.t('please-select-race')),
    }),
    raceOther: Yup.string().when('race', {
      is: (val: string[]) => val.includes('other'),
      then: Yup.string().required(),
    }),
    sex: Yup.string().required(i18n.t('required-sex-at-birth')),
    stones: Yup.number().when('weightUnit', {
      is: 'lbs',
      then: Yup.number(),
    }),
    weight: Yup.number().when('weightUnit', {
      is: 'kg',
      then: Yup.number().required(i18n.t('required-weight-in-kg')),
    }),
    weightUnit: Yup.string().required(),
    yearOfBirth: Yup.number()
      .typeError(i18n.t('correct-year-of-birth'))
      .required(i18n.t('required-year-of-birth'))
      .integer(i18n.t('correct-year-of-birth'))
      .min(1900, i18n.t('correct-year-of-birth'))
      .max(2020, i18n.t('correct-year-of-birth')),
  });

  render() {
    const sexAtBirthItems = [
      { label: i18n.t('sex-at-birth-male'), value: 'male' },
      { label: i18n.t('sex-at-birth-female'), value: 'female' },
      { label: i18n.t('sex-at-birth-intersex'), value: 'intersex' },
      { label: i18n.t('sex-at-birth-pfnts'), value: 'pfnts' },
    ];
    const genderIdentityItems = [
      { label: i18n.t('gender-identity-male'), value: 'male' },
      { label: i18n.t('gender-identity-female'), value: 'female' },
      { label: i18n.t('gender-identity-pfnts'), value: 'pfnts' },
      { label: i18n.t('gender-identity-other'), value: 'other' },
    ];
    const everExposedItems = [
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
      <Screen
        navigation={this.props.navigation}
        profile={this.coordinator.patientData?.patientState?.profile}
        testID="about-you-screen"
      >
        <Header>
          <HeaderText>{i18n.t('title-about-you')}</HeaderText>
        </Header>

        <ProgressBlock>
          <ProgressStatus maxSteps={6} step={2} />
        </ProgressBlock>

        <Formik
          validateOnChange
          initialValues={this.props.route.params?.editing ? this.getPatientFormValues() : getInitialFormValues()}
          onSubmit={(values: IAboutYouData) => {
            return this.handleUpdateHealth(values);
          }}
          validationSchema={this.registerSchema}
        >
          {(props) => {
            const isMinor = isMinorAge(cleanIntegerVal(props.values.yearOfBirth));

            return (
              <FormWrapper hasRequiredFields>
                <View style={{ marginHorizontal: 16 }}>
                  <GenericTextField
                    required
                    showError
                    formikProps={props}
                    keyboardType="numeric"
                    label={i18n.t('what-year-were-you-born')}
                    name="yearOfBirth"
                    placeholder={i18n.t('placeholder-year-of-birth')}
                    testID="input-year-of-birth"
                  />

                  <RadioInput
                    required
                    error={props.touched.sex ? props.errors.sex : ''}
                    items={sexAtBirthItems}
                    label={i18n.t('your-sex-at-birth')}
                    onValueChange={props.handleChange('sex')}
                    selectedValue={props.values.sex}
                    testID="input-sex-at-birth"
                  />

                  <RadioInput
                    required
                    error={props.touched.genderIdentity ? props.errors.genderIdentity : ''}
                    items={genderIdentityItems}
                    label={i18n.t('label-gender-identity')}
                    onValueChange={props.handleChange('genderIdentity')}
                    selectedValue={props.values.genderIdentity}
                    testID="input-gender-identity"
                  />

                  {props.values.genderIdentity === 'other' ? (
                    <GenericTextField
                      formikProps={props}
                      label={i18n.t('label-gender-identity-other')}
                      name="genderIdentityDescription"
                      placeholder={i18n.t('placeholder-optional')}
                    />
                  ) : null}

                  <RaceEthnicityQuestion
                    formikProps={props as FormikProps<IRaceEthnicityData>}
                    showEthnicityQuestion={this.state.showEthnicityQuestion}
                    showRaceQuestion={this.state.showRaceQuestion}
                  />

                  <HeightQuestion formikProps={props as FormikProps<IHeightData>} />

                  <WeightQuestion formikProps={props as FormikProps<IWeightData>} label={i18n.t('your-weight')} />

                  {!this.props.route.params?.editing ? (
                    <GenericTextField
                      required
                      showError
                      formikProps={props}
                      label={i18n.t('your-postcode')}
                      name="postcode"
                      placeholder={i18n.t('placeholder-postcode')}
                      testID="input-postal-code"
                      textInputProps={{ autoCompleteType: 'postal-code' }}
                    />
                  ) : null}

                  <RadioInput
                    required
                    error={props.touched.everExposed ? props.errors.everExposed : ''}
                    items={everExposedItems}
                    label={i18n.t('have-you-been-exposed')}
                    onValueChange={props.handleChange('everExposed')}
                    selectedValue={props.values.everExposed}
                    testID="input-ever-exposed"
                  />

                  {!isMinor ? (
                    <>
                      <YesNoField
                        label={i18n.t('housebound-problems')}
                        onValueChange={props.handleChange('houseboundProblems')}
                        selectedValue={props.values.houseboundProblems}
                      />

                      <YesNoField
                        label={i18n.t('needs-help')}
                        onValueChange={props.handleChange('needsHelp')}
                        selectedValue={props.values.needsHelp}
                      />

                      <YesNoField
                        label={i18n.t('help-available')}
                        onValueChange={props.handleChange('helpAvailable')}
                        selectedValue={props.values.helpAvailable}
                      />

                      <YesNoField
                        label={i18n.t('mobility-aid')}
                        onValueChange={props.handleChange('mobilityAid')}
                        selectedValue={props.values.mobilityAid}
                      />
                    </>
                  ) : null}

                  <ErrorText>{this.state.errorMessage}</ErrorText>
                  {!!Object.keys(props.errors).length && props.submitCount > 0 ? (
                    <ValidationError error={i18n.t('validation-error-text')} />
                  ) : null}
                </View>

                <BrandedButton
                  enabled={props.isValid && props.dirty}
                  onPress={props.handleSubmit}
                  testID="button-submit"
                >
                  {this.props.route.params?.editing ? i18n.t('edit-profile.done') : i18n.t('next-question')}
                </BrandedButton>
              </FormWrapper>
            );
          }}
        </Formik>
      </Screen>
    );
  }
}
