import React from 'react';
import { View } from 'react-native';

import NavigatorService from '@covid/NavigatorService';
import { BasicPage, Text } from '@covid/components';
import i18n from '@covid/locale/i18n';
import Introduction from '@assets/mental-health-playback/introduction.svg';
import Info from '@assets/mental-health-playback/info.svg';
import { styling } from '@covid/themes';
import Card from '@covid/components/Cards/Card';
import UL from '@covid/components/UL';

const items = [
  i18n.t('mental-health-playback.introduction.point-1'),
  i18n.t('mental-health-playback.introduction.point-2'),
  i18n.t('mental-health-playback.introduction.point-3'),
];

export default function MHPIntroductionScreen() {
  return (
    <BasicPage
      active
      hasStickyHeader
      footerTitle={i18n.t('mental-health-playback.introduction.button')}
      onPress={() => NavigatorService.navigate('MentalHealthPlaybackGeneral')}
      style={styling.backgroundWhite}>
      <Introduction />
      <View style={styling.padding}>
        <Card backgroundColor="#F5F9FC" style={styling.marginBottom}>
          <Text style={styling.marginBottom} textClass="h4">
            {i18n.t('mental-health-playback.introduction.title')}
          </Text>
          <UL items={items} />
        </Card>
        <View style={styling.row}>
          <Info style={styling.marginRightSmall} />
          <Text style={styling.flex} textClass="pLight">
            {i18n.t('mental-health-playback.introduction.info')}
          </Text>
        </View>
      </View>
    </BasicPage>
  );
}
