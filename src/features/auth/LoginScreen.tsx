import { BrandedButton } from '@covid/components';
import { Screen } from '@covid/components/Screen';
import { ClickableText, HeaderLightText, RegularText } from '@covid/components/Text';
import Analytics from '@covid/core/Analytics';
import { UserNotFoundException } from '@covid/core/Exception';
import { setPatients, setUsername } from '@covid/core/state/user';
import { userService } from '@covid/core/user/UserService';
import { appCoordinator } from '@covid/features/AppCoordinator';
import i18n from '@covid/locale/i18n';
import { TScreenParamList } from '@covid/routes/types';
import { sizes, styling } from '@covid/themes';
import { RouteProp } from '@react-navigation/native';
import { colors } from '@theme';
import { Input, Item, Label, Toast } from 'native-base';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';

interface IProps {
  route: RouteProp<TScreenParamList, 'Login'>;
}

export function LoginScreen({ route }: IProps) {
  const [hasErrors, setHasErrors] = React.useState(false);
  const [isValid, setIsValid] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [pass, setPass] = React.useState('');
  const [user, setUser] = React.useState('');
  const dispatch = useDispatch();
  const passwordInput = React.useRef(null);

  function handleLogin() {
    setLoading(true);
    userService
      .login(user.trim(), pass)
      .then((response) => {
        Analytics.identify({ isTester: response.user.is_tester });

        // TODO: Support multiple users.
        const patientId = response.user.patients[0];

        dispatch(setUsername(response.user.username));
        dispatch(setPatients(response.user.patients));

        appCoordinator
          .setPatientById(patientId)
          .then(() => appCoordinator.fetchInitialData())
          .then(() => {
            appCoordinator.gotoNextScreen(route.name);
            setLoading(false);
          })
          .catch((error) => {
            // eslint-disable-next-line no-console
            console.warn(error);
            setLoading(false);
          });
      })
      .catch((error) => {
        let errorMessage = '';
        if (error.constructor === UserNotFoundException) {
          errorMessage = i18n.t('login.user-not-found-exception');
        } else {
          errorMessage = i18n.t('login.exception');
        }
        Toast.show({ duration: 2500, text: errorMessage });
        setHasErrors(true);
        setLoading(false);
      });
  }

  function validateCredentials(checkUsername: string, checkPassword: string) {
    setIsValid(checkUsername.length > 0 && checkPassword.length > 0);
    setHasErrors(false);
  }

  function onChangeUsername(username: string) {
    setUser(username);
    validateCredentials(username, pass);
  }

  function onChangePassword(password: string) {
    setPass(password);
    validateCredentials(user, password);
  }

  return (
    <Screen testID="login-screen">
      <HeaderLightText>{i18n.t('login.title')}</HeaderLightText>

      <Item floatingLabel error={hasErrors} style={styles.marginTop}>
        <Label style={styles.label}>{i18n.t('login.email-label')}</Label>
        <Input
          autoCapitalize="none"
          autoCompleteType="email"
          blurOnSubmit={false}
          keyboardType="email-address"
          onChangeText={onChangeUsername}
          returnKeyType="next"
          testID="login-input-email"
        />
      </Item>

      <Item floatingLabel error={hasErrors} style={styles.marginTop}>
        <Label style={styles.label}>{i18n.t('login.password-label')}</Label>
        <Input
          secureTextEntry
          autoCapitalize="none"
          onChangeText={onChangePassword}
          onSubmitEditing={handleLogin}
          ref={passwordInput}
          returnKeyType="go"
          testID="login-input-password"
        />
      </Item>

      <View style={styling.flex} />

      <BrandedButton
        enabled={isValid && !loading}
        loading={loading}
        onPress={handleLogin}
        style={styles.marginVertical}
        testID="login-button"
      >
        <Text>{i18n.t('log-in')}</Text>
      </BrandedButton>

      <View style={styles.textWrapper}>
        <RegularText>{i18n.t('login.dont-have-account')}</RegularText>
        <RegularText> </RegularText>
        <ClickableText onPress={appCoordinator.goToPreRegisterScreens}>{i18n.t('login.create-account')}</ClickableText>
      </View>

      <ClickableText onPress={appCoordinator.goToResetPassword} style={styling.textCenter}>
        {i18n.t('login.forgot-your-password')}
      </ClickableText>
    </Screen>
  );
}

const styles = StyleSheet.create({
  label: {
    color: colors.tertiary,
    fontSize: 16,
  },
  marginTop: {
    marginTop: sizes.m,
  },
  marginVertical: {
    marginVertical: sizes.m,
  },
  textWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
