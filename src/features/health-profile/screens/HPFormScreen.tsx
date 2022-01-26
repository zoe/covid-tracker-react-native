import { ErrorText } from '@covid/components';
import { Form } from '@covid/components/Form';
import { ValidationError } from '@covid/components/ValidationError';
import { fetchExistingHealthProfile } from '@covid/core/state/health-profile/slice';
import { THealthProfileData } from '@covid/core/state/health-profile/types';
import { TRootState } from '@covid/core/state/root';
import HealthProfileQuestionCard, {
  EFieldType,
} from '@covid/features/health-profile/components/HealthProfileQuestionCard';
import HealthProfileScreen from '@covid/features/health-profile/components/HealthProfileScreen';
import {
  MAX_STEPS_FEMALE,
  MAX_STEPS_MALE,
  NAVIGATOR_FEMALE,
  NAVIGATOR_MALE,
} from '@covid/features/health-profile/data/healthProfileNavigator';
import {
  healthProfileScreens,
  screenMappings,
  THealthProfilePropertyName,
  THPScreenName,
} from '@covid/features/health-profile/data/healthProfileQuestions';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import { TScreenParamList } from '@covid/routes/types';
import { sizes } from '@covid/themes';
import { RouteProp } from '@react-navigation/native';
import { Formik } from 'formik';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

type TProps = {
  route: RouteProp<TScreenParamList, 'HPFormScreen'>;
};

export default function HPFormScreen({ route }: TProps) {
  const patientId = useSelector<TRootState, string>((state) => state.user.patients[0]);
  const dispatch = useDispatch();
  const savedAnswers = useSelector<TRootState, THealthProfileData>((state) => state.healthProfile.answers);

  React.useEffect(() => {
    dispatch(fetchExistingHealthProfile(patientId)); // TODO: Should we move this to onAppStartup? Otherwise would be calling this on every screen change.
  }, []);

  const screenName = route.params?.screenName as THPScreenName;
  const sectionName = screenMappings[screenName];

  const gender = 'female'; // TODO: read from redux state whether gender = '1' or genderIdentity = 'female'
  const navigator = gender === 'female' ? NAVIGATOR_FEMALE : NAVIGATOR_MALE;
  const maxSteps = gender === 'female' ? MAX_STEPS_FEMALE : MAX_STEPS_MALE;

  const [submitting, setSubmitting] = React.useState<boolean>(false);
  const [errorMessage, setErrorMessage] = React.useState<string>('');

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
    if (healthProfileScreens[sectionName] === undefined) {
      return validationObject;
    }
    // TODO: confirm YesNo fields are not converted to boolean, otherwise need to fix validation logic
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

    return Yup.object(validationObject);
  };

  const onSubmit = React.useCallback(
    async (formData) => {
      if (submitting) {
        return;
      }
      setSubmitting(true);

      const infos = formData; // assumes we don't convert yes/no questions to boolean

      try {
        // TODO: send data to Redux
        // TODO: on last screen, also save to backend
        // await patientService.updatePatientInfo(patientId, infos); TODO: uncomment when ready

        // eslint-disable-next-line no-console
        console.log('infos', infos);
        NavigatorService.navigate('HPFormScreen', { screenName: navigator[sectionName].nextScreenName });
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
      validationSchema={validationSchema()}
    >
      {(formikProps) => {
        return (
          navigator[sectionName] && (
            <HealthProfileScreen
              buttonEnabled={formikProps.isValid && formikProps.dirty}
              buttonOnPress={formikProps.handleSubmit}
              buttonTitle={navigator[sectionName].buttonText}
              currentStep={navigator[sectionName].currentStep}
              description={healthProfileScreens[sectionName].description}
              hideWhyWeAskLink={healthProfileScreens[sectionName].hideWhyWeAskLink}
              maxSteps={maxSteps || 16}
              testID={healthProfileScreens[sectionName].testID}
              title={healthProfileScreens[sectionName].title}
            >
              <Form hasRequiredFields redesign>
                {healthProfileScreens[sectionName].questions.map((question, index) => {
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
                      isEditing
                      description={question.description}
                      fieldType={question.fieldType}
                      formikProps={formikProps}
                      items={question.items}
                      // eslint-disable-next-line react/no-array-index-key
                      key={`${question.propertyName}-${index}`}
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
                {!!Object.keys(formikProps.errors).length && formikProps.submitCount > 0 ? (
                  <ValidationError error={i18n.t('validation-error-text')} />
                ) : null}
              </Form>
            </HealthProfileScreen>
          )
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
