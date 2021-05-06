import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import {
  MentalHealthChanges,
  MentalHealthEnd,
  MentalHealthFrequency,
  MentalHealthHistory,
  MentalHealthLearning,
  MentalHealthSupport,
  ScreenParamList,
} from '@covid/features';

const StackType = createStackNavigator<ScreenParamList>();

interface IProps {
  Stack: typeof StackType;
}

const noHeader = {
  headerShown: false,
};

export default function MentalHealthNavigator({ Stack }: IProps) {
  return (
    <>
      <Stack.Screen name="MentalHealthChanges" component={MentalHealthChanges} options={noHeader} />
      <Stack.Screen name="MentalHealthFrequency" component={MentalHealthFrequency} options={noHeader} />
      <Stack.Screen name="MentalHealthHistory" component={MentalHealthHistory} options={noHeader} />
      <Stack.Screen name="MentalHealthSupport" component={MentalHealthSupport} options={noHeader} />
      <Stack.Screen name="MentalHealthLearning" component={MentalHealthLearning} options={noHeader} />
      <Stack.Screen name="MentalHealthEnd" component={MentalHealthEnd} options={noHeader} />
    </>
  );
}
