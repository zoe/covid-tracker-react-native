import * as screens from '@covid/features/screens';
import { TScreenParamList } from '@covid/routes/types';
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';
import * as React from 'react';

const StackType = createNativeStackNavigator<TScreenParamList>();

interface IProps {
  Stack: typeof StackType;
}

const screenOptions: NativeStackNavigationOptions = {
  animation: 'slide_from_right',
  headerShown: false,
};

export default function ReconsentNavigator({ Stack }: IProps) {
  return (
    <>
      <Stack.Screen
        component={screens.ReconsentIntroductionScreen}
        name="ReconsentIntroduction"
        options={screenOptions}
      />
      <Stack.Screen
        component={screens.ReconsentDiseasePreferencesScreen}
        name="ReconsentDiseasePreferences"
        options={screenOptions}
      />
      <Stack.Screen
        component={screens.ReconsentDiseaseSummaryScreen}
        name="ReconsentDiseaseSummary"
        options={screenOptions}
      />
      <Stack.Screen
        component={screens.ReconsentRequestConsentScreen}
        name="ReconsentRequestConsent"
        options={screenOptions}
      />
      <Stack.Screen
        component={screens.ReconsentNewsletterSignupScreen}
        name="ReconsentNewsletterSignup"
        options={screenOptions}
      />
      <Stack.Screen component={screens.ReconsentFeedbackScreen} name="ReconsentFeedback" options={screenOptions} />
      <Stack.Screen component={screens.ReconsentReconsiderScreen} name="ReconsentReconsider" options={screenOptions} />
    </>
  );
}
