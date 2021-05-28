import { BrandedButton } from '@covid/components';
import { DeltaTag } from '@covid/components/cards/estimated-case/DeltaTag';
import { PoweredByZoeSmall } from '@covid/components/logos/PoweredByZoe';
import { Tabs } from '@covid/components/nav/Tabs';
import { BackButton } from '@covid/components/PatientHeader';
import { Header } from '@covid/components/Screen';
import { TrendLineChart, TrendlineTimeFilters, TrendLineViewMode } from '@covid/components/stats/TrendLineChart';
import { Header3Text, RegularText } from '@covid/components/Text';
import { ITrendLineData } from '@covid/core/content/dto/ContentAPIContracts';
import { fetchLocalTrendLine } from '@covid/core/content/state/contentSlice';
import { RootState } from '@covid/core/state/root';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import i18n from '@covid/locale/i18n';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors, fontStyles } from '@theme';
import * as Sharing from 'expo-sharing';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { captureRef } from 'react-native-view-shot';
import { useDispatch, useSelector } from 'react-redux';

type Props = {
  navigation?: StackNavigationProp<ScreenParamList, 'Trendline'>;
  route?: RouteProp<ScreenParamList, 'Trendline'>;
};

export const TrendlineScreen: React.FC<Props> = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const viewRef = useRef<View>(null);
  const [timeFilter, setTimeFilter] = useState<TrendlineTimeFilters>(TrendlineTimeFilters.all);
  const trendline = useSelector<RootState, ITrendLineData | undefined>((state) => ({
    ...state.content.exploreTrendline,
  }));

  const share = async () => {
    try {
      const uri = await captureRef(viewRef, { format: 'jpg' });
      Sharing.shareAsync(`file://${uri}`);
    } catch (_) {}
  };

  useEffect(() => {
    dispatch(fetchLocalTrendLine());
  }, []);

  return (
    <View style={styles.root}>
      <View style={styles.nav}>
        <BackButton navigation={navigation} />
      </View>
      <View collapsable={false} ref={viewRef} style={styles.container}>
        <Header>
          <RegularText style={{ textAlign: 'center' }}>{i18n.t('explore-trend-line.title')}</RegularText>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <RegularText style={styles.district}>{trendline?.name}</RegularText>
          </View>
        </Header>

        <Header3Text style={styles.metric}>{trendline?.today}</Header3Text>

        {trendline?.delta ? (
          <View style={styles.deltaTag}>
            <DeltaTag change={trendline.delta} />
          </View>
        ) : null}

        <View style={styles.chartContainer}>
          <TrendLineChart filter={timeFilter} viewMode={TrendLineViewMode.explore} />
        </View>

        <Tabs
          labels={['ALL', 'MONTH', 'WEEK']}
          onSelected={(value, index) => {
            setTimeFilter(value as TrendlineTimeFilters);
          }}
          styles={{ justifyContent: 'center', marginVertical: 32 }}
        />
        <View style={styles.buttonsContainer}>
          <BrandedButton onPress={share} style={styles.detailsButton}>
            <Text style={[fontStyles.bodyLight, styles.detailsButtonLabel]}>{i18n.t('explore-trend-line.cta')}</Text>
          </BrandedButton>
        </View>
        <View style={styles.zoe}>
          <PoweredByZoeSmall />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  arrow: {
    alignSelf: 'center',
    justifyContent: 'center',
    marginLeft: 6,
    marginTop: 9,
    transform: [{ rotate: '-90deg' }],
  },

  button: {
    marginBottom: 32,
    marginHorizontal: 24,
    marginVertical: 16,
  },

  buttonsContainer: {
    alignSelf: 'center',
    marginTop: 12,
    maxWidth: '80%',
  },

  chartContainer: {
    flex: 1,
    marginLeft: 12,
    marginRight: 20,
  },

  container: {
    backgroundColor: 'white',
    flex: 1,
    paddingTop: 64,
  },

  deltaTag: {
    alignSelf: 'center',
    marginTop: 16,
    marginVertical: 32,
  },

  detailsButton: {
    backgroundColor: 'transparent',
    borderColor: colors.purple,
    borderWidth: 1,
    marginBottom: 24,
    paddingHorizontal: 52,
  },

  detailsButtonLabel: {
    color: colors.purple,
    fontSize: 14,
    fontWeight: '300',
  },

  district: {
    fontSize: 20,
    fontWeight: '500',
    marginTop: 8,
    textAlign: 'center',
  },

  metric: {
    color: colors.textDark,
    fontSize: 32,
    lineHeight: 48,
    paddingTop: 8,
    textAlign: 'center',
  },

  nav: {
    left: 16,
    position: 'absolute',
    top: 48,
    zIndex: 100,
  },

  root: {
    backgroundColor: colors.white,
    flex: 1,
  },

  zoe: {
    marginBottom: 32,
    marginTop: 16,
  },
});
