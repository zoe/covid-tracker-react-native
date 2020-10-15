import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Sharing from 'expo-sharing';
import { captureRef } from 'react-native-view-shot';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';

import { colors, fontStyles } from '@theme';
import { PoweredByZoeSmall } from '@covid/components/Logos/PoweredByZoe';
import { Header } from '@covid/components/Screen';
import { BrandedButton, Header3Text, RegularText } from '@covid/components/Text';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import { DeltaTag } from '@covid/components/Cards/EstimatedCase/DeltaTag';
import { Tabs } from '@covid/components/Nav/Tabs';
import { RootState } from '@covid/core/state/root';
import { BackButton } from '@covid/components/PatientHeader';
import { ITrendLineData } from '@covid/core/content/dto/ContentAPIContracts';
import { TrendLineChart, TrendlineTimeFilters, TrendLineViewMode } from '@covid/components/Stats/TrendLineChart';
import i18n from '@covid/locale/i18n';
import { fetchLocalTrendLine } from '@covid/core/content/state/contentSlice';
import { isIos } from '@covid/utils/platform';

type Props = {
  navigation: StackNavigationProp<ScreenParamList, 'Trendline'>;
  route: RouteProp<ScreenParamList, 'Trendline'>;
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
      Sharing.shareAsync('file://' + uri);
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
      <View ref={viewRef} style={styles.container} collapsable={false}>
        <Header>
          <RegularText style={{ textAlign: 'center' }}>{i18n.t('explore-trend-line.title')}</RegularText>
          {/* <TouchableOpacity onPress={() => appCoordinator.goToSearchLAD()}> */}
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <RegularText style={styles.district}>{trendline?.name}</RegularText>
            {/* <DropdownIcon style={styles.arrow} /> */}
          </View>
          {/* </TouchableOpacity> */}
        </Header>

        <Header3Text style={styles.metric}>{trendline?.today}</Header3Text>

        {trendline?.delta && (
          <View style={styles.deltaTag}>
            <DeltaTag change={trendline.delta} />
          </View>
        )}

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
          <BrandedButton style={styles.detailsButton} onPress={share}>
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
  root: {
    flex: 1,
    backgroundColor: colors.white,
  },

  nav: {
    position: 'absolute',
    zIndex: 100,
    top: 48,
    left: 16,
  },

  container: {
    backgroundColor: 'white',
    flex: 1,
    paddingTop: 64,
  },

  district: {
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 20,
    marginTop: 8,
  },

  arrow: {
    justifyContent: 'center',
    alignSelf: 'center',
    transform: [{ rotate: '-90deg' }],
    marginTop: 9,
    marginLeft: 6,
  },

  metric: {
    fontSize: 32,
    lineHeight: 48,
    paddingTop: 8,
    textAlign: 'center',
    color: colors.textDark,
  },

  deltaTag: {
    marginTop: 16,
    marginVertical: 32,
    alignSelf: 'center',
  },

  chartContainer: {
    marginLeft: 12,
    marginRight: 20,
    flex: 1,
  },

  button: {
    marginVertical: 16,
    marginHorizontal: 24,
    marginBottom: 32,
  },

  buttonsContainer: {
    maxWidth: '80%',
    alignSelf: 'center',
    marginTop: 12,
  },

  detailsButton: {
    paddingHorizontal: 52,
    marginBottom: 24,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.purple,
  },

  detailsButtonLabel: {
    color: colors.purple,
    fontWeight: '300',
    fontSize: 14,
  },

  zoe: {
    marginTop: 16,
    marginBottom: 32,
  },
});
