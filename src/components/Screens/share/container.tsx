import React from 'react';

import { EstimatedCasesMapCard } from '@covid/components/Cards/EstimatedCasesMapCard';
// import { TrendLineChart, TrendlineTimeFilters, TrendLineViewMode } from '@covid/components/Stats/TrendLineChart';
import { TrendlineCard } from '@covid/components/Cards/EstimatedCase';
import { ShareVaccineCard } from '@covid/components/Cards/ShareVaccineCard';

import { SShareContainerView } from './styles';

type Sharable = 'MAP' | 'TRENDLINE' | 'VACCINES';

interface IProps {
  sharable?: Sharable;
}

function ShareContainer({ sharable = 'MAP' }: IProps) {
  const getSharable = () => {
    switch (sharable) {
      case 'MAP':
        return (
          <SShareContainerView>
            <EstimatedCasesMapCard isSharing />
          </SShareContainerView>
        );
      case 'TRENDLINE':
        return (
          <SShareContainerView>
            <TrendlineCard isSharing />
          </SShareContainerView>
        );
      case 'VACCINES':
        return <ShareVaccineCard isSharing />;
      default:
        return null;
    }
  };

  return getSharable();
}

export default ShareContainer;
