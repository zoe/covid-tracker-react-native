import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import i18n from '@covid/locale/i18n';
import { RootState } from '@covid/core/state/root';
import { ContentState } from '@covid/core/content/state/contentSlice';

import { EstimatedCaseCard } from './EstimatedCaseCard';

interface IProps {
  onPress: VoidFunction;
}

export function UKEstimatedCaseCard({ onPress }: IProps) {
  const metrics = useSelector<RootState, Partial<ContentState>>((state) => ({
    ukActive: state.content.ukActive,
    ukDaily: state.content.ukDaily,
  }));

  const [dailyCases, setDailyCases] = useState<string>('');
  const [activeCases, setActiveCases] = useState<string>('');

  useEffect(() => {
    setDailyCases(metrics.ukDaily ?? '');
    setActiveCases(metrics.ukActive ?? '');
  }, [metrics]);

  return (
    <EstimatedCaseCard
      primaryLabel={i18n.t('estimated-cases-card.covid-in-the-uk')}
      secondaryLabel={i18n.t('estimated-cases-card.estimated-cases')}
      leftMetric={dailyCases}
      leftMetricLabel={i18n.t('estimated-cases-card.daily')}
      rightMetric={activeCases}
      rightMetricLabel={i18n.t('estimated-cases-card.active')}
      ctaLabel={i18n.t('estimated-cases-card.cta')}
      ctaOnPress={onPress}
    />
  );
}
