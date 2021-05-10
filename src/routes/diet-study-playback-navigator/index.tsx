import { DietStudy, DietStudyGlobal, DietStudyGut, DietStudyTraditional, ScreenParamList } from '@covid/features';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

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
      <Stack.Screen component={DietStudy} name="DietStudy" options={noHeader} />
      <Stack.Screen component={DietStudyGlobal} name="DietStudyGlobal" options={noHeader} />
      <Stack.Screen component={DietStudyGut} name="DietStudyGut" options={noHeader} />
      <Stack.Screen component={DietStudyTraditional} name="DietStudyTraditional" options={noHeader} />
    </>
  );
}

export default DietStudyPlaybackNavigator;
