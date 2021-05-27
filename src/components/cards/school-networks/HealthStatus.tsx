import i18n from '@covid/locale/i18n';
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
      <SHealthStatusText inverted colorPalette="uiDark" colorShade="main" textClass="pLight">
        {reported} {i18n.t('school-networks.dashboard.reported-unwell')}
      </SHealthStatusText>
    </SHealthStatus>
  );
}

export default HealthStatus;
