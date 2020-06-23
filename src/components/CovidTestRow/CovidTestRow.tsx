import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import key from 'weak-key';
import moment from 'moment';

import AssessmentCoordinator from '@covid/core/assessment/AssessmentCoordinator';
import { RegularText } from '@covid/components/Text';
import { chevronRight, pending, tick } from '@assets';
import { CovidTest } from '@covid/core/user/dto/CovidTestContracts';
import { colors } from '@theme';
import i18n, { getDayName, getMonthName } from '@covid/locale/i18n';

type Props = {
  item: CovidTest;
};

export const CovidTestRow: React.FC<Props> = ({ item }) => {
  const resultString = (result: string) => {
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

  const icon = (result: string) => {
    if (result === 'waiting') {
      return pending;
    } else {
      return tick;
    }
  };

  const dateString = (test: CovidTest) => {
    if (test.date_taken_specific) {
      const date = moment(test.date_taken_specific).toDate();
      return `${getMonthName(date)} ${date.getDate()} (${getDayName(date)})`;
    } else {
      const stateDate = moment(test.date_taken_between_start).toDate();
      const endDate = moment(test.date_taken_between_end).toDate();
      return `${getMonthName(stateDate)} ${stateDate.getDate()} - ${getMonthName(endDate)} ${endDate.getDate()}`;
    }
  };

  return (
    <TouchableOpacity
      key={key(item)}
      style={styles.itemTouchable}
      onPress={() => AssessmentCoordinator.goToAddEditTest(item)}>
      <Image source={icon(item.result)} style={styles.tick} />
      <RegularText style={item.result === 'waiting' ? styles.pendingText : []}>{dateString(item)}</RegularText>
      <View style={{ flex: 1 }} />
      <RegularText style={item.result === 'waiting' ? styles.pendingText : []}>{resultString(item.result)}</RegularText>
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
