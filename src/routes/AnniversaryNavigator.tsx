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

export default function AnniversaryNavigator({ Stack }: IProps) {
  return <Stack.Screen component={screens.AnniversaryScreen} name="Anniversary" options={noHeader} />;
}
