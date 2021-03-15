import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import moment from 'moment';

import { RootState } from '@covid/core/state/root';
import { ITrendLineData } from '@covid/core/content/dto/ContentAPIContracts';
import { loadTrendLineExplore, loadTrendLineOverview } from '@covid/utils/files';

import { WebView } from '../WebView';
import { MutedText, RegularText } from '../Text';

export enum TrendlineTimeFilters {
  week = 'WEEK',
  month = 'MONTH',
  all = 'ALL',
}

interface ITrendLineChartProps {
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

export const TrendLineChart: React.FC<ITrendLineChartProps> = ({ filter, viewMode }) => {
  const [html, setHtml] = useState<string>('');
  const [monthRangeLabel, setMonthRangeLabel] = useState<string>('');
  const webview = useRef<WebView>(null);
  const trendline = useSelector<RootState, ITrendLineData | undefined>((state) => {
    if (viewMode === TrendLineViewMode.explore) {
      return state.content.exploreTrendline;
    }
    return state.content.localTrendline;
  });

  useEffect(() => {
    let isMounted = true;
    const runAsync = async () => {
      try {
        const x = viewMode === TrendLineViewMode.explore ? await loadTrendLineExplore() : await loadTrendLineOverview();
        setHtml(x);
      } catch (_) {}
    };
    if (isMounted) {
      runAsync();
    }
    return function cleanUp() {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      webview.current?.call('updateTimeWindow', { payload: { type: filter } });
    }
    return function () {
      isMounted = false;
    };
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
        const filtered = overviewSorted.filter((_: any, index: number) => index <= 90);
        const monthLabels = (filtered ?? []).map((data) => moment(data.date).format('MMM'));
        const monthLabelSet = monthLabels.reduce(
          (unique: string[], item: string) => (unique.includes(item) ? unique : [...unique, item]),
          []
        );
        if (monthLabelSet.length >= 2) {
          setMonthRangeLabel(`${monthLabelSet[monthLabelSet.length - 1]} - ${monthLabelSet[0]}`);
        } else if (monthLabelSet.length === 1) {
          setMonthRangeLabel(`${monthLabelSet[0]}`);
        }
        webview.current?.call('setData', {
          payload: {
            labels: filtered.map((item) => item.label).reverse(),
            values: filtered.map((item) => item.value).reverse(),
          },
        });
        return;
      case TrendLineViewMode.explore:
        const timeseriesSorted = timeseries.sort((a, b) => (a.date > b.date ? 1 : -1));
        const values = timeseriesSorted.map((item) => item.value);
        webview.current?.call('setData', {
          payload: {
            data: timeseriesSorted,
            min: Math.min(...values),
            max: Math.max(...values),
          },
        });
    }
  };

  if (!trendline?.timeseries) {
    return <TrendLineEmptyView />;
  }

  return (
    <View style={{ flexDirection: 'column', flex: 1, alignContent: 'center' }}>
      <WebView
        androidHardwareAccelerationDisabled
        ref={webview}
        originWhitelist={['*']}
        source={{ html }}
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
      {!!monthRangeLabel && <RegularText style={{ textAlign: 'center', fontSize: 12 }}>{monthRangeLabel}</RegularText>}
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
