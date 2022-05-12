import AssessmentPage1ShowUsualSelf from '@covid/features/0-v2/assessment-flow/screens/1-Page-Usual-Self-Symptoms';
import AssessmentPage2UpdateUsualSelf from '@covid/features/0-v2/assessment-flow/screens/2-Page-Usual-Self-Symptom-Update';
import AssessmentPage3LogNewSymptom from '@covid/features/0-v2/assessment-flow/screens/3-Page-Log-New-Symptom';
import AssessmentPage4LogNewSymptomFlow from '@covid/features/0-v2/assessment-flow/screens/4-Page-Log-New-Symptom-Flow';
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
    </>
  );
}
