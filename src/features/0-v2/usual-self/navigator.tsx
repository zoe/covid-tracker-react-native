import { TScreenParamList } from '@covid/routes/types';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import UsualSelfIntroScreen from './screens/0-UsualSelfIntroFlowScreen';
import UsualSelfFormScreen from './screens/1-UsualSelfFormFlowScreen';

const StackType = createStackNavigator<TScreenParamList>();

interface IProps {
  Stack: typeof StackType;
}

const screenOptions = {
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
