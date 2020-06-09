import React, { useState } from 'react';
import { Modal, StyleSheet, TouchableOpacity } from 'react-native';
import { View } from 'native-base';

import i18n from '@covid/locale/i18n';
import { RegularBoldText, RegularText } from '@covid/components/Text';
import { colors } from '@theme';

type Props = {
  profileId: string;
};

export const ArchiveProfile: React.FC<Props> = (props) => {
  const [isConfirmModalVisible, setConfirmModalVisibility] = useState(false);
  const [isReasonModalVisible, setReasonModalVisibility] = useState(false);

  function handleArchive() {
    setConfirmModalVisibility(true);
  }

  return (
    <>
      <View style={styles.centeredView}>
        <Modal transparent visible={isConfirmModalVisible}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <RegularBoldText style={styles.ratingHeader}>Archive this profile?</RegularBoldText>
              <RegularText style={styles.ratingText}>
                You will no longer be able on behalf of this individual. Do you want to proceed?
              </RegularText>

              <View style={styles.actionContainer}>
                <TouchableOpacity style={styles.ratingButton} onPress={() => setConfirmModalVisibility(false)}>
                  <RegularText style={styles.buttonText}>Cancel</RegularText>
                </TouchableOpacity>
                <View style={styles.verticalDivider} />
                <TouchableOpacity
                  style={styles.ratingButton}
                  onPress={() => {
                    setConfirmModalVisibility(false);
                    setReasonModalVisibility(true);
                  }}>
                  <RegularText style={styles.buttonText}>Archive</RegularText>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>

      <View style={styles.centeredView}>
        <Modal transparent visible={isReasonModalVisible} onRequestClose={() => {}}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <RegularBoldText style={styles.ratingHeader}>Profile Archived</RegularBoldText>
              <RegularText style={styles.ratingText}>
                Help us understand why you archived this profile, so we can more accurately predict levels of COVID
              </RegularText>

              <View style={styles.actionContainer}>
                <TouchableOpacity style={styles.ratingButton} onPress={() => setReasonModalVisibility(false)}>
                  <RegularText style={styles.buttonText}>Cancel</RegularText>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>

      <TouchableOpacity onPress={() => handleArchive()}>
        <RegularText>{i18n.t('edit-profile.archive-cta')}</RegularText>
      </TouchableOpacity>
    </>
  );
};

const actionButtonBorder = 'rgba(240, 240, 240, 1)';
const styles = StyleSheet.create({
  centeredView: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 30,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingTop: 35,
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  verticalDivider: {
    height: '100%',
    width: 1,
    backgroundColor: actionButtonBorder,
  },
  ratingText: {
    paddingBottom: 30,
    marginHorizontal: 60,
    fontSize: 14,
    textAlign: 'center',
  },
  ratingHeader: {
    paddingBottom: 10,
    fontSize: 18,
    textAlign: 'center',
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderColor: actionButtonBorder,
  },
  buttonText: {
    textAlign: 'center',
    color: colors.linkBlue,
  },
  ratingButton: {
    width: '50%',
    height: 60,
    justifyContent: 'center',
    color: colors.linkBlue,
  },
});
