import { BrandedButton } from '@covid/components';
import { ClickableText, HeaderLightText, RegularText } from '@covid/components/Text';
import Analytics from '@covid/core/Analytics';
import { UserNotFoundException } from '@covid/core/Exception';
import { setPatients, setUsername } from '@covid/core/state/user';
import { IUserService } from '@covid/core/user/UserService';
import { ScreenParamList } from '@covid/features';
import appCoordinator from '@covid/features/AppCoordinator';
import i18n from '@covid/locale/i18n';
import { useInjection } from '@covid/provider/services.hooks';
import { Services } from '@covid/provider/services.types';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors } from '@theme';
import { Input, Item, Label, Toast } from 'native-base';
import React, { useRef, useState } from 'react';
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
            appCoordinator.gotoNextScreen(route.name);
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
        Toast.show({ duration: 2500, text: errorMessage });
      });
  };

  const setIsValid = (user: string, pass: string) => {
    const isValid = user.length > 0 && pass.length > 0;
    setIsValidState(isValid);
    setHasErrors(false);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.rootContainer}>
        <View>
          <HeaderLightText style={styles.titleText}>{i18n.t('login.title')}</HeaderLightText>
          <View style={styles.formItem}>
            <Item floatingLabel error={hasErrors} style={styles.labelPos}>
              <Label style={styles.labelStyle}>{i18n.t('login.email-label')}</Label>
              <Input
                autoCapitalize="none"
                autoCompleteType="email"
                blurOnSubmit={false}
                keyboardType="email-address"
                onChangeText={(username) => {
                  setUser(username);
                  setIsValid(username, pass);
                }}
                returnKeyType="next"
              />
            </Item>
          </View>
          <View style={styles.formItem}>
            <Item floatingLabel error={hasErrors} style={styles.labelPos}>
              <Label style={styles.labelStyle}>{i18n.t('login.password-label')}</Label>
              <Input
                secureTextEntry
                onChangeText={(password) => {
                  setPass(password);
                  setIsValid(user, password);
                }}
                onSubmitEditing={handleLogin}
                ref={passwordInput}
                returnKeyType="go"
              />
            </Item>
          </View>
        </View>
        <View>
          <BrandedButton hideLoading enable={isValid} onPress={handleLogin}>
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
  bottomTextView: {
    backgroundColor: colors.backgroundPrimary,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 6,
    paddingHorizontal: 23,
    paddingTop: 24,
  },
  bottomTextView2: {
    backgroundColor: colors.backgroundPrimary,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 24,
  },
  forgotPasswordText: {
    alignSelf: 'center',
    color: colors.brand,
    padding: 40,
  },
  formItem: {
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  labelPos: {
    paddingBottom: 8,
  },
  labelStyle: {
    color: colors.tertiary,
    fontSize: 16,
  },
  rootContainer: {
    backgroundColor: colors.backgroundPrimary,
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 56,
  },
  titleText: {
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
});

export default LoginScreen;
