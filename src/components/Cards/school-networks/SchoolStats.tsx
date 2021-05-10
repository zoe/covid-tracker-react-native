import i18n from '@covid/locale/i18n';
import React from 'react';

import { Text } from '../../typography';
import HealthStatus from './HealthStatus';
import { SStatsContainerView } from './styles';

interface IProps {
  active: boolean;
  bubbleName?: string;
  daily?: number | undefined;
  isLast?: boolean;
  reported: number;
  size: number;
  total: number;
}

const GROUP_ACTIVATION_THRESHOLD = 0.1;
const GROUP_ACTIVATION_MINIMUM = 3;

function SchoolStats({ active, bubbleName = '', daily = undefined, isLast = false, reported, size, total }: IProps) {
  const getToSignUpMessage = () => {
    const count = Math.round(total * GROUP_ACTIVATION_THRESHOLD) - size;
    const profilesNeeded = Math.min(count, GROUP_ACTIVATION_MINIMUM);
    if (profilesNeeded === 1) {
      return `${profilesNeeded} ${i18n.t('school-networks.dashboard.more-parents-singular')}`;
    }
    return `${profilesNeeded} ${i18n.t('school-networks.dashboard.more-parents')}`;
  };

  return (
    <SStatsContainerView isLast={isLast}>
      <Text inverted colorPalette="uiDark" colorShade="main" rhythm={8} textClass="pSmallLight">
        {bubbleName.length ? bubbleName : i18n.t('school-networks.dashboard.entire-school')}
      </Text>
      <Text inverted colorPalette="uiDark" colorShade="darker" rhythm={active ? 8 : 12} textClass="p">
        {size} / {total} {i18n.t('school-networks.dashboard.children-signed-up')}
      </Text>
      {active && daily !== undefined && (
        <Text inverted colorPalette="uiDark" colorShade="darker" rhythm={8} textClass="pLight">
          {`${daily} ${
            daily === 1
              ? i18n.t('school-networks.dashboard.report-for-today-singular')
              : i18n.t('school-networks.dashboard.report-for-today')
          }`}
        </Text>
      )}

      {active ? (
        <HealthStatus reported={reported} />
      ) : (
        <Text inverted colorPalette="uiDark" colorShade="main" textClass="pLight">
          {getToSignUpMessage()}
        </Text>
      )}
    </SStatsContainerView>
  );
}

export default SchoolStats;
