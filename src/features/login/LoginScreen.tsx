import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Formik, Field } from "formik";
import { Input, Item, Label, Toast } from "native-base";
import React from "react";
import {
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import * as Yup from "yup";

import { colors } from "../../../theme";
import { FieldError } from "../../components/Forms";
import {
    BrandedButton,
    ClickableText,
    HeaderLightText,
    RegularText,
} from "../../components/Text";
import { UserNotFoundException } from "../../core/Exception";
import UserService, { isUSLocale } from "../../core/user/UserService";
import i18n from "../../locale/i18n";
import { ScreenParamList } from "../ScreenParamList";

type PropsType = {
    navigation: StackNavigationProp<ScreenParamList, "Login">;
    routeProp: RouteProp<ScreenParamList, "Login">;
};

interface LoginSubmitProps {
    username: string;
    password: string;
}

const RegisterStartLink: React.FC<PropsType> = ({ navigation }) => {
    return isUSLocale() ? (
        <ClickableText onPress={() => navigation.navigate("BeforeWeStartUS")}>
            {i18n.t("login.create-account")}
        </ClickableText>
    ) : (
        <ClickableText
            onPress={() =>
                navigation.navigate("Consent", {
                    viewOnly: false,
                })
            }
        >
            {i18n.t("login.create-account")}
        </ClickableText>
    );
};
const initialValues: LoginSubmitProps = {
    username: "",
    password: "",
};

export const LoginScreen: React.FC<PropsType> = (props) => {
    const getWelcomeRepeatScreenName = () => {
        return isUSLocale() ? "WelcomeRepeatUS" : "WelcomeRepeat";
    };
    const registerSchema = Yup.object().shape({
        username: Yup.string()
            .required(i18n.t("create-account.email-required"))
            .email(i18n.t("create-account.email-error")),
    });

    const handleLogin = async ({ username, password }: LoginSubmitProps) => {
        const userService = new UserService();

        try {
            const response = await userService.login(username.trim(), password);
            const patientId = response.user.patients[0];
            props.navigation.reset({
                index: 0,
                routes: [
                    {
                        name: getWelcomeRepeatScreenName(),
                        params: { patientId },
                    },
                ],
            });
        } catch (error) {
            const errorMessage = i18n.t(
                error.constructor === UserNotFoundException
                    ? "login.user-not-found-exception"
                    : "login.exception"
            );

            Toast.show({
                text: errorMessage,
                duration: 2500,
            });
        }
    };

    let inputEl: any | null = null;

    return (
        <Formik
            onSubmit={handleLogin}
            initialValues={initialValues}
            validationSchema={registerSchema}
            validateOnBlur
            validateOnChange={false}
        >
            {({ handleSubmit, handleChange, values, ...formikProps }) => {
                console.log(formikProps.touched);
                return (
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <KeyboardAvoidingView
                            style={styles.rootContainer}
                            behavior={
                                Platform.OS === "ios" ? "padding" : undefined
                            }
                        >
                            <View>
                                <HeaderLightText style={styles.titleText}>
                                    {i18n.t("login.title")}
                                </HeaderLightText>

                                <View style={styles.formItem}>
                                    <Item style={styles.labelPos} floatingLabel>
                                        <Field name="username">
                                            <Input
                                                keyboardType="email-address"
                                                autoCapitalize="none"
                                                returnKeyType="next"
                                                autoCompleteType="email"
                                                onChangeText={handleChange(
                                                    "username"
                                                )}
                                                onBlur={formikProps.handleBlur(
                                                    "username"
                                                )}
                                                onSubmitEditing={() => {
                                                    !!inputEl._root &&
                                                        inputEl._root.focus();
                                                }}
                                                blurOnSubmit={false}
                                            />
                                        </Field>
                                        <Label style={styles.labelStyle}>
                                            {i18n.t("login.email-label")}
                                        </Label>
                                        <Input
                                            keyboardType="email-address"
                                            autoCapitalize="none"
                                            returnKeyType="next"
                                            autoCompleteType="email"
                                            onChangeText={handleChange(
                                                "username"
                                            )}
                                            onBlur={formikProps.handleBlur(
                                                "password"
                                            )}
                                            onSubmitEditing={() => {
                                                !!inputEl._root &&
                                                    inputEl._root.focus();
                                            }}
                                            blurOnSubmit={false}
                                        />
                                    </Item>
                                    {formikProps.errors.username && (
                                        <FieldError>
                                            {formikProps.errors.username}
                                        </FieldError>
                                    )}
                                </View>
                                <View style={styles.formItem}>
                                    <Item style={styles.labelPos} floatingLabel>
                                        <Label style={styles.labelStyle}>
                                            {i18n.t("login.password-label")}
                                        </Label>
                                        <Input
                                            secureTextEntry
                                            returnKeyType="go"
                                            onChangeText={handleChange(
                                                "password"
                                            )}
                                            getRef={(a) => (inputEl = a)}
                                            onSubmitEditing={() =>
                                                handleSubmit()
                                            }
                                        />
                                    </Item>
                                </View>
                            </View>

                            <View>
                                <BrandedButton
                                    onPress={() => handleSubmit()}
                                    enable={
                                        !formikProps.isSubmitting &&
                                        !!values.username &&
                                        !!values.password
                                    }
                                    hideLoading={!formikProps.isSubmitting}
                                >
                                    <Text>{i18n.t("login.button")}</Text>
                                </BrandedButton>
                                <View style={styles.bottomTextView}>
                                    <RegularText>
                                        {i18n.t("login.dont-have-account")}
                                    </RegularText>
                                    <RegularText> </RegularText>
                                    <RegisterStartLink {...props} />
                                </View>

                                <View style={styles.bottomTextView2}>
                                    <ClickableText
                                        onPress={() =>
                                            props.navigation.navigate(
                                                "ResetPassword"
                                            )
                                        }
                                    >
                                        {i18n.t("login.forgot-your-password")}
                                    </ClickableText>
                                </View>
                            </View>
                        </KeyboardAvoidingView>
                    </TouchableWithoutFeedback>
                );
            }}
        </Formik>
    );
};

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        justifyContent: "space-between",
        backgroundColor: colors.backgroundPrimary,
        paddingHorizontal: 24,
        paddingTop: 56,
    },
    titleText: {
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
    forgotPasswordText: {
        color: colors.brand,
        alignSelf: "center",
        padding: 40,
    },
    formItem: {
        paddingHorizontal: 16,
        paddingVertical: 4,
    },
    labelStyle: {
        color: colors.tertiary,
        fontSize: 16,
    },
    labelPos: {
        paddingBottom: 8,
    },
    bottomTextView: {
        paddingTop: 24,
        paddingBottom: 6,
        paddingHorizontal: 23,
        justifyContent: "center",
        flexDirection: "row",
        backgroundColor: colors.backgroundPrimary,
    },
    bottomTextView2: {
        paddingBottom: 24,
        justifyContent: "center",
        flexDirection: "row",
        backgroundColor: colors.backgroundPrimary,
    },
});
