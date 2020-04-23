import React, {useState, useEffect, useRef} from 'react';
import { View, Animated } from 'react-native';
import styled from 'styled-components/native';

import {ClippedText, ErrorText, HeaderText, RegularText, SecondaryText} from "./Text";
import DaysAgo from './DaysAgo';
import StartAssessment from './StartAssessmentButton';

interface Props {
  open: boolean;
  last_reported_at: string;
  contributions: number;
}

export default function PatientListItemDropDown({open, lastReported, contributions, isDue, id}: Props) {
  const height = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const openHeight = isDue ? 110 : 90;
    const newHeight = open ? openHeight : 0;
    Animated.timing(height, {
      toValue: newHeight,
      duration: 400
    }).start();
  }, [open]);

  return (
    <Animated.View style={{overflow: 'hidden', height}}>
      <Wrapper>
      <Flex>
        <RegularText>Count</RegularText>
        <RegularText>{contributions}</RegularText>
      </Flex>
      <Flex>
        <RegularText>Last</RegularText>
        <DaysAgo timeAgo={lastReported}/>
      </Flex>
      {isDue && (
        <StartAssessment id={id}/>
      )}
      </Wrapper>
    </Animated.View>
  )
}

const Container = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const Flex = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-top: 20px;
`;

const Wrapper = styled.View`
  height: 50;
`;