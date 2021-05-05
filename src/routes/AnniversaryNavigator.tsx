import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Anniversary, ScreenParamList } from '@covid/features';

const StackType = createStackNavigator<ScreenParamList>();

interface IProps {
  Stack: typeof StackType;
}

const noHeader = {
  headerShown: false,
};

export default function AnniversaryNavigator({ Stack }: IProps) {
  return (
    <>
      <Stack.Screen name="Anniversary" component={Anniversary} options={noHeader} />
    </>
  );
}
