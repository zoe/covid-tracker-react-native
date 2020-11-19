import React from 'react';

import { EstimatedCasesMapCard } from '@covid/components/Cards/EstimatedCasesMapCard';
import { TrendLineChart, TrendlineTimeFilters, TrendLineViewMode } from '@covid/components/Stats/TrendLineChart';

import { SShareContainerView, STrendlineContainer } from './styles';

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
        return (
          <STrendlineContainer height={300}>
            <TrendLineChart filter={TrendlineTimeFilters.week} viewMode={TrendLineViewMode.overview} />
          </STrendlineContainer>
        );

      default:
        return null;
    }
  };

  return <SShareContainerView>{getSharable()}</SShareContainerView>;
}

export default ShareContainer;
