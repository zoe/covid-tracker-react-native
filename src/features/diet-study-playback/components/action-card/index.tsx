import React from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { ActionCard, Icon, Text } from '@covid/components';
import { selectSettings, setEmailSubscription } from '@covid/core/state';
import { useTheme } from '@covid/themes';
import i18n from '@covid/locale/i18n';
import { events, track } from '@covid/core/Analytics';

function DietStudyActionCard() {
  const settings = useSelector(selectSettings);
  const dispatch = useDispatch();
  const { colors } = useTheme();

  const getCtaTitle = () => {
    const title = settings.hasEmailSubscription
      ? i18n.t('diet-study.email-action-cta-unsubscribe')
      : i18n.t('diet-study.email-action-cta');
    return title;
  };

  const handleOnPress = () => {
    track(settings.hasEmailSubscription ? events.DIET_STUDY_EMAIL_UNSUBSCRIBED : events.DIET_STUDY_EMAIL_SUBSCRIBED);
    dispatch(setEmailSubscription(!settings.hasEmailSubscription));
  };

  return (
    <ActionCard
      actionTitle={getCtaTitle()}
      buttonColor={settings.hasEmailSubscription ? 'white' : undefined}
      onPress={handleOnPress}
      textColor={settings.hasEmailSubscription ? colors.burgundy.main.bgColor : undefined}>
      <Text textClass="h4" rhythm={16}>
        {i18n.t('diet-study.email-action-title')}
      </Text>
      <Text textClass="pLight" rhythm={8}>
        {i18n.t('diet-study.email-action-body')}
      </Text>
      {settings.hasEmailSubscription && (
        <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'center', marginTop: 24 }}>
          <Icon iconName="tick" style={{ marginRight: 8 }} />
          <Text>{i18n.t('navigation.cta-email-success')}</Text>
        </View>
      )}
    </ActionCard>
  );
}

export default DietStudyActionCard;
