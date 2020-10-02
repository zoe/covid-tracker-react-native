import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { Header3Text, RegularText, RegularBoldText, MutedText, BrandedButton } from '@covid/components/Text';
import { colors, fontStyles } from '@theme';
import Analytics, { events } from '@covid/core/Analytics';
import { WebView } from '@covid/components/WebView';
import { isGBCountry } from '@covid/core/localisation/LocalisationService';
import i18n from '@covid/locale/i18n';
import { DeltaTag } from './DeltaTag';

interface Props {
  lad?: string;
  ctaOnPress: VoidFunction;
}

const html = require('@assets/charts/trendline-overview.html');

export const TrendlineCard: React.FC<Props> = ({
  lad,
  ctaOnPress,
}) => {
  const onPress = () => {
    Analytics.track(events.ESTIMATED_CASES_METRICS_MORE_DETAILS_CLICKED);
    ctaOnPress();
  };

  const ladName = "Harringray"
  const postiveCountLabel = `Total number of people with COVID in `
  const metric = 797

  return (
    <View style={styles.root}>
      {isGBCountry() && (
        <View style={styles.chartContainer}>
          <WebView originWhitelist={['*']} source={html} style={styles.webview} />
        </View>
      )}

      <RegularText style={styles.primaryLabel}>
        {postiveCountLabel}
        <RegularBoldText>{ladName}</RegularBoldText>
      </RegularText>

      <Header3Text style={styles.metric}>{metric}</Header3Text>

      <View style={styles.deltaTag}>
        <DeltaTag change={797} from="last week"/>
      </View>

      <View>
        <BrandedButton style={styles.detailsButton} onPress={onPress}>
          <Text style={[fontStyles.bodyLight, styles.detailsButtonLabel]}>{i18n.t('dashboard.trendline-card.cta')}</Text>
        </BrandedButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 16,
    marginHorizontal: 32,
    // marginVertical: 16,
    paddingVertical: 32,
  },

  chartContainer: {
    width: '100%',
    height: 180,
    paddingHorizontal: 16,
  },

  webview: {
    height: '100%',
    width: '100%',
  },

  primaryLabel: {
    fontWeight: '300',
    color: colors.textDark,
    paddingHorizontal: 56,
    marginTop: 12,
    textAlign: 'center'
  },

  secondaryLabel: {
    marginBottom: 20,
    fontSize: 14,
  },

  deltaTag: {
    marginTop: 8,
    marginBottom: 20
  },

  detailsButton: {
    paddingHorizontal: 52,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.purple,
  },

  metric: {
    fontSize: 32,
    fontWeight: '300',
    lineHeight: 48,
    paddingTop: 8,
    color: colors.textDark,
  },

  divider: {
    width: 1,
    backgroundColor: colors.backgroundFour,
  },

  detailsButtonLabel: {
    color: colors.purple,
    fontWeight: '300',
    fontSize: 14,
  },
});
