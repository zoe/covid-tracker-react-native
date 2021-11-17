import { Text } from '@covid/components';
import { Screen } from '@covid/components/Screen';
import Analytics, { events } from '@covid/core/Analytics';
import { DiseasePreferencesList } from '@covid/features/wider-health-studies/components/DiseasePreferencesList';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import * as React from 'react';

function onSubmit() {
  Analytics.track(events.DISEASE_PREFERENCES_EDITED);
  NavigatorService.goBack();
}

export default function DiseasePreferencesScreen() {
  const topChildren = (
    <Text rhythm={24} textAlign="center" textClass="h2Light">
      {i18n.t('wider-health-studies.disease-preferences.title')}
    </Text>
  );

  return (
    <Screen noPadding noScrollView testID="disease-preferences-screen">
      <DiseasePreferencesList
        showActiveText
        buttonTitle={i18n.t('wider-health-studies.disease-preferences.button')}
        onSubmit={onSubmit}
        topChildren={topChildren}
      />
    </Screen>
  );
}
