import { ErrorText } from '@covid/components';
import { Form } from '@covid/components/Form';
import { ValidationError } from '@covid/components/ValidationError';
import { fetchExistingHealthProfile } from '@covid/core/state/health-profile/slice';
import { THealthProfileData } from '@covid/core/state/health-profile/types';
import { TRootState } from '@covid/core/state/root';
import { TPatientInfosRequest } from '@covid/core/user/dto/UserAPIContracts';
import HealthProfileQuestionCard, {
  EFieldType,
} from '@covid/features/health-profile/components/HealthProfileQuestionCard';
import HealthProfileScreen from '@covid/features/health-profile/components/HealthProfileScreen';
import { MAX_STEPS_MALE } from '@covid/features/health-profile/data/healthProfileNavigator';
import {
  healthProfileScreens,
  THealthProfilePropertyName,
} from '@covid/features/health-profile/data/healthProfileQuestions';
import { HeightQuestion, IHeightData } from '@covid/features/patient/fields/HeightQuestion';
import { IWeightData, WeightQuestion } from '@covid/features/patient/fields/WeightQuestion';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import { sizes } from '@covid/themes';
import { cleanFloatVal, cleanIntegerVal } from '@covid/utils/number';
import { Formik } from 'formik';
import * as React from 'react';
import { Dispatch } from 'react';
import { StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

interface IAboutYouData extends THealthProfileData, IHeightData, IWeightData {}

const createPatientDTO = (formData: IAboutYouData) => {
  let infos = {
    ...formData,
    // is_twin: formData.is_twin === 'yes', --> don't convert to boolean because of pnts option?
    gender: formData.gender === '1' ? 1 : formData.gender === '0' ? 0 : formData.gender === '2' ? 2 : 3,
    year_of_birth: cleanIntegerVal(formData.year_of_birth as string),
  } as Partial<TPatientInfosRequest>;

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

const validationSchema = Yup.object().shape({
  // TODO: Add remaining field validations
  feet: Yup.number().when('heightUnit', {
    is: 'ft',
    then: Yup.number().required(),
  }),
  gender: Yup.string().required(i18n.t('required-sex-at-birth')),
  gender_identity: Yup.string()
    .required(i18n.t('required-gender-identity'))
    .test('len', i18n.t('error-gender-identity-length'), (val) => (val && val.length < 30) || !val),
  height: Yup.number().when('heightUnit', {
    is: 'cm',
    then: Yup.number().required(i18n.t('required-height-in-cm')),
  }),
  heightUnit: Yup.string().required(),
  inches: Yup.number().when('heightUnit', {
    is: 'ft',
    then: Yup.number().required(i18n.t('required-height-in-ft-in')),
  }),
  is_twin: Yup.string().required(),
  pcos: Yup.string().required(), // TODO: delete - this is just for testing multiselect validation
  postcode: Yup.string().required(i18n.t('required-postcode')).max(8, i18n.t('postcode-too-long')),
  pounds: Yup.number().when('weightUnit', {
    is: 'lbs',
    then: Yup.number().required(i18n.t('required-weight-in-lb')),
  }),
  race: Yup.string().required(),
  stones: Yup.number().when('weightUnit', {
    is: 'lbs',
    then: Yup.number().required(),
  }),
  twin_type: Yup.string().when('is_twin', {
    is: 'yes',
    then: Yup.string().required(),
  }),
  weight: Yup.number().when('weightUnit', {
    is: 'kg',
    then: Yup.number().required(i18n.t('required-weight-in-kg')),
  }),
  weightUnit: Yup.string().required(),
  year_of_birth: Yup.number()
    .typeError(i18n.t('correct-year-of-birth'))
    .required(i18n.t('required-year-of-birth'))
    .integer(i18n.t('correct-year-of-birth'))
    .min(1900, i18n.t('correct-year-of-birth'))
    .max(new Date().getFullYear(), i18n.t('correct-year-of-birth')),
});

export default function HPAboutYouScreen() {
  const patientId = useSelector<TRootState, string>((state) => state.user.patients[0]);
  const dispatch = useDispatch();
  const savedAnswers = useSelector<TRootState, THealthProfileData>((state) => state.healthProfile.answers);

  React.useEffect(() => {
    dispatch(fetchExistingHealthProfile(patientId)); // TODO: Should we move this to onAppStartup? Otherwise would be called on every screen change.
  }, []);

  const [submitting, setSubmitting] = React.useState<boolean>(false);
  const [errorMessage, setErrorMessage] = React.useState<string>('');

  // set up overall object to track each question's state and setState
  const questionsState: { [key: string]: boolean } = {};
  const setQuestionsState: { [key: string]: Dispatch<boolean> } = {};

  // set up each question's states to editing initially
  for (let i = 0; i < healthProfileScreens.ABOUT_YOU.questions.length; i++) {
    // set up state for single question
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [questionIsEditing, setQuestionIsEditing] = React.useState(true);
    // TODO: need to sort out the null property name for multiselect and custom fields
    questionsState[healthProfileScreens.ABOUT_YOU.questions[i].propertyName as THealthProfilePropertyName] =
      questionIsEditing;
    setQuestionsState[healthProfileScreens.ABOUT_YOU.questions[i].propertyName as THealthProfilePropertyName] =
      setQuestionIsEditing;

    // TODO: add logic, that if user selects edit, then it shows isEditing state, even if formik value is not empty
    // Makes sense to do this when Redux is completed
    // questionsState[healthProfileScreens.ABOUT_YOU.questions[i].propertyName as THealthProfilePropertyName] =
    //   formikProps.values[
    //     healthProfileScreens.ABOUT_YOU.questions[i].propertyName as THealthProfilePropertyName
    //   ] === '';
    // setQuestionsState[healthProfileScreens.ABOUT_YOU.questions[i].propertyName as THealthProfilePropertyName] =
    //   setQuestionIsEditing;
  }

  const getSavedHeightWeightValues = () => {
    const savedData = {
      feet: savedAnswers.height_feet ? Math.floor(savedAnswers.height_feet).toString() : '',
      height: savedAnswers.height_cm?.toString() || '',
      heightUnit: savedAnswers.height_feet ? 'ft' : 'cm',
      inches: savedAnswers.height_feet
        ? ((savedAnswers.height_feet - Math.floor(savedAnswers.height_feet)) * 12).toFixed(0)
        : '',
      pounds: savedAnswers.weight_pounds ? (savedAnswers.weight_pounds % 14).toString() : '',
      stones: savedAnswers.weight_pounds ? Math.floor(savedAnswers.weight_pounds / 14).toString() : '',
      weight: savedAnswers.weight_kg?.toString() || '',
      weightUnit: savedAnswers.weight_kg ? 'kg' : 'lbs',
    };

    return savedData;
  };

  const getInitialFormValues = () => {
    const initialFormValues = {} as THealthProfileData;
    let initialFormValuesWithCustomFields = {
      ...initialFormValues,
      ...HeightQuestion.getInitialFormValues(),
      ...WeightQuestion.getInitialFormValues(),
    };

    // Get saved values from Redux state if they exist
    healthProfileScreens.ABOUT_YOU.questions.forEach((question) => {
      if (question.fieldType === EFieldType.MULTISELECT) {
        // For tracking all selections in a multiselect question, first initialise the empty array to track answers...
        const answersSelected: string[] = [];

        // Then for each choice, get saved answer from Redux for displaying in the form screen. Additionally, if true, add to array of answers.
        question.items.forEach((item) => {
          initialFormValuesWithCustomFields[item.name as THealthProfilePropertyName] = savedAnswers[item.name];
          if (savedAnswers[item.name] === true) {
            answersSelected.push(item.name);
          }
        });

        initialFormValuesWithCustomFields[question.propertyName as THealthProfilePropertyName] =
          answersSelected.join(',');
      } else if (question.fieldType === EFieldType.WEIGHT || question.fieldType === EFieldType.HEIGHT) {
        initialFormValuesWithCustomFields = { ...initialFormValuesWithCustomFields, ...getSavedHeightWeightValues() };
      } else if (question.fieldType === EFieldType.YESNO) {
        if (typeof savedAnswers[question.propertyName] === 'boolean') {
          initialFormValuesWithCustomFields[question.propertyName] = savedAnswers[question.propertyName] ? 'yes' : 'no';
        } else {
          initialFormValuesWithCustomFields[question.propertyName] = savedAnswers[question.propertyName];
        }
      } else {
        // Must initialise to at least an empty string for Yup to work
        initialFormValuesWithCustomFields[question.propertyName] =
          savedAnswers[question.propertyName]?.toString() || '';
      }
    });

    // eslint-disable-next-line no-console
    console.log('initialFormValuesWithCustomFields', initialFormValuesWithCustomFields);
    return initialFormValuesWithCustomFields;
  };

  const onSubmit = React.useCallback(
    async (formData) => {
      if (submitting) {
        return;
      }
      setSubmitting(true);

      const infos = createPatientDTO(formData);

      try {
        // TODO: uncomment when ready
        // await patientService.updatePatientInfo(patientId, infos);
        // eslint-disable-next-line no-console
        console.log('infos', infos);
        NavigatorService.navigate('HPFormScreen', { screenName: 'HPFamilyHistory' });
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
      validationSchema={validationSchema}
    >
      {(formikProps) => {
        return (
          <HealthProfileScreen
            buttonEnabled={formikProps.isValid && formikProps.dirty}
            buttonOnPress={formikProps.handleSubmit}
            buttonTitle="Next: Family History"
            currentStep={1}
            description={healthProfileScreens.ABOUT_YOU.description}
            hideWhyWeAskLink={healthProfileScreens.ABOUT_YOU.hideWhyWeAskLink}
            maxSteps={MAX_STEPS_MALE}
            testID={healthProfileScreens.ABOUT_YOU.testID}
            title={healthProfileScreens.ABOUT_YOU.title}
          >
            <Form hasRequiredFields redesign>
              {healthProfileScreens.ABOUT_YOU.questions.map((question, index) => {
                const conditionalCriteriaMet = () => {
                  if (
                    question.dependsOnProperty &&
                    formikProps.values[question.dependsOnProperty] &&
                    question.dependsOnPropertyValue?.includes(formikProps.values[question.dependsOnProperty])
                  ) {
                    return true;
                  }
                  return false;
                };

                return !question.dependsOnProperty || conditionalCriteriaMet() ? (
                  <HealthProfileQuestionCard
                    description={question.description}
                    editOnPress={() => setQuestionsState[question.propertyName](true)}
                    fieldType={question.fieldType}
                    formikProps={formikProps}
                    isEditing={questionsState[question.propertyName]}
                    items={question.items}
                    // eslint-disable-next-line react/no-array-index-key
                    key={`${question.propertyName}-${index}`}
                    keyboardType={question.keyboardType}
                    label={question.question}
                    new={question.showNewTag}
                    placeholder={question.placeholder}
                    propertyName={question.propertyName}
                    style={styles.cardMargin}
                    testID={`health-profile-about-you-screen-${question.propertyName}`}
                  />
                ) : null;
              })}

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
