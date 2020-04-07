import React, {Component} from "react";
import {Keyboard, KeyboardAvoidingView, Platform, StyleSheet, TouchableWithoutFeedback, View} from "react-native";
import {StackNavigationProp} from "@react-navigation/stack";
import {Form, Label, Item, Icon} from 'native-base';
import {colors, fontStyles} from "../../../theme";
import i18n from "../../locale/i18n"
import {Formik} from "formik";
import * as Yup from "yup";
import {ValidatedTextInput} from "../../components/ValidatedTextInput";
import UserService from "../../core/user/UserService";
import {BrandedButton, ClickableText, ErrorText, HeaderText, RegularText} from "../../components/Text";
import {AxiosError} from "axios";
import {ScreenParamList} from "../ScreenParamList";
import { Field, FieldError } from "../../components/Forms";

type PropsType = {
    navigation: StackNavigationProp<ScreenParamList, 'Register'>
}

type State = {
    errorMessage: string;
    enableSubmit: boolean;

    accountExists: boolean;
}

const initialState: State = {
    errorMessage: "",
    enableSubmit: true,
    accountExists: false,
};

interface RegistrationData {
    email: string;
    password: string;
}
const initialRegistrationValues = {
    email: "",
    password: ""
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
                    // TODO - These error messages are misleading and we could display what the server sends back
                    if (err.response?.status == 500) {
                        this.setState({
                            errorMessage: i18n.t("create-account-already-registered"),
                            accountExists: true,
                            enableSubmit: false,
                        });
                    }
                    else if (err.response?.status == 400) {
                        this.setState({
                            errorMessage: i18n.t("create-account-password-too-simple"),
                            enableSubmit: true,
                            accountExists: false
                        });
                    }
                    else {
                        this.setState({
                            errorMessage: "Something went wrong: " + err.response?.status,
                            enableSubmit: true,
                            accountExists: false
                        });
                    }

                })
                // do nothing for now but find a way to report it somewhere?
                .catch((err: Error) => {
                    this.setState({errorMessage: "Error #01. Please report this to covid-bugs@joinzoe.com: " + err.message});
                    this.setState({enableSubmit: true});
                });
        }

    }

    gotoLogin = () => {
        this.props.navigation.replace("Login", {terms: ""});
    }

    registerSchema = Yup.object().shape({
        email: Yup.string()
            .required("Please enter your email address")
            .email("Please correct your email address"),
        password: Yup.string()
            .required("Please enter a password")
            .min(8, "Your password must be at least 8 characters with letters") // todo: complicated enough...
    });

    /*   .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    ) */

    render() {
        return (
            <Formik
                initialValues={initialRegistrationValues}
                validationSchema={this.registerSchema}
                onSubmit={(values: RegistrationData) => this.handleCreateAccount(values)}
            >
                {props => {
                    return (
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <KeyboardAvoidingView style={styles.rootContainer} behavior={Platform.OS === "ios" ? "padding" : undefined}>
                        <View>

                            <View style={styles.loginHeader}>
                                <HeaderText style={fontStyles.h1Light}>{i18n.t("create-account-title")}</HeaderText>
                                <View style={styles.loginSubtitle}>
                                    <RegularText>
                                        {i18n.t("create-account-if-you-have-an-account")}
                                        {" "}
                                        <ClickableText
                                            onPress={() => this.props.navigation.navigate('Login')}
                                            style={{color: colors.feedbackBad}}
                                        >{i18n.t("create-account-login")}</ClickableText>
                                    </RegularText>
                                </View>
                            </View>

                            <Form style={styles.form}>
                                <View style={styles.formItem}>
                                    <Field>
                                        <Label style={styles.labelStyle}>{i18n.t("create-account-email")}</Label>
                                        <ValidatedTextInput
                                            keyboardType="email-address"
                                            autoCapitalize="none"
                                            autoCompleteType="email"
                                            placeholder={i18n.t("create-account-email")}
                                            value={props.values.email}
                                            onChangeText={props.handleChange("email")}
                                            onBlur={props.handleBlur("email")}
                                            error={
                                                (props.touched.email && props.errors.email)
                                                || this.state.accountExists
                                            }
                                            returnKeyType="next"
                                            onSubmitEditing={() => {
                                                this.passwordComponent.focus();
                                            }}
                                        />
                                        {!!props.touched.email && !!props.errors.email &&
                                            <FieldError>{props.errors.email}</FieldError>
                                        }
                                        {this.state.accountExists && (
                                            <FieldError>{i18n.t("create-account-already-registered")}</FieldError>
                                        )}
                                    </Field>
                                </View>

                                <View style={styles.formItem}>
                                    <Field>
                                        <Label style={styles.labelStyle}>{i18n.t("create-account-password")}</Label>
                                        <ValidatedTextInput
                                            ref={(input) => this.passwordComponent = input}
                                            secureTextEntry
                                            placeholder={i18n.t("create-account-password")}
                                            returnKeyType="go"
                                            value={props.values.password}
                                            onChangeText={props.handleChange("password")}
                                            onBlur={props.handleBlur("password")}
                                            onSubmitEditing={(event) => props.handleSubmit()}
                                            error={props.touched.password && props.errors.password}
                                        />
                                        {!!props.touched.password && !!props.errors.password &&
                                            <FieldError>{props.errors.password}</FieldError>
                                        }
                                    </Field>
                                </View>

                            </Form>

                            {this.state.accountExists && (
                                <View style={styles.nextAction}>
                                    <RegularText style={{ textAlign: "center" }}>
                                        <ClickableText onPress={this.gotoLogin}
                                            style={{color: colors.feedbackBad}}
                                        >Log in</ClickableText>
                                        {" "}
                                        to existing account.
                                    </RegularText>
                                </View>
                            )}
                        </View>
                        <View style={styles.actionBlock}>
                            { !!this.state.errorMessage && !this.state.accountExists && (
                                <View>
                                    <ErrorText>{this.state.errorMessage}</ErrorText>
                                </View>
                            )}
                            <View>
                                <BrandedButton
                                    onPress={props.handleSubmit}
                                    enable={this.state.enableSubmit}
                                >{i18n.t("create-account-btn")}</BrandedButton>
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                </TouchableWithoutFeedback>
                    );
                }}
            </Formik>
        );
    }
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        justifyContent: "space-between",
        backgroundColor: colors.backgroundPrimary,
        paddingHorizontal: 24,
        paddingTop: 56,
    },
    loginHeader: {
        marginTop: 30,
        marginHorizontal: 16,
    },
    loginSubtitle: {
        marginTop: 16,
    },

    titleText: {
        paddingHorizontal: 16,
        paddingBottom: 16
    },

    form: {
        marginVertical: 16,
    },

    formItem: {
        paddingVertical: 4,
    },
    labelStyle: {
        color: colors.tertiary,
        fontSize: 16,
        position: 'absolute',
        left: -16384,
    },
    fieldError: {
        marginVertical: 4,
    },
    errorText: {
        color: colors.feedbackBad
    },

    actionBlock: {
        marginBottom: 16,
    },
    nextAction: {
        marginVertical: 8
    }
});
