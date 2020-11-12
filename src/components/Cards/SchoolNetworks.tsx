import React from 'react';
import { StyleSheet, View, StyleProp, ViewStyle, TouchableOpacity } from 'react-native';

import i18n from '@covid/locale/i18n';
import { Header0Text, Header3Text, RegularText, RegularBoldText, HeaderText } from '@covid/components/Text';
import { colors } from '@theme';
import { SubscribedSchoolStats, SubscribedSchoolGroupStats } from '@covid/core/schools/Schools.dto';
import { ArrayDistinctBy } from '@covid/utils/array';
import schoolNetworkCoordinator from '@covid/features/school-network/SchoolNetworkCoordinator';

type Props = {
  schoolGroups: SubscribedSchoolGroupStats[];
};

enum SchoolGroupStatus {
  active = 'active',
  inactive = 'inactive',
}

enum SchoolGroupUIState {
  noCases,
  notEnoughData,
  confirmed,
  inactive,
  unknown,
}

export const SchoolNetworks: React.FC<Props> = (props) => {
  const data: SubscribedSchoolStats[] = TransformResponseToUIData(props.schoolGroups);

  const getStatus = (status: string | SchoolGroupStatus, cases?: number | null): SchoolGroupUIState => {
    switch (status) {
      case SchoolGroupStatus.active:
        if (cases === 0) {
          return SchoolGroupUIState.noCases;
        } else if (!cases) {
          return SchoolGroupUIState.notEnoughData;
        } else {
          return SchoolGroupUIState.confirmed;
        }
        break;
      case SchoolGroupStatus.inactive:
        return SchoolGroupUIState.inactive;
      default:
        return SchoolGroupUIState.unknown;
    }
  };

  const getStatusLabel = (state: SchoolGroupUIState, cases?: number | null): string => {
    switch (state) {
      case SchoolGroupUIState.noCases:
        return i18n.t('school-networks.no-cases');
      case SchoolGroupUIState.notEnoughData:
        return i18n.t('school-networks.awaiting-members');
      case SchoolGroupUIState.confirmed:
        return cases! + ' ' + i18n.t('school-networks.confirmed-cases');
      case SchoolGroupUIState.inactive:
        return i18n.t('school-networks.awaiting-members');
      case SchoolGroupUIState.unknown:
        return 'Unknown';
      default:
        return '';
    }
  };

  const getStatusIndicator = (state: SchoolGroupUIState): StyleProp<ViewStyle>[] => {
    let indicator = colors.feedbackBad;

    switch (state) {
      case SchoolGroupUIState.noCases:
        indicator = colors.feedbackExcellent;
        break;
      case SchoolGroupUIState.notEnoughData:
        indicator = colors.feedbackPoor;
        break;
      case SchoolGroupUIState.inactive:
        indicator = colors.feedbackPoor;
        break;
      case SchoolGroupUIState.confirmed:
        indicator = colors.feedbackBad;
        break;
      case SchoolGroupUIState.unknown:
        indicator = colors.feedbackBad;
        break;
      default:
        break;
    }
    return [styles.circle, { backgroundColor: indicator }];
  };

  const getGroupSizeLabelText = (size: number | null | undefined) => {
    if (size && size === 1) {
      return i18n.t('school-networks.child-being-reported-for');
    } else {
      return i18n.t('school-networks.children-being-reported-for');
    }
  };

  const casesView = (group: SubscribedSchoolGroupStats, isLastItem: boolean) => {
    const status = getStatus(group.status, group.cases);
    return (
      <View key={group.id}>
        {!isLastItem && <View style={styles.lineStyle} />}
        <View style={styles.groupView}>
          <Header3Text style={styles.groupTitle}>{group.name}</Header3Text>
          <RegularText>
            <RegularBoldText>{group.size + ' '}</RegularBoldText>
            <RegularText>{getGroupSizeLabelText(group.size)}</RegularText>
          </RegularText>
          <View style={{ flexDirection: 'row', alignItems: 'center' }} />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header0Text style={styles.headerText}>{i18n.t('school-networks.title')}</Header0Text>
      {data.map((school, index) => {
        return (
          <TouchableOpacity
            key={school.id}
            onPress={() => {
              // Disabled until school leaders sign off
              // schoolNetworkCoordinator.goToSchoolDashboard(school);
            }}>
            <RegularText style={styles.schoolTitle}>{school.name}</RegularText>
            <RegularText style={styles.groupTitle}>{i18n.t('school-networks.dashboard.at-the-school')}</RegularText>
            <RegularText>
              <RegularBoldText>{school.size + ' '}</RegularBoldText>
              <RegularText>{getGroupSizeLabelText(school.size)}</RegularText>
            </RegularText>
            {ArrayDistinctBy(school.groups, (group) => {
              return group.id;
            }).map((group, index) => {
              const last = index !== data.length - 1;
              return casesView(group, last);
            })}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const TransformResponseToUIData = (data: SubscribedSchoolGroupStats[]): SubscribedSchoolStats[] => {
  return data.reduce((initial: SubscribedSchoolStats[], group): SubscribedSchoolStats[] => {
    const school = initial.find((school) => school.id === group.school.id);

    if (school) {
      const index = initial.indexOf(school);
      initial[index] = {
        ...school,
        cases: school.cases + group.cases,
        groups: [...school.groups, group],
      };
      return initial;
    } else {
      initial.push({
        id: group.school.id,
        name: group.school.name,
        size: group.school.size,
        cases: group.cases,
        groups: [group],
      });
      return initial;
    }
  }, []);
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 10,
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  schoolTitle: {
    fontSize: 18,
    color: colors.textDark,
    marginVertical: 16,
  },
  groupTitle: {
    fontSize: 16,
    color: colors.textDark,
    marginVertical: 8,
  },
  headerText: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 0,
    color: colors.textDark,
  },
  circle: {
    width: 12,
    height: 12,
    marginEnd: 8,
    borderRadius: 12 / 2,
  },
  groupView: {
    paddingBottom: 12,
  },
  lineStyle: {
    borderBottomColor: colors.tertiary,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: 16,
  },
});
