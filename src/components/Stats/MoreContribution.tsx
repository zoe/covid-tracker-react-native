import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, View, Text } from 'react-native';

import { AreaStatsResponse } from '@covid/core/user/dto/UserAPIContracts';
import { colors } from '@theme';
import i18n from '@covid/locale/i18n';

import { ClickableText } from '../Text';
import { shareAppWithAreaStats } from '../Cards/ShareAppViral';

import { PeopleWithSymptomsText } from './PeopleWithSymptomsText';

interface IProps {
  areaStats: AreaStatsResponse | null;
}

export function MoreContribution({ areaStats: area }: IProps) {
  return (
    <View style={styles.estimatedCaseContainer}>
      <View style={styles.estimatedCaseFirstRow}>
        <PeopleWithSymptomsText area={area?.area_name ?? ''} />
      </View>
      <View style={styles.blurred}>
        <MaterialIcons name="lock-outline" size={32} style={styles.lockIcon} />
      </View>
      <View>
        <Text style={styles.almostThere}>
          {i18n.t('thank-you.almost-there')}{' '}
          <Text style={styles.almostThereCount}>
            {i18n.t('thank-you.more-people', { number: area?.number_of_missing_contributors })}
          </Text>{' '}
          {i18n.t('thank-you.from-your-country')}
        </Text>

        <ClickableText onPress={() => shareAppWithAreaStats(area)} style={styles.pleaseShare}>
          {i18n.t('thank-you.please-share')}
        </ClickableText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  estimatedCaseContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    marginTop: 16,
  },

  estimatedCaseFirstRow: {},

  blurred: {
    flex: 1,
    height: 120,
    color: 'lightgray',
    justifyContent: 'center',
  },

  almostThere: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    color: colors.primary,
  },

  almostThereCount: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'SofiaPro-Bold',
    color: colors.primary,
  },

  pleaseShare: {
    marginTop: 12,
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },

  lockIcon: {
    color: colors.backgroundFive,
    borderWidth: 1,
    borderRadius: 22,
    padding: 5,
    borderColor: colors.backgroundFive,
    alignSelf: 'center',
    textAlign: 'center',
  },
});
