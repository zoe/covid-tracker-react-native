import Error from '@assets/icons/Error';
import { colors } from '@theme';
import * as React from 'react';
import { StyleSheet, TextInput, TextInputProps, View } from 'react-native';

interface Props extends TextInputProps {
  error?: boolean;
  label?: string;
  testID?: string;
}

export class ValidatedTextInput extends React.Component<Props, object> {
  private textInput: TextInput | null;

  focus() {
    this.textInput?.focus();
  }

  render() {
    return (
      <View
        style={[
          styles.inputWrapper,
          {
            borderColor: this.props.error ? colors.feedbackBad : 'transparent',
          },
        ]}
      >
        <TextInput
          placeholderTextColor={colors.secondary}
          ref={(input) => (this.textInput = input)}
          style={[styles.inputStyle, this.props.multiline ? styles.multipleLines : styles.singleLine]}
          {...this.props}
        />
        {this.props.error ? <Error /> : null}
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
  labelStyle: {
    color: colors.primary,
    fontFamily: 'SofiaProRegular',
    fontSize: 16,
    lineHeight: 30,
    marginBottom: 8,
  },
  multipleLines: {
    height: 96,
    marginVertical: 8,
  },
  singleLine: {
    height: 48,
  },
});
