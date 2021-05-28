import { BasicNavHeader, BrandedButton, SafeLayout, Text } from '@covid/components';
import EmptyState from '@covid/components/EmptyState';
import { isLoading, selectInsights } from '@covid/core/state/mental-health-playback/slice';
import { RootState } from '@covid/core/state/root';
import { StartupInfo } from '@covid/core/user/dto/UserAPIContracts';
import Insights from '@covid/features/mental-health-playback/components/Insights';
import PaginationIndicator from '@covid/features/mental-health-playback/components/PaginationIndicator';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import { grid, styling } from '@covid/themes';
import React, { useRef, useState } from 'react';
import { LayoutChangeEvent, NativeScrollEvent, NativeSyntheticEvent, ScrollView, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';

export default function MHPGeneralScreen() {
  const [scrollViewHeight, setScrollViewHeight] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const insights = useSelector(selectInsights);
  const loading = useSelector(isLoading);

  const startupInfo = useSelector<RootState, StartupInfo | undefined>((state) => state.content.startupInfo);
  const scrollViewRef = useRef<ScrollView>(null);

  const isGeneral = startupInfo?.mh_insight_cohort === 'MHIP-v1-cohort_b';

  function onPress() {
    NavigatorService.navigate('MentalHealthPlaybackRating');
  }

  function onScroll(event: NativeSyntheticEvent<NativeScrollEvent>) {
    if (scrollViewHeight > 0) {
      const index = Math.floor(
        Math.max(0, event.nativeEvent.contentOffset.y + scrollViewHeight / 2) / scrollViewHeight,
      );
      if (index !== selectedIndex) {
        setSelectedIndex(index);
      }
    }
  }

  function onLayoutScrollView(event: LayoutChangeEvent) {
    setScrollViewHeight(event.nativeEvent.layout.height);
  }

  function onSelection(index: number) {
    scrollViewRef?.current?.scrollTo({
      animated: true,
      x: 0,
      y: index * scrollViewHeight,
    });
  }

  return (
    <SafeLayout style={styling.backgroundWhite}>
      <BasicNavHeader backgroundColor="transparent" style={styles.basicNavHeader} />
      {!insights.length && loading ? (
        <EmptyState />
      ) : (
        <>
          <ScrollView
            decelerationRate="fast"
            onLayout={onLayoutScrollView}
            onScroll={onScroll}
            ref={scrollViewRef}
            scrollEventThrottle={80}
            snapToInterval={scrollViewHeight}
          >
            <Insights insights={insights} itemHeight={scrollViewHeight} />

            <View style={{ height: scrollViewHeight }}>
              <View style={styles.view}>
                <Text textAlign="center" textClass="h3Regular">
                  {i18n.t(
                    isGeneral
                      ? 'mental-health-playback.general.end-title-general'
                      : 'mental-health-playback.general.end-title-personal',
                  )}
                </Text>
                <Text
                  inverted
                  colorPalette="uiDark"
                  colorShade="dark"
                  style={styling.marginTopBig}
                  textAlign="center"
                  textClass="p"
                >
                  {i18n.t('mental-health-playback.general.end-description')}
                </Text>
              </View>
              <BrandedButton onPress={onPress} style={styles.button}>
                {i18n.t('mental-health-playback.general.end-button')}
              </BrandedButton>
            </View>
          </ScrollView>

          <PaginationIndicator amount={insights.length + 1} onSelection={onSelection} selectedIndex={selectedIndex} />
        </>
      )}
    </SafeLayout>
  );
}

const styles = StyleSheet.create({
  basicNavHeader: {
    position: 'absolute',
    zIndex: 1,
  },
  button: {
    marginBottom: grid.xl,
    marginHorizontal: grid.xl,
  },
  view: {
    marginBottom: 'auto',
    marginTop: 'auto',
    paddingHorizontal: grid.xxxl,
  },
});
