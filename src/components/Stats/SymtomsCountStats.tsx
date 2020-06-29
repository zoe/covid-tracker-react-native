import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import moment from 'moment';
import I18n from 'i18n-js';

import i18n from '@covid/locale/i18n';
import { AreaStatsResponse } from '@covid/core/user/dto/UserAPIContracts';
import { ClickableText } from '@covid/components/Text';
import { colors } from '@theme';

import { PeopleWithSymptomsText } from './PeopleWithSymptomsText';

interface Props {
  areaStats: AreaStatsResponse | null;
  onPress: VoidFunction;
}

export const SymtomsCountStats: React.FC<Props> = ({ areaStats: area, onPress }) => {
  const date = moment();
  const formatNumber = (x: number | undefined) => I18n.toNumber(x ?? 0, { precision: 0 });
  const casePercentage = area?.population ? ((area.predicted_cases / area?.population) * 100).toFixed(1) : 0;

  return (
    <View style={styles.estimatedCaseContainer}>
      <View style={styles.estimatedCaseFirstRow}>
        <PeopleWithSymptomsText area={area?.area_name ?? ''} />
        <Text style={styles.estimatedCasesCount}>{formatNumber(area?.predicted_cases)}</Text>
      </View>
      <View style={styles.estimatedCaseSecondRow}>
        <View style={styles.estimatedCasesPercentage}>
          <Text style={styles.estimatedCasesPercentageText}>{casePercentage}%</Text>
        </View>
        <Text style={styles.estimatedCasesPopulation}>
          {i18n.t('thank-you.of-residents', { number: formatNumber(area?.population) })}
        </Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.estimatedCaseSecondRow}>
        <Text style={styles.estimate}>
          {i18n.t('thank-you.estimate-for')} {date.format('MMMM D, YYYY')}{' '}
          <ClickableText style={styles.learnMore} onPress={onPress}>
            {i18n.t('thank-you.learn-more')}
          </ClickableText>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  estimatedCaseContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    marginTop: 16,
  },

  estimatedCaseFirstRow: {},

  estimatedCaseSecondRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    marginVertical: 8,
  },

  estimatedCasesCount: {
    marginTop: 10,
    fontSize: 40,
    lineHeight: 48,
    color: colors.primary,
    fontWeight: '500',
    textAlign: 'center',
  },

  estimatedCasesPercentage: {
    backgroundColor: colors.pink,
    width: 48,
    height: 28,
    borderRadius: 5,
    justifyContent: 'center',
  },

  estimatedCasesPercentageText: {
    fontSize: 14,
    lineHeight: 20,
    color: 'white',
    alignSelf: 'center',
  },

  estimatedCasesPopulation: {
    marginTop: 4,
    marginLeft: 4,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '300',
    color: colors.primary,
  },

  estimate: {
    fontSize: 12,
    lineHeight: 16,
    color: colors.secondary,
  },

  learnMore: {
    fontSize: 12,
    lineHeight: 16,
  },

  divider: {
    height: 1,
    backgroundColor: colors.backgroundFour,
    marginVertical: 20,
  },
});
