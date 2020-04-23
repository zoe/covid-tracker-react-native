import { StackNavigationProp } from "@react-navigation/stack";
import { Formik } from "formik";
import { Form } from "native-base";
import React, { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import * as Yup from "yup";

import { colors } from "../../../theme";
import { BrandedButton, ErrorText, HeaderText } from "../../components/Text";
import { ValidatedTextInput } from "../../components/ValidatedTextInput";
import UserService from "../../core/user/UserService";
import i18n from "../../locale/i18n";
import { ScreenParamList } from "../ScreenParamList";

type PropsType = {
  navigation: StackNavigationProp<ScreenParamList, "ResetPassword">;
};

type State = {
  errorMessage?: string;
  enableSubmit: boolean;
};

const initialState: State = {
  enableSubmit: true,
};

interface ResetPasswordData {
  email: string;
}

const registerSchema = Yup.object<ResetPasswordData>().shape({
  email: Yup.string().email().required(),
});

const ResetPasswordScreen: React.FC<PropsType> = ({ navigation }) => {
  const [{ enableSubmit, errorMessage }, setState] = useState<State>(initialState);

  const handleClick = async (formData: ResetPasswordData) => {
    if (!enableSubmit) return;
    setState({ enableSubmit: false }); // Stop resubmissions
    const userService = new UserService(); // todo get global var

    try {
      await userService.resetPassword(formData.email);
      navigation.navigate("ResetPasswordConfirm");
    } catch (error) {
      setState({
        enableSubmit: true,
        errorMessage: i18n.t("reset-password.error", {
          msg: error.message,
        }),
      });
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.rootContainer}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <Formik
          initialValues={{ email: "" }}
          validationSchema={registerSchema}
          onSubmit={(values: ResetPasswordData) => handleClick(values)}
        >
          {({ touched, values, errors, ...props }) => {
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
                      value={values.email}
                      onChangeText={props.handleChange("email")}
                      onBlur={props.handleBlur("email")}
                      error={touched.email && errors.email}
                      returnKeyType="go"
                    />

                    {touched.email && errors.email && (
                      <ErrorText>{i18n.t("reset-password.email-error")}</ErrorText>
                    )}
                  </Form>
                </View>
                <View>
                  <ErrorText>{errorMessage}</ErrorText>
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
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: colors.backgroundPrimary,
    paddingHorizontal: 24,
    paddingTop: 56,
  },
  formItem: {
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
});

export default ResetPasswordScreen;
