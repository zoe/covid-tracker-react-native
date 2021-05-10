import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import moment from 'moment';

import AssessmentCoordinator from '@covid/core/assessment/AssessmentCoordinator';
import { RegularText } from '@covid/components/Text';
import { chevronRight, pending, tick } from '@assets';
import { CovidTest, CovidTestType } from '@covid/core/user/dto/CovidTestContracts';
import { colors } from '@theme';
import i18n from '@covid/locale/i18n';
import { CovidTestMechanismOptions } from '@covid/core/user/dto/UserAPIContracts';

type Props = {
  item: CovidTest;
  type: CovidTestType;
};

export const CovidTestRow: React.FC<Props> = ({ type, item }) => {
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

  const isNHSTest = type === CovidTestType.NHSStudy;

  const getRowIcon = (result: string) => {
    return result === 'waiting' ? pending : tick;
  };

  const formatDateString = (dateString: string, format = 'MMM D, Y'): string => {
    return moment(dateString).format(format);
  };

  const formatTestDate = (test: CovidTest) => {
    if (test.date_taken_specific) {
      return formatDateString(test.date_taken_specific);
    } else {
      const startYear = new Date(test.date_taken_between_start).getFullYear();
      const endYear = new Date(test.date_taken_between_end).getFullYear();
      return `${formatDateString(
        test.date_taken_between_start,
        endYear > startYear ? 'MMM D Y' : 'MMM D'
      )} - ${formatDateString(test.date_taken_between_end)}`;
    }
  };

  const formatTestMechanism = (mechanism: string) => {
    switch (mechanism) {
      case CovidTestMechanismOptions.NOSE_OR_THROAT_SWAB:
        return i18n.t('nhs-test-detail.mechanism-swab');
      case CovidTestMechanismOptions.SPIT_TUBE:
        return i18n.t('nhs-test-detail.mechanism-saliva');
      default:
        return '';
    }
  };

  return (
    <TouchableOpacity style={styles.itemTouchable} onPress={() => AssessmentCoordinator.goToAddEditTest(type, item)}>
      <Image source={getRowIcon(item.result)} style={styles.tick} />
      <RegularText style={[item.result === 'waiting' && styles.pendingText]}>{formatTestDate(item)}</RegularText>
      {isNHSTest ? (
        <RegularText style={[item.result === 'waiting' && styles.pendingText]}>
          {' - '}
          {formatTestMechanism(item.mechanism)}
        </RegularText>
      ) : null}
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
