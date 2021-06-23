import { DietStudy, DietStudyGlobal, DietStudyGut, DietStudyTraditional, ScreenParamList } from '@covid/features';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

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
      <Stack.Screen component={DietStudy} name="DietStudy" options={noHeader} />
      <Stack.Screen component={DietStudyGlobal} name="DietStudyGlobal" options={noHeader} />
      <Stack.Screen component={DietStudyGut} name="DietStudyGut" options={noHeader} />
      <Stack.Screen component={DietStudyTraditional} name="DietStudyTraditional" options={noHeader} />
    </>
  );
}
