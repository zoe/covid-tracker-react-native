import { sizes } from '@covid/themes';
import { colors } from '@theme';
import React from 'react';
import { Modal as RNModal, StyleSheet, View } from 'react-native';

export type ModalSwipeDirection = 'up' | 'down';

interface ModalProps {
  children?: any;
  swipeDirection?: ModalSwipeDirection;
  props?: any;
}

export const Modal = ({ children, swipeDirection = 'up', props }: ModalProps) => {
  return (
    <RNModal transparent style={styles[swipeDirection]} {...props}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>{children}</View>
      </View>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    flex: 1,
    justifyContent: 'center',
  },
  down: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalView: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: sizes.l,
    elevation: 5,
    margin: sizes.xl,
    paddingTop: sizes.l,
    shadowColor: colors.black,
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  up: {
    justifyContent: 'flex-start',
    margin: 0,
  },
});
