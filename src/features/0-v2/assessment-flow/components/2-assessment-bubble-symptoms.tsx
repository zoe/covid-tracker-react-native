import { colors } from '@tracer/branding/colors';
import { grid } from '@tracer/branding/grid';
import Button, { IButtonProps } from '@tracer/components/atoms/Button';
import Row from '@tracer/components/atoms/Row';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

import { TUsualSelfFrequentOtherSymptom, TUsualSelfFrequentSymptom } from '../types';

const makeBubbleSymptomButtonGroup = (bubbleSymptoms: TUsualSelfFrequentSymptom[]): IButtonProps[] =>
  bubbleSymptoms.map(({ display_name }) => ({
    buttonType: 'secondary',
    text: `+ ${display_name}`,
  }));

const makeOtherBubbleSymptomButtonGroup = (otherBubbleSymptoms: TUsualSelfFrequentOtherSymptom[]): IButtonProps[] =>
  otherBubbleSymptoms.map(({ description }) => ({
    buttonType: 'secondary',
    text: `+ ${description.substring(0, 20)}`,
  }));

interface IAssessmentBubbleSymptoms {
  bubbleSymptoms: TUsualSelfFrequentSymptom[];
  otherBubbleSymptoms: TUsualSelfFrequentOtherSymptom[];
  otherSymptoms?: boolean;
  onSelectBubble: (index: number) => void;
}

export default function AssessmentBubbleSymptoms({
  bubbleSymptoms,
  otherBubbleSymptoms,
  otherSymptoms,
  onSelectBubble,
}: IAssessmentBubbleSymptoms) {
  const [buttonGroupProps, setButtonGroupProps] = useState<IButtonProps[]>();

  useEffect(() => {
    if (otherSymptoms && otherSymptoms !== undefined) {
      setButtonGroupProps(makeOtherBubbleSymptomButtonGroup(otherBubbleSymptoms));
    }
    if (!otherSymptoms && bubbleSymptoms !== undefined) {
      setButtonGroupProps(makeBubbleSymptomButtonGroup(bubbleSymptoms));
    }
  }, [bubbleSymptoms, otherBubbleSymptoms]);

  return (
    <Row style={{ flexGrow: 1, flexWrap: 'wrap' }}>
      {buttonGroupProps && buttonGroupProps.length > 0
        ? buttonGroupProps.map(({ buttonType, text }: IButtonProps, index: number) => (
            <Button
              buttonType={buttonType}
              key={`${index + 1}-button-group-${otherSymptoms}`}
              onPress={() => onSelectBubble(index)}
              style={[baseStyle.button]}
              text={text}
            />
          ))
        : null}
    </Row>
  );
}

const baseStyle = StyleSheet.create({
  button: {
    backgroundColor: colors.transparent,
    flexGrow: 1,
    flexWrap: 'wrap',
    marginHorizontal: grid.g4,
    marginVertical: grid.g4,
    paddingHorizontal: grid.g16,
  },
});
