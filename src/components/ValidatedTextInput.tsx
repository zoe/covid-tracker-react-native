import { Icon } from 'native-base';
import React, { Component } from 'react';
import { StyleSheet, TextInput, TextInputProps, View } from 'react-native';

import Error from '@assets/icons/Error';
import { colors } from '@theme';

interface Props extends TextInputProps {
  error?: any;
}

export class ValidatedTextInput extends Component<Props, object> {
  private textInput: any;

  focus() {
    this.textInput.focus();
  }

  render() {
    const { error } = this.props;
    return (
      <View
        style={[
          styles.inputWrapper,
          {
            borderColor: error ? colors.feedbackBad : 'transparent',
          },
        ]}>
        <TextInput
          ref={(input) => (this.textInput = input)}
          style={styles.inputStyle}
          placeholderTextColor={colors.secondary}
          {...this.props}
        />
        {error && <Error />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputWrapper: {
    backgroundColor: colors.backgroundTertiary,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    borderWidth: 1,
    paddingRight: 8,
  },
  inputStyle: {
    color: colors.primary,
    flex: 1,
    height: 48,
    fontSize: 16,
    paddingLeft: 12,
    paddingRight: 16,
  },
});
