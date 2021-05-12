import { RegularBoldText, RegularText } from '@covid/components/Text';
import React from 'react';

export const HeaderText = (props: { text: string }) => {
  return (
    <RegularBoldText>
      {props.text}
      {'\n'}
    </RegularBoldText>
  );
};

export const SimpleTextBlock = (props: { text: string[]; separator?: string }) => (
  <RegularText>{props.text.map((t) => `${t}${props.separator ?? `\n\n`}`)}</RegularText>
);

export const BulletedTextBlock = (props: { text: string[] }) => (
  <RegularText>{props.text.map((t) => `- ${t}\n`)}</RegularText>
);
