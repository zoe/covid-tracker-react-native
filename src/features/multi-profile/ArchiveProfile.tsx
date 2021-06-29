import { HeaderText } from '@covid/components/Text';
import { appCoordinator } from '@covid/features/AppCoordinator';
import { ArchiveConfirmationModal } from '@covid/features/multi-profile/ArchiveConfirmationModal';
import i18n from '@covid/locale/i18n';
import { colors } from '@theme';
import * as React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

type Props = {
  patientId: string;
};

export const ArchiveProfile: React.FC<Props> = (props) => {
  const [isConfirmModalVisible, setConfirmModalVisibility] = React.useState(false);

  function clickArchive() {
    setConfirmModalVisibility(true);
  }

  function cancelArchive() {
    setConfirmModalVisibility(false);
  }

  function confirmArchive() {
    setConfirmModalVisibility(false);
    appCoordinator.goToArchiveReason(props.patientId);
  }

  return (
    <>
      {isConfirmModalVisible && (
        <ArchiveConfirmationModal cancelArchive={cancelArchive} confirmArchive={confirmArchive} />
      )}

      <TouchableOpacity onPress={() => clickArchive()}>
        <HeaderText style={styles.archiveCta}>{i18n.t('edit-profile.archive-cta')}</HeaderText>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  archiveCta: {
    color: colors.coral,
    textAlign: 'center',
  },
});
