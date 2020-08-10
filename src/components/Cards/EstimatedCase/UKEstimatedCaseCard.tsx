import React from 'react';

import { EstimatedCaseCard } from '@covid/components/Cards/EstimatedCase/EstimatedCaseCard';
import i18n from '@covid/locale/i18n';

interface Props {
  leftMertric: string;
  rightMetric: string;
  onPress: VoidFunction;
}

export const UKEstimatedCaseCard: React.FC<Props> = ({ leftMertric, rightMetric, onPress }) => (
  <EstimatedCaseCard
    primaryLabel={i18n.t('estimated-cases-card.covid-in-the-uk')}
    secondaryLabel={i18n.t('estimated-cases-card.estimated-cases')}
    leftMetric={leftMertric}
    leftMetricLabel={i18n.t('estimated-cases-card.daily')}
    rightMetric={rightMetric}
    rightMetricLabel={i18n.t('estimated-cases-card.active')}
    ctaLabel={i18n.t('estimated-cases-card.cta')}
    ctaOnPress={onPress}
  />
);
