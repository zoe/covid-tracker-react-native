import React from 'react';

import { TrendlineCard } from '@covid/components/Cards/EstimatedCase';
import { EstimatedCasesMapCard } from '@covid/components/Cards/EstimatedCasesMapCard';
import { ShareVaccineCard } from '@covid/components/Cards/ShareVaccineCard';

import { ShareTimelineCard } from '../../Cards';

import { SShareContainerView } from './styles';

type Sharable = 'MAP' | 'TRENDLINE' | 'VACCINES' | 'TIMELINE';

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
      case 'TIMELINE':
        return (
          <SShareContainerView>
            <ShareTimelineCard />
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
