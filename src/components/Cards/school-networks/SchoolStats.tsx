import React from 'react';

import i18n from '@covid/locale/i18n';

import { Text } from '../../typography';

import { SStatsContainerView } from './styles';
import HealthStatus from './HealthStatus';

interface IProps {
  active: boolean;
  bubbleName?: string;
  daily?: number | undefined;
  isLast?: boolean;
  reported: number;
  size: number;
  total: number;
}

function SchoolStats({ active, bubbleName = '', daily = undefined, isLast = false, reported, size, total }: IProps) {
  const getToSignUpMessage = () => {
    const count = Math.round(total * 0.3) - size;
    if (count === 1) {
      return `${count} ${i18n.t('school-networks.dashboard.more-parents-singular')}`;
    }
    return `${count} ${i18n.t('school-networks.dashboard.more-parents')}`;
  };

  return (
    <SStatsContainerView isLast={isLast}>
      <Text textClass="pSmallLight" rhythm={8} colorPalette="uiDark" colorShade="main" inverted>
        {bubbleName.length ? bubbleName : i18n.t('school-networks.dashboard.entire-school')}
      </Text>
      <Text textClass="p" rhythm={active ? 8 : 12} colorPalette="uiDark" colorShade="darker" inverted>
        {size} / {total} children signed up {i18n.t('school-networks.dashboard.children-signed-up')}
      </Text>
      {active && daily !== undefined && (
        <Text textClass="pLight" rhythm={8} colorPalette="uiDark" colorShade="darker" inverted>
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
        <Text textClass="pLight" colorPalette="uiDark" colorShade="main" inverted>
          {getToSignUpMessage()}
        </Text>
      )}
    </SStatsContainerView>
  );
}

export default SchoolStats;
