import { TScreenParamList } from '@covid/routes/types';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import AssessmentPage1ShowUsualSelf from './screens/show-usual-self';
import AssessmentPage2UpdateUsualSelf from './screens/update-usual-self';
import AssessmentPage3LogNewSymptom from './screens/3-Page-Log-New-Symptom';
import AssessmentPage4LogNewSymptomFlow from './screens/4-Page-Log-New-Symptom-Flow';
import AssessmentPage5LogNewSymptomReason from './screens/5-Page-New-Symptom-Reason';

const StackType = createStackNavigator<TScreenParamList>();

interface IProps {
  Stack: typeof StackType;
}

const noHeader = {
  headerShown: false,
};

export default function AssessmentFlowNavigator({ Stack }: IProps) {
  return (
    <>
      <Stack.Screen component={AssessmentPage1ShowUsualSelf} name="AssessmentPage1ShowUsualSelf" options={noHeader} />
      <Stack.Screen
        component={AssessmentPage2UpdateUsualSelf}
        name="AssessmentPage2UpdateUsualSelf"
        options={noHeader}
      />
      <Stack.Screen component={AssessmentPage3LogNewSymptom} name="AssessmentPage3LogNewSymptom" options={noHeader} />
      <Stack.Screen
        component={AssessmentPage4LogNewSymptomFlow}
        name="AssessmentPage4LogNewSymptomFlow"
        options={noHeader}
      />
      <Stack.Screen
        component={AssessmentPage5LogNewSymptomReason}
        name="AssessmentPage5LogNewSymptomReason"
        options={noHeader}
      />
    </>
  );
}
