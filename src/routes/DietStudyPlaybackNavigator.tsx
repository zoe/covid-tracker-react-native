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

export default function DietStudyPlaybackNavigator({ Stack }: IProps) {
  return (
    <>
      <Stack.Screen component={screens.DietStudyScreen} name="DietStudy" options={noHeader} />
      <Stack.Screen component={screens.DietStudyGlobalScreen} name="DietStudyGlobal" options={noHeader} />
      <Stack.Screen component={screens.DietStudyGutScreen} name="DietStudyGut" options={noHeader} />
      <Stack.Screen component={screens.DietStudyTraditionalScreen} name="DietStudyTraditional" options={noHeader} />
    </>
  );
}
