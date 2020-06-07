import React from 'react';
import { CenteredView } from '@covid/components/CenteredView';

export const CenterView = (fn: () => React.ReactNode) => <CenteredView>{fn()}</CenteredView>;
