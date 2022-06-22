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

export default function StudyHubNavigator({ Stack }: IProps) {
  return (
    <>
      <Stack.Screen component={screens.StudiesListScreen} name="StudiesList" options={screenOptions} />
      <Stack.Screen component={screens.StudyDetailsScreen} name="StudyDetails" options={screenOptions} />
      <Stack.Screen component={screens.StudyHubOnboardingScreen} name="StudyHubOnboarding" options={screenOptions} />
    </>
  );
}
