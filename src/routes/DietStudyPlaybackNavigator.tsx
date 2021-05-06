import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { DietStudy, DietStudyGlobal, DietStudyGut, DietStudyTraditional, ScreenParamList } from '@covid/features';

const StackType = createStackNavigator<ScreenParamList>();

interface IProps {
  Stack: typeof StackType;
}

const noHeader = {
  headerShown: false,
};

export default function DietStudyPlaybackNavigator({ Stack }: IProps) {
  return (
    <>
      <Stack.Screen name="DietStudy" component={DietStudy} options={noHeader} />
      <Stack.Screen name="DietStudyGlobal" component={DietStudyGlobal} options={noHeader} />
      <Stack.Screen name="DietStudyGut" component={DietStudyGut} options={noHeader} />
      <Stack.Screen name="DietStudyTraditional" component={DietStudyTraditional} options={noHeader} />
    </>
  );
}
