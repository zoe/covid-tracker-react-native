import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';
import { View } from 'native-base';

import { colors } from '@theme';
import Screen, { Header } from '@covid/components/Screen';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import { HeaderText, RegularText, Header3Text, SecondaryText } from '@covid/components/Text';
import { Coordinator } from '@covid/core/Coordinator';
import i18n from '@covid/locale/i18n';
import schoolNetworkCoordinator from '@covid/features/school-network/SchoolNetworkCoordinator';

type Props = {
  navigation: StackNavigationProp<ScreenParamList, 'SchoolDashboard'>;
  route: RouteProp<ScreenParamList, 'SchoolDashboard'>;
};

export const SchoolDashboardScreen: React.FC<Props> = (props) => {
  const { school } = props.route.params;

  const infoBox = (statistic: string | number, description: string, onPress?: VoidFunction) => {
    return (
      <View style={styles.infoBox}>
        <RegularText style={styles.statText}>{statistic}</RegularText>
        <RegularText style={{ textAlign: 'center', paddingBottom: 8 }}>{description}</RegularText>
        {onPress && <RegularText style={{ color: colors.purple, fontSize: 14 }}>More details</RegularText>}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Screen showBackButton navigation={props.navigation} style={styles.container}>
        <View style={styles.container}>
          <Header>
            <HeaderText style={styles.header}>
              {school.name + ' ' + i18n.t('school-networks.dashboard.title')}
            </HeaderText>
          </Header>

          <View style={styles.card}>
            <Header3Text style={styles.cardTitle}>{i18n.t('school-networks.dashboard.at-the-school')}</Header3Text>
            <SecondaryText style={{ marginBottom: 16 }}>
              {i18n.t('school-networks.dashboard.updated-on') +
                ' ' +
                new Date(
                  school.groups
                    .map((group) => group.report_updated_at)
                    .reduce((prev, curr) => {
                      return prev > curr ? prev : curr;
                    })
                ).toLocaleDateString()}
            </SecondaryText>
            <View style={styles.gridRow}>
              {infoBox(
                school.groups.map((group) => group.confirmed_cases).reduce((prev, curr) => prev + curr, 0),
                i18n.t('school-networks.dashboard.confirmed'),
                () => {}
              )}
              {infoBox(
                school.groups.map((group) => group.cases).reduce((prev, curr) => prev + curr, 0),
                i18n.t('school-networks.dashboard.reported'),
                () => {}
              )}
            </View>
            <View style={styles.gridRow}>
              {infoBox(
                school.groups.map((group) => group.recovered_cases).reduce((prev, curr) => prev + curr, 0),
                i18n.t('school-networks.dashboard.recovered')
              )}
              {infoBox(
                (school.size / school.groups.map((g) => g.max_size).reduce((prev, curr) => prev + curr, 0)).toFixed(0) +
                  '%',
                i18n.t('school-networks.dashboard.total')
              )}
            </View>
          </View>

          {school.groups.map((group) => {
            return (
              <View style={styles.card}>
                <Header3Text style={styles.cardTitle}>{group.name}</Header3Text>
                <SecondaryText style={{ marginBottom: 16 }}>
                  {i18n.t('school-networks.dashboard.updated-on') +
                    ' ' +
                    new Date(group.report_updated_at).toLocaleDateString()}
                </SecondaryText>
                <View style={styles.gridRow}>
                  {infoBox(group.confirmed_cases, i18n.t('school-networks.dashboard.confirmed'), () => {})}
                  {infoBox(group.cases, i18n.t('school-networks.dashboard.reported'), () => {})}
                </View>
                <View style={styles.gridRow}>
                  {infoBox(group.recovered_cases, i18n.t('school-networks.dashboard.recovered'))}
                  {infoBox((group.size / group.max_size).toFixed(0) + '%', i18n.t('school-networks.dashboard.total'))}
                </View>
              </View>
            );
          })}

          <SecondaryText style={styles.disclaimer}>{i18n.t('school-networks.dashboard.disclaimer')}</SecondaryText>
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
  },
});
