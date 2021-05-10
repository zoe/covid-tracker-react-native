import { CalloutBox } from '@covid/components/CalloutBox';
import appCoordinator from '@covid/features/AppCoordinator';
import i18n from '@covid/locale/i18n';
import { colors } from '@theme';
import React from 'react';

export function VaccineRegistryCallout() {
  return (
    <CalloutBox
      image
      boxStyle={{
        backgroundColor: colors.darkblue,
        borderWidth: 0,
      }}
      content={{
        analytics: '',
        body_link: '',
        body_photo: null,
        body_text: i18n.t('vaccine-registry.callout-text'),
        cohort_id: 0,
        experiment_name: '',
        link_text: i18n.t('vaccine-registry.callout-link-text'),
        title_text: i18n.t('vaccine-registry.callout-title'),
      }}
      linkStyle={{
        backgroundColor: colors.white,
        borderRadius: 20,
        color: colors.darkblue,
        overflow: 'hidden',
        paddingHorizontal: 32,
        paddingVertical: 8,
      }}
      onPress={() => appCoordinator.goToVaccineRegistry()}
    />
  );
}
