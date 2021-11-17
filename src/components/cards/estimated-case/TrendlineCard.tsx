import ChevronRight from '@assets/icons/ChevronRight';
import { ShareButton } from '@covid/components/buttons';
import { TrendlineChart } from '@covid/components/charts/TrendlineChart';
import { Text } from '@covid/components/typography';
import Analytics, { events } from '@covid/core/Analytics';
import { ITrendlineData } from '@covid/core/content/dto/ContentAPIContracts';
import { TRootState } from '@covid/core/state/root';
import i18n from '@covid/locale/i18n';
import { sizes } from '@covid/themes';
import { useNavigation } from '@react-navigation/native';
import { colors } from '@theme';
import moment from 'moment';
import * as React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';

import { DeltaTag } from './DeltaTag';

interface IProps {
  onPress?: VoidFunction;
  isSharing?: boolean;
}

const TRENDLINE_RANGE_IN_MONTHS = 6;

const beginDate = moment().subtract(TRENDLINE_RANGE_IN_MONTHS, 'months').toDate();
const endDate = moment().toDate();

export function TrendlineCard(props: IProps) {
  const navigation = useNavigation();

  const localTrendline = useSelector<TRootState, ITrendlineData | undefined>((state) => state.content.localTrendline);

  const onPress = React.useCallback(() => {
    if (props.onPress) {
      Analytics.track(events.TRENDLINE_MORE_DETAILS_CLICKED);
      props.onPress();
    }
  }, []);

  const onPressShare = React.useCallback(() => navigation.navigate('Share', { sharable: 'TRENDLINE' }), []);

  return (
    <View style={styles.view}>
      <Text rhythm={8} textClass="h4">
        {i18n.t('trendline.active-covid-cases', { location: localTrendline?.name })}
      </Text>
      <Text inverted colorPalette="uiDark" colorShade="dark" textClass="pSmallLight">
        {i18n.t('trendline.active-covid-cases-subheader')}
      </Text>

      <TouchableOpacity
        activeOpacity={props.isSharing ? 1 : undefined}
        onPress={props.isSharing ? undefined : onPress}
        style={styles.touchableChart}
      >
        <View pointerEvents="none">
          <TrendlineChart beginDate={beginDate} endDate={endDate} height={200} />
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={props.isSharing ? 1 : undefined}
        onPress={props.isSharing ? undefined : onPress}
        style={styles.touchableText}
      >
        {localTrendline?.today || localTrendline?.today === 0 ? (
          <Text style={styles.marginRight} textClass="h0">
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

      {!props.isSharing ? (
        <ShareButton label={i18n.t('dashboard.trendline-card.share-cta')} onPress={onPressShare} />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  alignCenter: {
    alignSelf: 'center',
  },
  deltaTag: {
    alignSelf: 'center',
    marginBottom: 24,
  },
  flex: {
    flex: 1,
  },
  marginBottom: {
    marginBottom: sizes.m,
  },
  marginRight: {
    marginRight: sizes.s,
  },
  touchableChart: {
    marginTop: sizes.m,
    width: '100%',
  },
  touchableText: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: sizes.m,
  },
  view: {
    backgroundColor: colors.white,
    borderRadius: sizes.m,
    marginVertical: sizes.xs,
    paddingHorizontal: sizes.m,
    paddingTop: sizes.l,
  },
});
