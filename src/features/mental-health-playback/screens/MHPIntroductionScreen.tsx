import Info from '@assets/mental-health-playback/info.svg';
import Introduction, { defaultWidth as introductionWidth } from '@assets/mental-health-playback/Introduction';
import { BasicPage, Text } from '@covid/components';
import Card from '@covid/components/cards/Card';
import UL from '@covid/components/UL';
import { requestInsights } from '@covid/core/state/mental-health-playback/slice';
import { RootState } from '@covid/core/state/root';
import { StartupInfo } from '@covid/core/user/dto/UserAPIContracts';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import { styling } from '@covid/themes';
import React, { useEffect } from 'react';
import { useWindowDimensions, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

const generalItems = [
  i18n.t('mental-health-playback.introduction.point-general-1'),
  i18n.t('mental-health-playback.introduction.point-general-2'),
];

const personalItems = [
  i18n.t('mental-health-playback.introduction.point-personal-1'),
  i18n.t('mental-health-playback.introduction.point-personal-2'),
  i18n.t('mental-health-playback.introduction.point-personal-3'),
];

export default function MHPIntroductionScreen() {
  const dispatch = useDispatch();
  const startupInfo = useSelector<RootState, StartupInfo | undefined>((state) => state.content.startupInfo);
  const windowWidth = useWindowDimensions().width;

  const isGeneral = startupInfo?.mh_insight_cohort === 'MHIP-v1-cohort_b';

  useEffect(() => {
    dispatch(requestInsights());
  }, []);

  return (
    <BasicPage
      active
      hasStickyHeader
      footerTitle={i18n.t('mental-health-playback.introduction.button')}
      onPress={() => NavigatorService.navigate('MentalHealthPlaybackGeneral')}
      style={styling.backgroundWhite}
    >
      <Introduction scale={windowWidth / introductionWidth} />
      <View style={[styling.padding, styling.marginVerticalAuto]}>
        <Card backgroundColor="#F5F9FC" style={styling.marginBottom}>
          <Text style={styling.marginBottom} textClass="h4">
            {isGeneral
              ? i18n.t('mental-health-playback.introduction.title-general')
              : i18n.t('mental-health-playback.introduction.title-personal')}
          </Text>
          <UL items={isGeneral ? generalItems : personalItems} />
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
