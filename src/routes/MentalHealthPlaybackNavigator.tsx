import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { ScreenParamList } from '@covid/features/ScreenParamList';
import {
  MHPBlogPostScreen,
  MHPGeneralScreen,
  MHPIntroductionScreen,
  MHPRatingScreen,
  MHPThankYouScreen,
} from '@covid/features/mental-health-playback/screens';

const StackType = createStackNavigator<ScreenParamList>();

interface IProps {
  Stack: typeof StackType;
}

const noHeader = {
  headerShown: false,
};

export default function MentalHealthPlaybackNavigator({ Stack }: IProps) {
  return (
    <>
      <Stack.Screen name="MentalHealthPlaybackBlogPost" component={MHPBlogPostScreen} options={noHeader} />
      <Stack.Screen name="MentalHealthPlaybackGeneral" component={MHPGeneralScreen} options={noHeader} />
      <Stack.Screen name="MentalHealthPlaybackIntroduction" component={MHPIntroductionScreen} options={noHeader} />
      <Stack.Screen name="MentalHealthPlaybackRating" component={MHPRatingScreen} options={noHeader} />
      <Stack.Screen name="MentalHealthPlaybackThankYou" component={MHPThankYouScreen} options={noHeader} />
    </>
  );
}
