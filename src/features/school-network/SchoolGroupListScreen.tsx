import { BrandedButton } from '@covid/components';
import ProgressStatus from '@covid/components/ProgressStatus';
import { Screen } from '@covid/components/Screen';
import { HeaderText, RegularText } from '@covid/components/Text';
import { TwoButtonModal } from '@covid/components/TwoButtonModal';
import { ISchoolGroupModel, ISubscribedSchoolGroupStats } from '@covid/core/schools/Schools.dto';
import { TRootState } from '@covid/core/state/root';
import { SchoolGroupRow } from '@covid/features/school-network/SchoolGroupRow';
import { schoolNetworkCoordinator } from '@covid/features/school-network/SchoolNetworkCoordinator';
import i18n from '@covid/locale/i18n';
import { TScreenParamList } from '@covid/routes/types';
import { sizes, styling } from '@covid/themes';
import { RouteProp } from '@react-navigation/native';
import { colors } from '@theme';
import { Text } from 'native-base';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';

type TProps = {
  route: RouteProp<TScreenParamList, 'SchoolGroupList'>;
};

export const SchoolGroupListScreen: React.FC<TProps> = ({ route }) => {
  const [joinedGroups, setJoinedGroups] = React.useState<ISchoolGroupModel[]>([]);
  const [isModalVisible, setModalVisible] = React.useState<boolean>(false);
  const [pressedGroup, setPressedGroup] = React.useState<ISchoolGroupModel>();

  const allGroups = useSelector<TRootState, ISubscribedSchoolGroupStats[]>((state) => state.school.joinedSchoolGroups);

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
    <Screen
      backgroundColor={colors.backgroundPrimary}
      profile={route.params?.patientData.profile}
      testID="school-group-list-screen"
    >
      <HeaderText>{i18n.t('school-networks.groups-list.title')}</HeaderText>

      <RegularText style={styles.marginVertical}>
        {`${i18n.t('school-networks.groups-list.subtitle')} ${route.params?.selectedSchool.name}`}
      </RegularText>

      <ProgressStatus currentStep={2} maxSteps={4} />

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

      <RegularText style={styles.marginVertical}>{i18n.t('school-networks.groups-list.text')}</RegularText>

      <View style={styles.marginVertical}>
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

      <View style={styling.flex} />

      <BrandedButton onPress={joinNewGroup} style={styles.newButton}>
        <Text style={styles.newText}>{i18n.t('school-networks.groups-list.add-new-bubble')}</Text>
      </BrandedButton>

      <BrandedButton onPress={done}>{i18n.t('completed')}</BrandedButton>
    </Screen>
  );
};

const styles = StyleSheet.create({
  marginVertical: {
    marginVertical: sizes.m,
  },
  newButton: {
    backgroundColor: colors.white,
    borderColor: colors.purple,
    borderWidth: 1,
    marginVertical: sizes.m,
  },
  newText: {
    color: colors.purple,
  },
});
