import { chevronRight, pending, tick } from '@assets';
import { Tag } from '@covid/components';
import { RegularText } from '@covid/components/Text';
import { assessmentCoordinator } from '@covid/core/assessment/AssessmentCoordinator';
import { TCovidTest } from '@covid/core/user/dto/CovidTestContracts';
import { isOmicronQuestionEnabled } from '@covid/features/covid-tests/questions';
import i18n from '@covid/locale/i18n';
import { sizes } from '@covid/themes';
import { colors } from '@theme';
import moment from 'moment';
import * as React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

type TProps = {
  item: TCovidTest;
  testID: string;
};

export const CovidTestRow: React.FC<TProps> = (props: TProps) => {
  const testResult = React.useMemo(() => {
    if (props.item.result) {
      return props.item.result;
    }
    if (props.item.anti_n) {
      return props.item.anti_n === 'positive' || props.item.anti_s === 'positive' ? 'positive' : props.item.anti_n;
    }
    return 'waiting';
  }, [props.item.result, props.item.anti_n, props.item.anti_s]);

  const formatTestResult = (result: string) => {
    switch (result) {
      case 'positive':
        return props.item.omicron_status === 'yes_suspected' || props.item.omicron_status === 'yes_confirmed'
          ? i18n.t('covid-test-list.positive-omicron')
          : i18n.t('covid-test-list.positive');
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

  const formatTestDate = (test: TCovidTest) => {
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

  const omicronQuestionEnabled = isOmicronQuestionEnabled(
    props.item.mechanism,
    props.item.is_rapid_test,
    props.item.result,
    new Date(props.item.date_taken_specific),
    new Date(props.item.date_taken_between_start),
  );

  return (
    <TouchableOpacity
      onPress={() => assessmentCoordinator.goToAddEditTest(props.item)}
      style={styles.item}
      testID={props.testID}
    >
      <Image source={getRowIcon(testResult)} style={styles.tick} />
      <RegularText style={testResult === 'waiting' && styles.pendingText}>{formatTestDate(props.item)}</RegularText>
      {omicronQuestionEnabled && !props.item.omicron_status ? (
        <Tag color={colors.accent} style={styles.marginLeft} text={i18n.t('covid-test-list.update')} />
      ) : null}
      <View style={styles.flex} />
      <RegularText style={testResult === 'waiting' && styles.pendingText}>{formatTestResult(testResult)}</RegularText>
      <Image source={chevronRight} style={styles.chevron} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  chevron: {
    height: 12,
    marginLeft: sizes.xxs,
    width: 12,
  },
  flex: {
    flex: 1,
  },
  item: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: sizes.s,
  },
  marginLeft: {
    marginLeft: sizes.s,
  },
  pendingText: {
    color: colors.secondary,
  },
  tick: {
    height: 16,
    marginRight: sizes.xs,
    width: 16,
  },
});
