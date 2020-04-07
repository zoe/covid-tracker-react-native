import React, {Component} from "react";
import {Keyboard, KeyboardAvoidingView, Platform, StyleSheet, TouchableWithoutFeedback, View} from "react-native";
import {StackNavigationProp} from "@react-navigation/stack";
import {Form} from 'native-base';
import {colors} from "../../../theme";
import {Formik} from "formik";
import * as Yup from "yup";
import {ValidatedTextInput} from "../../components/ValidatedTextInput";
import UserService from "../../core/user/UserService";
import {BrandedButton, ErrorText, HeaderText} from "../../components/Text";
import {AxiosError} from "axios";
import {ScreenParamList} from "../ScreenParamList";

type PropsType = {
    navigation: StackNavigationProp<ScreenParamList, 'ResetPassword'>
}

type State = {
    errorMessage: string;
    enableSubmit: boolean;
}

const initialState: State = {
    errorMessage: "",
    enableSubmit: true,
};

interface ResetPasswordData {
    email: string;
}

export class ResetPasswordScreen extends Component<PropsType, State> {
    private passwordComponent: any;


    constructor(props: PropsType) {
        super(props);
        this.state = initialState;
    }

    private handleClick(formData: ResetPasswordData) {
        if (this.state.enableSubmit) {
            this.setState({enableSubmit: false}); // Stop resubmissions
            const userService = new UserService(); // todo get gloval var
            userService.resetPassword(formData.email)
                .then(response => this.props.navigation.navigate("ResetPasswordConfirm"))
                .catch((err: AxiosError) => {
                    this.setState({errorMessage: "Error #02. Please report this to covid-bugs@joinzoe.com: " + err.message});
                    this.setState({enableSubmit: true});
                });
        }
    }

    registerSchema = Yup.object().shape({
        email: Yup.string().email().required(),
    });

    render() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView style={styles.rootContainer} behavior={Platform.OS === "ios" ? "padding" : undefined}>

                    <Formik
                        initialValues={{email: ""}}
                        validationSchema={this.registerSchema}
                        onSubmit={(values: ResetPasswordData) => this.handleClick(values)}
                    >
                        {props => {
                            return (
                                <View>
                                    <View style={styles.formItem}>
                                        <HeaderText>Enter your email and we’ll send you a link to reset your password</HeaderText>
                                        <Form>
                                            <ValidatedTextInput
                                                keyboardType="email-address"
                                                autoCapitalize="none"
                                                autoCompleteType="email"
                                                placeholder="email"
                                                value={props.values.email}
                                                onChangeText={props.handleChange("email")}
                                                onBlur={props.handleBlur("email")}
                                                error={props.touched.email && props.errors.email}
                                                returnKeyType="go"
                                            />

                                            {props.touched.email && props.errors.email &&
                                            <ErrorText>Please enter a valid email</ErrorText>
                                            }
                                        </Form>
                                    </View>
                                    <View>
                                        <ErrorText>{this.state.errorMessage}</ErrorText>
                                    </View>

                                    <View>
                                        <BrandedButton onPress={props.handleSubmit}>Reset password</BrandedButton>
                                    </View>
                                </View>
                            );
                        }}
                    </Formik>
                </KeyboardAvoidingView>
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
    formItem: {
        paddingHorizontal: 16,
        paddingVertical: 4,
    },
});
