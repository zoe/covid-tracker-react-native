import React from 'react';
import Markdown from 'react-native-easy-markdown';
import { fontStyles, colors } from '../../theme';

type FormattingProps = {
  text: string;
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

export const InlineFormatting = ({ text }: FormattingProps) => {
  return <Markdown markdownStyles={defaultStyles}>{text}</Markdown>;
};
