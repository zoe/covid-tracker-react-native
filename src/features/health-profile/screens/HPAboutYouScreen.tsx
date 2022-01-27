import { ErrorText } from '@covid/components';
import { Form } from '@covid/components/Form';
import { Loading } from '@covid/components/Loading';
import { ValidationError } from '@covid/components/ValidationError';
import { fetchExistingHealthProfile, updateHealthProfile } from '@covid/core/state/health-profile/slice';
import { THealthProfileData } from '@covid/core/state/health-profile/types';
import { TRootState } from '@covid/core/state/root';
import HealthProfileQuestionCard, {
  EFieldType,
  EHealthProfileQuestionCardStatus,
} from '@covid/features/health-profile/components/HealthProfileQuestionCard';
import HealthProfileScreen from '@covid/features/health-profile/components/HealthProfileScreen';
import { MAX_STEPS_FEMALE, MAX_STEPS_MALE } from '@covid/features/health-profile/data/healthProfileNavigator';
import {
  healthProfileScreens,
  THealthProfilePropertyName,
} from '@covid/features/health-profile/data/healthProfileQuestions';
import {
  createHPAboutYouDTO,
  isEditing,
  validationSchemaHPAboutYou,
} from '@covid/features/health-profile/utils/healthProfileUtils';
import { HeightQuestion, IHeightData } from '@covid/features/patient/fields/HeightQuestion';
import { IWeightData, WeightQuestion } from '@covid/features/patient/fields/WeightQuestion';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import { sizes } from '@covid/themes';
import { Formik, FormikProps } from 'formik';
import * as React from 'react';
import { Dispatch } from 'react';
import { StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

export interface IAboutYouData extends THealthProfileData, IHeightData, IWeightData {}

export default function HPAboutYouScreen() {
  const patientId = useSelector<TRootState, string>((state) => state.user.patients[0]);
  const dispatch = useDispatch();
  const savedAnswers = useSelector<TRootState, THealthProfileData>((state) => state.healthProfile.answers);

  const [submitting, setSubmitting] = React.useState<boolean>(false);
  const [errorMessage, setErrorMessage] = React.useState<string>('');
  const [loadingData, setLoadingData] = React.useState<boolean>(false);
  const [loadingDataError, setLoadingDataError] = React.useState<string>('Loading your existing profile');

  const isFemale = savedAnswers.gender === 0 || savedAnswers.gender_identity === 'female';
  const maxSteps = isFemale ? MAX_STEPS_FEMALE : MAX_STEPS_MALE;

  React.useEffect(() => {
    if (Object.keys(savedAnswers).length === 0) {
      // The only time we call backend API, in case user has cleared their Redux state
      setLoadingData(true);
      try {
        dispatch(fetchExistingHealthProfile(patientId));
      } catch (error) {
        setLoadingDataError('Sorry, there was an error fetching your existing profile. Please try again.');
      }
    }
  }, []);

  // Do not initialise the Formik form with initial values until we have Redux data
  React.useEffect(() => {
    if (Object.keys(savedAnswers).length > 0) {
      setLoadingData(false);
    }
  }, [savedAnswers]);

  // set up overall object to track each question's state and setState
  const questionsState: { [key: string]: EHealthProfileQuestionCardStatus } = {};
  const setQuestionsState: { [key: string]: Dispatch<EHealthProfileQuestionCardStatus> } = {};

  // set up each question's states to editing initially
  for (let i = 0; i < healthProfileScreens.ABOUT_YOU.questions.length; i++) {
    // set up state for single question

    const initialState = () => {
      if ([EFieldType.WEIGHT, EFieldType.HEIGHT].includes(healthProfileScreens.ABOUT_YOU.questions[i].fieldType)) {
        return EHealthProfileQuestionCardStatus.PLAYBACK;
      }
      if (
        savedAnswers[healthProfileScreens.ABOUT_YOU.questions[i].propertyName as THealthProfilePropertyName] !== '' &&
        savedAnswers[healthProfileScreens.ABOUT_YOU.questions[i].propertyName as THealthProfilePropertyName] !==
          undefined
      ) {
        return EHealthProfileQuestionCardStatus.PLAYBACK;
      }
      return EHealthProfileQuestionCardStatus.NOT_ANSWERED;
    };

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [questionStatus, setQuestionStatus] = React.useState(initialState());

    questionsState[healthProfileScreens.ABOUT_YOU.questions[i].propertyName as THealthProfilePropertyName] =
      questionStatus;
    setQuestionsState[healthProfileScreens.ABOUT_YOU.questions[i].propertyName as THealthProfilePropertyName] =
      setQuestionStatus;
  }

  const updateQuestionsState = (formikProps: FormikProps<THealthProfileData>) => {
    for (let i = 0; i < healthProfileScreens.ABOUT_YOU.questions.length; i++) {
      const currentQuestion = healthProfileScreens.ABOUT_YOU.questions[i]?.propertyName;
      const nextQuestion = healthProfileScreens.ABOUT_YOU.questions[i + 1]?.propertyName;

      // If user specifically edits the current question then the question should be in editing mode
      if (questionsState[currentQuestion] === EHealthProfileQuestionCardStatus.EDIT_ANSWER) {
        return;
      }

      // If current question and next question is answered, current question should be in playback mode
      if (!!formikProps.values[nextQuestion] && !!formikProps.values[currentQuestion]) {
        setQuestionsState[currentQuestion](EHealthProfileQuestionCardStatus.PLAYBACK);
      }
    }
  };

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

    return initialFormValuesWithCustomFields;
  };

  const saveToRedux = async (formData: THealthProfileData) => {
    if (submitting) {
      return;
    }
    setSubmitting(true);
    const infos = createHPAboutYouDTO(formData);
    try {
      dispatch(updateHealthProfile(infos));
    } catch {
      setErrorMessage(i18n.t('something-went-wrong'));
    }
    setSubmitting(false);
  };

  const onSubmit = React.useCallback(
    async (formData) => {
      saveToRedux(formData);
      NavigatorService.push('HPFormScreen', { screenName: 'HPFamilyHistory' });
    },
    [saveToRedux],
  );

  const saveExitOnPress = (formData: THealthProfileData) => {
    saveToRedux(formData);
    NavigatorService.navigate('DashboardUK');
  };

  return loadingData ? (
    <Loading error={null} status={loadingDataError} style={styles.loadingError} />
  ) : (
    <Formik
      validateOnChange
      validateOnMount
      initialValues={getInitialFormValues()}
      onSubmit={onSubmit}
      validationSchema={validationSchemaHPAboutYou}
    >
      {/* Cannot use arrow function notation with useEffect */}
      {function FormWithUseEffect(formikProps: FormikProps<THealthProfileData>) {
        React.useEffect(() => {
          updateQuestionsState(formikProps);
        });
        return (
          <HealthProfileScreen
            buttonEnabled={formikProps.isValid}
            buttonOnPress={formikProps.handleSubmit}
            buttonTitle="Next: Family History"
            currentStep={1}
            description={healthProfileScreens.ABOUT_YOU.description}
            hideWhyWeAskLink={healthProfileScreens.ABOUT_YOU.hideWhyWeAskLink}
            maxSteps={maxSteps}
            saveExitOnPress={() => saveExitOnPress(formikProps.values)}
            testID={healthProfileScreens.ABOUT_YOU.testID}
            title={healthProfileScreens.ABOUT_YOU.title}
          >
            <Form hasRequiredFields redesign>
              {healthProfileScreens.ABOUT_YOU.questions.map((question) => {
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
                    editOnPress={() =>
                      setQuestionsState[question.propertyName](EHealthProfileQuestionCardStatus.EDIT_ANSWER)
                    }
                    fieldType={question.fieldType}
                    formikProps={formikProps}
                    isEditing={isEditing(questionsState[question.propertyName])}
                    items={question.items}
                    key={question.propertyName}
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
              {!!Object.keys(formikProps.errors).length && formikProps.submitCount > 0 && formikProps.dirty ? (
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
  loadingError: {
    marginVertical: sizes.xxl,
  },
});
