import React, { useRef, useState } from 'react';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Input, Item, Label, Toast } from 'native-base';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useDispatch } from 'react-redux';

import { colors } from '@theme';
import { useInjection } from '@covid/provider/services.hooks';
import i18n from '@covid/locale/i18n';
import { IUserService } from '@covid/core/user/UserService';
import { UserNotFoundException } from '@covid/core/Exception';
import Analytics from '@covid/core/Analytics';
import { ClickableText, HeaderLightText, RegularText } from '@covid/components/Text';
import { Services } from '@covid/provider/services.types';
import appCoordinator from '@covid/features/AppCoordinator';
import { setUsername, setPatients } from '@covid/core/state/user';
import { BrandedButton } from '@covid/components';
import { ScreenParamList } from '@covid/features';
import NavigationService from '@covid/NavigatorService';

interface IProps {
  navigation: StackNavigationProp<ScreenParamList, 'Login'>;
  route: RouteProp<ScreenParamList, 'Login'>;
}

type StateType = {
  errorMessage: string;
  hasErrors: boolean;
  isValid: boolean;
  pass: string;
  user: string;
};

function LoginScreen({ route }: IProps) {
  const dispatch = useDispatch();
  const userService = useInjection<IUserService>(Services.User);
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [hasErrors, setHasErrors] = useState(false);
  const [isValid, setIsValidState] = useState(false);
  const passwordInput = useRef(null);

  const handleLogin = () => {
    // this.setState({ isValid: false });

    userService
      .login(user.trim(), pass)
      .then((response) => {
        const isTester = response.user.is_tester;
        Analytics.identify({ isTester });

        // TODO: Support multiple users.
        const patientId = response.user.patients[0];

        dispatch(setUsername(response.user.username));
        dispatch(setPatients(response.user.patients));

        appCoordinator
          .setPatientById(patientId)
          .then(() => appCoordinator.fetchInitialData())
          .then(() => {
            // appCoordinator.gotoNextScreen(route.name);
            NavigationService.navigate('Tab');
          });
      })
      .catch((error) => {
        let errorMessage = '';
        if (error.constructor === UserNotFoundException) {
          errorMessage = i18n.t('login.user-not-found-exception');
        } else {
          errorMessage = i18n.t('login.exception');
        }
        // setErrorMessage(errorMessage);
        setHasErrors(true);
        Toast.show({ text: errorMessage, duration: 2500 });
      });
  };

  const setIsValid = (user: string, pass: string) => {
    const isValid = user.length > 0 && pass.length > 0;
    setIsValidState(isValid);
    setHasErrors(false);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView style={styles.rootContainer} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View>
          <HeaderLightText style={styles.titleText}>{i18n.t('login.title')}</HeaderLightText>
          <View style={styles.formItem}>
            <Item style={styles.labelPos} floatingLabel error={hasErrors}>
              <Label style={styles.labelStyle}>{i18n.t('login.email-label')}</Label>
              <Input
                keyboardType="email-address"
                autoCapitalize="none"
                returnKeyType="next"
                autoCompleteType="email"
                onChangeText={(username) => {
                  setUser(username);
                  setIsValid(username, pass);
                }}
                blurOnSubmit={false}
              />
            </Item>
          </View>
          <View style={styles.formItem}>
            <Item style={styles.labelPos} floatingLabel error={hasErrors}>
              <Label style={styles.labelStyle}>{i18n.t('login.password-label')}</Label>
              <Input
                secureTextEntry
                returnKeyType="go"
                onChangeText={(password) => {
                  setPass(password);
                  setIsValid(user, password);
                }}
                onSubmitEditing={handleLogin}
                ref={passwordInput}
              />
            </Item>
          </View>
        </View>
        <View>
          <BrandedButton onPress={handleLogin} hideLoading enable={isValid}>
            <Text>{i18n.t('login.button')}</Text>
          </BrandedButton>
          <View style={styles.bottomTextView}>
            <RegularText>{i18n.t('login.dont-have-account')}</RegularText>
            <RegularText> </RegularText>
            <ClickableText onPress={() => appCoordinator.goToPreRegisterScreens()}>
              {i18n.t('login.create-account')}
            </ClickableText>
          </View>

          <View style={styles.bottomTextView2}>
            <ClickableText onPress={() => appCoordinator.goToResetPassword()}>
              {i18n.t('login.forgot-your-password')}
            </ClickableText>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
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

export default LoginScreen;
