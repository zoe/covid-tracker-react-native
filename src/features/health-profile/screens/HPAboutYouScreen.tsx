import { ErrorText } from '@covid/components';
import { Form } from '@covid/components/Form';
import { ValidationError } from '@covid/components/ValidationError';
import { localisationService } from '@covid/core/localisation/LocalisationService';
import { patientService } from '@covid/core/patient/PatientService';
import { TRootState } from '@covid/core/state/root';
import { TPatientInfosRequest } from '@covid/core/user/dto/UserAPIContracts';
import HealthProfileQuestionCard, {
  EFieldType,
} from '@covid/features/health-profile/components/HealthProfileQuestionCard';
import HealthProfileScreen from '@covid/features/health-profile/components/HealthProfileScreen';
import { HeightQuestion, IHeightData } from '@covid/features/patient/fields/HeightQuestion';
import {
  IRaceEthnicityData,
  RaceEthnicityQuestion,
  UKRaceCheckboxes,
} from '@covid/features/patient/fields/RaceEthnicityQuestion';
import { IWeightData, WeightQuestion } from '@covid/features/patient/fields/WeightQuestion';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import { sizes } from '@covid/themes';
import { cleanFloatVal, cleanIntegerVal } from '@covid/utils/number';
import { Formik, FormikProps } from 'formik';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

interface IAboutYouData extends IRaceEthnicityData, IHeightData, IWeightData {
  yearOfBirth: string;
  sex: string;
  genderIdentity: string;
  postcode: string;
  twin: string;
  twinType: string;
  vape: string;

  // Test example for multiselect field
  field_name_1: boolean;
  field_name_2: boolean;

  // Other fields to be added
  // genderIdentityDescription: string;
  // houseboundProblems: string;
  // needsHelp: string;
  // helpAvailable: string;
  // mobilityAid: string;
}

const initialFormValues = {
  feet: '',
  field_name_1: false,
  field_name_2: false,
  genderIdentity: '',
  inches: '',
  postcode: '',
  sex: '',
  twin: '',
  twinType: '',
  vape: '',
  yearOfBirth: '',
};

const getInitialFormValues = (): IAboutYouData => {
  return {
    ...initialFormValues,
    ...RaceEthnicityQuestion.getInitialFormValues(),
    ...HeightQuestion.getInitialFormValues(),
    ...WeightQuestion.getInitialFormValues(),
  };
};

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
  { label: i18n.t('gender-identity-other'), value: 'other' }, // TODO: how to show input field? Checking with Product if needed.
];

const twinTypeItems = [
  { label: 'Identical', value: 'identical' },
  { label: 'Non-identical', value: 'non_identical' },
];

const vapeItems = [
  { label: 'No, I’ve never vaped', value: 'no_never' },
  { label: 'No, I previously vaped', value: 'no_previously' },
  { label: 'Yes, I currently vaped', value: 'yes' },
];

const testItems = [
  { label: 'Field Label 1', name: 'field_name_1' },
  { label: 'Field Label 2', name: 'field_name_2' },
];

const createPatientDTO = (formData: IAboutYouData) => {
  let infos = {
    // test example for multiselect
    field_1: formData.field_name_1,
    field_2: formData.field_name_2,

    gender: formData.sex === 'male' ? 1 : formData.sex === 'female' ? 0 : formData.sex === 'pfnts' ? 2 : 3,
    gender_identity: formData.genderIdentity,
    postcode: formData.postcode,
    // help_available: formData.helpAvailable === 'yes',
    // housebound_problems: formData.houseboundProblems === 'yes',
    // mobility_aid: formData.mobilityAid === 'yes',
    // needs_help: formData.needsHelp === 'yes',
    twin: formData.twin === 'yes',
    twin_type: formData.twinType,
    vape: formData.vape,
    year_of_birth: cleanIntegerVal(formData.yearOfBirth),
  } as Partial<TPatientInfosRequest>;

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

  // Waiting for product confirmation if needed. If so, need to redo gender identity question into custom card
  // if (formData.genderIdentity === 'other' && formData.genderIdentityDescription) {
  //   infos = { ...infos, gender_identity: formData.genderIdentityDescription };
  // } else {
  //   infos = { ...infos, gender_identity: formData.genderIdentity };
  // }

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
};

export default function HPAboutYouScreen() {
  const config = localisationService.getConfig();
  const patientId = useSelector<TRootState, string>((state) => state.user.patients[0]);

  const [showEthnicityQuestion, setShowEthnicityQuestion] = React.useState(false);
  const [showRaceQuestion, setShowRaceQuestion] = React.useState(false);

  const [submitting, setSubmitting] = React.useState<boolean>(false);
  const [errorMessage, setErrorMessage] = React.useState<string>('');

  React.useEffect(() => {
    setShowEthnicityQuestion(!!config?.showEthnicityQuestion);
    setShowRaceQuestion(!!config?.showRaceQuestion);
  }, []);

  const onSubmit = React.useCallback(
    async (formData: IAboutYouData) => {
      if (submitting) {
        return;
      }
      setSubmitting(true);

      const infos = createPatientDTO(formData);

      try {
        await patientService.updatePatientInfo(patientId, infos);

        if (formData.sex === 'female' || formData.genderIdentity === 'female') {
          NavigatorService.navigate('HPThankYou');
        } else {
          // TODO: complete
        }
      } catch (error) {
        setErrorMessage(i18n.t('something-went-wrong'));
      }
      setSubmitting(false);
    },
    [patientId, submitting],
  );

  return (
    <Formik
      validateOnChange
      initialValues={getInitialFormValues()}
      onSubmit={onSubmit}
      // validationSchema={validationSchema} TODO: add validation
    >
      {(formikProps) => {
        return (
          <HealthProfileScreen
            hideWhyWeAskLink
            buttonEnabled={formikProps.isValid && formikProps.dirty}
            buttonOnPress={formikProps.handleSubmit}
            buttonTitle={i18n.t('health-profile.about-you.button')}
            currentStep={1}
            description={i18n.t('health-profile.about-you.description')}
            testID="health-profile-about-you-screen"
            title={i18n.t('health-profile.about-you.title')}
          >
            <Form hasRequiredFields redesign>
              <HealthProfileQuestionCard
                isEditing
                description="Note the playback values function. Assumes each answer option is a separate column in the database."
                fieldType={EFieldType.MultiSelect}
                formikProps={formikProps}
                items={testItems}
                label="This is a multiselect question example for illustrative purposes."
                playbackValues={
                  testItems.filter((item) => formikProps.values[item.name] === true).map((answer) => answer.label) || ''
                }
                style={styles.cardMargin}
                testID="test"
              />
              <HealthProfileQuestionCard
                isEditing
                showError
                fieldType={EFieldType.Text}
                formikProps={formikProps}
                keyboardType="numeric"
                label={i18n.t('what-year-were-you-born')}
                name="yearOfBirth"
                placeholder={i18n.t('placeholder-year-of-birth')}
                style={styles.cardMargin}
                testID="input-year-of-birth"
              />

              <HealthProfileQuestionCard
                isEditing
                error={formikProps.touched.sex ? formikProps.errors.sex : ''}
                fieldType={EFieldType.Radio}
                items={sexAtBirthItems}
                label={i18n.t('your-sex-at-birth')}
                onValueChange={formikProps.handleChange('sex')}
                playbackValue={sexAtBirthItems.find((item) => item.value === formikProps.values.sex)?.label || ''}
                selectedValue={formikProps.values.sex}
                style={styles.cardMargin}
                testID="input-sex-at-birth"
              />

              {/* TODO: Checking with Product to see if we need to show "Other" and text input option */}
              <HealthProfileQuestionCard
                isEditing
                error={formikProps.touched.genderIdentity ? formikProps.errors.genderIdentity : ''}
                fieldType={EFieldType.Radio}
                items={genderIdentityItems}
                label={i18n.t('label-gender-identity')}
                onValueChange={formikProps.handleChange('genderIdentity')}
                playbackValue={
                  genderIdentityItems.find((item) => item.value === formikProps.values.genderIdentity)?.label || ''
                }
                selectedValue={formikProps.values.genderIdentity}
                style={styles.cardMargin}
                testID="input-gender-identity"
              />

              <HealthProfileQuestionCard
                isEditing
                playbackMultipleSelect
                component={
                  <RaceEthnicityQuestion
                    redesign
                    formikProps={formikProps as unknown as FormikProps<IRaceEthnicityData>}
                    showEthnicityQuestion={showEthnicityQuestion}
                    showRaceQuestion={showRaceQuestion}
                  />
                }
                fieldType={EFieldType.Custom}
                label={i18n.t('race-question')}
                playbackValues={formikProps.values.race.map(
                  (r: string) => UKRaceCheckboxes.find((item) => item.value === r)?.label || '',
                )}
                style={styles.cardMargin}
              />

              <HealthProfileQuestionCard
                isEditing
                component={
                  <WeightQuestion
                    redesign
                    formikProps={formikProps as unknown as FormikProps<IWeightData>}
                    label="What is your current body weight?"
                  />
                }
                fieldType={EFieldType.Custom}
                label="What is your current body weight?"
                playbackValue={formikProps.values.weight + formikProps.values.weightUnit}
                style={styles.cardMargin}
              />

              <HealthProfileQuestionCard
                isEditing
                component={
                  <HeightQuestion
                    redesign
                    formikProps={formikProps as unknown as FormikProps<IHeightData>}
                    label="What is your current height?"
                  />
                }
                fieldType={EFieldType.Custom}
                label="What is your current height?"
                playbackValue={
                  formikProps.values.heightUnit === 'cm'
                    ? formikProps.values.height + formikProps.values.heightUnit
                    : formikProps.values.feet + 'ft ' + formikProps.values.inches + 'in'
                }
                style={styles.cardMargin}
              />

              <HealthProfileQuestionCard
                isEditing
                error={formikProps.touched.twin ? formikProps.errors.twin : ''}
                fieldType={EFieldType.YesNo}
                label="Are you a twin?"
                onValueChange={formikProps.handleChange('twin')}
                selectedValue={formikProps.values.twin}
                style={styles.cardMargin}
                testID="input-twin"
              />

              {/* TODO: How to make this card conditional on previous answer? */}
              <HealthProfileQuestionCard
                isEditing
                error={formikProps.touched.twinType ? formikProps.errors.twinType : ''}
                fieldType={EFieldType.Radio}
                items={twinTypeItems}
                label="Which type of twin?"
                onValueChange={formikProps.handleChange('twinType')}
                playbackValue={twinTypeItems.find((item) => item.value === formikProps.values.twinType)?.label || ''}
                selectedValue={formikProps.values.twinType}
                style={styles.cardMargin}
                testID="input-twin-type"
              />

              <HealthProfileQuestionCard
                isEditing
                showError
                fieldType={EFieldType.Text}
                formikProps={formikProps}
                inputProps={{ autoCompleteType: 'postal-code' }}
                label={i18n.t('your-postcode')}
                name="postcode"
                placeholder={i18n.t('placeholder-postcode')}
                style={styles.cardMargin}
                testID="input-postal-code"
              />

              <HealthProfileQuestionCard
                isEditing
                new
                error={formikProps.touched.vape ? formikProps.errors.vape : ''}
                fieldType={EFieldType.Radio}
                items={vapeItems}
                label="Do you vape/use e-cigarettes?"
                onValueChange={formikProps.handleChange('vape')}
                playbackValue={vapeItems.find((item) => item.value === formikProps.values.vape)?.label || ''}
                selectedValue={formikProps.values.vape}
                style={styles.cardMargin}
                testID="input-vape"
              />

              <ErrorText>{errorMessage}</ErrorText>
              {!!Object.keys(formikProps.errors).length && formikProps.submitCount > 0 ? (
                <ValidationError error={i18n.t('validation-error-text')} />
              ) : null}
            </Form>
          </HealthProfileScreen>
        );
      }}
    </Formik>
  );
}

const styles = StyleSheet.create({
  cardMargin: {
    marginBottom: sizes.s,
  },
});
