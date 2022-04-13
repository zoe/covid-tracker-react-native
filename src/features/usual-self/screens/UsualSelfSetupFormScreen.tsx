import { Form } from '@covid/components/Form';
import UsualSelfSetupScreen from '@covid/features/usual-self/components/UsualSelfSetupScreen';
import {
  TItemCheckbox,
  UsualSelfSymptomFrequencyQuality,
} from '@covid/features/usual-self/components/UsualSelfSymptomFrequencyQuality';
import { TUsualSelfSetupScreenName, usualSelfSetupScreenMappings } from '@covid/features/usual-self/data/types';
import { usualSelfSetupScreens } from '@covid/features/usual-self/data/usualSelfQuestions';
import { TScreenParamList } from '@covid/routes/types';
import { sizes } from '@covid/themes';
import { RouteProp } from '@react-navigation/native';
import { Formik } from 'formik';
import * as React from 'react';
import { StyleSheet } from 'react-native';

type TProps = {
  route: RouteProp<TScreenParamList, 'UsualSelfSetupForm'>;
};

export default function UsualSelfSetupFormScreen({ route }: TProps) {
  const screenName = route.params.screenName as TUsualSelfSetupScreenName;
  const sectionName = usualSelfSetupScreenMappings[screenName];

  const item: TItemCheckbox = {
    label: 'Headache',
    name: 'headache',
  };

  const getInitialFormValues = () => {
    const initialFormValues = { name: '' };
    return initialFormValues;
  };

  const onSubmit = () => {
    console.log('submit');
  };

  return (
    <Formik
      // validateOnChange
      // validateOnMount
      initialValues={getInitialFormValues()}
      onSubmit={onSubmit}
      // validationSchema={validationSchemaHPAboutYou}
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
            testID="test"
            // buttonEnabled={formikProps.isValid}
            // buttonOnPress={formikProps.handleSubmit}
            // buttonTitle={navigator[sectionName].buttonText}
            // currentStep={navigator[sectionName].currentStep}
            // description={healthProfileScreens[sectionName].description}
            // hideWhyWeAskLink={healthProfileScreens[sectionName].hideWhyWeAskLink}
            // maxSteps={maxSteps}
            // previousScreen={navigator[sectionName].previousScreenName}
            // saveExitOnPress={() => saveExitOnPress(formikProps)}
            // testID={healthProfileScreens[sectionName].testID}
            // title={healthProfileScreens[sectionName].title}
          >
            <Form>
              <UsualSelfSymptomFrequencyQuality formikProps={formikProps} item={item} />
            </Form>
          </UsualSelfSetupScreen>
        );
      }}
    </Formik>
  );
}

const styles = StyleSheet.create({
  view: {
    marginVertical: sizes.xxl,
  },
});
