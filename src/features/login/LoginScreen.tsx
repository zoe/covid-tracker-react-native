import { BrandedButton, ClickableText, HeaderLightText, RegularText } from '@covid/components/Text';
import Analytics from '@covid/core/Analytics';
import { UserNotFoundException } from '@covid/core/Exception';
import UserService, { isUSCountry } from '@covid/core/user/UserService';
import i18n from '@covid/locale/i18n';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors, fontStyles } from '@theme';
import { Icon, Input, Item, Label, Toast } from 'native-base';
import React, { Component } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import { ScreenParamList } from '../ScreenParamList';

type PropsType = {
  navigation: StackNavigationProp<ScreenParamList, 'Login'>;
  routeProp: RouteProp<ScreenParamList, 'Login'>;
};

type StateType = {
  hasUserValidationError: boolean;
  hasPassValidationError: boolean;
};

const initialState: StateType = {
  hasUserValidationError: false,
  hasPassValidationError: false,
};

export class LoginScreen extends Component<PropsType, StateType> {
  private passwordField: Input | null;
  private errorMessage = '';
  private username = '';
  private password = '';

  constructor(props: PropsType) {
    super(props);
    this.state = initialState;
    this.handleLogin = this.handleLogin.bind(this);
  }

  checkFieldsFilled() {
    return !(this.state.hasPassValidationError || this.state.hasUserValidationError);
  }

  handleLogin() {
    this.errorMessage = '';
    const username = this.username.trim();
    this.setState({
      hasUserValidationError: username == '',
      hasPassValidationError: this.password == '',
    });

    if (username == '' || this.password == '') {
      return;
    }

    const userService = new UserService();
    userService
      .login(username, this.password)
      .then((response) => {
        const isTester = response.user.is_tester;
        Analytics.identify({ isTester });

        // TODO: Support multiple users.
        const patientId = response.user.patients[0];
        this.props.navigation.reset({
          index: 0,
          routes: [{ name: 'WelcomeRepeat', params: { patientId } }],
        });
      })
      .catch((error) => {
        if (error.constructor === UserNotFoundException) {
          this.errorMessage = i18n.t('login.user-not-found-exception');
        } else {
          this.errorMessage = i18n.t('login.exception');
        }
        Toast.show({
          text: this.errorMessage,
          duration: 2500,
        });
      });
  }

  // todo: validation for email

  render() {
    const registerStartLink = isUSCountry() ? (
      <ClickableText onPress={() => this.props.navigation.navigate('BeforeWeStartUS')}>
        {i18n.t('login.create-account')}
      </ClickableText>
    ) : (
      <ClickableText onPress={() => this.props.navigation.navigate('Consent', { viewOnly: false })}>
        {i18n.t('login.create-account')}
      </ClickableText>
    );

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView style={styles.rootContainer} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <View>
            <HeaderLightText style={styles.titleText}>{i18n.t('login.title')}</HeaderLightText>

            <View style={styles.formItem}>
              <Item style={styles.labelPos} floatingLabel error={this.state.hasUserValidationError}>
                <Label style={styles.labelStyle}>{i18n.t('login.email-label')}</Label>
                <Input
                  keyboardType="email-address"
                  autoCapitalize="none"
                  returnKeyType="next"
                  autoCompleteType="email"
                  onChangeText={(username) => {
                    this.username = username;
                    if (this.state.hasUserValidationError) {
                      this.setState({ hasUserValidationError: false });
                    }
                  }}
                  onSubmitEditing={() => {
                    // This complains (but still works) due to issue with Native Base: https://github.com/GeekyAnts/NativeBase/issues/1803 so we force ignore.
                    // @ts-ignore
                    this.passwordField._root.focus();
                  }}
                  blurOnSubmit={false}
                />
                {this.state.hasUserValidationError && <Icon name="close" />}
              </Item>
            </View>
            <View style={styles.formItem}>
              <Item style={styles.labelPos} floatingLabel error={this.state.hasPassValidationError}>
                <Label style={styles.labelStyle}>{i18n.t('login.password-label')}</Label>
                <Input
                  secureTextEntry
                  returnKeyType="go"
                  onChangeText={(password) => {
                    this.password = password;
                    if (this.state.hasPassValidationError) {
                      this.setState({ hasPassValidationError: false });
                    }
                  }}
                  getRef={(inputField) => {
                    this.passwordField = inputField;
                  }}
                  onSubmitEditing={this.handleLogin}
                />
                {this.state.hasPassValidationError && <Icon name="close" />}
              </Item>
            </View>
          </View>

          <View>
            <BrandedButton onPress={this.handleLogin} hideLoading enable={this.checkFieldsFilled()}>
              <Text>{i18n.t('login.button')}</Text>
            </BrandedButton>
            <View style={styles.bottomTextView}>
              <RegularText>{i18n.t('login.dont-have-account')}</RegularText>
              <RegularText> </RegularText>
              {registerStartLink}
            </View>

            <View style={styles.bottomTextView2}>
              <ClickableText onPress={() => this.props.navigation.navigate('ResetPassword')}>
                {i18n.t('login.forgot-your-password')}
              </ClickableText>
            </View>
          </View>
        </KeyboardAvoidingView>
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
  titleText: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  forgotPasswordText: {
    color: colors.brand,
    alignSelf: 'center',
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
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: colors.backgroundPrimary,
  },
  bottomTextView2: {
    paddingBottom: 24,
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: colors.backgroundPrimary,
  },
});
