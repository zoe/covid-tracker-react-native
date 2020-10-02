import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';
import { View } from 'native-base';
import moment from 'moment';

import { colors } from '@theme';
import Screen, { Header } from '@covid/components/Screen';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import { HeaderText, RegularText, Header3Text, SecondaryText, ClickableText } from '@covid/components/Text';
import i18n from '@covid/locale/i18n';

type Props = {
  navigation: StackNavigationProp<ScreenParamList, 'SchoolDashboard'>;
  route: RouteProp<ScreenParamList, 'SchoolDashboard'>;
};

export const SchoolDashboardScreen: React.FC<Props> = (props) => {
  const { school } = props.route.params;

  const infoBox = (
    statistic: string | number,
    description: string,
    onPress?: VoidFunction,
    singleLine: boolean = false,
    statColor: string = colors.primary
  ) => {
    return (
      <View style={styles.infoBox}>
        <RegularText style={[styles.statText, { color: statColor }]}>{statistic}</RegularText>
        <RegularText style={{ textAlign: 'center', paddingBottom: 8 }}>
          {!singleLine && (
            <RegularText>
              {i18n.t('school-networks.dashboard.students-with')}
              {'\n'}
            </RegularText>
          )}
          <RegularText style={{ fontWeight: '600' }}>{description}</RegularText>
        </RegularText>
        {onPress && (
          <ClickableText style={{ fontSize: 14 }} onPress={onPress}>
            {i18n.t('school-networks.dashboard.more-details')}
          </ClickableText>
        )}
      </View>
    );
  };

  const schoolConfirmedCases = school.groups
    .map((group) => group.confirmed_cases)
    .reduce((prev, curr) => prev + curr, 0);
  const schoolReportedSymptoms = school.groups
    .map((group) => group.daily_reported_symptoms)
    .reduce((prev, curr) => prev + curr, 0);
  const schoolRecoveredCases = school.groups
    .map((group) => group.recovered_cases)
    .reduce((prev, curr) => prev + curr, 0);
  const schoolTotalPercentage =
    school.groups.map((g) => g.daily_assessments).reduce((prev, curr) => prev + curr, 0) /
    school.groups.map((g) => g.max_size).reduce((prev, curr) => prev + curr, 0);
  const schoolUpdatedAt = new Date(
    school.groups
      .map((group) => group.report_updated_at)
      .reduce((prev, curr) => {
        return prev > curr ? prev : curr;
      })
  );

  return (
    <View style={styles.container}>
      <Screen showBackButton navigation={props.navigation} style={styles.container}>
        <View style={styles.container}>
          <Header>
            <HeaderText style={styles.header}>
              <HeaderText>{school.name + ' '}</HeaderText>
              <HeaderText style={{ fontWeight: 'bold' }}>{i18n.t('school-networks.dashboard.title')}</HeaderText>
            </HeaderText>
          </Header>

          <View style={styles.card}>
            <Header3Text style={styles.cardTitle}>{i18n.t('school-networks.dashboard.at-the-school')}</Header3Text>
            <SecondaryText style={{ marginBottom: 16 }}>
              {i18n.t('school-networks.dashboard.updated-on') + ' ' + moment(schoolUpdatedAt).format('MMM D, LT')}
            </SecondaryText>
            <View style={styles.gridRow}>
              {infoBox(
                schoolConfirmedCases,
                i18n.t('school-networks.dashboard.confirmed'),
                undefined,
                false,
                schoolConfirmedCases > 0 ? colors.feedbackBad : colors.primary
              )}
              {infoBox(
                schoolReportedSymptoms,
                i18n.t('school-networks.dashboard.reported'),
                undefined,
                false,
                schoolReportedSymptoms > 0 ? colors.feedbackBad : colors.primary
              )}
            </View>
            <View style={styles.gridRow}>
              {infoBox(schoolRecoveredCases, i18n.t('school-networks.dashboard.recovered'))}
              {infoBox(
                (isFinite(schoolTotalPercentage) ? schoolTotalPercentage.toFixed(0) : '0') + '%',
                i18n.t('school-networks.dashboard.total'),
                undefined,
                true
              )}
            </View>
          </View>

          {school.groups.map((group) => {
            return (
              <View style={styles.card} key={group.name}>
                <Header3Text style={styles.cardTitle}>{group.name}</Header3Text>
                <SecondaryText style={{ marginBottom: 16 }}>
                  {i18n.t('school-networks.dashboard.updated-on') +
                    ' ' +
                    moment(group.report_updated_at).format('MMM D, LT')}
                </SecondaryText>

                <View style={styles.gridRow}>
                  {infoBox(
                    group.confirmed_cases,
                    i18n.t('school-networks.dashboard.confirmed'),
                    undefined,
                    false,
                    group.confirmed_cases > 0 ? colors.feedbackBad : colors.primary
                  )}
                  {infoBox(
                    group.daily_reported_symptoms,
                    i18n.t('school-networks.dashboard.reported'),
                    undefined,
                    false,
                    group.daily_reported_symptoms > 0 ? colors.feedbackBad : colors.primary
                  )}
                </View>
                <View style={styles.gridRow}>
                  {infoBox(group.recovered_cases, i18n.t('school-networks.dashboard.recovered'))}
                  {infoBox(group.daily_reported_percentage, i18n.t('school-networks.dashboard.total'), undefined, true)}
                </View>
              </View>
            );
          })}

          <SecondaryText style={styles.disclaimer}>
            <SecondaryText>{i18n.t('school-networks.dashboard.disclaimer')}</SecondaryText>
            <SecondaryText>
              <ClickableText onPress={() => props.navigation.navigate('SchoolIntro')}>
                {i18n.t('school-networks.dashboard.faq')}
              </ClickableText>
            </SecondaryText>
            <SecondaryText>{i18n.t('school-networks.dashboard.disclaimer2')}</SecondaryText>
          </SecondaryText>
        </View>
      </Screen>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
  },
  card: {
    backgroundColor: colors.backgroundPrimary,
    borderRadius: 10,
    marginHorizontal: 32,
    marginVertical: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },
  header: {
    marginHorizontal: 16,
  },
  infoBox: {
    width: '50%',
    paddingVertical: 16,
    padding: 8,
    alignItems: 'center',
  },
  statText: {
    padding: 8,
    fontSize: 32,
  },
  gridRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  disclaimer: {
    marginHorizontal: 32,
  },
  cardTitle: {
    marginHorizontal: 16,
    textAlign: 'center',
    marginBottom: 8,
    fontWeight: '500',
  },
});
