import H from '@covid/components/typography/headers/h';
import * as React from 'react';

interface IProps {
  children: React.ReactNode;
}

export default ({ children }: IProps) => <H textClass="h3">{children}</H>;
