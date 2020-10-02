import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { View } from 'native-base';

import { RegularBoldText, RegularText } from '@covid/components/Text';
import { colors } from '@theme';
import { ModalContainer } from '@covid/components/ModalContainer';

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
      {props.headerText && <RegularBoldText style={styles.header}>{props.headerText}</RegularBoldText>}
      <RegularText style={styles.text}>{props.bodyText}</RegularText>

      <View style={styles.actionContainer}>
        <TouchableOpacity style={styles.button} onPress={props.button1Callback}>
          <RegularText style={[styles.button1Text, button1Color]}>{props.button1Text}</RegularText>
        </TouchableOpacity>
        <View style={styles.verticalDivider} />
        <TouchableOpacity style={styles.button} onPress={props.button2Callback}>
          <RegularText style={[styles.button2Text, button2Color]}>{props.button2Text}</RegularText>
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
  button1Text: {
    textAlign: 'center',
  },
  button2Text: {
    textAlign: 'center',
  },
  button: {
    width: '50%',
    height: 50,
    justifyContent: 'center',
  },
});
