import { ModalContainer } from '@covid/components/ModalContainer';
import { RegularBoldText, RegularText } from '@covid/components/Text';
import i18n from '@covid/locale/i18n';
import { colors } from '@theme';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

type Props = {
  cancelArchive: () => void;
  confirmArchive: () => void;
};

export const ArchiveConfirmationModal: React.FC<Props> = (props) => {
  return (
    <ModalContainer>
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
    </ModalContainer>
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
    paddingBottom: 10,
    textAlign: 'center',
  },
  text: {
    fontSize: 14,
    marginHorizontal: 20,
    paddingBottom: 20,
    textAlign: 'center',
  },
  verticalDivider: {
    backgroundColor: colors.actionButtonBorder,
    height: '100%',
    width: 1,
  },
});
