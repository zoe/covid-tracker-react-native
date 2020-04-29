import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Formik, FormikProps } from 'formik';
import { Form, Item, Label, Text } from 'native-base';
import React, { Component } from 'react';
import { Platform } from 'react-native';
import * as Yup from 'yup';

import DropdownField from '../../components/DropdownField';
import ProgressStatus from '../../components/ProgressStatus';
import Screen, { FieldWrapper, Header, ProgressBlock } from '../../components/Screen';
import { BrandedButton, ErrorText, HeaderText } from '../../components/Text';
import { ValidationErrors } from '../../components/ValidationError';
import UserService, { isUSCountry } from '../../core/user/UserService';
import { AssessmentInfosRequest, PatientInfosRequest } from '../../core/user/dto/UserAPIContracts';
import i18n from '../../locale/i18n';
import { ScreenParamList } from '../ScreenParamList';
import { CheckboxItem, CheckboxList } from '../../components/Checkbox';
import { GenericTextField } from '../../components/GenericTextField';
import {RaceEthnicityData, RaceEthnicityQuestion} from '../patient/fields/RaceEthnicityQuestion';
import { AboutYouData } from '../patient/AboutYouScreen';
import { YourHealthData } from '../patient/YourHealthScreen';
import {BloodPressureData, BloodPressureMedicationQuestion} from "../patient/fields/BloodPressureMedicationQuestion";

const initialFormValues: BackData = {
  race: [] as string[],
  raceOther: '',
  ethnicity: '',

  takesBloodPressureMedications: 'no', // pril
  takesAnyBloodPressureMedications: 'no',
  takesBloodPressureMedicationsSartan: 'no',
};

interface BackData extends BloodPressureData, RaceEthnicityData {}

type BackDateProps = {
  navigation: StackNavigationProp<ScreenParamList, 'ProfileBackDate'>;
  route: RouteProp<ScreenParamList, 'ProfileBackDate'>;
};

type State = {
  errorMessage: string;
  needBloodPressureAnswer: boolean;
  needRaceAnswer: boolean;
};

const initialState: State = {
  errorMessage: '',
  needBloodPressureAnswer: false,
  needRaceAnswer: false,
};

export default class ProfileBackDateScreen extends Component<BackDateProps, State> {
  userService = new UserService();
  features = this.userService.getConfig();

  constructor(props: BackDateProps) {
    super(props);
    this.state = initialState;
  }

  registerSchema = Yup.object().shape({
    takesAnyBloodPressureMedications: Yup.string().when([], {
      is: () => this.state.needBloodPressureAnswer,
      then: Yup.string().required()
    }),
    takesBloodPressureMedications: Yup.string().when([], {
      is: () => this.state.needBloodPressureAnswer,
      then: Yup.string().required()
    }),
    takesBloodPressureMedicationsSartan: Yup.string().when([], {
      is: () => this.state.needBloodPressureAnswer,
      then: Yup.string().required()
    }),

    race: Yup.array<string>().when([], {
      is: () => this.state.needRaceAnswer,
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

  async componentDidMount() {
    const currentPatient = this.props.route.params.currentPatient;
    this.setState({ needBloodPressureAnswer: !currentPatient.hasBloodPressureAnswer });
    this.setState({ needRaceAnswer: !currentPatient.hasRaceAnswer });
  }

  handleProfileUpdate(formData: BackData) {
    const { currentPatient } = this.props.route.params;
    const patientId = currentPatient.patientId;

    const userService = new UserService();

    let infos: Partial<PatientInfosRequest> = {};

    if (formData.takesAnyBloodPressureMedications) {
      infos = {
        ...infos,
        takes_any_blood_pressure_medications: formData.takesAnyBloodPressureMedications === 'yes',
      };
    }

    if (infos.takes_any_blood_pressure_medications) {
      infos = {
        ...infos,
        takes_blood_pressure_medications: formData.takesBloodPressureMedications === 'yes', // pril
        takes_blood_pressure_medications_sartan: formData.takesBloodPressureMedicationsSartan === 'yes',
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

    userService
      .updatePatient(patientId, infos)
      .then((response) => {
        if (formData.race) currentPatient.hasRaceAnswer = true;
        if (formData.takesAnyBloodPressureMedications) currentPatient.hasBloodPressureAnswer = true;
        this.props.navigation.replace('StartAssessment', { currentPatient });
      })
      .catch((err) => {
        this.setState({ errorMessage: i18n.t('something-went-wrong') });
      });
  }

  render() {
    const currentPatient = this.props.route.params.currentPatient;

    return (
      <Screen profile={currentPatient.profile} navigation={this.props.navigation}>
        <Header>
          <HeaderText>{i18n.t('back-date-profile-title')}</HeaderText>
        </Header>

        <ProgressBlock>
          <ProgressStatus step={1} maxSteps={6} />
        </ProgressBlock>

        <Formik
          initialValues={initialFormValues}
          validationSchema={this.registerSchema}
          onSubmit={(values: BackData) => {
            return this.handleProfileUpdate(values);
          }}>
          {(props) => {
            return (
              <Form>
                {this.state.needBloodPressureAnswer && (
                  <BloodPressureMedicationQuestion formikProps={props as FormikProps<BloodPressureData>}/>
                )}

                {this.state.needRaceAnswer && (
                  <RaceEthnicityQuestion
                    showRaceQuestion={this.features.showRaceQuestion}
                    showEthnicityQuestion={this.features.showEthnicityQuestion}
                    formikProps={props as FormikProps<RaceEthnicityData>}
                  />
                )}

                <ErrorText>{this.state.errorMessage}</ErrorText>
                {!!Object.keys(props.errors).length && <ValidationErrors errors={props.errors as string[]} />}

                <BrandedButton onPress={props.handleSubmit}>
                  <Text>{i18n.t('update-profile')}</Text>
                </BrandedButton>
              </Form>
            );
          }}
        </Formik>
      </Screen>
    );
  }
}
