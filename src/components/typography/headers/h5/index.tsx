import React, { ReactNode } from 'react';

import H from '../h';
interface IProps {
  children: ReactNode;
}

export default ({ children }: IProps) => <H textClass="h5">{children}</H>;
