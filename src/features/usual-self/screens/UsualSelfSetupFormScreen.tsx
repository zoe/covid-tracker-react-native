import { Form } from '@covid/components/Form';
import UsualSelfSetupScreen from '@covid/features/usual-self/components/UsualSelfSetupScreen';
import { UsualSelfSymptomFrequencyQuality } from '@covid/features/usual-self/components/UsualSelfSymptomFrequencyQuality';
import { TUsualSelfSetupScreenName, usualSelfSetupScreenMappings } from '@covid/features/usual-self/data/types';
import { usualSelfSetupScreens } from '@covid/features/usual-self/data/usualSelfQuestions';
import { TScreenParamList } from '@covid/routes/types';
import { RouteProp } from '@react-navigation/native';
import { Formik } from 'formik';
import * as React from 'react';

type TProps = {
  route: RouteProp<TScreenParamList, 'UsualSelfSetupForm'>;
};

export default function UsualSelfSetupFormScreen({ route }: TProps) {
  const screenName = route.params.screenName as TUsualSelfSetupScreenName;
  const sectionName = usualSelfSetupScreenMappings[screenName];

  const getInitialFormValues = () => {
    // TODO: complete
    const initialFormValues = {};
    return initialFormValues;
  };

  const onSubmit = () => {
    // TODO: complete
    console.log('submit');
  };

  return (
    <Formik
      // validateOnChange
      initialValues={getInitialFormValues()}
      onSubmit={onSubmit}
      // validationSchema={validationSchema}
    >
      {(formikProps) => {
        return (
          <UsualSelfSetupScreen
            buttonEnabled={formikProps.isValid}
            buttonOnPress={formikProps.handleSubmit}
            buttonTitle="Next"
            currentStep={1}
            description={usualSelfSetupScreens[sectionName].description}
            maxSteps={7}
            previousScreen="DashboardUK"
            testID={usualSelfSetupScreens[sectionName].testID}
            // buttonTitle={navigator[sectionName].buttonText}
            // currentStep={navigator[sectionName].currentStep}
            // previousScreen={navigator[sectionName].previousScreenName}
          >
            <Form>
              {usualSelfSetupScreens[sectionName].questions.map((question) => (
                <UsualSelfSymptomFrequencyQuality formikProps={formikProps} item={question} key={question.name} />
              ))}
            </Form>
          </UsualSelfSetupScreen>
        );
      }}
    </Formik>
  );
}
