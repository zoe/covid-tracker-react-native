import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import {
  DietStudyPlaybackIntroScreen,
  DietStudyPlaybackDietQualityScreen,
  DietStudyPlaybackYourDietScreen,
  DietStudyPlaybackGutHealthScreen,
  DietStudyPlaybackYourGutScreen,
  DietStudyPlaybackResearchScreen,
  DietStudy,
  DietStudyGlobal,
  DietStudyGut,
  DietStudyTraditional,
  ScreenParamList,
} from '@covid/features';

const StackType = createStackNavigator<ScreenParamList>();

interface IProps {
  Stack: typeof StackType;
}

function DietStudyPlaybackNavigator({ Stack }: IProps) {
  const noHeader = {
    headerShown: false,
  };
  return (
    <>
      <Stack.Screen name="DietStudyPlaybackIntro" component={DietStudyPlaybackIntroScreen} options={noHeader} />
      <Stack.Screen
        name="DietStudyPlaybackDietQuality"
        component={DietStudyPlaybackDietQualityScreen}
        options={noHeader}
      />
      <Stack.Screen name="DietStudyPlaybackYourDiet" component={DietStudyPlaybackYourDietScreen} options={noHeader} />
      <Stack.Screen name="DietStudyPlaybackGutHealth" component={DietStudyPlaybackGutHealthScreen} options={noHeader} />
      <Stack.Screen name="DietStudyPlaybackYourGut" component={DietStudyPlaybackYourGutScreen} options={noHeader} />
      <Stack.Screen name="DietStudyPlaybackResearch" component={DietStudyPlaybackResearchScreen} options={noHeader} />
      <Stack.Screen name="DietStudy" component={DietStudy} options={noHeader} />
      <Stack.Screen name="DietStudyGlobal" component={DietStudyGlobal} options={noHeader} />
      <Stack.Screen name="DietStudyGut" component={DietStudyGut} options={noHeader} />
      <Stack.Screen name="DietStudyTraditional" component={DietStudyTraditional} options={noHeader} />
    </>
  );
}

export default DietStudyPlaybackNavigator;
