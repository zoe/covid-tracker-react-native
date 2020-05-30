import { colors } from '@theme';
import { Icon } from 'native-base';
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
      <View style={styles.inputWrapper}>
        <TextInput
          ref={(input) => (this.textInput = input)}
          placeholderTextColor={colors.tertiary}
          {...this.props}
          style={[
            styles.inputStyle,
            {
              borderBottomColor: error ? colors.feedbackBad : colors.primary,
            },
          ]}
        />
        {error && <Icon name="close" style={styles.errorIcon} />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputStyle: {
    flex: 1,
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: colors.primary,
    fontSize: 16,
    paddingLeft: 8,
    paddingRight: 16,
    marginVertical: 10,
  },
  errorIcon: {
    color: colors.feedbackBad,
    height: 38,
    marginLeft: -16,
  },
});
