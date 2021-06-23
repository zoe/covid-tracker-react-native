import { ScreenParamList } from '@covid/features/ScreenParamList';
import * as screens from '@covid/features/screens';
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
      <Stack.Screen component={screens.DietStudy} name="DietStudy" options={noHeader} />
      <Stack.Screen component={screens.DietStudyGlobal} name="DietStudyGlobal" options={noHeader} />
      <Stack.Screen component={screens.DietStudyGut} name="DietStudyGut" options={noHeader} />
      <Stack.Screen component={screens.DietStudyTraditional} name="DietStudyTraditional" options={noHeader} />
    </>
  );
}
