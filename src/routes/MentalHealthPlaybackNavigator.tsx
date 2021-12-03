import * as screens from '@covid/features/screens';
import { TScreenParamList } from '@covid/routes/types';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

const StackType = createStackNavigator<TScreenParamList>();

interface IProps {
  Stack: typeof StackType;
}

const noHeader = {
  headerShown: false,
};

export default function MentalHealthPlaybackNavigator({ Stack }: IProps) {
  return (
    <>
      <Stack.Screen component={screens.MHPGeneralScreen} name="MentalHealthPlaybackGeneral" options={noHeader} />
      <Stack.Screen
        component={screens.MHPIntroductionScreen}
        name="MentalHealthPlaybackIntroduction"
        options={noHeader}
      />
      <Stack.Screen component={screens.MHPRatingScreen} name="MentalHealthPlaybackRating" options={noHeader} />
      <Stack.Screen component={screens.MHPThankYouScreen} name="MentalHealthPlaybackThankYou" options={noHeader} />
    </>
  );
}
