import React, {Component} from "react";
import {StyleSheet, TextInput, TextInputProps, View} from "react-native";
import {colors} from "../../theme";
import {Icon} from "native-base";

interface Props extends TextInputProps {
    error?: any;
}

// todo: icon
export class ValidatedTextInput extends Component<Props, {}> {
    private textInput: any;

    focus() {
        this.textInput.focus();
    }

    render() {
        const {error} = this.props;
        return (
          <View style={{flexDirection: "row"}}>
              <TextInput
                ref={(input) => this.textInput = input}
                {...this.props}
                style={[
                    styles.inputStyle,
                    {borderBottomColor: error ? colors.feedbackBad : colors.tertiary}
                ]}
              />
              {error && <Icon name='close' style={{color: colors.feedbackBad}}/>}
          </View>
        );
    }
}

const styles = StyleSheet.create({
    inputStyle: {
        flex: 1,
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: colors.primary,
        fontSize: 16,
        marginVertical: 10
    }
});
