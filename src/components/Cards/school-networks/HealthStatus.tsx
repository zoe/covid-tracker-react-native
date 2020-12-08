import React from 'react';

import i18n from '@covid/locale/i18n';

import { StatusIndicator } from '../../status';

import { SHealthStatus, SHealthStatusText } from './styles';

interface IProps {
  reported: number;
}

function HealthStatus({ reported }: IProps) {
  return (
    <SHealthStatus>
      <StatusIndicator colorPalette={reported ? 'orange' : 'green'} />
      <SHealthStatusText textClass="pLight" colorPalette="uiDark" colorShade="main" inverted>
        {reported} {i18n.t('school-networks.dashboard.reported-unwell')}
      </SHealthStatusText>
    </SHealthStatus>
  );
}

export default HealthStatus;
