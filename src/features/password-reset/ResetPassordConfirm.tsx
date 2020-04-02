import React, {Component} from "react";
import {Keyboard, StyleSheet, TouchableWithoutFeedback, View} from "react-native";
import {StackNavigationProp} from "@react-navigation/stack";
import {colors} from "../../../theme";
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
    rootContainer: {
        flex: 1,
        justifyContent: "space-between",
        backgroundColor: colors.backgroundPrimary,
        paddingHorizontal: 24,
        paddingTop: 56
    },
    login: {
        flexDirection: "row",
        paddingBottom: 20,
    },
    formItem: {
        paddingHorizontal: 16,
        paddingVertical: 4,
    },
    titleText: {
        paddingHorizontal: 16,
        paddingBottom: 16
    },

    errorText: {
        color: colors.feedbackBad
    }

});
