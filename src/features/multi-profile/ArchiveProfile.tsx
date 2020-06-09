import React, { useState } from 'react';
import { Modal, StyleSheet, TouchableOpacity } from 'react-native';
import { View } from 'native-base';

import i18n from '@covid/locale/i18n';
import { RegularBoldText, RegularText } from '@covid/components/Text';
import { colors } from '@theme';
import { ArchiveConfirmationModal } from '@covid/features/multi-profile/ArchiveConfirmationModal';
import { ArchiveReasonModal } from '@covid/features/multi-profile/ArchiveReasonModal';
import Navigator from '@covid/features/Navigation';
import UserService from '@covid/core/user/UserService';

type Props = {
  profileId: string;
};

export const ArchiveProfile: React.FC<Props> = (props) => {
  const [isConfirmModalVisible, setConfirmModalVisibility] = useState(false);
  const [isReasonModalVisible, setReasonModalVisibility] = useState(false);

  function clickArchive() {
    setConfirmModalVisibility(true);
  }

  function cancelArchive() {
    setConfirmModalVisibility(false);
  }

  function confirmArchive() {
    setConfirmModalVisibility(false);
    setReasonModalVisibility(true);
  }

  function submitReason(reason: string) {
    setReasonModalVisibility(false);

    const infos = {
      archived: true,
      archived_reason: reason,
    };

    const userService = new UserService();
    userService.updatePatient(props.profileId, infos).then((response) => {
      Navigator.gotoScreen('SelectProfile');
    });
  }

  return (
    <>
      {isConfirmModalVisible && (
        <ArchiveConfirmationModal cancelArchive={cancelArchive} confirmArchive={confirmArchive} />
      )}

      {isReasonModalVisible && <ArchiveReasonModal submitReason={submitReason} />}

      <TouchableOpacity onPress={() => clickArchive()}>
        <RegularText>{i18n.t('edit-profile.archive-cta')}</RegularText>
      </TouchableOpacity>
    </>
  );
};
