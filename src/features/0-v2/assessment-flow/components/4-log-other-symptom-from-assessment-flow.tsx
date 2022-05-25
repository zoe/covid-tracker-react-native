import i18n from '@covid/locale/i18n';
import { colors } from '@tracer/branding/colors';
import { grid } from '@tracer/branding/grid';
import Column from '@tracer/components/atoms/Column';
import Row from '@tracer/components/atoms/Row';
import FormInputTextQuestion from '@tracer/components/molecules/Form/questions/text';
import ScreenBody from '@tracer/components/molecules/Screen/body';
import React, { useState } from 'react';
import { StyleSheet, Text } from 'react-native';

interface ILogOtherSymptomsProps {
  name: string;
  handleChange: (field: string, value: any, shouldValidate?: boolean) => void;
  question: string;
}

// TODO(iman@joinzoe.com)
// TODO: Make the log other symptoms page reusable by passing the tag and text as props
export default function LogOtherSymptomsFromAssessmentFlow({ handleChange, name, question }: ILogOtherSymptomsProps) {
  const [validation, setValidation] = useState<string>('');
  const [state, setState] = useState<string>('default');

  const updateInput = (field: string, value: any) => {
    if (value.length > 20) {
      setValidation('Input too long');
      setState('warning');
    }
    handleChange(field, value);
  };

  console.log('here');
  return (
    <ScreenBody style={[{ flexGrow: 1, marginTop: grid.g16, paddingHorizontal: grid.g24 }]}>
      <Column style={{ flexGrow: 1 }}>
        <Row style={[{ flexGrow: 1, marginBottom: grid.g16 }]}>
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
        <FormInputTextQuestion
          multiline
          handleChange={updateInput}
          name={name}
          placeholder={i18n.t('usual-self.setup.2-setup-flow-other-symptom-placeholder')}
          question={question}
          state={state}
          validation={validation}
        />
      </Column>
    </ScreenBody>
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
