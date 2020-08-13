import React, { useState, useEffect } from 'react';

import { EstimatedCaseCard } from '@covid/components/Cards/EstimatedCase/EstimatedCaseCard';
import i18n from '@covid/locale/i18n';
import { WebView } from '@covid/components/WebView';
import { useInjection } from '@covid/provider/services.hooks';
import { IPredictiveMetricsClient } from '@covid/core/content/PredictiveMetricsClient';
import { Services } from '@covid/provider/services.types';

interface Props {
  onPress: VoidFunction;
}

export const UKEstimatedCaseCard: React.FC<Props> = ({ onPress }) => {
  const statsClient = useInjection<IPredictiveMetricsClient>(Services.PredictiveMetricsClient);

  const [dailyCases, setDailyCases] = useState<string>('');
  const [activeCases, setActiveCases] = useState<string>('');

  useEffect(() => {
    (async () => {
      try {
        setDailyCases(await statsClient.getDailyCases());
      } catch (_) {}
      try {
        setActiveCases(await statsClient.getActiveCases());
      } catch (_) {}
    })();
  }, []);

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
};
