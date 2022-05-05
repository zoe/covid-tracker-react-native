import React, { useEffect, useState } from 'react';
import { Modal as RNModal, StyleProp, StyleSheet, ViewStyle } from 'react-native';

export type ModalSwipeDirection = 'up' | 'down' | 'center';

export interface IModalProps {
  children?: React.ReactNode;
  visible: boolean;
  onRequestClose: () => void;
  onDismiss?: () => void;
  swipeDirection?: ModalSwipeDirection;
  props?: any;
  style?: StyleProp<ViewStyle>;
}

/**
 * Modal
 *
 * @param swipeDirection (optional) modal can be dragged in the (up/down direction) to expand on to the screen
 * @param visible hide or show modal
 * @param onRequestClose function executed when the modal is closed
 */
export default function Modal({
  children,
  visible = false,
  onRequestClose,
  onDismiss,
  swipeDirection = 'up',
  style,
  ...props
}: IModalProps) {
  const [show, setShow] = useState<boolean>(false);

  const handleClose = () => {
    setShow(false);
    onRequestClose();
  };

  useEffect(() => {
    setShow(visible);
  }, [show]);

  const animationType = swipeDirection === 'down' ? 'slide' : 'fade';
  return (
    <RNModal
      transparent
      animationType={animationType}
      onDismiss={onDismiss}
      onRequestClose={handleClose}
      style={[baseStyle[swipeDirection], style]}
      visible={visible}
      {...props}
    >
      {children}
    </RNModal>
  );
}

const baseStyle = StyleSheet.create({
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  down: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  up: {
    justifyContent: 'flex-start',
    marginTop: 0,
  },
});
