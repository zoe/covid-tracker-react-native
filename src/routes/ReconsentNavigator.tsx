import {
  ReconsentDiseaseConfirmationScreen,
  ReconsentDiseasePreferencesScreen,
  ReconsentFeedbackScreen,
  ReconsentIntroductionScreen,
  ReconsentNewsletterSignupScreen,
  ReconsentReconsiderScreen,
  ReconsentRequestConsentScreen,
} from '@covid/features';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

const StackType = createStackNavigator<ScreenParamList>();

interface IProps {
  Stack: typeof StackType;
}

const noHeader = {
  headerShown: false,
};

export default function ReconsentNavigator({ Stack }: IProps) {
  return (
    <>
      <Stack.Screen component={ReconsentIntroductionScreen} name="ReconsentIntroduction" options={noHeader} />
      <Stack.Screen
        component={ReconsentDiseasePreferencesScreen}
        name="ReconsentDiseasePreferences"
        options={noHeader}
      />
      <Stack.Screen
        component={ReconsentDiseaseConfirmationScreen}
        name="ReconsentDiseaseConfirmation"
        options={noHeader}
      />
      <Stack.Screen component={ReconsentRequestConsentScreen} name="ReconsentRequestConsent" options={noHeader} />
      <Stack.Screen component={ReconsentNewsletterSignupScreen} name="ReconsentNewsletterSignup" options={noHeader} />
      <Stack.Screen component={ReconsentFeedbackScreen} name="ReconsentFeedback" options={noHeader} />
      <Stack.Screen component={ReconsentReconsiderScreen} name="ReconsentReconsider" options={noHeader} />
    </>
  );
}
