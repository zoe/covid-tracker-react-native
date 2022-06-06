import { TrendlineCard } from '@covid/components/cards/estimated-case';
import { EstimatedCasesMapCard } from '@covid/components/cards/EstimatedCasesMapCard';
import ShareTimelineCard from '@covid/components/cards/ShareTimelineCard';
import * as React from 'react';

import { SShareContainerView } from './styles';
import { ESharable } from './types';

interface IProps {
  sharable: ESharable;
}

export default function ShareContainer(props: IProps) {
  switch (props.sharable) {
    case ESharable.MAP:
      return (
        <SShareContainerView>
          <EstimatedCasesMapCard isSharing />
        </SShareContainerView>
      );
    case ESharable.TIMELINE:
      return (
        <SShareContainerView>
          <ShareTimelineCard />
        </SShareContainerView>
      );
    case ESharable.TRENDLINE:
      return (
        <SShareContainerView>
          <TrendlineCard isSharing />
        </SShareContainerView>
      );
    default:
      return null;
  }
}
