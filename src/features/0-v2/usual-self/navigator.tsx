import { TScreenParamList } from '@covid/routes/types';
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';
import React from 'react';

import UsualSelfIntroScreen from './screens/0-UsualSelfIntroFlowScreen';
import UsualSelfFormScreen from './screens/1-UsualSelfFormFlowScreen';

const StackType = createNativeStackNavigator<TScreenParamList>();

interface IProps {
  Stack: typeof StackType;
}

const screenOptions: NativeStackNavigationOptions = {
  animation: 'slide_from_right',
  gestureEnabled: false,
  headerShown: false,
};

export default function UsualSelfNavigator({ Stack }: IProps) {
  return (
    <>
      <Stack.Screen component={UsualSelfIntroScreen} name="UsualSelfIntroScreen" options={screenOptions} />
      <Stack.Screen component={UsualSelfFormScreen} name="UsualSelfFormScreen" options={screenOptions} />
    </>
  );
}
