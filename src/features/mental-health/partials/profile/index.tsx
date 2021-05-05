import React from 'react';
import { View } from 'react-native';

import { Avatar, Text } from '@covid/components';
import { useTheme } from '@covid/themes';
import i18n from '@covid/locale/i18n';
import { drEllenThompsonUK, drKarstenKoenenUS } from '@assets';
import { isUSCountry } from '@covid/core/localisation/LocalisationService';

function Profile() {
  const { colors, grid } = useTheme();

  const getImgSrc = () => {
    return isUSCountry() ? drKarstenKoenenUS : drEllenThompsonUK;
  };

  return (
    <View>
      <View style={{ marginBottom: grid.xs, paddingHorizontal: grid.gutter }}>
        <Avatar imgsrc={getImgSrc()} />
        <Text rhythm={8}>{i18n.t('mental-health.doctor-name')}</Text>
        <Text textClass="pSmallLight" style={{ color: colors.uiDark.dark.bgColor }}>
          {i18n.t('mental-health.doctor-title')}, {i18n.t('mental-health.doctor-location')}
        </Text>
      </View>
    </View>
  );
}

export default Profile;
