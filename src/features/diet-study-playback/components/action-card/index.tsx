import { ActionCard, Icon, Text } from '@covid/components';
import { selectSettings, setEmailSubscription } from '@covid/core/state';
import i18n from '@covid/locale/i18n';
import { sizes, useTheme } from '@covid/themes';
import * as React from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

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
    dispatch(setEmailSubscription(!settings.hasEmailSubscription));
  };

  return (
    <ActionCard
      actionTitle={getCtaTitle()}
      buttonColor={settings.hasEmailSubscription ? 'white' : undefined}
      onPress={handleOnPress}
      textColor={settings.hasEmailSubscription ? colors.burgundy.main.bgColor : undefined}
    >
      <Text rhythm={16} textClass="h4">
        {i18n.t('diet-study.email-action-title')}
      </Text>
      <Text rhythm={8} textClass="pLight">
        {i18n.t('diet-study.email-action-body')}
      </Text>
      {settings.hasEmailSubscription ? (
        <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'center', marginTop: sizes.l }}>
          <Icon iconName="tick" style={{ marginRight: sizes.xs }} />
          <Text>{i18n.t('navigation.cta-email-success')}</Text>
        </View>
      ) : null}
    </ActionCard>
  );
}

export default DietStudyActionCard;
