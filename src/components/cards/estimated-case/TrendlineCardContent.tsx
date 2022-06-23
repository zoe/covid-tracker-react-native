import ChevronRight from '@assets/icons/ChevronRight';
import { TrendlineChart } from '@covid/components/charts/TrendlineChart';
import { Text } from '@covid/components/typography';
import i18n from '@covid/locale/i18n';
import { colors } from '@tracer/branding/colors';
import ShareButton from '@tracer/components/molecules/ShareButton';
import * as React from 'react';
import { TouchableOpacity, View } from 'react-native';

import { DeltaTag } from './DeltaTag';

interface ITrendlineCardProps {
  onPress?: VoidFunction;
  onPressShare?: VoidFunction;
  localTrendline?: any;
  isSharing?: boolean;
  styles: any;
  shareBtnColor: string;
}

export default function TrendlineCardContent({
  localTrendline,
  isSharing,
  styles,
  shareBtnColor,
  onPress,
  onPressShare,
}: ITrendlineCardProps) {
  return (
    <>
      <TouchableOpacity
        activeOpacity={isSharing ? 1 : undefined}
        onPress={isSharing ? undefined : onPress}
        style={styles.touchableChart}
      >
        <View pointerEvents="none">
          <TrendlineChart height={isSharing ? 150 : 200} />
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={isSharing ? 1 : undefined}
        onPress={isSharing ? undefined : onPress}
        style={[styles.touchableText, isSharing ? styles.minimisePadding : null]}
      >
        {localTrendline?.today || localTrendline?.today === 0 ? (
          <Text style={styles.marginRight} textClass={isSharing ? 'h1' : 'h0'}>
            {localTrendline?.today}
          </Text>
        ) : null}

        <Text inverted colorPalette="uiDark" colorShade="dark" style={styles.flex} textClass="pSmallLight">
          {i18n.t('trendline.active-cases-in-your-area')}
        </Text>

        <ChevronRight backgroundColor="white" chveronColor={colors.primary} height={32} width={32} />
      </TouchableOpacity>

      {localTrendline?.delta ? (
        <DeltaTag change={localTrendline.delta} style={!isSharing ? styles.alignCenter : styles.deltaTag} />
      ) : null}

      <Text
        inverted
        colorPalette="uiDark"
        colorShade="dark"
        style={[styles.flex, isSharing ? styles.minimiseMargin : styles.marginTop]}
        textClass="pSmallLight"
      >
        {i18n.t('trendline.data-timeframe')}
      </Text>

      {!isSharing ? (
        <ShareButton
          label={i18n.t('dashboard.trendline-card.share-cta')}
          onPress={onPressShare}
          shareIconStrokeColor={shareBtnColor}
          textStyle={{ color: shareBtnColor }}
        />
      ) : null}
    </>
  );
}
