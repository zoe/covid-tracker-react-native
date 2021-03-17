import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Anniversary, ScreenParamList } from '@covid/features';

const StackType = createStackNavigator<ScreenParamList>();

interface IProps {
  Stack: typeof StackType;
}

function AnniversaryNavigator({ Stack }: IProps) {
  const noHeader = {
    headerShown: false,
  };
  return (
    <>
      <Stack.Screen name="Anniversary" component={Anniversary} options={noHeader} />
    </>
  );
}

export default AnniversaryNavigator;
