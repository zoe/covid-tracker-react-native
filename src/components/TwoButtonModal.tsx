import { RegularBoldText, RegularText } from '@covid/components/Text';
import { sizes } from '@covid/themes';
import { colors } from '@theme';
import { Modal } from '@tracer/molecules/Modal/Modal';
import * as React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

type TProps = {
  headerText?: string;
  bodyText: string;
  button1Text: string;
  button2Text: string;
  button1Callback: () => void;
  button2Callback: () => void;
  button1Color?: string;
  button2Color?: string;
};

export const TwoButtonModal: React.FC<TProps> = (props) => {
  const button1Color = {
    color: props.button1Color ? props.button1Color : colors.linkBlue,
  };

  const button2Color = {
    color: props.button2Color ? props.button2Color : colors.coral,
  };

  return (
    <Modal>
      {props.headerText ? <RegularBoldText style={styles.header}>{props.headerText}</RegularBoldText> : null}
      <RegularText style={styles.text}>{props.bodyText}</RegularText>

      <View style={styles.actionContainer}>
        <TouchableOpacity onPress={props.button1Callback} style={styles.button}>
          <RegularText style={[styles.button1Text, button1Color]}>{props.button1Text}</RegularText>
        </TouchableOpacity>
        <View style={styles.verticalDivider} />
        <TouchableOpacity onPress={props.button2Callback} style={styles.button}>
          <RegularText style={[styles.button2Text, button2Color]}>{props.button2Text}</RegularText>
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
  button1Text: {
    textAlign: 'center',
  },
  button2Text: {
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
