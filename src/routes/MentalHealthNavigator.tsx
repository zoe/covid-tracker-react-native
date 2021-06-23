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

export default function MentalHealthNavigator({ Stack }: IProps) {
  return (
    <>
      <Stack.Screen component={screens.MentalHealthChanges} name="MentalHealthChanges" options={noHeader} />
      <Stack.Screen component={screens.MentalHealthFrequency} name="MentalHealthFrequency" options={noHeader} />
      <Stack.Screen component={screens.MentalHealthHistory} name="MentalHealthHistory" options={noHeader} />
      <Stack.Screen component={screens.MentalHealthSupport} name="MentalHealthSupport" options={noHeader} />
      <Stack.Screen component={screens.MentalHealthLearning} name="MentalHealthLearning" options={noHeader} />
      <Stack.Screen component={screens.MentalHealthEnd} name="MentalHealthEnd" options={noHeader} />
    </>
  );
}
