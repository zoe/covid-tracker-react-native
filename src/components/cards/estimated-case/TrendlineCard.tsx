import { ESharable } from '@covid/components/screens/share/types';
import { Text } from '@covid/components/typography';
import Analytics, { events } from '@covid/core/Analytics';
import { ITrendlineData } from '@covid/core/content/dto/ContentAPIContracts';
import { TRootState } from '@covid/core/state/root';
import i18n from '@covid/locale/i18n';
import { useToggleRebrand } from '@health-study/redux/app/selectors';
import { useNavigation } from '@react-navigation/native';
import { sizes } from '@tracer/branding/grid';
import CovidTag from '@tracer/components/molecules/CovidTag';
import Callout from '@tracer/components/templates/Callout';
import React from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';

import TrendlineCardContent from './TrendlineCardContent';
import {
  COVID_SHARE_BTN_COLOR,
  covidStyles,
  HEALTH_STUDY_SHARE_BTN_COLOR,
  healthStudyStyles,
} from './TrendlineCardStyle';

interface IProps {
  onPress?: VoidFunction;
  isSharing?: boolean;
}

export function TrendlineCard(props: IProps) {
  const navigation = useNavigation();

  const toggleReBrand = useSelector(useToggleRebrand);
  const localTrendline = useSelector<TRootState, ITrendlineData | undefined>((state) => state.content.localTrendline);

  const onPress = React.useCallback(() => {
    if (props.onPress) {
      Analytics.track(events.TRENDLINE_MORE_DETAILS_CLICKED);
      props.onPress();
    }
  }, []);

  const onPressShare = React.useCallback(() => navigation.navigate('Share', { sharable: ESharable.TRENDLINE }), []);

  const styles = toggleReBrand ? healthStudyStyles : covidStyles;
  const shareBtnColor = toggleReBrand ? HEALTH_STUDY_SHARE_BTN_COLOR : COVID_SHARE_BTN_COLOR;
  return (
    <View style={[styles.view, props.isSharing ? styles.minimisePadding : null]}>
      <Text rhythm={8} textClass={props.isSharing ? 'h5' : 'h4'}>
        {i18n.t('trendline.active-covid-cases', { location: localTrendline?.name })}
      </Text>
      <Text inverted colorPalette="uiDark" colorShade="dark" textClass={props.isSharing ? 'pXSmall' : 'pSmallLight'}>
        {i18n.t('trendline.active-covid-cases-subheader')}
      </Text>
      {localTrendline?.timeseries !== undefined &&
      localTrendline?.timeseries !== null &&
      localTrendline?.timeseries.length > 0 ? (
        <TrendlineCardContent
          isSharing={props.isSharing}
          localTrendline={localTrendline}
          onPress={onPress}
          onPressShare={onPressShare}
          shareBtnColor={shareBtnColor}
          styles={styles}
        />
      ) : (
        <View style={{ paddingVertical: sizes.g8 }}>
          <Callout
            calloutType="info"
            text="COVID trend data in your area is temporarily unavailable due to an app update. This will be resolved in a few weeks."
          />
        </View>
      )}
      <CovidTag />
    </View>
  );
}
