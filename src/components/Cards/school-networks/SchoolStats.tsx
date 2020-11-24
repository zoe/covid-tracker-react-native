import React from 'react';

import { Text } from '../../typography';

import { SStatsContainerView } from './styles';
import HealthStatus from './HealthStatus';
import { THealthStatus } from './types';

interface IProps {
  isLast?: boolean;
  healthStatus?: THealthStatus;
}

function SchoolStats({ isLast = false, healthStatus = null }: IProps) {
  return (
    <SStatsContainerView isLast={isLast}>
      <Text textClass="pSmallLight" rhythm={8}>
        Entire School or Bubbble Name
      </Text>
      <Text textClass="p" rhythm={healthStatus ? 8 : 12}>
        n / n children signed up
      </Text>
      {healthStatus && <HealthStatus />}
    </SStatsContainerView>
  );
}

export default SchoolStats;
