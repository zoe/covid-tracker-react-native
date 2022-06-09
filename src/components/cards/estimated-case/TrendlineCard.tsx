import ChevronRight from '@assets/icons/ChevronRight';
import { TrendlineChart } from '@covid/components/charts/TrendlineChart';
import { ESharable } from '@covid/components/screens/share/types';
import { Text } from '@covid/components/typography';
import Analytics, { events } from '@covid/core/Analytics';
import { ITrendlineData } from '@covid/core/content/dto/ContentAPIContracts';
import { TStateApp } from '@covid/core/state/app/types';
import { TRootState } from '@covid/core/state/root';
import i18n from '@covid/locale/i18n';
import { useNavigation } from '@react-navigation/native';
import { colors } from '@theme';
import CovidTag from '@tracer/components/molecules/CovidTag';
import ShareButton from '@tracer/components/molecules/ShareButton';
import { useToggleRebrand } from 'health-study/redux/app/selectors';
import * as React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';

import { DeltaTag } from './DeltaTag';
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

      <TouchableOpacity
        activeOpacity={props.isSharing ? 1 : undefined}
        onPress={props.isSharing ? undefined : onPress}
        style={styles.touchableChart}
      >
        <View pointerEvents="none">
          <TrendlineChart height={props.isSharing ? 150 : 200} />
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={props.isSharing ? 1 : undefined}
        onPress={props.isSharing ? undefined : onPress}
        style={[styles.touchableText, props.isSharing ? styles.minimisePadding : null]}
      >
        {localTrendline?.today || localTrendline?.today === 0 ? (
          <Text style={styles.marginRight} textClass={props.isSharing ? 'h1' : 'h0'}>
            {localTrendline?.today}
          </Text>
        ) : null}

        <Text inverted colorPalette="uiDark" colorShade="dark" style={styles.flex} textClass="pSmallLight">
          {i18n.t('trendline.active-cases-in-your-area')}
        </Text>

        <ChevronRight backgroundColor="white" chveronColor={colors.primary} height={32} width={32} />
      </TouchableOpacity>

      {localTrendline?.delta ? (
        <DeltaTag change={localTrendline.delta} style={!props.isSharing ? styles.alignCenter : styles.deltaTag} />
      ) : null}

      <Text
        inverted
        colorPalette="uiDark"
        colorShade="dark"
        style={[styles.flex, props.isSharing ? styles.minimiseMargin : styles.marginTop]}
        textClass="pSmallLight"
      >
        {i18n.t('trendline.data-timeframe')}
      </Text>

      {!props.isSharing ? (
        <ShareButton
          label={i18n.t('dashboard.trendline-card.share-cta')}
          onPress={onPressShare}
          shareIconStrokeColor={shareBtnColor}
          textStyle={{ color: shareBtnColor }}
        />
      ) : null}
      <CovidTag />
    </View>
  );
}
