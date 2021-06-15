import { Textarea } from 'native-base';
import React, { useState } from 'react';
import { StyleProp, TextStyle } from 'react-native';

import { CaptionText } from './Text';

interface ITextareaWithCharCountProps {
  maxLength?: number;
  onChangeText: (value: string) => void;
  placeholder: string;
  rowSpan?: number;
  style?: StyleProp<TextStyle>;
  value: string | null;
}

export default function TextareaWithCharCount(props: ITextareaWithCharCountProps) {
  const [charCount, setCharCount] = useState(0);

  const maxLength = props.maxLength || 1000;

  return (
    <>
      <Textarea
        bordered
        maxLength={maxLength}
        onChangeText={(value) => {
          props.onChangeText(value);
          setCharCount(value.length);
        }}
        placeholder={props.placeholder}
        rowSpan={props.rowSpan || 5}
        style={props.style}
        underline={false}
        value={props.value}
      />
      <CaptionText style={{ alignSelf: 'flex-end' }}>
        {charCount} / {maxLength}
      </CaptionText>
    </>
  );
}
