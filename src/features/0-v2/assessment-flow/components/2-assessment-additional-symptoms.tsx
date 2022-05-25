import React from 'react';

import { TUsualSelfFrequentSymptom, TUsualSelfSymptomSeverity } from '../types';
import AssessmentFlowEditUsualSymptom from './2-usual-self-symptoms-edit';

interface IAssessmentAdditionalSymptoms {
  additionalSymptomsToday?: TUsualSelfFrequentSymptom[];
  onToggleSymptom: (symptomName: string) => void;
  onUpdateSymptomSeverity: (symptomName: string, severity: TUsualSelfSymptomSeverity) => void;
}

export default function AssessmentAdditionalSymptoms({
  additionalSymptomsToday,
  onToggleSymptom,
  onUpdateSymptomSeverity,
}: IAssessmentAdditionalSymptoms) {
  if (!additionalSymptomsToday || additionalSymptomsToday.length > 0) return null;
  return (
    <>
      {additionalSymptomsToday.map((props) => (
        <AssessmentFlowEditUsualSymptom
          {...props}
          onToggleSymptom={onToggleSymptom}
          onUpdateSymptomSeverity={onUpdateSymptomSeverity}
        />
      ))}
    </>
  );
}
