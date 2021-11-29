import { BrandedButton } from '@covid/components';
import { Screen } from '@covid/components/Screen';
import { HeaderText, RegularText } from '@covid/components/Text';
import { ScreenParamList } from '@covid/features';
import i18n from '@covid/locale/i18n';
import { sizes, styling } from '@covid/themes';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors } from '@theme';
import * as React from 'react';
import { View } from 'react-native';

type TProps = {
  navigation: StackNavigationProp<ScreenParamList, 'ResetPasswordConfirm'>;
};

type TState = {
  errorMessage: string;
  enableSubmit: boolean;
};

export class ResetPasswordConfirmScreen extends React.Component<TProps, TState> {
  render() {
    return (
      <Screen backgroundColor={colors.backgroundPrimary} testID="reset-password-confirm-screen">
        <HeaderText>{i18n.t('reset-password-confirm.title')}</HeaderText>

        <RegularText style={{ paddingTop: sizes.l }}>{i18n.t('reset-password-confirm.text')}</RegularText>

        <View style={styling.flex} />

        <BrandedButton onPress={() => this.props.navigation.navigate('Login')}>
          {i18n.t('reset-password-confirm.button')}
        </BrandedButton>
      </Screen>
    );
  }
}
