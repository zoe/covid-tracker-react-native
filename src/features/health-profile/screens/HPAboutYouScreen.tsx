import { ErrorText } from '@covid/components';
import { Form } from '@covid/components/Form';
import { Loading } from '@covid/components/Loading';
import { ValidationError } from '@covid/components/ValidationError';
import Analytics, { events } from '@covid/core/Analytics';
import {
  fetchExistingHealthProfile,
  THealthProfileScreenNames,
  updateHasSeenAboutYouTooltip,
  updateHealthProfile,
  updateHealthProfileProgress,
} from '@covid/core/state/health-profile/slice';
import { TRootState } from '@covid/core/state/root';
import { THealthProfileRequest } from '@covid/core/user/dto/UserAPIContracts';
import HealthProfileQuestionCard, {
  EFieldType,
  EHealthProfileQuestionCardStatus,
} from '@covid/features/health-profile/components/HealthProfileQuestionCard';
import HealthProfileScreen from '@covid/features/health-profile/components/HealthProfileScreen';
import { MAX_STEPS_FEMALE, MAX_STEPS_MALE } from '@covid/features/health-profile/data/healthProfileNavigator';
import {
  healthProfileScreens,
  IHealthProfileFormData,
  THealthProfilePropertyName,
} from '@covid/features/health-profile/data/healthProfileQuestions';
import {
  createHPAboutYouDTO,
  isEditing,
  PNTS_VALUE_TO_SAVE_IN_DB,
  TEXT_INPUT_PNTS_LABEL,
  validationSchemaHPAboutYou,
} from '@covid/features/health-profile/utils/healthProfileUtils';
import { HeightQuestion } from '@covid/features/patient/fields/HeightQuestion';
import { WeightQuestion } from '@covid/features/patient/fields/WeightQuestion';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import { sizes } from '@covid/themes';
import { useFocusEffect } from '@react-navigation/native';
import { Formik, FormikProps } from 'formik';
import * as React from 'react';
import { Dispatch } from 'react';
import { StyleSheet } from 'react-native';
import { batch, useDispatch, useSelector } from 'react-redux';

import { HealthProfileConfirmExitModal } from '../modals/HealthProfileConfirmExitModal';

export default function HPAboutYouScreen() {
  const patientId = useSelector<TRootState, string>((state) => state.user.patients[0]);
  const dispatch = useDispatch();

  const savedAnswers = useSelector<TRootState, Partial<THealthProfileRequest>>((state) => state.healthProfile.answers);
  const savedProgressPercent = useSelector<TRootState, number>((state) => state.healthProfile.progressPercent);
  const hasSeenAboutYouTooltip = useSelector<TRootState, boolean>(
    (state) => state.healthProfile.hasSeenAboutYouTooltip,
  );

  const [submitting, setSubmitting] = React.useState<boolean>(false);
  const [errorMessage, setErrorMessage] = React.useState<string>('');
  const [loadingData, setLoadingData] = React.useState<boolean>(false);
  const [loadingDataError, setLoadingDataError] = React.useState<string>('Loading your existing profile');
  const [showConfirmExitModal, setShowConfirmExitModal] = React.useState<boolean>(false);
  const [showTooltip, setShowTooltip] = React.useState<boolean>(false);

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
        savedAnswers[healthProfileScreens.ABOUT_YOU.questions[i].propertyName as keyof THealthProfileRequest] !== '' &&
        savedAnswers[healthProfileScreens.ABOUT_YOU.questions[i].propertyName as keyof THealthProfileRequest] !==
          undefined
      ) {
        return EHealthProfileQuestionCardStatus.PLAYBACK;
      }
      return EHealthProfileQuestionCardStatus.NOT_ANSWERED;
    };

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [questionStatus, setQuestionStatus] = React.useState(initialState());

    questionsState[healthProfileScreens.ABOUT_YOU.questions[i].propertyName] = questionStatus;
    setQuestionsState[healthProfileScreens.ABOUT_YOU.questions[i].propertyName] = setQuestionStatus;
  }

  const updateQuestionsState = (formikProps: FormikProps<IHealthProfileFormData>) => {
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
    const initialFormValues = {} as IHealthProfileFormData;
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
          initialFormValuesWithCustomFields[item.name as keyof IHealthProfileFormData] =
            savedAnswers[item.name as keyof THealthProfileRequest];
          if (savedAnswers[item.name as keyof THealthProfileRequest] === true) {
            answersSelected.push(item.name);
          }
        });

        initialFormValuesWithCustomFields[question.propertyName as THealthProfilePropertyName] =
          answersSelected.join(',');
      } else if (question.fieldType === EFieldType.WEIGHT || question.fieldType === EFieldType.HEIGHT) {
        initialFormValuesWithCustomFields = { ...initialFormValuesWithCustomFields, ...getSavedHeightWeightValues() };
      } else if (question.fieldType === EFieldType.YESNO) {
        if (typeof savedAnswers[question.propertyName as keyof THealthProfileRequest] === 'boolean') {
          initialFormValuesWithCustomFields[question.propertyName as keyof IHealthProfileFormData] = savedAnswers[
            question.propertyName as keyof THealthProfileRequest
          ]
            ? 'yes'
            : 'no';
        } else {
          initialFormValuesWithCustomFields[question.propertyName as keyof IHealthProfileFormData] =
            savedAnswers[question.propertyName as keyof THealthProfileRequest];
        }
      } else if (question.fieldType === EFieldType.TEXT) {
        if (
          question.pnts &&
          savedAnswers[question.propertyName as keyof THealthProfileRequest] === PNTS_VALUE_TO_SAVE_IN_DB
        ) {
          // convert pfnts to "Prefer not to say" in user interface
          initialFormValuesWithCustomFields[question.propertyName] = TEXT_INPUT_PNTS_LABEL;
        } else {
          initialFormValuesWithCustomFields[question.propertyName] =
            savedAnswers[question.propertyName as keyof THealthProfileRequest]?.toString() || '';
        }
      } else {
        // Must initialise to at least an empty string for Yup to work
        initialFormValuesWithCustomFields[question.propertyName] =
          savedAnswers[question.propertyName as keyof THealthProfileRequest]?.toString() || '';
      }
    });

    return initialFormValuesWithCustomFields;
  };

  const saveToRedux = async (
    formData: IHealthProfileFormData,
    screenToReturnTo: THealthProfileScreenNames,
    stepsCompleted: number,
  ) => {
    if (submitting) {
      return;
    }
    setSubmitting(true);
    const infos = createHPAboutYouDTO(formData);
    const currentScreenProgressPercent = Math.round((stepsCompleted * 100) / maxSteps);
    const progressPercent = Math.max(savedProgressPercent, currentScreenProgressPercent);
    const dateOfLastUpdate = new Date();

    try {
      batch(() => {
        dispatch(updateHealthProfile(infos));
        dispatch(
          updateHealthProfileProgress({
            dateOfLastUpdate,
            maxSteps,
            progressPercent,
            screenToReturnTo,
            stepsCompleted,
          }),
        );
      });
    } catch {
      setErrorMessage(i18n.t('something-went-wrong'));
    }
    setSubmitting(false);
  };

  const onSubmit = React.useCallback(
    async (formData) => {
      if (!hasSeenAboutYouTooltip && !showTooltip) {
        setShowTooltip(true);
      } else {
        setShowTooltip(false);
        dispatch(updateHasSeenAboutYouTooltip(true));
        saveToRedux(formData, 'HPFamilyHistory', 1);
        NavigatorService.push('HPFormScreen', { screenName: 'HPFamilyHistory' });
      }
    },
    [saveToRedux, hasSeenAboutYouTooltip, showTooltip],
  );

  const saveExitOnPress = (formData: IHealthProfileFormData) => {
    Analytics.track(events.HEALTH_PROFILE_SAVE_EXIT_LINK_CLICKED);
    saveToRedux(formData, 'HPAboutYou', 0);
    setShowConfirmExitModal(true);
  };

  return loadingData ? (
    <Loading error={null} status={loadingDataError} style={styles.loadingError} />
  ) : (
    <>
      <HealthProfileConfirmExitModal
        onRequestClose={() => setShowConfirmExitModal(false)}
        visible={showConfirmExitModal}
      />
      <Formik
        validateOnChange
        validateOnMount
        initialValues={getInitialFormValues()}
        onSubmit={onSubmit}
        validationSchema={validationSchemaHPAboutYou}
      >
        {/* Cannot use arrow function notation with useEffect */}
        {function FormWithUseEffect(formikProps: FormikProps<IHealthProfileFormData>) {
          React.useEffect(() => {
            updateQuestionsState(formikProps);
          });

          // needed to ensure button is enabled if user goes back to this screen from other form screens
          useFocusEffect(
            React.useCallback(() => {
              formikProps.validateForm();
            }, []),
          );

          return (
            <HealthProfileScreen
              buttonEnabled={formikProps.isValid}
              buttonOnPress={formikProps.handleSubmit}
              buttonTitle="Next: Family History"
              currentStep={1}
              description={healthProfileScreens.ABOUT_YOU.description}
              hideWhyWeAskLink={healthProfileScreens.ABOUT_YOU.hideWhyWeAskLink}
              maxSteps={maxSteps}
              previousScreen="DashboardUK"
              saveExitOnPress={() => saveExitOnPress(formikProps.values)}
              showTooltip={showTooltip}
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
                      showPnts={question.pnts}
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
    </>
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
