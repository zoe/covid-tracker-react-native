import React, {Component} from "react";
import {Keyboard, StyleSheet, TouchableWithoutFeedback, View} from "react-native";
import {StackNavigationProp} from "@react-navigation/stack";
import {ScreenParamList} from "../ScreenParamList";
import {BrandedButton, HeaderText, RegularText} from "../../components/Text";

type PropsType = {
    navigation: StackNavigationProp<ScreenParamList, 'ResetPasswordConfirm'>
}

type State = {
    errorMessage: string;
    enableSubmit: boolean;
}

export class ResetPasswordConfirmScreen extends Component<PropsType, State> {
    constructor(props: PropsType) {
        super(props);
    }

    render() {
        return (

            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View>
                    <View style={styles.formItem}>
                        <HeaderText style={{paddingTop: 32}}>Check your email</HeaderText>
                        <RegularText style={{paddingTop: 24}}>We've sent you a password reset link.</RegularText>

                        <BrandedButton style={{marginTop: 32}} onPress={() => this.props.navigation.navigate('Login')}>Back</BrandedButton>
                    </View>


                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    formItem: {
        paddingHorizontal: 16,
        paddingVertical: 4,
    },
});
