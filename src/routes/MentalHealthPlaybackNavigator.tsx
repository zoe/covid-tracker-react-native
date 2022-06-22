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

export default function MentalHealthPlaybackNavigator({ Stack }: IProps) {
  return (
    <>
      <Stack.Screen component={screens.MHPGeneralScreen} name="MentalHealthPlaybackGeneral" options={screenOptions} />
      <Stack.Screen
        component={screens.MHPIntroductionScreen}
        name="MentalHealthPlaybackIntroduction"
        options={screenOptions}
      />
      <Stack.Screen component={screens.MHPRatingScreen} name="MentalHealthPlaybackRating" options={screenOptions} />
      <Stack.Screen component={screens.MHPThankYouScreen} name="MentalHealthPlaybackThankYou" options={screenOptions} />
    </>
  );
}
