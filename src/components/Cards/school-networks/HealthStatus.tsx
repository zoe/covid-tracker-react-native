import React from 'react';

import { StatusIndicator } from '../../status';

import { SHealthStatus, SHealthStatusText } from './styles';

function HealthStatus() {
  return (
    <SHealthStatus>
      <StatusIndicator colorPalette="green" />
      <SHealthStatusText>reported feeling unwell</SHealthStatusText>
    </SHealthStatus>
  );
}

export default HealthStatus;
