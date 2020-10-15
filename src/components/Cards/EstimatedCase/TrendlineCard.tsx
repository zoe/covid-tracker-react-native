import React, {useRef} from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View,  } from 'react-native';
import { useSelector } from 'react-redux';
import { captureRef } from 'react-native-view-shot';
import * as Sharing from 'expo-sharing';

import { BrandedButton, Header3Text, RegularBoldText, RegularText } from '@covid/components/Text';
import { colors, fontStyles } from '@theme';
import Analytics, { events } from '@covid/core/Analytics';
import { isGBCountry } from '@covid/core/localisation/LocalisationService';
import i18n from '@covid/locale/i18n';
import { RootState } from '@covid/core/state/root';
import { ITrendLineData } from '@covid/core/content/dto/ContentAPIContracts';
import { TrendLineChart, TrendlineTimeFilters, TrendLineViewMode } from '@covid/components/Stats/TrendLineChart';
import { DeltaTag } from './DeltaTag';

interface Props {
  ctaOnPress: VoidFunction;
}

export const TrendlineCard: React.FC<Props> = ({ ctaOnPress }) => {
  const viewRef = useRef<View>(null);
  const postiveCountLabel = `${i18n.t('explore-trend-line.title')} `;

  const localTrendline = useSelector<RootState, ITrendLineData | undefined>((state) => ({
    name: state.content.personalizedLocalData?.name,
    today: state.content.personalizedLocalData?.cases,
    delta: state.content.localTrendline?.delta,
    timeseries: state.content.localTrendline?.timeseries,
  }));

  const onPress = () => {
    Analytics.track(events.ESTIMATED_CASES_METRICS_MORE_DETAILS_CLICKED);
    ctaOnPress();
  };

  const share = async () => {
    try {
      const uri = await captureRef(viewRef, { format: 'jpg' });
      Sharing.shareAsync('file://' + uri);
    } catch (_) {}
  };

  return (
    <View ref={viewRef} style={styles.root}>
      {isGBCountry() && (
        <View style={styles.chartContainer}>
          <TrendLineChart filter={TrendlineTimeFilters.week} viewMode={TrendLineViewMode.overview} />
          {/* use absolute overlay to prevent displaying blank chart */}
          <TouchableWithoutFeedback style={styles.hit} onPress={onPress}><View style={styles.box} /></TouchableWithoutFeedback>
          
        </View>
      )}

      <View style={{ flexDirection: 'column', alignItems: 'center' }}>
        <RegularText style={styles.primaryLabel}>{postiveCountLabel}</RegularText>
        <RegularBoldText>{localTrendline?.name}</RegularBoldText>
      </View>

      <Header3Text style={styles.metric}>{localTrendline?.today}</Header3Text>

      {localTrendline?.delta && (
        <View style={styles.deltaTag}>
          <DeltaTag change={localTrendline.delta} />
        </View>
      )}
      {isGBCountry() && (
          <View style={styles.buttonsContainer}>
            <BrandedButton style={styles.detailsButton} onPress={share}>
              <Text style={[fontStyles.bodyLight, styles.detailsButtonLabel]}>{i18n.t('explore-trend-line.cta')}</Text>
            </BrandedButton>
          </View>
        )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 16,
    marginHorizontal: 32,
    paddingVertical: 32,
  },

  description: {
    flexDirection: 'column',
    alignItems: 'center',
  },

  chartContainer: {
    width: '100%',
    height: 190,
    paddingHorizontal: 16,
    paddingBottom: 8,
  },

  month: {
    fontSize: 14,
    marginTop: 4,
    marginBottom: 8,
  },

  primaryLabel: {
    fontWeight: '300',
    color: colors.textDark,
    paddingHorizontal: 56,
    textAlign: 'center',
  },

  deltaTag: {
    marginTop: 8,
    marginBottom: 20,
  },

  detailsButton: {
    paddingHorizontal: 52,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.purple,
  },

  metric: {
    fontSize: 32,
    fontWeight: '300',
    lineHeight: 48,
    paddingTop: 8,
    color: colors.textDark,
  },

  detailsButtonLabel: {
    color: colors.purple,
    fontWeight: '300',
    fontSize: 14,
  },
  buttonsContainer: {
    maxWidth: '80%',
    alignSelf: 'center',
    marginTop: 12,
  },
  hit: {
    height: '100%',
    left: 16,
    position: 'absolute',
    width: '100%',
  },
  box: {
    backgroundColor: 'red',
    height: '100%',
    left: 16,
    opacity: 0,
    position: 'absolute',
    width: '100%',
  }
});
