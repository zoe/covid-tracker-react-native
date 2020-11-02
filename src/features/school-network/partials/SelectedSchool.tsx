import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { Button } from '@covid/components/Buttons/Button';
import { Header } from '@covid/components/Screen';
import { HeaderText, RegularText, Header3Text } from '@covid/components/Text';
import { TwoButtonModal } from '@covid/components/TwoButtonModal';
import i18n from '@covid/locale/i18n';
import { SubscribedSchoolGroupStats } from '@covid/core/schools/Schools.dto';
import { PatientStateType } from '@covid/core/patient/PatientState';
import schoolNetworkCoordinator from '@covid/features/school-network/SchoolNetworkCoordinator';

import { RemoveSchoolButton } from './';

interface IProps {
  title: string;
  body?: string;
  organisation?: string;
  currentJoinedGroup: SubscribedSchoolGroupStats;
  previouslyJoinedGroups: SubscribedSchoolGroupStats[] | undefined;
  currentPatient: PatientStateType;
  removeText: string;
  hasBubbles?: boolean;
}

function SelectedSchool({
  title,
  body = '',
  organisation = '',
  currentJoinedGroup,
  previouslyJoinedGroups,
  currentPatient,
  removeText,
  hasBubbles = false,
}: IProps) {
  const [isModalVisible, setModalVisible] = useState(false);

  const handleOnRemove = (schoolId: string) => {
    schoolNetworkCoordinator.removePatientFromGroupList(previouslyJoinedGroups!, schoolId, currentPatient.patientId);
    setModalVisible(false);
    schoolNetworkCoordinator.closeFlow();
  };

  return (
    <>
      <Header>
        <HeaderText>{i18n.t(title)}</HeaderText>
        {body.length ? <RegularText style={styles.spacer}>{i18n.t(body)}</RegularText> : null}
      </Header>
      <Header>
        {organisation.length ? <Header3Text>{organisation}</Header3Text> : null}
        <RegularText style={styles.spacer}>{currentJoinedGroup.school.name}</RegularText>
      </Header>
      <View style={styles.formContainer}>
        <RemoveSchoolButton onPress={() => setModalVisible(true)} text={removeText} />
        {hasBubbles ? (
          <Button
            onPress={async () => {
              await schoolNetworkCoordinator.setSelectedSchool(currentJoinedGroup.school);
              schoolNetworkCoordinator.goToGroupList();
            }}
            branded>
            {i18n.t('school-networks.join-school.cta')}
          </Button>
        ) : null}
      </View>
      {isModalVisible && (
        <TwoButtonModal
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
  spacer: {
    marginTop: 16,
  },
});

export default SelectedSchool;
