import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Text } from 'native-base';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';

import { colors } from '@theme';
import ProgressStatus from '@covid/components/ProgressStatus';
import Screen, { Header, ProgressBlock } from '@covid/components/Screen';
import { BrandedButton, HeaderText, RegularText } from '@covid/components/Text';
import i18n from '@covid/locale/i18n';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import schoolNetworkCoordinator from '@covid/features/school-network/SchoolNetworkCoordinator';
import { RootState } from '@covid/core/state/root';
import { Optional } from '@covid/utils/types';
import { SchoolGroupRow } from '@covid/features/school-network/SchoolGroupRow';
import { TwoButtonModal } from '@covid/components/TwoButtonModal';

import { SchoolGroupModel, SubscribedSchoolGroupStats } from '../../core/schools/Schools.dto';

type Props = {
  navigation: StackNavigationProp<ScreenParamList, 'SchoolGroupList'>;
  route: RouteProp<ScreenParamList, 'SchoolGroupList'>;
};

export const SchoolGroupListScreen: React.FC<Props> = ({ route, navigation }) => {
  const [joinedGroups, setJoinedGroups] = useState<SchoolGroupModel[]>([]);
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [pressedGroup, setPressedGroup] = useState<SchoolGroupModel>();

  const allGroups = useSelector<RootState, SubscribedSchoolGroupStats[]>((state) => state.school.joinedSchoolGroups);

  useEffect(() => {
    const { patientId } = route.params.patientData;
    const schoolId = route.params.selectedSchool.id;
    const currentJoinedGroups = allGroups.filter(
      (group) => group.patient_id === patientId && group.school.id === schoolId
    );

    if (currentJoinedGroups.length > 0) {
      setJoinedGroups(currentJoinedGroups);
    } else {
      schoolNetworkCoordinator.closeFlow();
    }
  }, [allGroups]);

  const joinNewGroup = () => {
    schoolNetworkCoordinator.goToJoinGroup();
  };

  const done = () => {
    schoolNetworkCoordinator.gotoNextScreen(route.name);
  };

  return (
    <View style={styles.rootContainer}>
      <Screen profile={route.params.patientData.profile} navigation={navigation}>
        <Header>
          <HeaderText>{i18n.t('school-networks.groups-list.title')}</HeaderText>
        </Header>

        <RegularText style={styles.content}>
          {i18n.t('school-networks.groups-list.subtitle') + ' ' + route.params.selectedSchool.name}
        </RegularText>

        <ProgressBlock>
          <ProgressStatus step={2} maxSteps={4} />
        </ProgressBlock>

        {isModalVisible && (
          <TwoButtonModal
            bodyText={i18n.t('school-networks.groups-list.modal-body') + ' ' + pressedGroup!.name + '?'}
            button1Text={i18n.t('school-networks.groups-list.button-1')}
            button2Text={i18n.t('school-networks.groups-list.button-2')}
            button1Callback={() => setModalVisible(false)}
            button2Callback={async () => {
              await schoolNetworkCoordinator.removePatientFromGroup(
                pressedGroup!.id,
                route.params.patientData.patientId
              );
              setModalVisible(false);
            }}
          />
        )}

        <RegularText style={styles.content}>{i18n.t('school-networks.groups-list.text')}</RegularText>

        <View style={styles.content}>
          {joinedGroups.map((group: SchoolGroupModel) => {
            return (
              <SchoolGroupRow
                onPress={() => {
                  setPressedGroup(group);
                  setModalVisible(true);
                }}
                group={group}
                key={group.id}
              />
            );
          })}
        </View>
      </Screen>

      <View>
        <BrandedButton style={styles.newButton} onPress={joinNewGroup}>
          <Text style={styles.newText}>{i18n.t('school-networks.groups-list.add-new-bubble')}</Text>
        </BrandedButton>

        <BrandedButton style={styles.continueButton} onPress={done}>
          <Text>Done</Text>
        </BrandedButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: colors.backgroundPrimary,
  },
  content: {
    margin: 16,
  },
  newButton: {
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.purple,
  },
  newText: {
    color: colors.purple,
  },
  continueButton: {
    marginHorizontal: 16,
    marginBottom: 32,
  },
});
