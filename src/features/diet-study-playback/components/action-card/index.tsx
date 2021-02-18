import React from 'react';

import { ActionCard, Text } from '@covid/components';
import i18n from '@covid/locale/i18n';

function DietStudyActionCard() {
  return (
    <ActionCard actionTitle={i18n.t(`diet-study.email-action-cta`)} onPress={() => null}>
      <Text textClass="pMedium" rhythm={16}>
        {i18n.t(`diet-study.email-action-title`)}
      </Text>
      <Text textClass="pLight">{i18n.t(`diet-study.email-action-body`)}</Text>
    </ActionCard>
  );
}

export default DietStudyActionCard;
