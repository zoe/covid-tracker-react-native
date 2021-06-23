import { colors } from '@theme';
import * as React from 'react';
import { Modal, StyleSheet, View } from 'react-native';

export const ModalContainer: React.FC = (props) => (
  <Modal transparent>
    <View style={styles.centeredView}>
      <View style={styles.modalView}>{props.children}</View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  centeredView: {
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    flex: 1,
    justifyContent: 'center',
  },
  modalView: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    elevation: 5,
    margin: 30,
    paddingTop: 20,
    shadowColor: colors.black,
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
