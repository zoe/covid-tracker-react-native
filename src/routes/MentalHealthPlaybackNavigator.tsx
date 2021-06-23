import {
  MHPBlogPostScreen,
  MHPGeneralScreen,
  MHPIntroductionScreen,
  MHPRatingScreen,
  MHPThankYouScreen,
} from '@covid/features/mental-health-playback/screens';
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

export default function MentalHealthPlaybackNavigator({ Stack }: IProps) {
  return (
    <>
      <Stack.Screen component={MHPBlogPostScreen} name="MentalHealthPlaybackBlogPost" options={noHeader} />
      <Stack.Screen component={MHPGeneralScreen} name="MentalHealthPlaybackGeneral" options={noHeader} />
      <Stack.Screen component={MHPIntroductionScreen} name="MentalHealthPlaybackIntroduction" options={noHeader} />
      <Stack.Screen component={MHPRatingScreen} name="MentalHealthPlaybackRating" options={noHeader} />
      <Stack.Screen component={MHPThankYouScreen} name="MentalHealthPlaybackThankYou" options={noHeader} />
    </>
  );
}
