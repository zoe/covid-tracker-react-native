import React, { useRef, useState } from 'react';
import { LayoutChangeEvent, NativeScrollEvent, NativeSyntheticEvent, ScrollView, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';

import NavigatorService from '@covid/NavigatorService';
import { BrandedButton, BasicNavHeader, SafeLayout, Text } from '@covid/components';
import { selectInsights } from '@covid/core/state/mental-health-playback/slice';
import { grid, styling } from '@covid/themes';
import i18n from '@covid/locale/i18n';
import PaginationIndicator from '@covid/features/mental-health-playback/components/PaginationIndicator';
import Insights from '@covid/features/mental-health-playback/components/Insights';

export default function MHPGeneralScreen() {
  const [scrollViewHeight, setScrollViewHeight] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const insights = useSelector(selectInsights);
  const scrollViewRef = useRef<ScrollView>(null);

  function onPress() {
    NavigatorService.navigate('MentalHealthPlaybackRating');
  }

  function onScroll(event: NativeSyntheticEvent<NativeScrollEvent>) {
    if (scrollViewHeight > 0) {
      const index = Math.floor(
        Math.max(0, event.nativeEvent.contentOffset.y + scrollViewHeight / 2) / scrollViewHeight
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
      <View style={styling.flex}>
        <ScrollView
          decelerationRate="fast"
          onLayout={onLayoutScrollView}
          onScroll={onScroll}
          ref={scrollViewRef}
          scrollEventThrottle={80}
          snapToInterval={scrollViewHeight}>
          <Insights itemHeight={scrollViewHeight} insights={insights} />

          <View style={{ height: scrollViewHeight }}>
            <View style={styles.view}>
              <Text textAlign="center" textClass="h3Regular">
                {i18n.t('mental-health-playback.general.end-title')}
              </Text>
              <Text
                inverted
                textAlign="center"
                colorPalette="uiDark"
                colorShade="dark"
                textClass="p"
                style={styling.marginTopBig}>
                {i18n.t('mental-health-playback.general.end-description')}
              </Text>
            </View>
            <BrandedButton onPress={onPress} style={styles.button}>
              {i18n.t('mental-health-playback.general.end-button')}
            </BrandedButton>
          </View>
        </ScrollView>

        <PaginationIndicator amount={insights.length + 1} selectedIndex={selectedIndex} onSelection={onSelection} />
      </View>
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
