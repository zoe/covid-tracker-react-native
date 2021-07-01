import { BrandedButton } from '@covid/components';
import ProgressStatus from '@covid/components/ProgressStatus';
import Screen, { Header, ProgressBlock } from '@covid/components/Screen';
import { HeaderText, RegularText } from '@covid/components/Text';
import { TwoButtonModal } from '@covid/components/TwoButtonModal';
import { ISchoolGroupModel, ISubscribedSchoolGroupStats } from '@covid/core/schools/Schools.dto';
import { RootState } from '@covid/core/state/root';
import { SchoolGroupRow } from '@covid/features/school-network/SchoolGroupRow';
import { schoolNetworkCoordinator } from '@covid/features/school-network/SchoolNetworkCoordinator';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import i18n from '@covid/locale/i18n';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors } from '@theme';
import { Text } from 'native-base';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';

type Props = {
  navigation: StackNavigationProp<ScreenParamList, 'SchoolGroupList'>;
  route: RouteProp<ScreenParamList, 'SchoolGroupList'>;
};

export const SchoolGroupListScreen: React.FC<Props> = ({ route, navigation }) => {
  const [joinedGroups, setJoinedGroups] = React.useState<ISchoolGroupModel[]>([]);
  const [isModalVisible, setModalVisible] = React.useState<boolean>(false);
  const [pressedGroup, setPressedGroup] = React.useState<ISchoolGroupModel>();

  const allGroups = useSelector<RootState, ISubscribedSchoolGroupStats[]>((state) => state.school.joinedSchoolGroups);

  React.useEffect(() => {
    const currentJoinedGroups = allGroups.filter(
      (group) =>
        group.patient_id === route.params?.patientData?.patientId &&
        group.school.id === route.params?.selectedSchool?.id,
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
      <Screen navigation={navigation} profile={route.params?.patientData.profile} testID="school-group-list-screen">
        <Header>
          <HeaderText>{i18n.t('school-networks.groups-list.title')}</HeaderText>
        </Header>

        <RegularText style={styles.content}>
          {`${i18n.t('school-networks.groups-list.subtitle')} ${route.params?.selectedSchool.name}`}
        </RegularText>

        <ProgressBlock>
          <ProgressStatus maxSteps={4} step={2} />
        </ProgressBlock>

        {isModalVisible ? (
          <TwoButtonModal
            bodyText={`${i18n.t('school-networks.groups-list.modal-body')} ${pressedGroup!.name}?`}
            button1Callback={() => setModalVisible(false)}
            button1Text={i18n.t('school-networks.groups-list.button-1')}
            button2Callback={async () => {
              await schoolNetworkCoordinator.removePatientFromGroup(
                pressedGroup!.id,
                route.params?.patientData.patientId,
              );
              setModalVisible(false);
            }}
            button2Text={i18n.t('school-networks.groups-list.button-2')}
          />
        ) : null}

        <RegularText style={styles.content}>{i18n.t('school-networks.groups-list.text')}</RegularText>

        <View style={styles.content}>
          {joinedGroups.map((group: ISchoolGroupModel) => {
            return (
              <SchoolGroupRow
                group={group}
                key={group.id}
                onPress={() => {
                  setPressedGroup(group);
                  setModalVisible(true);
                }}
              />
            );
          })}
        </View>
      </Screen>

      <View>
        <BrandedButton onPress={joinNewGroup} style={styles.newButton}>
          <Text style={styles.newText}>{i18n.t('school-networks.groups-list.add-new-bubble')}</Text>
        </BrandedButton>

        <BrandedButton onPress={done} style={styles.continueButton}>
          {i18n.t('completed')}
        </BrandedButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    margin: 16,
  },
  continueButton: {
    marginBottom: 32,
    marginHorizontal: 16,
  },
  newButton: {
    backgroundColor: colors.white,
    borderColor: colors.purple,
    borderWidth: 1,
    marginBottom: 16,
    marginHorizontal: 16,
  },
  newText: {
    color: colors.purple,
  },
  rootContainer: {
    backgroundColor: colors.backgroundPrimary,
    flex: 1,
  },
});
