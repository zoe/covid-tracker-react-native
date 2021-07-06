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

export default function AnniversaryNavigator({ Stack }: IProps) {
  return <Stack.Screen component={screens.AnniversaryScreen} name="Anniversary" options={noHeader} />;
}
