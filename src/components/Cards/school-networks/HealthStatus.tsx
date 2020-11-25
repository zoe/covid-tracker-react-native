import React from 'react';

import { StatusIndicator } from '../../status';

import { SHealthStatus, SHealthStatusText } from './styles';

interface IProps {
  reported: number;
}

function HealthStatus({ reported }: IProps) {
  return (
    <SHealthStatus>
      <StatusIndicator colorPalette={reported ? 'orange' : 'green'} />
      <SHealthStatusText>{reported} reported feeling unwell</SHealthStatusText>
    </SHealthStatus>
  );
}

export default HealthStatus;
