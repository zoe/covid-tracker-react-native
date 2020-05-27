import { fontStyles, colors } from '@theme';
import React from 'react';
import Markdown from 'react-native-easy-markdown';

type FormattingProps = {
  text: string;
  textAlign?: 'center' | 'left' | 'right';
};

export const InlineFormatting = ({ text, textAlign }: FormattingProps) => {
  const defaultStyles = {
    text: {
      ...fontStyles.bodyReg,
      ...(textAlign && { textAlign }),
      color: colors.lightBrand,
    },
    em: {
      color: colors.white,
    },
    strong: {
      color: colors.white,
    },
  };

  return <Markdown markdownStyles={defaultStyles}>{text}</Markdown>;
};
