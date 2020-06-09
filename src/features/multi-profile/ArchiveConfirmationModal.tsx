import React, { useEffect, useState } from 'react';
import { Modal, StyleSheet, TouchableHighlight, TouchableOpacity } from 'react-native';
import { View } from 'native-base';

import { RegularBoldText, RegularText } from '@covid/components/Text';
import { colors } from '@theme';

type Props = {
  cancelArchive: () => void;
  confirmArchive: () => void;
};

export const ArchiveConfirmationModal: React.FC<Props> = (props) => {
  return (
    <Modal transparent>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <RegularBoldText style={styles.ratingHeader}>Archive this profile?</RegularBoldText>
          <RegularText style={styles.ratingText}>
            You will no longer be able on behalf of this individual. Do you want to proceed?
          </RegularText>

          <View style={styles.actionContainer}>
            <TouchableOpacity style={styles.ratingButton} onPress={props.cancelArchive}>
              <RegularText style={styles.buttonText}>Cancel</RegularText>
            </TouchableOpacity>
            <View style={styles.verticalDivider} />
            <TouchableOpacity style={styles.ratingButton} onPress={props.confirmArchive}>
              <RegularText style={styles.buttonText}>Archive</RegularText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
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
