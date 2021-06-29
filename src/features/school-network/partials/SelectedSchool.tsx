import { Button } from '@covid/components/buttons/Button';
import { Header } from '@covid/components/Screen';
import { ClickableText, Header3Text, HeaderText, RegularText } from '@covid/components/Text';
import { TwoButtonModal } from '@covid/components/TwoButtonModal';
import { PatientStateType } from '@covid/core/patient/PatientState';
import { ISubscribedSchoolGroupStats } from '@covid/core/schools/Schools.dto';
import { schoolNetworkCoordinator } from '@covid/features/school-network/SchoolNetworkCoordinator';
import i18n from '@covid/locale/i18n';
import { openWebLink } from '@covid/utils/links';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';

import RemoveSchoolButton from './RemoveSchoolButton';

interface IProps {
  title: string;
  body?: string;
  link?: string;
  linkLabel?: string;
  organisation?: string;
  currentJoinedGroup: ISubscribedSchoolGroupStats;
  currentPatient: PatientStateType;
  removeText: string;
  hasBubbles?: boolean;
}

function SelectedSchool({
  title,
  body = '',
  link = '',
  linkLabel = '',
  organisation = '',
  currentJoinedGroup,
  currentPatient,
  removeText,
  hasBubbles = false,
}: IProps) {
  const [isModalVisible, setModalVisible] = React.useState(false);

  const handleOnRemove = (schoolId: string) => {
    schoolNetworkCoordinator.removePatientFromSchool(schoolId, currentPatient.patientId);
    setModalVisible(false);
    schoolNetworkCoordinator.closeFlow();
  };

  const getBody = () => {
    if (body.length) {
      return (
        <View style={styles.body}>
          <RegularText>{i18n.t(body)} </RegularText>
          {link.length ? (
            <ClickableText onPress={() => openWebLink(i18n.t(link))}>{i18n.t(linkLabel)}</ClickableText>
          ) : null}
        </View>
      );
    }
    return null;
  };

  return (
    <>
      <Header>
        <HeaderText>{i18n.t(title)}</HeaderText>
        {getBody()}
      </Header>
      <Header>
        {organisation.length ? <Header3Text>{organisation}</Header3Text> : null}
        <RegularText style={styles.spacer}>{currentJoinedGroup.school.name}</RegularText>
      </Header>
      <View style={styles.formContainer}>
        <RemoveSchoolButton onPress={() => setModalVisible(true)} text={removeText} />
        {hasBubbles ? (
          <Button
            branded
            onPress={async () => {
              await schoolNetworkCoordinator.setSelectedSchool(currentJoinedGroup.school);
              schoolNetworkCoordinator.goToGroupList();
            }}
          >
            {i18n.t('school-networks.join-school.cta')}
          </Button>
        ) : null}
      </View>
      {isModalVisible && (
        <TwoButtonModal
          bodyText={`${i18n.t('school-networks.join-school.modal-body')} ${currentJoinedGroup.school.name}?`}
          button1Callback={() => setModalVisible(false)}
          button1Text={i18n.t('school-networks.join-school.button-1')}
          button2Callback={() => {
            if (currentJoinedGroup) {
              handleOnRemove(currentJoinedGroup.school.id);
            }
          }}
          button2Text={i18n.t('school-networks.join-school.button-2')}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  body: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 16,
  },
  formContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  spacer: {
    marginTop: 16,
  },
});

export default SelectedSchool;
