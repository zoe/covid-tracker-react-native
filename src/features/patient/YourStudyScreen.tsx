import { CheckboxItem, CheckboxList } from '@covid/components/Checkbox';
import { GenericTextField } from '@covid/components/GenericTextField';
import ProgressStatus from '@covid/components/ProgressStatus';
import Screen, { FieldWrapper, Header, ProgressBlock } from '@covid/components/Screen';
import { BrandedButton, ErrorText, HeaderText, RegularText } from '@covid/components/Text';
import { ValidationErrors } from '@covid/components/ValidationError';
import UserService, { isGBCountry, isUSCountry } from '@covid/core/user/UserService';
import { PatientInfosRequest } from '@covid/core/user/dto/UserAPIContracts';
import i18n from '@covid/locale/i18n';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Formik } from 'formik';
import { cloneDeep } from 'lodash';
import { Form, Item, Label } from 'native-base';
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import * as Yup from 'yup';

import { ScreenParamList } from '../ScreenParamList';

type YourStudyProps = {
  navigation: StackNavigationProp<ScreenParamList, 'YourStudy'>;
  route: RouteProp<ScreenParamList, 'YourStudy'>;
};

type CohortDefinition = {
  key: string;
  label: string;
  country: string;
};

const initialFormValues = {
  clinicalStudyNames: '',
  clinicalStudyContacts: '',
  clinicalStudyInstitutions: '',
  clinicalStudyNctIds: '',
};

interface YourStudyData {
  clinicalStudyNames: string;
  clinicalStudyContacts: string;
  clinicalStudyInstitutions: string;
  clinicalStudyNctIds: string;
}

type State = {
  cohorts: CohortDefinition[];
  selected: { [index: string]: boolean };
  errorMessage: string;
};

const AllCohorts: CohortDefinition[] = [
  {
    key: 'is_in_uk_twins',
    label: 'Twins UK',
    country: 'GB',
  },
  {
    key: 'is_in_uk_biobank',
    label: 'UK Biobank',
    country: 'GB',
  },
  {
    key: 'is_in_uk_guys_trust',
    label: "Guys & St Thomas' Hospital Trust",
    country: 'GB',
  },
  {
    key: 'is_in_us_covid_siren',
    label: 'COVID SIREN',
    country: 'US',
  },
  {
    key: 'is_in_us_nurses_study',
    label: "Harvard Nurses' Health Studies",
    country: 'US',
  },
  {
    key: 'is_in_us_growing_up_today',
    label: 'Harvard Growing Up Today Study',
    country: 'US',
  },
  {
    key: 'is_in_us_harvard_health_professionals',
    label: 'Harvard Health Professionals Follow Up Study',
    country: 'US',
  },
  {
    key: 'is_in_us_mass_general_brigham',
    label: 'Mass General / Brigham',
    country: 'US',
  },
  {
    key: 'is_in_us_partners_biobank',
    label: 'Partners Biobank',
    country: 'US',
  },
  {
    key: 'is_in_us_mass_eye_ear_infirmary',
    label: 'Mass Eye and Ear Infirmary',
    country: 'US',
  },
  {
    key: 'is_in_us_bwhs',
    label: "Black Women's Health Study",
    country: 'US',
  },
  {
    key: 'is_in_us_american_cancer_society_cancer_prevention_study_3',
    label: 'American Cancer Society Cancer Prevention Study-3',
    country: 'US',
  },
  {
    key: 'is_in_us_california_teachers',
    label: 'UCSD/COH California Teachers Study',
    country: 'US',
  },
  {
    key: 'is_in_us_aspree_xt',
    label: 'ASPREE-XT',
    country: 'US',
  },
  {
    key: 'is_in_us_multiethnic_cohort',
    label: 'Multiethnic Cohort Study',
    country: 'US',
  },
  {
    key: 'is_in_us_sister',
    label: 'The Sister Study',
    country: 'US',
  },
  {
    key: 'is_in_us_covid_flu_near_you',
    label: 'CovidNearYou / FluNearYou',
    country: 'US',
  },
  {
    key: 'is_in_us_chasing_covid',
    label: 'CHASING COVID - CUNY ISPH',
    country: 'US',
  },
  {
    key: 'is_in_us_environmental_polymorphisms',
    label: 'NIEHS Environmental Polymorphisms Study',
    country: 'US',
  },
  {
    key: 'is_in_us_agricultural_health',
    label: 'The Agricultural Health Study (AHS)',
    country: 'US',
  },
  {
    key: 'is_in_us_gulf',
    label: 'The GuLF Study',
    country: 'US',
  },
  {
    key: 'is_in_us_predetermine',
    label: 'PREDETERMINE Study',
    country: 'US',
  },
  {
    key: 'is_in_us_promise_pcrowd',
    label: 'PROMISE/PCROWD Study',
    country: 'US',
  },
  {
    key: 'is_in_us_colocare',
    label: 'ColoCare Study',
    country: 'US',
  },
  {
    key: 'is_in_us_predict2',
    label: 'PREDICT 2',
    country: 'US',
  },
  {
    key: 'is_in_us_stanford_nutrition',
    label: 'Stanford Nutrition Studies Group',
    country: 'US',
  },
  {
    key: 'is_in_us_md_anderson_d3code',
    label: 'MD Anderson D3CODE Study',
    country: 'US',
  },
  {
    key: 'is_in_us_hispanic_colorectal_cancer',
    label: 'Hispanic Colorectal Cancer Study',
    country: 'US',
  },
  {
    key: 'is_in_us_colon_cancer_family_registry',
    label: 'Colon Cancer Family Registry',
    country: 'US',
  },
  {
    key: 'is_in_us_louisiana_state_university',
    label: 'Louisiana State University',
    country: 'US',
  },
  {
    key: 'is_in_us_northshore_genomic_health_initiative',
    label: 'NorthShore Genomic Health Initiative',
    country: 'US',
  },
];

export default class YourStudyScreen extends Component<YourStudyProps, State> {
  registerSchema = Yup.object().shape({
    clinicalStudyNames: Yup.string(),
    clinicalStudyContact: Yup.string(),
    clinicalStudyInstitution: Yup.string(),
    clinicalStudyNctId: Yup.string(),
  });

  filterCohortsByCountry(allCohorts: CohortDefinition[], country: string) {
    return AllCohorts.filter((cohort) => {
      return cohort.country === country;
    });
  }

  buildInitCohortsValues(cohorts: CohortDefinition[]): { [index: string]: boolean } {
    const initialValues: { [index: string]: boolean } = {};
    cohorts.forEach((cohort) => {
      initialValues[cohort.key] = false;
    });
    return initialValues;
  }

  constructor(props: YourStudyProps) {
    super(props);
    const countrySpecificCohorts = this.filterCohortsByCountry(AllCohorts, UserService.userCountry);

    this.state = {
      cohorts: countrySpecificCohorts,
      selected: this.buildInitCohortsValues(countrySpecificCohorts),
      errorMessage: '',
    };
  }

  handleSubmit(formData: YourStudyData) {
    const currentPatient = this.props.route.params.currentPatient;
    const patientId = currentPatient.patientId;
    const userService = new UserService();
    const infos = this.createPatientInfos(formData);

    userService
      .updatePatient(patientId, infos)
      .then((response) => {
        this.props.navigation.navigate('YourWork', { currentPatient });
      })
      .catch((err) => this.setState({ errorMessage: i18n.t('something-went-wrong') }));
  }

  render() {
    const currentPatient = this.props.route.params.currentPatient;

    return (
      <Screen profile={currentPatient.profile} navigation={this.props.navigation}>
        <Header>
          <HeaderText>
            {isGBCountry() ? 'Population studies' : isUSCountry() ? i18n.t('your-study.your-clinical-study') : ''}
          </HeaderText>
        </Header>

        <ProgressBlock>
          <ProgressStatus step={1} maxSteps={6} />
        </ProgressBlock>

        <Formik
          initialValues={initialFormValues}
          validationSchema={this.registerSchema}
          onSubmit={(values: YourStudyData) => this.handleSubmit(values)}>
          {(props) => {
            return (
              <Form>
                <FieldWrapper>
                  <Item stackedLabel style={styles.textItemStyle}>
                    <Label>{i18n.t('your-study.label-cohort')}</Label>
                    <CheckboxList>
                      {this.state.cohorts.map((cohort) => (
                        <CheckboxItem
                          key={cohort.key}
                          value={this.state.selected[cohort.key]}
                          onChange={(value: boolean) => {
                            const newSelection = cloneDeep(this.state.selected);
                            newSelection[cohort.key] = value;
                            this.setState({ selected: newSelection });
                          }}>
                          {cohort.label}
                        </CheckboxItem>
                      ))}
                    </CheckboxList>
                  </Item>
                </FieldWrapper>

                {isUSCountry() && (
                  <>
                    <RegularText style={styles.standaloneLabel}>{i18n.t('your-study.if-not')}</RegularText>

                    <GenericTextField
                      formikProps={props}
                      label={i18n.t('your-study.add-study-names')}
                      name="clinicalStudyNames"
                      placeholder={i18n.t('placeholder-optional')}
                    />
                    <>
                      <GenericTextField
                        formikProps={props}
                        label={i18n.t('your-study.contact-name')}
                        name="clinicalStudyContacts"
                        placeholder={i18n.t('placeholder-optional')}
                      />
                      <GenericTextField
                        formikProps={props}
                        label={i18n.t('your-study.uni-hospital')}
                        name="clinicalStudyInstitutions"
                        placeholder={i18n.t('placeholder-optional')}
                      />

                      <GenericTextField
                        formikProps={props}
                        label={i18n.t('your-study.nct-number')}
                        name="clinicalStudyNctIds"
                        placeholder={i18n.t('placeholder-optional')}
                      />
                    </>
                  </>
                )}

                <ErrorText>{this.state.errorMessage}</ErrorText>
                {!!Object.keys(props.errors).length && props.submitCount > 0 && (
                  <ValidationErrors errors={props.errors} />
                )}

                <BrandedButton onPress={props.handleSubmit}>{i18n.t('next-question')}</BrandedButton>
              </Form>
            );
          }}
        </Formik>
      </Screen>
    );
  }

  private createPatientInfos(formData: YourStudyData) {
    let infos = {
      ...this.state.selected,
    } as Partial<PatientInfosRequest>;

    if (isUSCountry()) {
      infos = {
        ...infos,
        ...(formData.clinicalStudyNames && { clinical_study_names: formData.clinicalStudyNames }),
        ...(formData.clinicalStudyContacts && { clinical_study_contacts: formData.clinicalStudyContacts }),
        ...(formData.clinicalStudyInstitutions && { clinical_study_institutions: formData.clinicalStudyInstitutions }),
        ...(formData.clinicalStudyNctIds && { clinical_study_nct_ids: formData.clinicalStudyNctIds }),
      };
    }
    return infos;
  }
}

const styles = StyleSheet.create({
  textItemStyle: {
    borderColor: 'transparent',
  },
  standaloneLabel: {
    marginHorizontal: 16,
  },
});
