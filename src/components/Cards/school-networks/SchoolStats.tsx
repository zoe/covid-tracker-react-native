import React from 'react';
import { View } from 'react-native';

import { Text } from '../../typography';

import { SStatsContainerView } from './styles';
import HealthStatus from './HealthStatus';

interface IProps {
  isLast?: boolean;
}

function SchoolStats({ isLast = false }: IProps) {
  return (
    <SStatsContainerView isLast={isLast}>
      <Text textClass="pSmallLight" rhythm={8}>
        Entire School or Bubbble Name
      </Text>
      <Text textClass="p" rhythm={8}>
        n / n children signed up
      </Text>
      <HealthStatus />
    </SStatsContainerView>
  );
}

export default SchoolStats;
