import Error from '@assets/icons/Error';
import { colors } from '@theme';
import React, { Component } from 'react';
import { StyleSheet, TextInput, TextInputProps, View } from 'react-native';

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
        ]}
      >
        <TextInput
          placeholderTextColor={colors.secondary}
          ref={(input) => (this.textInput = input)}
          style={[styles.inputStyle, this.props.multiline ? styles.multipleLines : styles.singleLine]}
          {...this.props}
        />
        {error ? <Error /> : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputStyle: {
    color: colors.primary,
    flex: 1,
    fontFamily: 'SofiaProRegular',
    fontSize: 16,
    paddingLeft: 12,
    paddingRight: 16,
  },
  inputWrapper: {
    alignItems: 'center',
    backgroundColor: colors.backgroundTertiary,
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
    paddingRight: 8,
  },
  multipleLines: {
    height: 96,
    marginVertical: 8,
  },
  singleLine: {
    height: 48,
  },
});
