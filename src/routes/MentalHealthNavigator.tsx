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
      <Stack.Screen component={screens.MentalHealthChangesScreen} name="MentalHealthChanges" options={noHeader} />
      <Stack.Screen component={screens.MentalHealthFrequencyScreen} name="MentalHealthFrequency" options={noHeader} />
      <Stack.Screen component={screens.MentalHealthHistoryScreen} name="MentalHealthHistory" options={noHeader} />
      <Stack.Screen component={screens.MentalHealthSupportScreen} name="MentalHealthSupport" options={noHeader} />
      <Stack.Screen component={screens.MentalHealthLearningScreen} name="MentalHealthLearning" options={noHeader} />
      <Stack.Screen component={screens.MentalHealthEndScreen} name="MentalHealthEnd" options={noHeader} />
    </>
  );
}
