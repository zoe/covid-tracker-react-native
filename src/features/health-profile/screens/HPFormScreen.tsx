import { ErrorText } from '@covid/components';
import { Form } from '@covid/components/Form';
import { ValidationError } from '@covid/components/ValidationError';
import Analytics, { events } from '@covid/core/Analytics';
import { healthProfileService } from '@covid/core/health-profile/HealthProfileService';
import { updateHealthProfile } from '@covid/core/state/health-profile/slice';
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
import {
  createCompletedHealthProfileDTO,
  isEditing,
  PNTS_VALUE_TO_SAVE_IN_DB,
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
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

import { HealthProfileConfirmExitModal } from '../modals/HealthProfileConfirmExitModal';

type TProps = {
  route: RouteProp<TScreenParamList, 'HPFormScreen'>;
};

export default function HPFormScreen({ route }: TProps) {
  const patientId = useSelector<TRootState, string>((state) => state.user.patients[0]);
  const dispatch = useDispatch();
  const savedAnswers = useSelector<TRootState, Partial<THealthProfileRequest>>((state) => state.healthProfile.answers);

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
        if (!!formikProps.values[nextQuestion] && !!formikProps.values[currentQuestion]) {
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
          initialFormValues.has_prior_immunodeficiency_diagnosis_other_connective_tissue =
            savedAnswers.has_prior_immunodeficiency_diagnosis_other_connective_tissue || '';
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
    const validationObject: { [key: string]: Yup.StringSchema } = {};
    if (healthProfileScreens[sectionName]) {
      healthProfileScreens[sectionName].questions.forEach((question) => {
        if (question.propertyName && question.dependsOnProperty && question.dependsOnPropertyValue) {
          validationObject[question.propertyName] = Yup.string().when(question.dependsOnProperty, {
            is: (answer) => question.dependsOnPropertyValue!.includes(answer),
            then: Yup.string().required(),
          });
        } else if (question.propertyName) {
          validationObject[question.propertyName] = Yup.string().required();
        }

        // Custom field validations
        validationObject.has_prior_immunodeficiency_diagnosis_other_connective_tissue = Yup.string().when(
          'prior_immunodeficiency_diagnosis',
          {
            is: (answer) => !!answer && answer.includes('other'),
            then: Yup.string().required(),
          },
        );
      });
    }

    return Yup.object(validationObject);
  };

  const saveToRedux = async (formData: IHealthProfileFormData) => {
    if (submitting) {
      return;
    }
    setSubmitting(true);
    const infos = createCompletedHealthProfileDTO(formData);
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
      if (sectionName === EHealthProfileSection.SKIN_HAIR_AND_NAILS) {
        // Might take a while for last screen's form data to be updated to Redux
        const completeForm = { ...savedAnswers, ...formData };
        const infos = createCompletedHealthProfileDTO(completeForm);
        try {
          await healthProfileService.createHealthProfile(patientId, infos);
        } catch {
          setErrorMessage(i18n.t('something-went-wrong'));
        }
      }
      setSubmitting(false);
      NavigatorService.push('HPFormScreen', { screenName: navigator[sectionName].nextScreenName });
    },
    [saveToRedux],
  );

  const saveExitOnPress = async (formData: IHealthProfileFormData) => {
    Analytics.track(events.HEALTH_PROFILE_SAVE_EXIT_LINK_CLICKED);
    saveToRedux(formData);
    setShowConfirmExitModal(true);

    if (sectionName === EHealthProfileSection.SKIN_HAIR_AND_NAILS) {
      try {
        await healthProfileService.createHealthProfile(
          patientId,
          formData as unknown as Partial<THealthProfileRequest>,
        );
      } catch {
        setErrorMessage(i18n.t('something-went-wrong'));
      }
    }
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
                saveExitOnPress={() => saveExitOnPress(formikProps.values)}
                testID={healthProfileScreens[sectionName].testID}
                title={healthProfileScreens[sectionName].title}
              >
                <Form hasRequiredFields redesign>
                  {healthProfileScreens[sectionName].questions.map((question) => {
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
                        testID={`health-profile-${sectionName}-screen-${question.propertyName}`}
                      />
                    ) : null;
                  })}

                  <ErrorText>{errorMessage}</ErrorText>
                  {!!Object.keys(formikProps.errors).length && formikProps.submitCount > 0 && formikProps.dirty ? (
                    <ValidationError error={i18n.t('validation-error-text')} />
                  ) : null}
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
