import { ErrorText } from '@covid/components';
import { Form } from '@covid/components/Form';
import { ValidationError } from '@covid/components/ValidationError';
import Analytics, { events } from '@covid/core/Analytics';
import { updateHealthProfile } from '@covid/core/state/health-profile/slice';
import { THealthProfileData } from '@covid/core/state/health-profile/types';
import { TRootState } from '@covid/core/state/root';
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
  screenMappings,
  THealthProfilePropertyName,
  THPScreenName,
} from '@covid/features/health-profile/data/healthProfileQuestions';
import { isEditing } from '@covid/features/health-profile/utils/healthProfileUtils';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import { TScreenParamList } from '@covid/routes/types';
import { sizes } from '@covid/themes';
import { RouteProp } from '@react-navigation/native';
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
  // const patientId = useSelector<TRootState, string>((state) => state.user.patients[0]); TODO: uncomment when we call backend API
  const dispatch = useDispatch();
  const savedAnswers = useSelector<TRootState, THealthProfileData>((state) => state.healthProfile.answers);

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
          savedAnswers[healthProfileScreens[sectionName].questions[i].propertyName as THealthProfilePropertyName] !==
            '' &&
          savedAnswers[healthProfileScreens[sectionName].questions[i].propertyName as THealthProfilePropertyName] !==
            undefined
        ) {
          return EHealthProfileQuestionCardStatus.PLAYBACK;
        }
        return EHealthProfileQuestionCardStatus.NOT_ANSWERED;
      };

      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [questionStatus, setQuestionStatus] = React.useState(initialState());

      questionsState[healthProfileScreens[sectionName].questions[i].propertyName as THealthProfilePropertyName] =
        questionStatus;
      setQuestionsState[healthProfileScreens[sectionName].questions[i].propertyName as THealthProfilePropertyName] =
        setQuestionStatus;
    }
  }

  const updateQuestionsState = (formikProps: FormikProps<THealthProfileData>) => {
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
    const initialFormValues = {} as THealthProfileData;
    if (healthProfileScreens[sectionName] === undefined) {
      return initialFormValues;
    }

    // Get saved values from Redux state if they exist
    healthProfileScreens[sectionName].questions.forEach((question) => {
      if (question.fieldType === EFieldType.MULTISELECT) {
        // For tracking all selections in a multiselect question, first initialise the empty array to track answers...
        const answersSelected: string[] = [];

        // Then for each choice, get saved answer from Redux for displaying in the form screen. Additionally, if true, add to array of answers.
        question.items.forEach((item) => {
          initialFormValues[item.name as THealthProfilePropertyName] = savedAnswers[item.name];
          if (savedAnswers[item.name] === true) {
            answersSelected.push(item.name);
          }
        });

        initialFormValues[question.propertyName as THealthProfilePropertyName] = answersSelected.join(',');
      } else if (question.fieldType === EFieldType.YESNO) {
        if (typeof savedAnswers[question.propertyName] === 'boolean') {
          initialFormValues[question.propertyName] = savedAnswers[question.propertyName] ? 'yes' : 'no';
        } else {
          initialFormValues[question.propertyName] = savedAnswers[question.propertyName];
        }
      } else if (question.propertyName) {
        initialFormValues[question.propertyName] = savedAnswers[question.propertyName]?.toString() || '';
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
      });
    }

    return Yup.object(validationObject);
  };

  const saveToRedux = async (formData: THealthProfileData) => {
    if (submitting) {
      return;
    }
    setSubmitting(true);
    try {
      dispatch(updateHealthProfile(formData));
    } catch {
      setErrorMessage(i18n.t('something-went-wrong'));
    }
  };

  const onSubmit = React.useCallback(
    async (formData) => {
      saveToRedux(formData);
      if (sectionName === EHealthProfileSection.SKIN_HAIR_AND_NAILS) {
        // TODO: replace with proper endpoint when ready
        // await patientService.updatePatientInfo(patientId, infos)
      }
      setSubmitting(false);
      NavigatorService.push('HPFormScreen', { screenName: navigator[sectionName].nextScreenName });
    },
    [saveToRedux],
  );

  const saveExitOnPress = (formData: THealthProfileData) => {
    Analytics.track(events.HEALTH_PROFILE_SAVE_EXIT_LINK_CLICKED);
    saveToRedux(formData);
    setShowConfirmExitModal(true);

    if (sectionName === EHealthProfileSection.SKIN_HAIR_AND_NAILS) {
      try {
        // TODO: replace with proper endpoint when ready
        // await patientService.updatePatientInfo(patientId, infos)
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
        {function FormWithUseEffect(formikProps: FormikProps<THealthProfileData>) {
          React.useEffect(() => {
            updateQuestionsState(formikProps);
          });
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
