import { ActionCard, Icon, Text } from '@covid/components';
import i18n from '@covid/locale/i18n';
import { sizes, useTheme } from '@covid/themes';
import { useAppDispatch } from '@health-study/redux/hooks';
import { useEmailSubscriptionSetting } from '@health-study/redux/settings/selectors';
import { setEmailSubscriptionThunk } from '@health-study/redux/settings/thunks';
import React from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';

function DietStudyActionCard() {
  const hasEmailSubscription = useSelector(useEmailSubscriptionSetting);
  const appDispatch = useAppDispatch();
  const { colors } = useTheme();

  const getCtaTitle = () => {
    const title = hasEmailSubscription
      ? i18n.t('diet-study.email-action-cta-unsubscribe')
      : i18n.t('diet-study.email-action-cta');
    return title;
  };

  const handleOnPress = () => {
    appDispatch(setEmailSubscriptionThunk(!hasEmailSubscription));
  };

  return (
    <ActionCard
      actionTitle={getCtaTitle()}
      buttonColor={hasEmailSubscription ? 'white' : undefined}
      onPress={handleOnPress}
      textColor={hasEmailSubscription ? colors.burgundy.main.bgColor : undefined}
    >
      <Text rhythm={16} textClass="h4">
        {i18n.t('diet-study.email-action-title')}
      </Text>
      <Text rhythm={8} textClass="pLight">
        {i18n.t('diet-study.email-action-body')}
      </Text>
      {hasEmailSubscription ? (
        <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'center', marginTop: sizes.l }}>
          <Icon iconName="tick" style={{ marginRight: sizes.xs }} />
          <Text>{i18n.t('navigation.cta-email-success')}</Text>
        </View>
      ) : null}
    </ActionCard>
  );
}

export default DietStudyActionCard;
