import { RegularBoldText, RegularText } from '@covid/components/Text';
import i18n from '@covid/locale/i18n';
import { sizes } from '@covid/themes';
import { colors } from '@theme';
import { Modal } from '@tracer/molecules/Modal/Modal';
import * as React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

type TProps = {
  cancelArchive: () => void;
  confirmArchive: () => void;
};

export const ArchiveConfirmationModal: React.FC<TProps> = (props) => {
  return (
    <Modal>
      <RegularBoldText style={styles.header}>{i18n.t('archive-confirmation.title')}</RegularBoldText>
      <RegularText style={styles.text}>{i18n.t('archive-confirmation.text')}</RegularText>

      <View style={styles.actionContainer}>
        <TouchableOpacity onPress={props.cancelArchive} style={styles.button}>
          <RegularText style={styles.buttonText}>{i18n.t('archive-confirmation.cancel')}</RegularText>
        </TouchableOpacity>
        <View style={styles.verticalDivider} />
        <TouchableOpacity onPress={props.confirmArchive} style={styles.button}>
          <RegularText style={styles.buttonText2}>{i18n.t('archive-confirmation.confirm')}</RegularText>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  actionContainer: {
    borderColor: colors.actionButtonBorder,
    borderTopWidth: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    height: 50,
    justifyContent: 'center',
    width: '50%',
  },
  buttonText: {
    color: colors.linkBlue,
    textAlign: 'center',
  },
  buttonText2: {
    color: colors.coral,
    textAlign: 'center',
  },
  header: {
    fontSize: 18,
    paddingBottom: sizes.s,
    textAlign: 'center',
  },
  text: {
    fontSize: 14,
    marginHorizontal: sizes.l,
    paddingBottom: sizes.l,
    textAlign: 'center',
  },
  verticalDivider: {
    backgroundColor: colors.actionButtonBorder,
    height: '100%',
    width: 1,
  },
});
