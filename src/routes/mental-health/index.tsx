import {
  MentalHealthChanges,
  MentalHealthEnd,
  MentalHealthFrequency,
  MentalHealthHistory,
  MentalHealthLearning,
  MentalHealthSupport,
  ScreenParamList,
} from '@covid/features';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

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
      <Stack.Screen component={MentalHealthChanges} name="MentalHealthChanges" options={noHeader} />
      <Stack.Screen component={MentalHealthFrequency} name="MentalHealthFrequency" options={noHeader} />
      <Stack.Screen component={MentalHealthHistory} name="MentalHealthHistory" options={noHeader} />
      <Stack.Screen component={MentalHealthSupport} name="MentalHealthSupport" options={noHeader} />
      <Stack.Screen component={MentalHealthLearning} name="MentalHealthLearning" options={noHeader} />
      <Stack.Screen component={MentalHealthEnd} name="MentalHealthEnd" options={noHeader} />
    </>
  );
}

export default MentalHealthNavigator;
