import React from 'react';

import i18n from '@covid/locale/i18n';
import { CalloutBox } from '@covid/components/CalloutBox';
import { colors } from '@covid/theme';
import appCoordinator from '@covid/features/AppCoordinator';

export function VaccineRegistryCallout() {
  return (
    <CalloutBox
      content={{
        title_text: i18n.t('vaccine-registry.callout-title'),
        body_text: i18n.t('vaccine-registry.callout-text'),
        body_link: '',
        link_text: i18n.t('vaccine-registry.callout-link-text'),
        body_photo: null,
        experiment_name: '',
        cohort_id: 0,
        analytics: '',
      }}
      onPress={() => appCoordinator.goToVaccineRegistry()}
      boxStyle={{
        backgroundColor: colors.darkblue,
        borderWidth: 0,
      }}
      linkStyle={{
        backgroundColor: colors.white,
        color: colors.darkblue,
        borderRadius: 20,
        overflow: 'hidden',
        paddingVertical: 8,
        paddingHorizontal: 32,
      }}
      image
    />
  );
}
