import { BrandedButton, Text } from '@covid/components';
import EmptyState from '@covid/components/EmptyState';
import { Screen } from '@covid/components/Screen';
import { homeScreenName } from '@covid/core/localisation/LocalisationService';
import { isLoading, selectInsights } from '@covid/core/state/mental-health-playback/slice';
import Insights from '@covid/features/mental-health-playback/components/Insights';
import PaginationIndicator from '@covid/features/mental-health-playback/components/PaginationIndicator';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import { sizes, styling } from '@covid/themes';
import * as React from 'react';
import { LayoutChangeEvent, NativeScrollEvent, NativeSyntheticEvent, ScrollView, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';

export default function MHPGeneralScreen() {
  const [height, setHeight] = React.useState(0);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const mhInsights = useSelector(selectInsights);
  const loading = useSelector(isLoading);

  const scrollViewRef = React.useRef<ScrollView>(null);

  function onPress() {
    if (mhInsights.completed_feedback) {
      NavigatorService.navigate(homeScreenName());
    } else {
      NavigatorService.navigate('MentalHealthPlaybackRating');
    }
  }

  function onScroll(event: NativeSyntheticEvent<NativeScrollEvent>) {
    if (height > 0) {
      const index = Math.floor(Math.max(0, event?.nativeEvent?.contentOffset.y + height / 2) / height);
      if (index !== selectedIndex) {
        setSelectedIndex(index);
      }
    }
  }

  function onSelection(index: number) {
    scrollViewRef?.current?.scrollTo({
      animated: true,
      x: 0,
      y: index * height,
    });
  }

  function onLayout(event: LayoutChangeEvent) {
    setHeight(event.nativeEvent.layout.height);
  }

  return (
    <Screen noScrollView backgroundColor="white" testID="mhp-general-screen">
      <View style={[styling.flex, styling.relative]}>
        <View onLayout={onLayout} style={styling.measureHeight} />

        {!mhInsights.insights.length && loading ? (
          <EmptyState />
        ) : (
          <>
            <ScrollView
              decelerationRate="fast"
              onScroll={onScroll}
              overScrollMode="never"
              ref={scrollViewRef}
              scrollEventThrottle={80}
              snapToInterval={height}
            >
              <View style={styles.contentWrapper}>
                <Insights insights={mhInsights.insights} itemHeight={height} />

                <View style={{ height }}>
                  <View style={styles.lastInsightWrapper}>
                    <Text textAlign="center" textClass="h3Regular">
                      {i18n.t('mental-health-playback.general.end-title-personal')}
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
              </View>
            </ScrollView>

            <PaginationIndicator
              amount={mhInsights.insights.length + 1}
              onSelection={onSelection}
              selectedIndex={selectedIndex}
            />
          </>
        )}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  button: {
    marginBottom: sizes.l,
    marginHorizontal: sizes.l,
  },
  contentWrapper: {
    flexGrow: 1,
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: sizes.maxScreenWidth,
    width: '100%',
  },
  lastInsightWrapper: {
    marginBottom: 'auto',
    marginTop: 'auto',
    paddingHorizontal: sizes.xl,
  },
});
