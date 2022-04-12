import * as screens from '@covid/features/screens';
import { TScreenParamList } from '@covid/routes/types';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

const StackType = createStackNavigator<TScreenParamList>();

interface IProps {
  Stack: typeof StackType;
}

const noHeader = {
  headerShown: false,
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
    </>
  );
}
