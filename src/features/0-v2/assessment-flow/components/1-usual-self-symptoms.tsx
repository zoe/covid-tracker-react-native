import IconSadFace from '@assets/v2/svg/icon-sad-face';
import IconSmileFace from '@assets/v2/svg/icon-smile-face';
import IconTiredFace from '@assets/v2/svg/icon-tired-face';
import i18n from '@covid/locale/i18n';
import { colors } from '@tracer/branding/colors';
import { grid } from '@tracer/branding/grid';
import Column from '@tracer/components/atoms/Column';
import Row from '@tracer/components/atoms/Row';
import StackedCard from '@tracer/components/organisms/Card/stacked';
import React from 'react';
import { StyleSheet, Text } from 'react-native';

import { TUsualSelfFrequentOtherSymptom, TUsualSelfFrequentSymptom } from '../types';

const emoji = (severity: string) => {
  if (severity === 'low') return <IconSmileFace opacity="1" />;
  if (severity === 'medium') return <IconSadFace opacity="1" />;
  if (severity === 'high') return <IconTiredFace opacity="1" />;
  return <IconSmileFace opacity="1" />;
};

export const makeNoUsualSelfFrequentSymptoms = () => {
  return (
    <Row style={[baseStyle.usualSelfSymptomRow]}>
      <Column style={[baseStyle.usualSelfSeverityColumn]}>{emoji('rarely')}</Column>
      <Column style={[baseStyle.usualSelfNameColumn]}>
        <Text style={baseStyle.symptomText}>{i18n.t('usual-self.assessment-flow.1-no-symptoms')}</Text>
      </Column>
    </Row>
  );
};

const makeUsualSelfFrequentSymptoms = (yourFrequentSymptoms: TUsualSelfFrequentSymptom[]) =>
  yourFrequentSymptoms.map(({ severity, display_name, description }: TUsualSelfFrequentSymptom, index: number) => (
    <Row key={`usual-self-symptom-${index + 1}`} style={[baseStyle.usualSelfSymptomRow]}>
      <Column style={[baseStyle.usualSelfSeverityColumn]}>{emoji(severity)}</Column>
      <Column style={[baseStyle.usualSelfNameColumn]}>
        <Text style={[baseStyle.symptomText]}>{display_name}</Text>
      </Column>
    </Row>
  ));

const makeUsualSelfFrequentOtherSymptoms = (yourFrequentOtherSymptoms: TUsualSelfFrequentOtherSymptom[]) =>
  yourFrequentOtherSymptoms.map(({ severity, description }: TUsualSelfFrequentOtherSymptom, index: number) => (
    <Row key={`usual-self-symptom-${index + 1}`} style={[baseStyle.usualSelfSymptomRow]}>
      <Column style={[baseStyle.usualSelfSeverityColumn]}>{emoji(severity)}</Column>
      <Column style={[baseStyle.usualSelfNameColumn]}>
        <Text style={[baseStyle.symptomText]}>{description}</Text>
      </Column>
    </Row>
  ));

interface IUsualSelfSymptomsProps {
  yourFrequentSymptoms?: TUsualSelfFrequentSymptom[];
  yourFrequentOtherSymptoms?: TUsualSelfFrequentOtherSymptom[];
}

export default function UsualSelfFrequentSymptoms({
  yourFrequentSymptoms,
  yourFrequentOtherSymptoms,
}: IUsualSelfSymptomsProps) {
  const hasFrequentSymptoms = yourFrequentSymptoms !== undefined && yourFrequentSymptoms.length > 0;
  const hasFrequentOtherSymptoms = yourFrequentOtherSymptoms !== undefined && yourFrequentOtherSymptoms.length > 0;
  return (
    <StackedCard
      cardProps={{
        customBody: (
          <>
            {!hasFrequentSymptoms && !hasFrequentOtherSymptoms ? makeNoUsualSelfFrequentSymptoms() : null}
            {hasFrequentSymptoms ? makeUsualSelfFrequentSymptoms(yourFrequentSymptoms) : null}
            {hasFrequentOtherSymptoms ? makeUsualSelfFrequentOtherSymptoms(yourFrequentOtherSymptoms) : null}
          </>
        ),
      }}
      style={[baseStyle.cardStyle]}
    />
  );
}

const baseStyle = StyleSheet.create({
  cardStyle: {
    backgroundColor: colors.transparent,
  },
  symptomText: {
    fontFamily: 'SofiaPro-Light',
    fontSize: grid.g16,
    fontWeight: '300',
    letterSpacing: 0,
    lineHeight: grid.g24,
    textAlign: 'left',
  },
  usualSelfNameColumn: {
    justifyContent: 'center',
    paddingLeft: grid.g16,
  },
  usualSelfSeverityColumn: {},
  usualSelfSymptomRow: {
    marginVertical: 6,
    paddingHorizontal: grid.g16,
  },
  usualSelfSymptomsColumn: {},
});
