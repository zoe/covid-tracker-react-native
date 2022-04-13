import * as screens from '@covid/features/screens';
import { TScreenParamList } from '@covid/routes/types';
import { RouteProp } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

const StackType = createStackNavigator<TScreenParamList>();

interface IProps {
  Stack: typeof StackType;
}

const noHeader = {
  headerShown: false,
};

const usualSelfFormScreenOptions = (route: RouteProp<TScreenParamList, 'UsualSelfSetupForm'>) => {
  const goBackwards = route.params?.navDirection === 'backwards';

  return {
    ...noHeader,
    gestureDirection: goBackwards ? 'horizontal-inverted' : 'horizontal',
  };
};

export default function UsualSelfNavigator({ Stack }: IProps) {
  return (
    <>
      <Stack.Screen component={screens.UsualSelfIntroductionScreen} name="UsualSelfIntroduction" options={noHeader} />
      <Stack.Screen
        component={screens.UsualSelfReportsPowerfulScreen}
        name="UsualSelfReportsPowerful"
        options={noHeader}
      />
      <Stack.Screen
        component={screens.UsualSelfReportsSingleTapScreen}
        name="UsualSelfReportsSingleTap"
        options={noHeader}
      />
      <Stack.Screen
        component={screens.UsualSelfReportsSymptomsScreen}
        name="UsualSelfReportsSymptoms"
        options={noHeader}
      />
      <Stack.Screen
        component={screens.UsualSelfSetupFormScreen}
        name="UsualSelfSetupForm"
        options={({ route }) => usualSelfFormScreenOptions(route)}
      />
    </>
  );
}
