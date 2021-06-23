import { Anniversary, ScreenParamList } from '@covid/features';
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
  return <Stack.Screen component={Anniversary} name="Anniversary" options={noHeader} />;
}
