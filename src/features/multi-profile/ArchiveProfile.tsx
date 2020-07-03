import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import i18n from '@covid/locale/i18n';
import { HeaderText } from '@covid/components/Text';
import { colors } from '@theme';
import { ArchiveConfirmationModal } from '@covid/features/multi-profile/ArchiveConfirmationModal';
import appCoordinator from '@covid/features/AppCoordinator';

type Props = {
  profileId: string;
};

export const ArchiveProfile: React.FC<Props> = (props) => {
  const [isConfirmModalVisible, setConfirmModalVisibility] = useState(false);

  function clickArchive() {
    setConfirmModalVisibility(true);
  }

  function cancelArchive() {
    setConfirmModalVisibility(false);
  }

  function confirmArchive() {
    setConfirmModalVisibility(false);
    appCoordinator.goToArchiveReason(props.profileId);
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
    textAlign: 'center',
    color: colors.coral,
  },
});
