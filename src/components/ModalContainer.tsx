import React from 'react';
import { Modal, StyleSheet, View } from 'react-native';

import { colors } from '@theme';

export const ModalContainer: React.FC = (props) => (
  <Modal transparent>
    <View style={styles.centeredView}>
      <View style={styles.modalView}>{props.children}</View>
    </View>
  </Modal>
);

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
    paddingTop: 20,
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
});
