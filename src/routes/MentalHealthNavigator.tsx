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
import * as React from 'react';

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
      <Stack.Screen component={MentalHealthChanges} name="MentalHealthChanges" options={noHeader} />
      <Stack.Screen component={MentalHealthFrequency} name="MentalHealthFrequency" options={noHeader} />
      <Stack.Screen component={MentalHealthHistory} name="MentalHealthHistory" options={noHeader} />
      <Stack.Screen component={MentalHealthSupport} name="MentalHealthSupport" options={noHeader} />
      <Stack.Screen component={MentalHealthLearning} name="MentalHealthLearning" options={noHeader} />
      <Stack.Screen component={MentalHealthEnd} name="MentalHealthEnd" options={noHeader} />
    </>
  );
}
