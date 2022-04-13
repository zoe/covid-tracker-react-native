import { Form } from '@covid/components/Form';
import UsualSelfSetupScreen from '@covid/features/usual-self/components/UsualSelfSetupScreen';
import { UsualSelfSymptomFrequencyQuality } from '@covid/features/usual-self/components/UsualSelfSymptomFrequencyQuality';
import { TUsualSelfSetupScreenName, usualSelfSetupScreenMappings } from '@covid/features/usual-self/data/types';
import { usualSelfSetupScreens } from '@covid/features/usual-self/data/usualSelfQuestions';
import NavigatorService from '@covid/NavigatorService';
import { TScreenParamList } from '@covid/routes/types';
import { RouteProp } from '@react-navigation/native';
import { Formik } from 'formik';
import * as React from 'react';

import { MAX_STEPS_USUAL_SELF_SETUP, USUAL_SELF_NAVIGATOR } from '../data/usualSelfNavigator';

type TProps = {
  route: RouteProp<TScreenParamList, 'UsualSelfSetupForm'>;
};

export default function UsualSelfSetupFormScreen({ route }: TProps) {
  const screenName = route.params.screenName as TUsualSelfSetupScreenName;
  const sectionName = usualSelfSetupScreenMappings[screenName];

  const navigator = USUAL_SELF_NAVIGATOR;
  const maxSteps = MAX_STEPS_USUAL_SELF_SETUP;

  const getInitialFormValues = () => {
    // TODO: complete
    const initialFormValues = {};
    return initialFormValues;
  };

  const onSubmit = () => {
    // TODO: complete
    NavigatorService.push('UsualSelfSetupForm', { screenName: navigator[sectionName].nextScreenName });
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
            buttonTitle={navigator[sectionName].buttonText}
            currentStep={navigator[sectionName].currentStep}
            description={usualSelfSetupScreens[sectionName].description}
            maxSteps={maxSteps}
            previousScreen={navigator[sectionName].previousScreenName}
            testID={usualSelfSetupScreens[sectionName].testID}
          >
            <Form>
              {usualSelfSetupScreens[sectionName].symptoms.map((symptom) => (
                <UsualSelfSymptomFrequencyQuality formikProps={formikProps} item={symptom} key={symptom.name} />
              ))}
            </Form>
          </UsualSelfSetupScreen>
        );
      }}
    </Formik>
  );
}
