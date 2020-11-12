import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { View } from 'native-base';

import { RegularBoldText, RegularText } from '@covid/components/Text';
import { colors } from '@theme';
import { ModalContainer } from '@covid/components/ModalContainer';
import i18n from '@covid/locale/i18n';

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
        <TouchableOpacity style={styles.button} onPress={props.cancelArchive}>
          <RegularText style={styles.buttonText}>{i18n.t('archive-confirmation.cancel')}</RegularText>
        </TouchableOpacity>
        <View style={styles.verticalDivider} />
        <TouchableOpacity style={styles.button} onPress={props.confirmArchive}>
          <RegularText style={styles.buttonText2}>{i18n.t('archive-confirmation.confirm')}</RegularText>
        </TouchableOpacity>
      </View>
    </ModalContainer>
  );
};

const styles = StyleSheet.create({
  verticalDivider: {
    height: '100%',
    width: 1,
    backgroundColor: colors.actionButtonBorder,
  },
  text: {
    paddingBottom: 20,
    marginHorizontal: 20,
    fontSize: 14,
    textAlign: 'center',
  },
  header: {
    paddingBottom: 10,
    fontSize: 18,
    textAlign: 'center',
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderColor: colors.actionButtonBorder,
  },
  buttonText: {
    textAlign: 'center',
    color: colors.linkBlue,
  },
  buttonText2: {
    textAlign: 'center',
    color: colors.coral,
  },
  button: {
    width: '50%',
    height: 50,
    justifyContent: 'center',
  },
});
