import IconSadFace from '@assets/v2/svg/icon-sad-face';
import IconSmileFace from '@assets/v2/svg/icon-smile-face';
import IconTiredFace from '@assets/v2/svg/icon-tired-face';
import { grid } from '@tracer/branding/grid';
import Button from '@tracer/components/atoms/Button';
import Column from '@tracer/components/atoms/Column';
import Checkbox from '@tracer/components/atoms/Inputs/checkbox';
import Row from '@tracer/components/atoms/Row';
import React from 'react';
import { StyleSheet } from 'react-native';

import { TUsualSelfSymptomIcon, TUsualSelfSymptomSeverity } from '../types';

const emojiOpacity = (severity: string, iconSeverity: string) => (severity === iconSeverity ? '1' : '0.5');

interface IAssessmentFlowEditUsualSymptom {
  symptom: string;
  onUpdateDailyAssessmentSymptom: (symptomName: string) => void;
  severity: TUsualSelfSymptomSeverity;
  onUpdateSeverityAssessmentSymptom: (symptomName: string, severity: TUsualSelfSymptomSeverity) => void;
}

interface IUsualSelfSymptomIconButtonProps {
  severity: TUsualSelfSymptomSeverity;
  iconType: TUsualSelfSymptomIcon;
  onPress: (severity: string) => void;
}

const iconTypeToSeverityMapping = {
  sad: 'medium',
  smile: 'low',
  tired: 'high',
};

function UsualSelfSymptomIconButton({ severity, iconType, onPress }: IUsualSelfSymptomIconButtonProps) {
  const onIconPress = (type: TUsualSelfSymptomIcon) => {
    onPress(iconTypeToSeverityMapping[type]);
  };

  return (
    <Column style={[baseStyle.symtomSeverityColumn]}>
      <Button buttonType="tertiary" onPress={() => onIconPress(iconType)} style={{ activeOpacity: 1 }}>
        {iconType === 'smile' ? <IconSmileFace opacity={emojiOpacity(severity, 'low')} /> : null}
        {iconType === 'sad' ? <IconSadFace opacity={emojiOpacity(severity, 'medium')} /> : null}
        {iconType === 'tired' ? <IconTiredFace opacity={emojiOpacity(severity, 'high')} /> : null}
      </Button>
    </Column>
  );
}

export default function AssessmentFlowEditUsualSymptom({
  symptom,
  onUpdateDailyAssessmentSymptom,
  severity,
  onUpdateSeverityAssessmentSymptom,
}: IAssessmentFlowEditUsualSymptom) {
  return (
    <Row style={[baseStyle.symptomRow]}>
      <Column style={[baseStyle.symptomCheckboxColumn]}>
        <Checkbox
          selected
          label={symptom}
          onSelect={() => onUpdateDailyAssessmentSymptom(symptom)}
          textStyle={baseStyle.symptomText}
        />
      </Column>
      <UsualSelfSymptomIconButton
        iconType="smile"
        onPress={() => onUpdateSeverityAssessmentSymptom(symptom, 'low')}
        severity={severity}
      />
      <UsualSelfSymptomIconButton
        iconType="sad"
        onPress={() => onUpdateSeverityAssessmentSymptom(symptom, 'medium')}
        severity={severity}
      />
      <UsualSelfSymptomIconButton
        iconType="tired"
        onPress={() => onUpdateSeverityAssessmentSymptom(symptom, 'high')}
        severity={severity}
      />
    </Row>
  );
}

const baseStyle = StyleSheet.create({
  symptomCheckboxColumn: {
    flexGrow: 1,
    paddingVertical: 6,
  },
  symptomRow: {
    paddingHorizontal: grid.g16,
  },
  symptomText: {
    fontSize: grid.g16,
    fontWeight: '300',
    letterSpacing: 0,
    lineHeight: grid.g24,
    textAlign: 'left',
  },
  symtomSeverityColumn: {
    paddingHorizontal: 6,
  },
});
