import React from 'react';
import Markdown from 'react-native-easy-markdown';
import { fontStyles, colors } from '../../theme';
import { View } from 'react-native';

type FormattingProps = {
  text: string;
  textAlign?: 'center' | "left" | "right";
};

const defaultStyles = {
  text: {
    ...fontStyles.bodyReg,
    color: colors.lightBrand,
  },
  em: {
    color: colors.white,
  },
  strong: {
    color: colors.white,
  },
};

export const InlineFormatting = ({ text, textAlign }: FormattingProps) => {
  if (textAlign) {
    defaultStyles.text.textAlign = textAlign;
  }
  return (
      <Markdown markdownStyles={defaultStyles}>
        {text}
      </Markdown>
  );
};
