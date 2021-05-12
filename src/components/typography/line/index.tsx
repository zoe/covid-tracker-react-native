import { TTtextDecorationLine } from '@covid/themes';
import React, { ReactNode } from 'react';

import Text from '../text';

interface IProps {
  children: ReactNode;
  textDecorationLine?: TTtextDecorationLine | undefined;
}

const U = ({ children, textDecorationLine = undefined }: IProps) => {
  const tDecorationLine: TTtextDecorationLine = textDecorationLine || 'underline';
  return <Text textDecorationLine={tDecorationLine}>{children}</Text>;
};

export default U;
