import React from 'react';
import { ImageSourcePropType, View } from 'react-native';

import { Avatar, Text } from '@covid/components';
import { useTheme } from '@covid/themes';
import i18n from '@covid/locale/i18n';
import { drEllenThompsonUK, drKarstenKoenenUS } from '@assets';

interface IProps {
  imgsrc?: ImageSourcePropType;
}

function Profile() {
  const { colors, grid } = useTheme();

  const getImgSrc = () => {
    // en, es, en-US, sv-SE
    const locale = i18n.currentLocale();
    switch (locale) {
      case 'en-US':
        return drKarstenKoenenUS;
      default:
        return drEllenThompsonUK;
    }
  };

  return (
    <View>
      <View style={{ marginBottom: grid.xs, paddingHorizontal: grid.gutter }}>
        <Avatar imgsrc={getImgSrc()} />
        <Text rhythm={8}>{i18n.t('mental-health.doctor-name')}</Text>
        <Text textClass="pSmallLight" style={{ color: colors.uiDark.dark.bgColor }}>
          {i18n.t('mental-health.doctor-title')}, {i18n.t('mental-health.doctor-college')}
        </Text>
      </View>
    </View>
  );
}

export default Profile;
