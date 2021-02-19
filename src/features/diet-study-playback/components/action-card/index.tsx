import React from 'react';
import { useSelector } from 'react-redux';

import { ActionCard, Text } from '@covid/components';
import { selectSettingsState } from '@covid/core/state';
import { useTheme } from '@covid/themes';
import i18n from '@covid/locale/i18n';

function DietStudyActionCard() {
  const settings = useSelector(selectSettingsState);
  const { colors } = useTheme();

  const getCtaTitle = () => {
    const title = settings.hasEmailSubscription
      ? i18n.t(`diet-study.email-action-cta-unsubscribe`)
      : i18n.t(`diet-study.email-action-cta`);
    return title;
  };

  const buttonProps = {
    buttonColor: settings.hasEmailSubscription ? 'white' : undefined,
    textColor: settings.hasEmailSubscription ? colors.burgundy.main.bgColor : undefined,
  };

  return (
    <ActionCard actionTitle={getCtaTitle()} onPress={() => null} {...buttonProps}>
      <Text textClass="pMedium" rhythm={16}>
        {i18n.t(`diet-study.email-action-title`)}
      </Text>
      <Text textClass="pLight">{i18n.t(`diet-study.email-action-body`)}</Text>
      {}
    </ActionCard>
  );
}

export default DietStudyActionCard;
