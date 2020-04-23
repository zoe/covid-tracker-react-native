import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { Keyboard, StyleSheet, TouchableWithoutFeedback, View } from "react-native";

import { colors } from "../../../theme";
import { BrandedButton, HeaderText, RegularText } from "../../components/Text";
import i18n from "../../locale/i18n";
import { ScreenParamList } from "../ScreenParamList";

type PropsType = {
  navigation: StackNavigationProp<ScreenParamList, "ResetPasswordConfirm">;
};

const ResetPasswordConfirmScreen: React.FC<PropsType> = ({ navigation }) => (
  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.rootContainer}>
      <View style={styles.formItem}>
        <HeaderText>{i18n.t("reset-password-confirm.title")}</HeaderText>

        <RegularText style={styles.passwordResetConfirm}>
          {i18n.t("reset-password-confirm.text")}
        </RegularText>

        <BrandedButton style={styles.login} onPress={() => navigation.navigate("Login")}>
          {i18n.t("reset-password-confirm.button")}
        </BrandedButton>
      </View>
    </View>
  </TouchableWithoutFeedback>
);

export default ResetPasswordConfirmScreen;

const styles = StyleSheet.create({
  passwordResetConfirm: {
    paddingTop: 24,
  },
  login: {
    marginTop: 32,
  },
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
