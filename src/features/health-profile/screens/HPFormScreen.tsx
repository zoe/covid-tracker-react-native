import { ErrorText } from '@covid/components';
import { Form } from '@covid/components/Form';
import Analytics, { events } from '@covid/core/Analytics';
import { healthProfileService } from '@covid/core/health-profile/HealthProfileService';
import Logging, { contextNames, logLevel } from '@covid/core/Logging';
import {
  THealthProfileScreenNames,
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
import {
  MAX_STEPS_FEMALE,
  MAX_STEPS_MALE,
  NAVIGATOR_FEMALE,
  NAVIGATOR_MALE,
} from '@covid/features/health-profile/data/healthProfileNavigator';
import {
  EHealthProfileSection,
  healthProfileScreens,
  IHealthProfileFormData,
  screenMappings,
  THealthProfilePropertyName,
  THPScreenName,
} from '@covid/features/health-profile/data/healthProfileQuestions';
import { HealthProfileConfirmExitModal } from '@covid/features/health-profile/modals/HealthProfileConfirmExitModal';
import {
  createCompletedHealthProfileDTO,
  isEditing,
  logDTOSentToServer,
  PNTS_VALUE_TO_SAVE_IN_DB,
  testIsValidNumberOrString,
  TEXT_INPUT_PNTS_LABEL,
} from '@covid/features/health-profile/utils/healthProfileUtils';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import { TScreenParamList } from '@covid/routes/types';
import { sizes } from '@covid/themes';
import { RouteProp, useFocusEffect } from '@react-navigation/native';
import { Formik, FormikProps } from 'formik';
import * as React from 'react';
import { Dispatch } from 'react';
import { StyleSheet } from 'react-native';
import { batch, useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

type TProps = {
  route: RouteProp<TScreenParamList, 'HPFormScreen'>;
};

export default function HPFormScreen({ route }: TProps) {
  const patientId = useSelector<TRootState, string>((state) => state.user.patients[0]);
  const dispatch = useDispatch();
  const savedAnswers = useSelector<TRootState, Partial<THealthProfileRequest>>((state) => state.healthProfile.answers);
  const savedProgressPercent = useSelector<TRootState, number>((state) => state.healthProfile.progressPercent);

  const [submitting, setSubmitting] = React.useState<boolean>(false);
  const [errorMessage, setErrorMessage] = React.useState<string>('');
  const [showConfirmExitModal, setShowConfirmExitModal] = React.useState<boolean>(false);

  const screenName = route.params?.screenName as THPScreenName;
  const sectionName = screenMappings[screenName];

  const isFemale = savedAnswers.gender === 0 || savedAnswers.gender_identity === 'female';
  const navigator = isFemale ? NAVIGATOR_FEMALE : NAVIGATOR_MALE;
  const maxSteps = isFemale ? MAX_STEPS_FEMALE : MAX_STEPS_MALE;

  // set up overall object to track each question's state and setState
  const questionsState: { [key: string]: EHealthProfileQuestionCardStatus } = {};
  const setQuestionsState: { [key: string]: Dispatch<EHealthProfileQuestionCardStatus> } = {};

  if (healthProfileScreens[sectionName]) {
    // set up each question's states to editing initially
    for (let i = 0; i < healthProfileScreens[sectionName].questions.length; i++) {
      // set up state for single question

      const initialState = () => {
        if (
          savedAnswers[healthProfileScreens[sectionName].questions[i].propertyName as keyof THealthProfileRequest] !==
            '' &&
          savedAnswers[healthProfileScreens[sectionName].questions[i].propertyName as keyof THealthProfileRequest] !==
            undefined
        ) {
          return EHealthProfileQuestionCardStatus.PLAYBACK;
        }
        return EHealthProfileQuestionCardStatus.NOT_ANSWERED;
      };

      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [questionStatus, setQuestionStatus] = React.useState(initialState());

      questionsState[healthProfileScreens[sectionName].questions[i].propertyName] = questionStatus;
      setQuestionsState[healthProfileScreens[sectionName].questions[i].propertyName] = setQuestionStatus;
    }
  }

  const updateQuestionsState = (formikProps: FormikProps<IHealthProfileFormData>) => {
    if (healthProfileScreens[sectionName]) {
      for (let i = 0; i < healthProfileScreens[sectionName].questions.length; i++) {
        const currentQuestion = healthProfileScreens[sectionName].questions[i]?.propertyName;
        const nextQuestion = healthProfileScreens[sectionName].questions[i + 1]?.propertyName;

        // If user specifically edits the current question then the question should be in editing mode
        if (questionsState[currentQuestion] === EHealthProfileQuestionCardStatus.EDIT_ANSWER) {
          return;
        }

        // If current question and next question is answered, current question should be in playback mode
        if (
          !!formikProps.values[nextQuestion] &&
          !!formikProps.values[currentQuestion] &&
          !formikProps.errors[currentQuestion]
        ) {
          setQuestionsState[currentQuestion](EHealthProfileQuestionCardStatus.PLAYBACK);
        }
      }
    }
  };

  const getInitialFormValues = () => {
    const initialFormValues = {} as IHealthProfileFormData;
    if (healthProfileScreens[sectionName] === undefined) {
      return initialFormValues;
    }

    // Get saved values from Redux state if they exist
    healthProfileScreens[sectionName].questions.forEach((question) => {
      if (question.fieldType === EFieldType.MULTISELECT || question.fieldType === EFieldType.IMMUNODEFICIENCY) {
        // For tracking all selections in a multiselect question, first initialise the empty array to track answers...
        const answersSelected: string[] = [];

        // Then for each choice, get saved answer from Redux for displaying in the form screen. Additionally, if true, add to array of answers.
        question.items.forEach((item) => {
          initialFormValues[item.name as keyof IHealthProfileFormData] =
            savedAnswers[item.name as keyof THealthProfileRequest];
          if (savedAnswers[item.name as keyof THealthProfileRequest] === true) {
            answersSelected.push(item.name);
          }
        });

        initialFormValues[question.propertyName as THealthProfilePropertyName] = answersSelected.join(',');

        if (question.fieldType === EFieldType.IMMUNODEFICIENCY) {
          initialFormValues.prior_immunodeficiency_diagnosis_other =
            savedAnswers.prior_immunodeficiency_diagnosis_other || '';
        }
      } else if (question.fieldType === EFieldType.YESNO) {
        if (typeof savedAnswers[question.propertyName as keyof THealthProfileRequest] === 'boolean') {
          initialFormValues[question.propertyName] = savedAnswers[question.propertyName as keyof THealthProfileRequest]
            ? 'yes'
            : 'no';
        } else {
          initialFormValues[question.propertyName] = savedAnswers[question.propertyName as keyof THealthProfileRequest];
        }
      } else if (question.fieldType === EFieldType.TEXT) {
        if (
          question.pnts &&
          savedAnswers[question.propertyName as keyof THealthProfileRequest] === PNTS_VALUE_TO_SAVE_IN_DB
        ) {
          // convert pfnts to "Prefer not to say" in user interface
          initialFormValues[question.propertyName] = TEXT_INPUT_PNTS_LABEL;
        } else {
          initialFormValues[question.propertyName] =
            savedAnswers[question.propertyName as keyof THealthProfileRequest] || '';
        }
      } else if (question.propertyName) {
        initialFormValues[question.propertyName] =
          savedAnswers[question.propertyName as keyof THealthProfileRequest]?.toString() || '';
      }
    });

    return initialFormValues;
  };

  const validationSchema = () => {
    const validationObject: { [key: string]: Yup.StringSchema | Yup.NumberSchema } = {};
    if (healthProfileScreens[sectionName]) {
      healthProfileScreens[sectionName].questions.forEach((question) => {
        if (!question.propertyName) {
          return;
        }

        if (question.dependsOnProperty && question.dependsOnPropertyValue) {
          validationObject[question.propertyName] = Yup.string().when(question.dependsOnProperty, {
            is: (answer) => {
              if (answer) {
                // For conditional questions based on a single multiselect option e.g. prior_cardiovascular_diagnosis_heart_attack
                return typeof answer === 'boolean'
                  ? question.dependsOnPropertyValue!.includes(answer)
                  : answer
                      // Needed to account for multiselect fields where we combine the answers into a comma separated string
                      .split(',')
                      .filter((singleAnswer: string) => question.dependsOnPropertyValue!.includes(singleAnswer))
                      .length > 0;
              }
              return false;
            },
            then: Yup.string()
              .required()
              .test(question.propertyName, 'The test is not valid', (value) => {
                return testIsValidNumberOrString(value, question.minValue, question.maxValue);
              }),
          });
        } else if (question.dependsOnProperty && question.doesNotHavePropertyValue) {
          validationObject[question.propertyName] = Yup.string().when(question.dependsOnProperty, {
            is: (answer) => {
              if (answer) {
                // For conditional questions based on a single multiselect option e.g. prior_cardiovascular_diagnosis_heart_attack
                return typeof answer === 'boolean'
                  ? !question.doesNotHavePropertyValue!.includes(answer)
                  : answer
                      // This convoluted validation is needed to account for multiselect fields where we combine the answers into a comma separated string
                      .split(',')
                      .filter((singleAnswer: string) => question.doesNotHavePropertyValue!.includes(singleAnswer))
                      .length === 0;
              }
              return false;
            },
            then: Yup.string()
              .required()
              .test(question.propertyName, 'The test is not valid', (value) => {
                return testIsValidNumberOrString(value, question.minValue, question.maxValue);
              }),
          });
        } else {
          validationObject[question.propertyName] = Yup.string()
            .required()
            .test(question.propertyName, 'The test is not valid', (value) => {
              return testIsValidNumberOrString(value, question.minValue, question.maxValue);
            });
        }

        // Custom field validations
        validationObject.prior_immunodeficiency_diagnosis_other = Yup.string().when(
          ['prior_immunodeficiency_diagnosis_multiselect', 'prior_immunodeficiency_condition_diagnosis'],
          {
            is: (multiSelectAnswer, diagnosis) =>
              !!multiSelectAnswer && multiSelectAnswer.includes('other') && diagnosis === 'yes',
            then: Yup.string().required(),
          },
        );

        if (sectionName === EHealthProfileSection.WOMENS_HEALTH) {
          validationObject.period_started_age = Yup.string().when([], {
            is: () => savedAnswers.gender === 0,
            then: Yup.string()
              .required()
              .test('period_started_age', 'Not a valid age', (value) => {
                return testIsValidNumberOrString(value, 0, 50);
              }),
          });

          validationObject.menopausal_status = Yup.string().when([], {
            is: () => savedAnswers.gender === 0,
            then: Yup.string().required(),
          });
        }
      });
    }

    return Yup.object(validationObject);
  };

  const saveToRedux = async (
    formData: IHealthProfileFormData,
    screenToReturnTo: THealthProfileScreenNames,
    stepsCompleted: number,
    overwriteProgressPercent: boolean = false,
  ) => {
    if (submitting) {
      return;
    }
    setSubmitting(true);
    const infos = createCompletedHealthProfileDTO(formData);
    const currentScreenProgressPercent = Math.round((stepsCompleted * 100) / maxSteps);
    const progressPercent = overwriteProgressPercent
      ? currentScreenProgressPercent
      : Math.max(savedProgressPercent, currentScreenProgressPercent);
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
    async (formData, formikBag) => {
      saveToRedux(formData, navigator[sectionName].nextScreenName, navigator[sectionName].currentStep);
      Analytics.track(events.HEALTH_PROFILE_FORM_NEXT_BUTTON_CLICKED, { screenName });

      if (sectionName === EHealthProfileSection.SKIN_HAIR_AND_NAILS) {
        // Might take a while for last screen's form data to be updated to Redux
        const completeForm = { ...savedAnswers, ...formData };
        const infos = createCompletedHealthProfileDTO(completeForm);

        logDTOSentToServer(infos, patientId);

        try {
          await healthProfileService.createHealthProfile(patientId, infos);
          NavigatorService.navigate('HPThankYou');
        } catch (error) {
          saveToRedux(formData, 'HPSkinHairAndNails', navigator.SKIN_HAIR_AND_NAILS.currentStep - 1, true); // reset progress so user returned to last screen
          if (error.status.toString().startsWith('4')) {
            setErrorMessage(i18n.t('form-data-not-valid'));
          } else {
            setErrorMessage(i18n.t('something-went-wrong'));
            formikBag.validateForm(); // Needed to enable submit button again
          }
        } finally {
          setSubmitting(false);
        }
      } else {
        setSubmitting(false);
        NavigatorService.push('HPFormScreen', { screenName: navigator[sectionName].nextScreenName });
      }
    },
    [saveToRedux],
  );

  const saveExitOnPress = async (formikProps: FormikProps<IHealthProfileFormData>) => {
    const formData = formikProps.values;
    const formikErrors = Object.keys(formikProps.errors);
    const formIsValid = formikProps.isValid;
    const contextProps = { formData, formIsValid, formikErrors, patientId, screenName };

    Analytics.track(events.HEALTH_PROFILE_SAVE_EXIT_LINK_CLICKED, { screenName });
    saveToRedux(formData, screenName, navigator[sectionName].currentStep - 1);

    Logging.log(
      'health_profile',
      'save_exit_on_press',
      contextNames.HEALTH_PROFILE_SAVE_EXIT_PRESS,
      contextProps,
      logLevel.Info,
    );

    setShowConfirmExitModal(true);
    setSubmitting(false);
  };

  return (
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
        validationSchema={validationSchema()}
      >
        {/* Cannot use arrow function notation with useEffect */}
        {function FormWithUseEffect(formikProps: FormikProps<IHealthProfileFormData>) {
          React.useEffect(() => {
            updateQuestionsState(formikProps);
          });

          // needed to ensure button is enabled if user goes back to previous screen
          useFocusEffect(
            React.useCallback(() => {
              formikProps.validateForm();
            }, []),
          );
          return (
            navigator[sectionName] && (
              <HealthProfileScreen
                buttonEnabled={formikProps.isValid}
                buttonOnPress={formikProps.handleSubmit}
                buttonTitle={navigator[sectionName].buttonText}
                currentStep={navigator[sectionName].currentStep}
                description={healthProfileScreens[sectionName].description}
                hideWhyWeAskLink={healthProfileScreens[sectionName].hideWhyWeAskLink}
                maxSteps={maxSteps}
                previousScreen={navigator[sectionName].previousScreenName}
                saveExitOnPress={() => saveExitOnPress(formikProps)}
                testID={healthProfileScreens[sectionName].testID}
                title={healthProfileScreens[sectionName].title}
              >
                <Form hasRequiredFields redesign>
                  {healthProfileScreens[sectionName].questions.map((question) => {
                    const conditionalCriteriaMet = () => {
                      // Custom - only show these 2 questions if sex at birth is female
                      if (
                        question.propertyName === 'period_started_age' ||
                        question.propertyName === 'menopausal_status'
                      ) {
                        return savedAnswers.gender === 0;
                      }

                      if (
                        question.dependsOnProperty &&
                        formikProps.values[question.dependsOnProperty] &&
                        question.dependsOnPropertyValue
                      ) {
                        // For conditional questions based on a single multiselect option e.g. prior_cardiovascular_diagnosis_heart_attack
                        if (
                          typeof formikProps.values[question.dependsOnProperty] === 'boolean' &&
                          question.dependsOnPropertyValue!.includes(formikProps.values[question.dependsOnProperty])
                        ) {
                          return true;
                        }
                        if (
                          // Split needed to account for multiselect fields where we combine the answers into a comma separated string
                          formikProps.values[question.dependsOnProperty]
                            .split(',')
                            .filter((answer) => question.dependsOnPropertyValue!.includes(answer)).length > 0
                        ) {
                          return true;
                        }
                        return false;
                      }

                      if (
                        question.dependsOnProperty &&
                        formikProps.values[question.dependsOnProperty] &&
                        question.doesNotHavePropertyValue
                      ) {
                        // For conditional questions based on multiselect checkbox answers
                        if (
                          typeof formikProps.values[question.dependsOnProperty] === 'boolean' &&
                          !question.doesNotHavePropertyValue!.includes(formikProps.values[question.dependsOnProperty])
                        ) {
                          return true;
                        }

                        // Split needed to account for multiselect fields where we combine the answers into a comma separated string
                        if (
                          formikProps.values[question.dependsOnProperty]
                            .split(',')
                            .filter((answer) => question.doesNotHavePropertyValue!.includes(answer)).length === 0
                        ) {
                          return true;
                        }
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
                        testID={`health-profile-${sectionName}-screen-${question.propertyName}`}
                      />
                    ) : null;
                  })}

                  <ErrorText>{errorMessage}</ErrorText>
                </Form>
              </HealthProfileScreen>
            )
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
});
