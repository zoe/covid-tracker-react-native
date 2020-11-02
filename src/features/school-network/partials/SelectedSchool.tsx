import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { Button } from '@covid/components/Buttons/Button';
import { TwoButtonModal } from '@covid/components/TwoButtonModal';
import i18n from '@covid/locale/i18n';
import { SubscribedSchoolGroupStats } from '@covid/core/schools/Schools.dto';
import { PatientStateType } from '@covid/core/patient/PatientState';
import schoolNetworkCoordinator from '@covid/features/school-network/SchoolNetworkCoordinator';

import { RemoveSchoolButton } from './';

interface IProps {
  title: string;
  body: string;
  organisation: string;
  currentJoinedGroup: SubscribedSchoolGroupStats;
  previouslyJoinedGroups: SubscribedSchoolGroupStats[] | undefined;
  currentPatient: PatientStateType;
}

function SelectedSchool({
  title,
  body,
  organisation,
  currentJoinedGroup,
  previouslyJoinedGroups,
  currentPatient,
}: IProps) {
  const [isModalVisible, setModalVisible] = useState(false);

  const handleOnRemove = (schoolId: string) => {
    schoolNetworkCoordinator.removePatientFromGroupList(previouslyJoinedGroups!, schoolId, currentPatient.patientId);
    setModalVisible(false);
    schoolNetworkCoordinator.closeFlow();
  };

  return (
    <>
      <Text>{title}</Text>
      <Text>{body}</Text>
      <Text>{organisation}</Text>
      <Text>{currentJoinedGroup.school.name}</Text>
      <View style={styles.formContainer}>
        <RemoveSchoolButton onPress={() => setModalVisible(true)} text="school-networks.join-school.remove" />
        <Button
          onPress={async () => {
            await schoolNetworkCoordinator.setSelectedSchool(currentJoinedGroup.school);
            schoolNetworkCoordinator.goToGroupList();
          }}
          branded>
          {i18n.t('school-networks.join-school.cta')}
        </Button>
      </View>
      {isModalVisible && (
        <TwoButtonModal
          // bodyText={i18n.t('school-networks.join-school.modal-body') + ' ' + currentJoinedGroup!.school.name + '?'}
          bodyText={`${i18n.t('school-networks.join-school.modal-body')} ${currentJoinedGroup.school.name}?`}
          button1Text={i18n.t('school-networks.join-school.button-1')}
          button2Text={i18n.t('school-networks.join-school.button-2')}
          button1Callback={() => setModalVisible(false)}
          button2Callback={() => {
            if (currentJoinedGroup) {
              handleOnRemove(currentJoinedGroup.school.id);
            }
          }}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
});

export default SelectedSchool;
