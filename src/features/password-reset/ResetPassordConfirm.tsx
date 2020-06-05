import { BrandedButton, HeaderText, RegularText } from '@covid/components/Text';
import i18n from '@covid/locale/i18n';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors } from '@theme';
import React, { Component } from 'react';
import { Keyboard, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';

import { ScreenParamList } from '../ScreenParamList';

type PropsType = {
  navigation: StackNavigationProp<ScreenParamList, 'ResetPasswordConfirm'>;
};

type State = {
  errorMessage: string;
  enableSubmit: boolean;
};

export class ResetPasswordConfirmScreen extends Component<PropsType, State> {
  constructor(props: PropsType) {
    super(props);
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.rootContainer}>
          <View style={styles.formItem}>
            <HeaderText>{i18n.t('reset-password-confirm.title')}</HeaderText>

            <RegularText style={{ paddingTop: 24 }}>{i18n.t('reset-password-confirm.text')}</RegularText>

            <BrandedButton style={{ marginTop: 32 }} onPress={() => this.props.navigation.navigate('Login')}>
              {i18n.t('reset-password-confirm.button')}
            </BrandedButton>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: colors.backgroundPrimary,
    paddingHorizontal: 24,
    paddingTop: 56,
  },
  formItem: {
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
});
