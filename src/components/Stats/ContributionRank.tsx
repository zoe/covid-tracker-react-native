import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import I18n from 'i18n-js';

import i18n from '@covid/locale/i18n';
import { AreaStatsResponse } from '@covid/core/user/dto/UserAPIContracts';
import { RegularText, RegularBoldText } from '@covid/components/Text';
import { colors } from '@theme';

interface Props {
  areaStats: AreaStatsResponse | null;
}

export const ContributionRank: React.FC<Props> = ({ areaStats: area }) => {
  const formatNumber = (x: number | undefined) => I18n.toNumber(x ?? 0, { precision: 0 });

  // todo: different text if no change?
  const sign = area?.rank_delta ?? 0 > 0 ? '+' : '-'; // can't find a one liner to format numbers in TS. Am I stupid?

  return (
    <View>
      <RegularText style={styles.countyRank}>
        <RegularBoldText>{area?.area_name}</RegularBoldText>
        {i18n.t('thank-you.contribution-rank')}
      </RegularText>
      <Text style={styles.dailyDelta}>
        {sign}
        {area?.rank_delta} {i18n.t('thank-you.places-since-yesterday')}
      </Text>

      <Text style={styles.position}>
        <Text style={styles.positionBold}>{formatNumber(area?.rank)}</Text> {i18n.t('thank-you.out-of')}{' '}
        <Text style={styles.positionBold}>{formatNumber(area?.number_of_areas)}</Text> {i18n.t('thank-you.counties')}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  countyRank: {
    marginTop: 40,
    color: colors.secondary,
    textAlign: 'center',
  },

  dailyDelta: {
    marginTop: 4,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '300',
    color: colors.secondary,
    textAlign: 'center',
  },

  position: {
    marginTop: 16,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '300',
    color: colors.secondary,
    textAlign: 'center',
  },

  positionBold: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '500',
    color: colors.primary,
  },
});
