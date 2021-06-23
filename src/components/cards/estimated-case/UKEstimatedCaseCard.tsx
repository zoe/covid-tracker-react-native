import { ContentState } from '@covid/core/content/state/contentSlice';
import { RootState } from '@covid/core/state/root';
import i18n from '@covid/locale/i18n';
import * as React from 'react';
import { useSelector } from 'react-redux';

import { EstimatedCaseCard } from './EstimatedCaseCard';

interface IProps {
  onPress: VoidFunction;
}

export function UKEstimatedCaseCard({ onPress }: IProps) {
  const metrics = useSelector<RootState, Partial<ContentState>>((state) => ({
    ukActive: state.content.ukActive,
    ukDaily: state.content.ukDaily,
  }));

  const [dailyCases, setDailyCases] = React.useState<string>('');
  const [activeCases, setActiveCases] = React.useState<string>('');

  React.useEffect(() => {
    setDailyCases(metrics.ukDaily ?? '');
    setActiveCases(metrics.ukActive ?? '');
  }, [metrics]);

  return (
    <EstimatedCaseCard
      ctaLabel={i18n.t('estimated-cases-card.cta')}
      ctaOnPress={onPress}
      leftMetric={dailyCases}
      leftMetricLabel={i18n.t('estimated-cases-card.daily')}
      primaryLabel={i18n.t('estimated-cases-card.covid-in-the-uk')}
      rightMetric={activeCases}
      rightMetricLabel={i18n.t('estimated-cases-card.active')}
      secondaryLabel={i18n.t('estimated-cases-card.estimated-cases')}
    />
  );
}
