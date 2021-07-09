import { ScreenParamList } from '@covid/features/ScreenParamList';
import * as screens from '@covid/features/screens';
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
      <Stack.Screen component={screens.ReconsentIntroductionScreen} name="ReconsentIntroduction" options={noHeader} />
      <Stack.Screen
        component={screens.ReconsentDiseasePreferencesScreen}
        name="ReconsentDiseasePreferences"
        options={noHeader}
      />
      <Stack.Screen
        component={screens.ReconsentDiseaseSummaryScreen}
        name="ReconsentDiseaseSummary"
        options={noHeader}
      />
      <Stack.Screen
        component={screens.ReconsentRequestConsentScreen}
        name="ReconsentRequestConsent"
        options={noHeader}
      />
      <Stack.Screen
        component={screens.ReconsentNewsletterSignupScreen}
        name="ReconsentNewsletterSignup"
        options={noHeader}
      />
      <Stack.Screen component={screens.ReconsentFeedbackScreen} name="ReconsentFeedback" options={noHeader} />
      <Stack.Screen component={screens.ReconsentReconsiderScreen} name="ReconsentReconsider" options={noHeader} />
    </>
  );
}
