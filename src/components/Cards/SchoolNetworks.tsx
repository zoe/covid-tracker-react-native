import React from 'react';
import { StyleSheet, View } from 'react-native';

import i18n from '@covid/locale/i18n';
import { CaptionText, Header0Text, Header3Text, RegularText } from '@covid/components/Text';
import { colors } from '@theme';

export type School = {
  id: string;
  name: string;
  cases: number | null;
  groups: SchoolGroup[];
};

export type SchoolGroup = {
  id: string;
  name: string;
  cases: number | null;
};

type Props = {
  networks: School[];
};

export const SchoolNetworks: React.FC<Props> = (props) => {
  const { networks } = props;

  const casesView = (name: string, cases: number | null) => {
    return (
      <View style={styles.groupView}>
        <RegularText>{name}</RegularText>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {cases !== null && (
            <View style={[styles.circle, { backgroundColor: cases > 0 ? colors.feedbackBad : colors.feedbackGood }]} />
          )}
          <CaptionText>
            {cases === null
              ? i18n.t('school-networks.awaiting-members')
              : cases === 0
              ? i18n.t('school-networks.no-cases')
              : cases + ' ' + i18n.t('school-networks.confirmed-cases')}
          </CaptionText>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header0Text style={styles.headerText}>{i18n.t('school-networks.title')}</Header0Text>
      {networks.map((school, index) => {
        return (
          <>
            <Header3Text style={styles.schoolTitle}>{school.name}</Header3Text>
            {casesView(i18n.t('school-networks.whole-school'), school.cases)}
            {school.groups.map((group, index) => {
              return casesView(group.name, group.cases);
            })}
            {index !== networks.length - 1 && <View style={styles.lineStyle} />}
          </>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 10,
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  schoolTitle: {
    paddingVertical: 16,
  },
  headerText: {
    fontSize: 24,
    textAlign: 'center',
  },
  circle: {
    width: 12,
    height: 12,
    marginEnd: 8,
    borderRadius: 12 / 2,
  },
  groupView: {
    paddingVertical: 12,
  },
  lineStyle: {
    margin: 12,
    borderBottomColor: colors.tertiary,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
