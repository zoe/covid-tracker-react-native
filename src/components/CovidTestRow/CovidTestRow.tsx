import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import moment from 'moment';

import AssessmentCoordinator from '@covid/core/assessment/AssessmentCoordinator';
import { RegularText } from '@covid/components/Text';
import { chevronRight, pending, tick } from '@assets';
import { CovidTest } from '@covid/core/user/dto/CovidTestContracts';
import { colors } from '@theme';
import i18n from '@covid/locale/i18n';

type Props = {
  item: CovidTest;
};

export const CovidTestRow: React.FC<Props> = ({ item }) => {
  const formatTestResult = (result: string) => {
    switch (result) {
      case 'positive':
        return i18n.t('covid-test-list.positive');
      case 'negative':
        return i18n.t('covid-test-list.negative');
      case 'failed':
        return i18n.t('covid-test-list.failed');
      default:
        return i18n.t('covid-test-list.pending');
    }
  };

  const getRowIcon = (result: string) => {
    return result === 'waiting' ? pending : tick;
  };

  const formatDateString = (dateString: string): string => {
    return moment(dateString).format('MMMM D');
  };

  const formatTestDate = (test: CovidTest) => {
    if (test.date_taken_specific) {
      return formatDateString(test.date_taken_specific);
    } else {
      return `${formatDateString(test.date_taken_between_start)} - ${formatDateString(test.date_taken_between_end)}`;
    }
  };

  return (
    <TouchableOpacity style={styles.itemTouchable} onPress={() => AssessmentCoordinator.goToAddEditTest(item)}>
      <Image source={getRowIcon(item.result)} style={styles.tick} />
      <RegularText style={[item.result === 'waiting' && styles.pendingText]}>{formatTestDate(item)}</RegularText>
      <View style={{ flex: 1 }} />
      <RegularText style={[item.result === 'waiting' && styles.pendingText]}>
        {formatTestResult(item.result)}
      </RegularText>
      <Image source={chevronRight} style={styles.chevron} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemTouchable: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
  },
  tick: {
    marginEnd: 8,
    height: 16,
    width: 16,
  },
  chevron: {
    marginStart: 4,
    height: 12,
    width: 12,
  },
  pendingText: {
    color: colors.secondary,
  },
});
