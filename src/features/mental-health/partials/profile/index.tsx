import { drEllenThompsonUK, drKarstenKoenenUS } from '@assets';
import { Avatar, Text } from '@covid/components';
import { isUSCountry } from '@covid/core/localisation/LocalisationService';
import i18n from '@covid/locale/i18n';
import { sizes, useTheme } from '@covid/themes';
import * as React from 'react';
import { View } from 'react-native';

function Profile() {
  const { colors } = useTheme();

  const getImgSrc = () => {
    return isUSCountry() ? drKarstenKoenenUS : drEllenThompsonUK;
  };

  return (
    <View>
      <View style={{ marginBottom: sizes.xxs, paddingHorizontal: sizes.m }}>
        <Avatar source={getImgSrc()} />
        <Text rhythm={8}>{i18n.t('mental-health.doctor-name')}</Text>
        <Text style={{ color: colors.uiDark.dark.bgColor }} textClass="pSmallLight">
          {i18n.t('mental-health.doctor-title')}, {i18n.t('mental-health.doctor-location')}
        </Text>
      </View>
    </View>
  );
}

export default Profile;
