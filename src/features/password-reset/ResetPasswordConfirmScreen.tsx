import { BrandedButton } from '@covid/components';
import { HeaderText, RegularText } from '@covid/components/Text';
import { ScreenParamList } from '@covid/features';
import i18n from '@covid/locale/i18n';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors } from '@theme';
import * as React from 'react';
import { Keyboard, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';

type PropsType = {
  navigation: StackNavigationProp<ScreenParamList, 'ResetPasswordConfirm'>;
};

type State = {
  errorMessage: string;
  enableSubmit: boolean;
};

export class ResetPasswordConfirmScreen extends React.Component<PropsType, State> {
  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.rootContainer}>
          <View style={styles.formItem}>
            <HeaderText>{i18n.t('reset-password-confirm.title')}</HeaderText>

            <RegularText style={{ paddingTop: 24 }}>{i18n.t('reset-password-confirm.text')}</RegularText>

            <BrandedButton onPress={() => this.props.navigation.navigate('Login')} style={{ marginTop: 32 }}>
              {i18n.t('reset-password-confirm.button')}
            </BrandedButton>
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
  rootContainer: {
    backgroundColor: colors.backgroundPrimary,
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 56,
  },
});
