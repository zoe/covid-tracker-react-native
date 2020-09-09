import React from 'react';
import { StyleSheet, View, StyleProp, ViewStyle } from 'react-native';

import i18n from '@covid/locale/i18n';
import { CaptionText, Header0Text, Header3Text, RegularText } from '@covid/components/Text';
import { colors } from '@theme';
import {
  SchoolGroupSubscriptionResponse,
  SubscribedSchoolStats,
  SubscribedSchoolGroupStats,
} from '@covid/core/schools/Schools.dto';

type Props = {
  networks: SchoolGroupSubscriptionResponse;
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
  const { networks } = props;
  const data: SubscribedSchoolStats[] = TransformResponseToUIData(networks);

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

  const casesView = (group: SubscribedSchoolGroupStats) => {
    const status = getStatus(group.status, group.cases);
    return (
      <View style={styles.groupView}>
        <RegularText>{group.name}</RegularText>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={getStatusIndicator(status)} />
          <CaptionText>{getStatusLabel(status, group.cases)}</CaptionText>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header0Text style={styles.headerText}>{i18n.t('school-networks.title')}</Header0Text>
      {data.map((school, index) => {
        return (
          <>
            <Header3Text
              style={[
                styles.schoolTitle,
                {
                  fontWeight: '500',
                  fontSize: 14,
                },
              ]}>
              {school.name}
            </Header3Text>
            {school.groups.map((group, index) => {
              return casesView(group);
            })}
            {index !== data.length - 1 && <View style={styles.lineStyle} />}
          </>
        );
      })}
    </View>
  );
};

const TransformResponseToUIData = (data: SchoolGroupSubscriptionResponse): SubscribedSchoolStats[] => {
  return data.reduce((initial: SubscribedSchoolStats[], network): SubscribedSchoolStats[] => {
    const filtered = initial.filter((school) => school.id === network.school.id);
    const hasSchool = filtered.length > 0;
    const { id, name, status } = network;

    if (hasSchool) {
      const index = initial.indexOf(filtered[0]);
      const school = initial[index];
      initial[index] = {
        ...school,
        groups: [...school.groups, { id, name, status }],
      };
      return initial;
    } else {
      initial.push({
        id: network.school.id,
        name: network.school.name,
        groups: [{ id, name, status }],
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
    fontWeight: '500',
    fontSize: 16,
    textAlign: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: '500',
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
    paddingVertical: 12,
  },
  lineStyle: {
    margin: 12,
    borderBottomColor: colors.tertiary,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
