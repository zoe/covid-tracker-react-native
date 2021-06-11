import { MutedText, RegularText } from '@covid/components/Text';
import { WebView } from '@covid/components/WebView';
import { ITrendLineData } from '@covid/core/content/dto/ContentAPIContracts';
import { RootState } from '@covid/core/state/root';
import { loadTrendLineExplore, loadTrendLineOverview } from '@covid/utils/files';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';

export enum TrendlineTimeFilters {
  week = 'WEEK',
  month = 'MONTH',
  all = 'ALL',
}

interface IProps {
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

const AMOUNT_ROWS = 10;
const Y_AXIS_STEP_SIZES = [
  1, 2, 5, 10, 20, 25, 40, 50, 80, 100, 150, 200, 400, 500, 800, 1000, 2000, 2500, 5000, 10000, 20000, 25000, 50000,
];

export function TrendLineChart({ filter, viewMode }: IProps) {
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
    return () => {
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
        label: moment(data.date).format('DD'),
        time: {
          day: date.format('DD'),
          month: date.format('MM'),
          year: date.format('YYYY'),
        },
        value: Math.round(data.value),
      };
    });

    switch (viewMode) {
      case TrendLineViewMode.overview: {
        const overviewSorted = timeseries.sort((a: any, b: any) => (a.date < b.date ? 1 : -1));
        const filtered = overviewSorted.filter((_: any, index: number) => index <= 90);
        const monthLabels = (filtered ?? []).map((data) => moment(data.date).format('MMM'));
        const monthLabelSet = monthLabels.reduce(
          (unique: string[], item: string) => (unique.includes(item) ? unique : [...unique, item]),
          [],
        );
        if (monthLabelSet.length >= 2) {
          setMonthRangeLabel(`${monthLabelSet[monthLabelSet.length - 1]} - ${monthLabelSet[0]}`);
        } else if (monthLabelSet.length === 1) {
          setMonthRangeLabel(`${monthLabelSet[0]}`);
        }
        const values = filtered.map((item) => item.value).reverse();
        const needle = Math.max(...values) / AMOUNT_ROWS;
        const stepSize = Y_AXIS_STEP_SIZES.find((snap) => snap >= needle) || 1;
        const max = stepSize * AMOUNT_ROWS;
        webview.current?.call('setData', {
          payload: {
            labels: filtered.map((item) => item.label).reverse(),
            max,
            stepSize,
            values,
          },
        });
        return;
      }
      case TrendLineViewMode.explore: {
        const timeseriesSorted = timeseries.sort((a, b) => (a.date > b.date ? 1 : -1));
        const values = timeseriesSorted.map((item) => item.value);
        webview.current?.call('setData', {
          payload: {
            data: timeseriesSorted,
            max: Math.max(...values),
            min: Math.min(...values),
          },
        });
      }
    }
  };

  if (!trendline?.timeseries) {
    return <TrendLineEmptyView />;
  }

  return (
    <View style={{ alignContent: 'center', flex: 1, flexDirection: 'column' }}>
      <WebView
        androidHardwareAccelerationDisabled
        onEvent={(type, payload) => {
          switch (type) {
            case 'loaded':
              updateChartDate();
              break;
            default:
              break;
          }
        }}
        originWhitelist={['*']}
        ref={webview}
        scrollEnabled={false}
        source={{ html }}
        style={styles.webview}
      />
      {monthRangeLabel ? (
        <RegularText style={{ fontSize: 12, textAlign: 'center' }}>{monthRangeLabel}</RegularText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  emptyView: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  month: {
    alignSelf: 'center',
    fontSize: 14,
    marginTop: 4,
  },
  webview: {
    height: '100%',
    width: '100%',
  },
});
