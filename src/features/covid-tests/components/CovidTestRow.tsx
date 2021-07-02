import { chevronRight, pending, tick } from '@assets';
import { RegularText } from '@covid/components/Text';
import { assessmentCoordinator } from '@covid/core/assessment/AssessmentCoordinator';
import { CovidTest } from '@covid/core/user/dto/CovidTestContracts';
import i18n from '@covid/locale/i18n';
import { colors } from '@theme';
import moment from 'moment';
import * as React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

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
        return i18n.t('covid-test-list.update');
    }
  };

  const getRowIcon = (result: string) => {
    return result === 'waiting' ? pending : tick;
  };

  const formatDateString = (dateString: string, format = 'MMM D, Y'): string => {
    return moment(dateString).format(format);
  };

  const formatTestDate = (test: CovidTest) => {
    if (test.date_taken_specific) {
      return formatDateString(test.date_taken_specific);
    }
    const startYear = new Date(test.date_taken_between_start).getFullYear();
    const endYear = new Date(test.date_taken_between_end).getFullYear();
    return `${formatDateString(
      test.date_taken_between_start,
      endYear > startYear ? 'MMM D Y' : 'MMM D',
    )} - ${formatDateString(test.date_taken_between_end)}`;
  };

  return (
    <TouchableOpacity onPress={() => assessmentCoordinator.goToAddEditTest(item)} style={styles.itemTouchable}>
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
  chevron: {
    height: 12,
    marginStart: 4,
    width: 12,
  },
  itemTouchable: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 40,
  },
  pendingText: {
    color: colors.secondary,
  },
  tick: {
    height: 16,
    marginEnd: 8,
    width: 16,
  },
});
