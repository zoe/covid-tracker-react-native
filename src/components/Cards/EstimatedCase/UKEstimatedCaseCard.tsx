import React, { useState } from 'react';

import { EstimatedCaseCard } from '@covid/components/Cards/EstimatedCase/EstimatedCaseCard';
import i18n from '@covid/locale/i18n';
import { WebView } from '@covid/components/WebView';

interface Props {
  leftMertric: string;
  rightMetric: string;
  onPress: VoidFunction;
}

const html = require('@assets/carto/estimated-cases-metrics.html');

export const UKEstimatedCaseCard: React.FC<Props> = ({ leftMertric, rightMetric, onPress }) => {
  const [dailyCases, setDailyCases] = useState<string>('');
  const [activeCases, setActiveCases] = useState<string>('');

  const injectJS = `
    const value = document.querySelector('div.summary_box > h3').innerHTML;
    window.ReactNativeWebView.postMessage(JSON.stringify({
      type: 'setEstmiatedDailyCases', data: value
    }));

  `;

  const onMapEvent = (type: string, data?: object) => {
    console.log('data', data);
    switch (type) {
      case 'setEstmiatedActiveCases':
        if (typeof data === 'string') {
          console.log('data', data);
          setActiveCases(data as string);
        }
        break;
      case 'setEstmiatedDailyCases':
        if (typeof data === 'string') {
          console.log('data', data);
          setDailyCases(data as string);
        }
        break;
    }
  };

  return (
    <>
      <WebView originWhitelist={['*']} source={html} style={{}} pointerEvents="none" onEvent={onMapEvent} />
      <WebView
        originWhitelist={['*']}
        source={{ uri: 'https://covid-assets.joinzoe.com/latest/incidence_map.html?v=1.1' }}
        style={{}}
        pointerEvents="none"
        injectedJavaScript={injectJS}
        onEvent={onMapEvent}
      />
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
    </>
  );
};
