import { SafeLayout } from '@covid/components';
import * as React from 'react';
import { Modal, ScrollView, StyleSheet } from 'react-native';

interface IProps {
  children?: React.ReactNode;
  closeModalHandler: () => void;
  showModal: boolean;
}

export default function ModalZoe(props: IProps) {
  return (
    <Modal transparent animationType="slide" onRequestClose={props.closeModalHandler} visible={props.showModal}>
      <SafeLayout style={styles.modal}>
        <ScrollView
          alwaysBounceVertical={false}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}
        >
          {props.children}
        </ScrollView>
      </SafeLayout>
    </Modal>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
  },
  modal: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  scrollView: {
    borderRadius: 16,
    flexGrow: 0,
    marginBottom: 'auto',
    marginHorizontal: 24,
    marginTop: 'auto',
  },
});
