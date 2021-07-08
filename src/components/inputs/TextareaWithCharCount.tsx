import { CaptionText } from '@covid/components/Text';
import { Textarea } from 'native-base';
import * as React from 'react';
import { StyleProp, TextStyle } from 'react-native';

interface ITextareaWithCharCountProps {
  bordered?: boolean;
  maxLength?: number;
  onChangeText: (value: string) => void;
  placeholder?: string;
  rowSpan?: number;
  style?: StyleProp<TextStyle>;
  value?: string;
  testID?: string;
}

const DEFAULT_MAX_LENGTH = 1000;
const DEFAULT_ROW_SPAN = 5;

export default function TextareaWithCharCount(props: ITextareaWithCharCountProps) {
  const [charCount, setCharCount] = React.useState(0);

  const maxLength = props.maxLength || DEFAULT_MAX_LENGTH;

  return (
    <>
      <Textarea
        bordered={props.bordered || false}
        maxLength={maxLength}
        onChangeText={(value) => {
          props.onChangeText(value);
          setCharCount(value.length);
        }}
        placeholder={props.placeholder}
        rowSpan={props.rowSpan || DEFAULT_ROW_SPAN}
        style={props.style}
        testID={props.testID}
        underline={false}
        value={props.value}
      />
      <CaptionText style={{ alignSelf: 'flex-end' }}>
        {charCount} / {maxLength}
      </CaptionText>
    </>
  );
}
