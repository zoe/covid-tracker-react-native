import { Text } from '@covid/components';
import { ELegalCardType, LegalCard } from '@covid/components/cards/LegalCard';
import { Screen } from '@covid/components/Screen';
import i18n from '@covid/locale/i18n';
import * as React from 'react';

const cards = [ELegalCardType.AdvanceScience, ELegalCardType.ImproveHealth, ELegalCardType.BuildProducts];

export function DataConsentScreen() {
  return (
    <Screen testID="data-consent-screen">
      <Text rhythm={24} textAlign="center" textClass="h2Light">
        {i18n.t('wider-health-studies.data-consent.title')}
      </Text>
      <Text inverted colorPalette="uiDark" colorShade="dark" rhythm={24} textAlign="center" textClass="pLight">
        {i18n.t('wider-health-studies.data-consent.description')}
      </Text>
      {cards.map((type, i) => (
        <LegalCard index={i} key={`legal-card-${type}`} type={type} />
      ))}
    </Screen>
  );
}
