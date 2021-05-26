import H from '@covid/components/typography/headers/h';
import React, { ReactNode } from 'react';

interface IProps {
  children: ReactNode;
}

export default ({ children }: IProps) => <H textClass="h1">{children}</H>;
