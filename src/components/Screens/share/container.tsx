import React from 'react';

import { EstimatedCasesMapCard } from '@covid/components/Cards/EstimatedCasesMapCard';
// import { TrendLineChart, TrendlineTimeFilters, TrendLineViewMode } from '@covid/components/Stats/TrendLineChart';
import { TrendlineCard } from '@covid/components/Cards/EstimatedCase';

import { SShareContainerView } from './styles';

type Sharable = 'MAP' | 'TRENDLINE';

interface IProps {
  sharable?: Sharable;
}

function ShareContainer({ sharable = 'MAP' }: IProps) {
  const getSharable = () => {
    switch (sharable) {
      case 'MAP':
        return <EstimatedCasesMapCard isSharing />;
      case 'TRENDLINE':
        return <TrendlineCard isSharing />;

      default:
        return null;
    }
  };

  return <SShareContainerView>{getSharable()}</SShareContainerView>;
}

export default ShareContainer;
