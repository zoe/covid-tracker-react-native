import React, {Component} from "react";
import {Keyboard, KeyboardAvoidingView, Platform, StyleSheet, TouchableWithoutFeedback, View} from "react-native";
import {StackNavigationProp} from "@react-navigation/stack";
import {Form, Label} from 'native-base';
import {colors} from "../../../theme";
import i18n from "../../locale/i18n"
import {Formik} from "formik";
import * as Yup from "yup";
import {ValidatedTextInput} from "../../components/ValidatedTextInput";
import UserService from "../../core/user/UserService";
import {BrandedButton, ClickableText, ErrorText, HeaderText, RegularText} from "../../components/Text";
import {AxiosError} from "axios";
import {ScreenParamList} from "../ScreenParamList";

type PropsType = {
    navigation: StackNavigationProp<ScreenParamList, 'Register'>
}

type State = {
    errorMessage: string;
    enableSubmit: boolean;
}

const initialState: State = {
    errorMessage: "",
    enableSubmit: true,
};

interface RegistrationData {
    email: string;
    password: string;
}

export class RegisterScreen extends Component<PropsType, State> {
    private passwordComponent: any;


    constructor(props: PropsType) {
        super(props);
        this.state = initialState;
    }

    private handleCreateAccount(formData: RegistrationData) {
        if (this.state.enableSubmit) {
            this.setState({enableSubmit: false}); // Stop resubmissions
            const userService = new UserService(); // todo get gloval var
            userService.register(formData.email, formData.password)
                .then(response => this.props.navigation.replace("OptionalInfo", {user: response.data.user}))
                .catch((err: AxiosError) => {
                    // TODO - These error messages are misleading and we could dispaly what the server sends back
                    if (err.response?.status == 500)
                        this.setState({errorMessage: i18n.t("create-account-already-registered")});
                    else if (err.response?.status == 400)
                        this.setState({errorMessage: i18n.t("create-account-password-too-simple")});
                    else
                        this.setState({errorMessage: "Something went wrong: " + err.response?.status});

                    this.setState({enableSubmit: true});
                })
                // do nothing for now but find a way to report it somewhere?
                .catch((err: Error) => {
                    this.setState({errorMessage: "Error #01. Please report this to covid-bugs@joinzoe.com: " + err.message});
                    this.setState({enableSubmit: true});
                });
        }

    }

    registerSchema = Yup.object().shape({
        email: Yup.string().email().required(),
        password: Yup.string().required().min(8) // todo: complicated enough...
    });

    /*   .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    ) */

    render() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView style={styles.rootContainer} behavior={Platform.OS === "ios" ? "padding" : undefined}>

                    <Formik
                        initialValues={{email: "", postcode: "", password: ""}}
                        validationSchema={this.registerSchema}
                        onSubmit={(values: RegistrationData) => this.handleCreateAccount(values)}
                    >
                        {props => {
                            return (
                                <View>

                                    <View>
                                        <HeaderText>{i18n.t("create-account-title")}</HeaderText>
                                        <View style={styles.login}>
                                            <RegularText>
                                                <ClickableText onPress={() => this.props.navigation.navigate('Login')}>{i18n.t("create-account-login")}</ClickableText>
                                                {" "}
                                                {i18n.t("create-account-if-you-have-an-account")}
                                            </RegularText>
                                        </View>
                                        <Form>

                                            <Label>Email</Label>
                                            <ValidatedTextInput
                                                keyboardType="email-address"
                                                autoCapitalize="none"
                                                autoCompleteType="email"
                                                placeholder="email"
                                                value={props.values.email}
                                                onChangeText={props.handleChange("email")}
                                                onBlur={props.handleBlur("email")}
                                                error={props.touched.email && props.errors.email}
                                                returnKeyType="next"
                                                onSubmitEditing={() => {
                                                    this.passwordComponent.focus();
                                                }}
                                            />

                                            {props.touched.email && props.errors.email &&
                                            <ErrorText>Please enter a valid email</ErrorText>
                                            }

                                            <Label>Password</Label>
                                            <ValidatedTextInput
                                                ref={(input) => this.passwordComponent = input}
                                                secureTextEntry
                                                placeholder="password"
                                                returnKeyType="go"
                                                value={props.values.password}
                                                onChangeText={props.handleChange("password")}
                                                onBlur={props.handleBlur("password")}
                                                onSubmitEditing={props.handleSubmit}
                                                error={props.touched.password && props.errors.password}
                                            />

                                            {props.touched.password && props.errors.password &&
                                            <ErrorText>Your password must be at least 8 characters with letters</ErrorText>
                                            }

                                        </Form>
                                    </View>
                                    <View>
                                        <ErrorText>{this.state.errorMessage}</ErrorText>
                                    </View>

                                    <View>
                                        <BrandedButton onPress={props.handleSubmit}>{i18n.t("create-account-btn")}</BrandedButton>
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
    login: {
        flexDirection: "row",
        paddingBottom: 20,
    },

});
