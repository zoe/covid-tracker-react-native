import React from 'react';

import { Text } from '../../typography';

import { SStatsContainerView } from './styles';
import HealthStatus from './HealthStatus';

interface IProps {
  active: boolean;
  bubbleName?: string;
  size: number;
  isLast?: boolean;
  reported: number;
  total: number;
}

function SchoolStats({ active, bubbleName = '', size, isLast = false, reported, total }: IProps) {
  const getToSignUpMessage = () => {
    const count = Math.round(total * 0.3) - size;
    const message = `${count} more parent${count > 1 && 's'} needed to sign up their children`;
    return message;
  };

  return (
    <SStatsContainerView isLast={isLast}>
      <Text textClass="pSmallLight" rhythm={8}>
        {bubbleName.length ? bubbleName : 'Entire School'}
      </Text>
      <Text textClass="p" rhythm={active ? 8 : 12}>
        {size} / {total} children signed up
      </Text>
      {active ? (
        <HealthStatus reported={reported} />
      ) : (
        <Text textClass="pLight" colorPalette="uiDark" colorShade="main" inverted>
          {getToSignUpMessage()}
        </Text>
      )}
    </SStatsContainerView>
  );
}

export default SchoolStats;
