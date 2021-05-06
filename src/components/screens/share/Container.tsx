import React from 'react';

import { TrendlineCard } from '@covid/components/cards/estimated-case';
import { EstimatedCasesMapCard } from '@covid/components/cards/EstimatedCasesMapCard';
import { ShareVaccineCard } from '@covid/components/cards/ShareVaccineCard';

import { ShareTimelineCard } from '../../cards';

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
        return <ShareVaccineCard screenName="Share" isSharing />;
      default:
        return null;
    }
  };

  return getSharable();
}

export default ShareContainer;
