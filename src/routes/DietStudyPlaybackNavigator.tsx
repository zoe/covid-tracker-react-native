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

export default function DietStudyPlaybackNavigator({ Stack }: IProps) {
  return (
    <>
      <Stack.Screen component={screens.DietStudyScreen} name="DietStudy" options={screenOptions} />
      <Stack.Screen component={screens.DietStudyGlobalScreen} name="DietStudyGlobal" options={screenOptions} />
      <Stack.Screen component={screens.DietStudyGutScreen} name="DietStudyGut" options={screenOptions} />
      <Stack.Screen
        component={screens.DietStudyTraditionalScreen}
        name="DietStudyTraditional"
        options={screenOptions}
      />
    </>
  );
}
