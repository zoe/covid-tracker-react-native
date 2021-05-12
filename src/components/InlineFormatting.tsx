import { colors, fontStyles } from '@theme';
import React from 'react';
import Markdown from 'react-native-easy-markdown';

type FormattingProps = {
  text: string;
  textAlign?: 'center' | 'left' | 'right';
};

export const InlineFormatting = ({ text, textAlign }: FormattingProps) => {
  const defaultStyles = {
    em: {
      color: colors.white,
    },
    strong: {
      color: colors.white,
    },
    text: {
      ...fontStyles.bodyReg,
      ...(textAlign && { textAlign }),
      color: colors.lightBrand,
    },
  };

  return <Markdown markdownStyles={defaultStyles}>{text}</Markdown>;
};
