import i18n from '@covid/locale/i18n';
import { colors } from '@tracer/branding/colors';
import { grid } from '@tracer/branding/grid';
import Column from '@tracer/components/atoms/Column';
import Row from '@tracer/components/atoms/Row';
import Tag from '@tracer/components/atoms/Tag';
import FormRadioQuestion from '@tracer/components/molecules/Form/questions/radio';
import FormInputTextQuestion from '@tracer/components/molecules/Form/questions/text';
import React, { useState } from 'react';
import { StyleSheet, Text } from 'react-native';

import { SYMPTOM_FREQUENCY_LABELS, SYMPTOM_SEVERITY_LABELS } from '../../usual-self/types';
import InfoLabel from './2-usual-self-label';

interface ILogOtherSymptomsProps {
  formID: string;
  handleChange: (field: string, value: any, shouldValidate?: boolean) => void;
  handleChangeSeverity: (field: string, value: any, shouldValidate?: boolean) => void;
  handleChangeFrequency: (field: string, value: any, shouldValidate?: boolean) => void;
  question: string;
}

export default function LogOtherSymptoms({
  handleChange,
  handleChangeSeverity,
  handleChangeFrequency,
  formID,
  question,
}: ILogOtherSymptomsProps) {
  const [validation, setValidation] = useState<string>('');
  const [state, setState] = useState<string>('default');

  const updateInput = (field: string, value: any) => {
    if (value.length > 20) {
      setValidation('Max characters 20');
      setState('error');
    } else {
      setState('default');
    }
    handleChange(field, value);
  };

  return (
    <>
      <Column style={{ flexGrow: 1, marginTop: grid.g16, paddingHorizontal: grid.g24 }}>
        <Row style={{ flexGrow: 1 }}>
          <Column style={{ justifyContent: 'flex-start' }}>
            <Tag text={i18n.t('usual-self.setup.tag')} />
          </Column>
        </Row>
      </Column>
      <Row style={[{ flexGrow: 1, marginVertical: grid.g16, paddingHorizontal: grid.g24 }]}>
        <Column style={{ flexGrow: 1 }}>
          <Text style={[baseStyle.pageHeaderText]}>
            {i18n.t('usual-self.assessment-flow.4-other-symptom-start')}
            <Text style={[baseStyle.pageHeaderText, baseStyle.pageHeaderHighlighted]}>
              {i18n.t('usual-self.assessment-flow.4-other-symptom-highlighted')}
            </Text>
            {i18n.t('usual-self.assessment-flow.4-other-symptom-end')}
          </Text>
        </Column>
      </Row>
      <Column style={{ flexGrow: 1, paddingHorizontal: grid.g24 }}>
        <FormInputTextQuestion
          multiline
          handleChange={(field, value) => updateInput(field, value)}
          name={`${formID}.description`}
          placeholder={i18n.t('usual-self.setup.2-setup-flow-other-symptom-placeholder')}
          question={question}
          state={state}
          validation={validation}
        />
        <Row>
          <Column style={{ marginTop: grid.g16, paddingHorizontal: grid.g16 }}>
            <InfoLabel
              onPressInfo={() => (onToggleFrequencyModal ? onToggleFrequencyModal() : () => {})}
              text={i18n.t('usual-self.setup.1-setup-flow-frequency-slider')}
              textStyle={[baseStyle.infoLabel]}
            />
            <FormRadioQuestion
              handleChange={handleChangeFrequency}
              items={SYMPTOM_FREQUENCY_LABELS}
              labelStyle={{ marginLeft: 0 }}
              name={`${formID}.frequency`}
            />
          </Column>
        </Row>
        <Row>
          <Column style={{ paddingHorizontal: grid.g16 }}>
            <InfoLabel
              onPressInfo={() => (onToggleImpactOnLifeModal ? onToggleImpactOnLifeModal() : () => {})}
              text={i18n.t('usual-self.setup.1-setup-flow-severity-slider')}
              textStyle={baseStyle.infoLabel}
            />
            <FormRadioQuestion
              handleChange={handleChangeSeverity}
              items={SYMPTOM_SEVERITY_LABELS}
              labelStyle={{ marginLeft: 0 }}
              name={`${formID}.severity`}
            />
          </Column>
        </Row>
      </Column>
    </>
  );
}

const baseStyle = StyleSheet.create({
  pageHeaderHighlighted: {
    color: colors.text.accent,
  },
  pageHeaderText: {
    color: colors.text.primary,
    fontSize: 20,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 26,
    textAlign: 'left',
  },
});
