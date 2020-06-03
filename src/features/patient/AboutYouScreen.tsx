import { userService } from '@covid/Services';
import DropdownField from '@covid/components/DropdownField';
import { GenericTextField } from '@covid/components/GenericTextField';
import ProgressStatus from '@covid/components/ProgressStatus';
import Screen, { FieldWrapper, Header, ProgressBlock } from '@covid/components/Screen';
import { BrandedButton, ErrorText, HeaderText } from '@covid/components/Text';
import { ValidatedTextInput } from '@covid/components/ValidatedTextInput';
import { ValidationError, ValidationErrors } from '@covid/components/ValidationError';
import { isUSCountry } from '@covid/core/user/UserService';
import { PatientInfosRequest } from '@covid/core/user/dto/UserAPIContracts';
import { cleanIntegerVal, cleanFloatVal } from '@covid/core/utils/number';
import i18n from '@covid/locale/i18n';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Formik, FormikProps } from 'formik';
import { Form, Item, Label, Text } from 'native-base';
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import * as Yup from 'yup';

import { ScreenParamList } from '../ScreenParamList';
import { HeightData, HeightQuestion } from './fields/HeightQuestion';
import { RaceEthnicityData, RaceEthnicityQuestion } from './fields/RaceEthnicityQuestion';
import { WeightData, WeightQuestion } from './fields/WeightQuestion';

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

export interface AboutYouData extends RaceEthnicityData, HeightData, WeightData {
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

const checkFormFilled = (props: FormikProps<AboutYouData>) => {
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
  constructor(props: AboutYouProps) {
    super(props);
    this.state = initialState;
  }

  async componentDidMount() {
    const features = userService.getConfig();

    this.setState({
      showRaceQuestion: features.showRaceQuestion,
      showEthnicityQuestion: features.showEthnicityQuestion,
    });
  }

  handleUpdateHealth(formData: AboutYouData) {
    if (this.state.enableSubmit) {
      this.setState({ enableSubmit: false }); // Stop resubmissions

      const currentPatient = this.props.route.params.currentPatient;
      const patientId = currentPatient.patientId;
      var infos = this.createPatientInfos(formData);

      userService
        .updatePatient(patientId, infos)
        .then(() => {
          currentPatient.hasRaceEthnicityAnswer = formData.race.length > 0;
          currentPatient.isFemale = formData.sex !== 'male';
          currentPatient.isPeriodCapable =
            !['', 'male', 'pfnts'].includes(formData.sex) || !['', 'male', 'pfnts'].includes(formData.genderIdentity);
          this.props.navigation.navigate('YourHealth', { currentPatient });
        })
        .catch(() => {
          this.setState({ errorMessage: i18n.t('something-went-wrong') });
        })
        .then(() => {
          this.setState({ enableSubmit: true });
        });
    }
  }

  private createPatientInfos(formData: AboutYouData) {
    let infos = {
      year_of_birth: cleanIntegerVal(formData.yearOfBirth),
      gender: formData.sex === 'male' ? 1 : formData.sex === 'female' ? 0 : formData.sex === 'pfnts' ? 2 : 3,
      gender_identity: formData.genderIdentity,
      interacted_with_covid: formData.everExposed,
      housebound_problems: formData.houseboundProblems === 'yes',
      needs_help: formData.needsHelp === 'yes',
      help_available: formData.helpAvailable === 'yes',
      mobility_aid: formData.mobilityAid === 'yes',
    } as Partial<PatientInfosRequest>;

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

    postcode: Yup.string().required(i18n.t('required-postcode')).max(8, i18n.t('postcode-too-long')),

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
    const currentPatient = this.props.route.params.currentPatient;
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

    const getInitialFormValues = (): AboutYouData => {
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
          initialValues={getInitialFormValues()}
          validationSchema={this.registerSchema}
          onSubmit={(values: AboutYouData) => {
            return this.handleUpdateHealth(values);
          }}>
          {(props) => {
            return (
              <Form>
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
                  formikProps={props as FormikProps<RaceEthnicityData>}
                />

                <HeightQuestion formikProps={props as FormikProps<HeightData>} />

                <WeightQuestion formikProps={props as FormikProps<WeightData>} />

                <GenericTextField
                  formikProps={props}
                  label={i18n.t('your-postcode')}
                  placeholder={i18n.t('placeholder-postcode')}
                  name="postcode"
                  inputProps={{ autoCompleteType: 'postal-code' }}
                  showError
                />

                <DropdownField
                  selectedValue={props.values.everExposed}
                  onValueChange={props.handleChange('everExposed')}
                  label={i18n.t('have-you-been-exposed')}
                  items={everExposedItems}
                  error={props.touched.everExposed && props.errors.everExposed}
                />

                <DropdownField
                  label={i18n.t('housebound-problems')}
                  selectedValue={props.values.houseboundProblems}
                  onValueChange={props.handleChange('houseboundProblems')}
                />

                <DropdownField
                  label={i18n.t('needs-help')}
                  selectedValue={props.values.needsHelp}
                  onValueChange={props.handleChange('needsHelp')}
                />

                <DropdownField
                  label={i18n.t('help-available')}
                  selectedValue={props.values.helpAvailable}
                  onValueChange={props.handleChange('helpAvailable')}
                />

                <DropdownField
                  label={i18n.t('mobility-aid')}
                  selectedValue={props.values.mobilityAid}
                  onValueChange={props.handleChange('mobilityAid')}
                />

                <ErrorText>{this.state.errorMessage}</ErrorText>
                {!!Object.keys(props.errors).length && props.submitCount > 0 && (
                  <ValidationErrors errors={props.errors as string[]} />
                )}

                <BrandedButton
                  onPress={props.handleSubmit}
                  enable={checkFormFilled(props)}
                  hideLoading={!props.isSubmitting}>
                  <Text>{i18n.t('next-question')}</Text>
                </BrandedButton>
              </Form>
            );
          }}
        </Formik>
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  textItemStyle: {
    borderColor: 'transparent',
  },
});
