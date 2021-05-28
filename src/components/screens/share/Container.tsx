import { TrendlineCard } from '@covid/components/cards/estimated-case';
import { EstimatedCasesMapCard } from '@covid/components/cards/EstimatedCasesMapCard';
import ShareTimelineCard from '@covid/components/cards/ShareTimelineCard';
import { ShareVaccineCard } from '@covid/components/cards/ShareVaccineCard';
import React from 'react';

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
        return <ShareVaccineCard isSharing screenName="Share" />;
      default:
        return null;
    }
  };

  return getSharable();
}

export default ShareContainer;
