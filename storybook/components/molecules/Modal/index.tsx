import React, { useEffect, useState } from 'react';
import { Image, Modal as RNModal, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { colors } from '../../../branding/colors';
import { grid } from '../../../branding/grid';

export type ModalSwipeDirection = 'up' | 'down';

export interface IModalProps {
  name: string;
  onRequestClose: () => void;
  visible: boolean;

  header?: any;
  headerIcon?: any;
  children?: any;
  footer?: any;
  swipeDirection?: ModalSwipeDirection;
  props?: any;
  style?: StyleProp<ViewStyle>;
}

/**
 * ModalProps
 *
 * @param swipeDirection (optional) modal can be dragged in the (up/down direction) to expand on to the screen
 * @param visible hide or show modal
 * @param onRequestClose function executed when the modal is closed
 */
export default function Modal({
  header,
  headerIcon,
  footer,
  children,
  onRequestClose,
  swipeDirection = 'up',
  visible = false,
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

  return (
    // eslint-disable-next-line react/jsx-sort-props
    <RNModal transparent style={[baseStyle[swipeDirection]]} onRequestClose={handleClose} {...props}>
      <View style={baseStyle.centeredView}>
        <View style={[baseStyle.modalView, props.style]}>
          <View style={[baseStyle.modalHeaderView]}>
            {headerIcon ? <Image source={headerIcon} style={[baseStyle.modalHeaderIcon]} /> : null}
            {header}
          </View>
          <View>{children}</View>
          <View style={[baseStyle.modalFooterView]}>{footer}</View>
        </View>
      </View>
    </RNModal>
  );
}

const baseStyle = StyleSheet.create({
  centeredView: {
    alignItems: 'center',
    backgroundColor: colors.black50,
    flex: 1,
    justifyContent: 'center',
    zIndex: 1,
  },
  down: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalFooterView: {
    marginTop: grid.g32,
  },
  modalHeaderIcon: {
    height: 80,
    marginBottom: grid.g32,
    width: 80,
  },
  modalHeaderView: {
    marginBottom: grid.g16,
  },
  modalView: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: grid.g16,
    margin: grid.g32,
    opacity: 1,
    paddingBottom: grid.g48,
    paddingLeft: grid.g16,
    paddingRight: grid.g16,
    paddingTop: grid.g48,
    zIndex: 2,
  },
  up: {
    justifyContent: 'flex-start',
    margin: 0,
  },
});
