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
import i18n from "../../locale/i18n";

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

    constructor(props: PropsType) {
        super(props);
        this.state = initialState;
    }

    private handleClick(formData: ResetPasswordData) {
        if (this.state.enableSubmit) {
            this.setState({enableSubmit: false}); // Stop resubmissions
            const userService = new UserService(); // todo get global var
            userService.resetPassword(formData.email)
                .then(response => this.props.navigation.navigate("ResetPasswordConfirm"))
                .catch((err: AxiosError) => {
                    this.setState({errorMessage:  i18n.t("reset-password.error", {msg: err.message})});
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
                                        <HeaderText>{i18n.t("reset-password.title")}</HeaderText>
                                        <Form>
                                            <ValidatedTextInput
                                                keyboardType="email-address"
                                                autoCapitalize="none"
                                                autoCompleteType="email"
                                                placeholder={i18n.t("reset-password.email-label")}
                                                value={props.values.email}
                                                onChangeText={props.handleChange("email")}
                                                onBlur={props.handleBlur("email")}
                                                error={props.touched.email && props.errors.email}
                                                returnKeyType="go"
                                            />

                                            {props.touched.email && props.errors.email &&
                                            <ErrorText> {i18n.t("reset-password.email-error")}</ErrorText>
                                            }
                                        </Form>
                                    </View>
                                    <View>
                                        <ErrorText>{this.state.errorMessage}</ErrorText>
                                    </View>

                                    <View>
                                        <BrandedButton onPress={props.handleSubmit}>
                                            {i18n.t("reset-password.button")}
                                        </BrandedButton>
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
