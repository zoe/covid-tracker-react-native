import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import {
  MentalHealthChanges,
  MentalHealthEnd,
  MentalHealthFrequency,
  MentalHealthHistory,
  MentalHealthStart,
  MentalHealthSupport,
  ScreenParamList,
} from '@covid/features';

const StackType = createStackNavigator<ScreenParamList>();

interface IProps {
  Stack: typeof StackType;
}

function MentalHealthNavigator({ Stack }: IProps) {
  const noHeader = {
    headerShown: false,
  };
  return (
    <>
      <Stack.Screen name="MentalHealthStart" component={MentalHealthStart} options={noHeader} />
      <Stack.Screen name="MentalHealthChanges" component={MentalHealthChanges} options={noHeader} />
      <Stack.Screen name="MentalHealthFrequency" component={MentalHealthFrequency} options={noHeader} />
      <Stack.Screen name="MentalHealthHistory" component={MentalHealthHistory} options={noHeader} />
      <Stack.Screen name="MentalHealthSupport" component={MentalHealthSupport} options={noHeader} />
      <Stack.Screen name="MentalHealthEnd" component={MentalHealthEnd} options={noHeader} />
    </>
  );
}

export default MentalHealthNavigator;
