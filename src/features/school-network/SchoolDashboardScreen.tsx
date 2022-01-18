import { Screen } from '@covid/components/Screen';
import { ClickableText, Header3Text, HeaderText, RegularText, SecondaryText } from '@covid/components/Text';
import { ISubscribedSchoolStats } from '@covid/core/schools/Schools.dto';
import i18n from '@covid/locale/i18n';
import { TScreenParamList } from '@covid/routes/types';
import { sizes } from '@covid/themes';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors } from '@theme';
import moment from 'moment';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';

type TProps = {
  navigation: StackNavigationProp<TScreenParamList, 'SchoolDashboard'>;
  route: RouteProp<TScreenParamList, 'SchoolDashboard'>;
};

export const SchoolDashboardScreen: React.FC<TProps> = (props) => {
  const school = props.route.params?.school as ISubscribedSchoolStats | undefined;

  const infoBox = (
    statistic: string | number,
    description: string,
    onPress?: VoidFunction,
    singleLine: boolean = false,
    statColor: string = colors.primary,
  ) => {
    return (
      <View style={styles.infoBox}>
        <RegularText style={[styles.statText, { color: statColor }]}>{statistic}</RegularText>
        <RegularText style={{ paddingBottom: sizes.xs, textAlign: 'center' }}>
          {!singleLine ? (
            <RegularText>
              {i18n.t('school-networks.dashboard.students-with')}
              {'\n'}
            </RegularText>
          ) : null}
          <RegularText style={{ fontFamily: 'SofiaPro-SemiBold' }}>{description}</RegularText>
        </RegularText>
        {onPress ? (
          <ClickableText onPress={onPress} style={{ fontSize: 14 }}>
            {i18n.t('school-networks.dashboard.more-details')}
          </ClickableText>
        ) : null}
      </View>
    );
  };

  let schoolConfirmedCases = 0;
  let schoolReportedSymptoms = 0;
  let schoolRecoveredCases = 0;
  let schoolTotalPercentage = 0;
  let schoolUpdatedAt = new Date();

  if (school?.groups.length) {
    schoolConfirmedCases = school.groups.map((group) => group.confirmed_cases).reduce((prev, curr) => prev + curr, 0);
    schoolReportedSymptoms = school.groups
      .map((group) => group.daily_reported_symptoms)
      .reduce((prev, curr) => prev + curr, 0);
    schoolRecoveredCases = school.groups.map((group) => group.recovered_cases).reduce((prev, curr) => prev + curr, 0);
    schoolTotalPercentage =
      school.groups.map((g) => g.daily_assessments).reduce((prev, curr) => prev + curr, 0) /
      school.groups.map((g) => g.max_size).reduce((prev, curr) => prev + curr, 0);
    schoolUpdatedAt = new Date(
      school.groups
        .map((group) => group.report_updated_at)
        .reduce((prev, curr) => {
          return prev > curr ? prev : curr;
        }),
    );
  }

  return (
    <Screen backgroundColor={colors.backgroundSecondary} testID="school-dashboard-screen">
      <HeaderText>
        {school?.name ? `${school?.name} ` : ''}
        {i18n.t('school-networks.dashboard.title')}
      </HeaderText>

      <View style={styles.card}>
        <Header3Text style={styles.cardTitle}>{i18n.t('school-networks.dashboard.at-the-school')}</Header3Text>
        <SecondaryText style={{ marginBottom: sizes.m }}>
          {`${i18n.t('school-networks.dashboard.updated-on')} ${moment(schoolUpdatedAt).format('MMM D, LT')}`}
        </SecondaryText>
        <View style={styles.gridRow}>
          {infoBox(
            schoolConfirmedCases,
            i18n.t('school-networks.dashboard.confirmed'),
            undefined,
            false,
            schoolConfirmedCases > 0 ? colors.feedbackBad : colors.primary,
          )}
          {infoBox(
            schoolReportedSymptoms,
            i18n.t('school-networks.dashboard.reported'),
            undefined,
            false,
            schoolReportedSymptoms > 0 ? colors.feedbackBad : colors.primary,
          )}
        </View>
        <View style={styles.gridRow}>
          {infoBox(schoolRecoveredCases, i18n.t('school-networks.dashboard.recovered'))}
          {infoBox(
            `${Number.isFinite(schoolTotalPercentage) ? schoolTotalPercentage.toFixed(0) : '0'}%`,
            i18n.t('school-networks.dashboard.total'),
            undefined,
            true,
          )}
        </View>
      </View>

      {(school?.groups || []).map((group) => {
        return (
          <View key={group.name} style={styles.card}>
            <Header3Text style={styles.cardTitle}>{group.name}</Header3Text>
            <SecondaryText style={{ marginBottom: sizes.m }}>
              {`${i18n.t('school-networks.dashboard.updated-on')} ${moment(group.report_updated_at).format(
                'MMM D, LT',
              )}`}
            </SecondaryText>

            <View style={styles.gridRow}>
              {infoBox(
                group.confirmed_cases,
                i18n.t('school-networks.dashboard.confirmed'),
                undefined,
                false,
                group.confirmed_cases > 0 ? colors.feedbackBad : colors.primary,
              )}
              {infoBox(
                group.daily_reported_symptoms,
                i18n.t('school-networks.dashboard.reported'),
                undefined,
                false,
                group.daily_reported_symptoms > 0 ? colors.feedbackBad : colors.primary,
              )}
            </View>
            <View style={styles.gridRow}>
              {infoBox(group.recovered_cases, i18n.t('school-networks.dashboard.recovered'))}
              {infoBox(group.daily_reported_percentage, i18n.t('school-networks.dashboard.total'), undefined, true)}
            </View>
          </View>
        );
      })}

      <SecondaryText>
        {i18n.t('school-networks.dashboard.disclaimer')}
        <ClickableText onPress={() => props.navigation.navigate('SchoolIntro')}>
          {i18n.t('school-networks.dashboard.faq')}
        </ClickableText>
        {i18n.t('school-networks.dashboard.disclaimer2')}
      </SecondaryText>
    </Screen>
  );
};

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    backgroundColor: colors.backgroundPrimary,
    borderRadius: sizes.s,
    marginVertical: sizes.m,
    paddingVertical: sizes.m,
  },
  cardTitle: {
    marginBottom: sizes.xs,
    marginHorizontal: sizes.m,
    textAlign: 'center',
  },
  gridRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  infoBox: {
    alignItems: 'center',
    padding: sizes.xs,
    paddingVertical: sizes.m,
    width: '50%',
  },
  statText: {
    fontSize: 32,
    padding: sizes.xs,
  },
});
