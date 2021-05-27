import { Anniversary, ScreenParamList } from '@covid/features';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

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
      <Stack.Screen component={Anniversary} name="Anniversary" options={noHeader} />
    </>
  );
}

export default AnniversaryNavigator;
