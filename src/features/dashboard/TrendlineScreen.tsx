import React, { useRef, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import * as Sharing from 'expo-sharing';
import { captureRef } from 'react-native-view-shot';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { colors, fontStyles } from '@theme';
import { PoweredByZoeSmall } from '@covid/components/Logos/PoweredByZoe';
import Screen, { Header } from '@covid/components/Screen';
import {
  Header3Text,
  RegularText,
  BrandedButton,
} from '@covid/components/Text';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import { DeltaTag } from '@covid/components/Cards/EstimatedCase/DeltaTag';
import { Tabs } from '@covid/components/Nav/Tabs';
import { useSelector } from 'react-redux';
import { RootState } from '@covid/core/state/root';
import { ITrendlineData } from './trendline.types';
import { BackButton } from '@covid/components/PatientHeader';
import { TrendLineTrendingViewChart, TrendlineTimeFilters } from '@covid/components/Stats/TrendLineTrendingViewChart';
import { TouchableOpacity } from 'react-native-gesture-handler';
import appCoordinator from '../AppCoordinator';
// import i18n from '@covid/locale/i18n';

const html = require('@assets/charts/trendline-explore.html');

type Props = {
  navigation: StackNavigationProp<ScreenParamList, 'Trendline'>;
  route: RouteProp<ScreenParamList, 'Trendline'>;
};

export const TrendlineScreen: React.FC<Props> = ({ route, navigation }) => {

  const viewRef = useRef<View>(null);

  const [timeFilter, setTimeFilter] = useState<TrendlineTimeFilters>(TrendlineTimeFilters.week);
  const trendlineData = useSelector<RootState, ITrendlineData | undefined>(
    (state) => ({
      name: state.content.personalizedLocalData?.name,
      today: state.content.personalizedLocalData?.cases,
      delta: state.content.trendlineData?.delta,
    })
  );

  const share = async () => {
    try {
      const uri = await captureRef(viewRef, { format: 'jpg' });
      // https://github.com/expo/expo/issues/6920#issuecomment-580966657
      Sharing.shareAsync('file://' + uri);
    } catch (_) { }
  };

  return (
    <View style={styles.root}>
      <View style={{ position: 'absolute', zIndex: 100, top: 48, left: 16 }}>
        <BackButton navigation={navigation} />
      </View>
      <Screen navigation={navigation} style={styles.container} extendEdges>
        <View style={styles.container} ref={viewRef}>
          <Header>
            <RegularText style={{ textAlign: 'center' }}>People with COVID in</RegularText>
            <TouchableOpacity onPress={() => appCoordinator.goToSearchLAD()}>
              <RegularText style={{ textAlign: 'center', fontWeight: '500', fontSize: 20, marginTop: 8 }}>
                {trendlineData?.name}
              </RegularText>
            </TouchableOpacity>
          </Header>

          <Header3Text style={styles.metric}>{trendlineData?.today}</Header3Text>

          <View style={styles.deltaTag}>
            <DeltaTag change={trendlineData?.delta ?? 0} from="last week" />
          </View>

          <View style={styles.chartContainer}>
            <TrendLineTrendingViewChart filter={timeFilter} />
          </View>

          <Tabs
            labels={['WEEK', 'MONTH', 'ALL']}
            onSelected={(value, index) => {
              setTimeFilter(value as TrendlineTimeFilters)
            }}
            styles={{ justifyContent: 'center', marginVertical: 32 }}
          />

          <View style={{ maxWidth: '80%', alignSelf: 'center', marginTop: 12 }}>
            <BrandedButton style={styles.detailsButton} onPress={share}>
              <Text style={[fontStyles.bodyLight, styles.detailsButtonLabel]}>Share</Text>
            </BrandedButton>
          </View>

          <View style={styles.zoe}>
            <PoweredByZoeSmall />
          </View>
        </View>

      </Screen>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.white,
  },

  container: {
    flex: 1,
    marginTop: 2
  },

  header: {
    marginRight: 72,
  },

  description: {
    paddingHorizontal: 16,
    paddingTop: 16,
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
    width: '100%',
    height: 360,
    // paddingHorizontal: 16,
    // backgroundColor: 'red'
  },

  button: {
    marginVertical: 16,
    marginHorizontal: 24,
    marginBottom: 32,
  },

  buttonsContainer: {
    paddingHorizontal: 8,
    marginBottom: 48,
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
  },
});
