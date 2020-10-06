import React, { useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import moment from 'moment';

import { RootState } from '@covid/core/state/root';
import { ITrendLineData } from '@covid/core/content/dto/ContentAPIContracts';

import { WebView } from '../WebView';
import { MutedText } from '../Text';

const overviewHtml = require('@assets/charts/trendline-overview.html');
const exploreHtml = require('@assets/charts/trendline-explore.html');

export enum TrendlineTimeFilters {
  week = 'WEEK',
  month = 'MONTH',
  all = 'ALL',
}

export interface TrendLineChartProps {
  filter: TrendlineTimeFilters;
  viewMode: TrendLineViewMode;
}

export enum TrendLineViewMode {
  overview,
  explore,
}

export const TrendLineEmptyView: React.FC = () => {
  return (
    <View style={styles.emptyView}>
      <MutedText>Not enough data</MutedText>
    </View>
  );
};

export const TrendLineChart: React.FC<TrendLineChartProps> = ({ filter, viewMode }) => {
  const webview = useRef<WebView>(null);
  const trendline = useSelector<RootState, ITrendLineData | undefined>((state) => {
    if (viewMode === TrendLineViewMode.explore) {
      return state.content.exploreTrendline;
    }
    return state.content.localTrendline;
  });

  useEffect(() => {
    webview.current?.call('updateTimeWindow', { payload: { type: filter } });
  }, [filter]);

  useEffect(() => {
    updateChartDate();
  }, [trendline]);

  const updateChartDate = () => {
    if (!trendline?.timeseries) {
      return;
    }

    const timeseries = (trendline?.timeseries ?? []).map((data) => {
      const date = moment(data.date);
      return {
        date,
        time: {
          year: date.format('YYYY'),
          month: date.format('MM'),
          day: date.format('DD'),
        },
        label: moment(data.date).format('DD'),
        value: Math.round(data.value),
      };
    });

    switch (viewMode) {
      case TrendLineViewMode.overview:
        const overviewSorted = timeseries.sort((a: any, b: any) => (a.date < b.date ? 1 : -1));
        const filtered = overviewSorted.filter((_: any, index: number) => index <= 7);
        webview.current?.call('setData', {
          payload: {
            labels: filtered.map((item) => item.label).reverse(),
            values: filtered.map((item) => item.value).reverse(),
          },
        });
        return;
      case TrendLineViewMode.explore:
        const timeseriesSorted = timeseries.sort((a, b) => (a.date > b.date ? 1 : -1));
        webview.current?.call('setData', {
          payload: { data: timeseriesSorted },
        });
    }
  };

  if (!trendline?.timeseries) {
    return <TrendLineEmptyView />;
  }

  const html = () => (viewMode === TrendLineViewMode.explore ? exploreHtml : overviewHtml);

  return (
    <View style={{ flexDirection: 'column', flex: 1, alignContent: 'center' }}>
      <WebView
        ref={webview}
        originWhitelist={['*']}
        source={html()}
        style={styles.webview}
        scrollEnabled={false}
        onEvent={(type, payload) => {
          switch (type) {
            case 'loaded':
              updateChartDate();
              break;
            default:
              break;
          }
        }}
      />
      <MutedText style={styles.month}>{moment().format('MMMM')}</MutedText>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  webview: {
    height: '100%',
    width: '100%',
  },
  month: {
    fontSize: 14,
    alignSelf: 'center',
    marginTop: 4,
  },
});
