import { ModalContainer } from '@covid/components/ModalContainer';
import { RegularBoldText, RegularText } from '@covid/components/Text';
import { colors } from '@theme';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

type Props = {
  headerText?: string;
  bodyText: string;
  button1Text: string;
  button2Text: string;
  button1Callback: () => void;
  button2Callback: () => void;
  button1Color?: string;
  button2Color?: string;
};

export const TwoButtonModal: React.FC<Props> = (props) => {
  const button1Color = {
    color: props.button1Color ? props.button1Color : colors.linkBlue,
  };

  const button2Color = {
    color: props.button2Color ? props.button2Color : colors.coral,
  };

  return (
    <ModalContainer>
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
  button1Text: {
    textAlign: 'center',
  },
  button2Text: {
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
