import { BrandedButton } from '@covid/components';
import { BasicPage } from '@covid/components/layouts/pages';
import { ClickableText, HeaderLightText, RegularText } from '@covid/components/Text';
import Analytics from '@covid/core/Analytics';
import { UserNotFoundException } from '@covid/core/Exception';
import { setPatients, setUsername } from '@covid/core/state/user';
import { userService } from '@covid/core/user/UserService';
import { ScreenParamList } from '@covid/features';
import { appCoordinator } from '@covid/features/AppCoordinator';
import i18n from '@covid/locale/i18n';
import { grid, styling } from '@covid/themes';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors } from '@theme';
import { Input, Item, Label, Toast } from 'native-base';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';

interface IProps {
  navigation: StackNavigationProp<ScreenParamList, 'Login'>;
  route: RouteProp<ScreenParamList, 'Login'>;
}

function LoginScreen({ route }: IProps) {
  const [hasErrors, setHasErrors] = React.useState(false);
  const [isValid, setIsValidState] = React.useState(false);
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

  function setIsValid(user: string, pass: string) {
    const isValid = user.length > 0 && pass.length > 0;
    setIsValidState(isValid);
    setHasErrors(false);
  }

  return (
    <BasicPage style={styling.backgroundWhite} withFooter={false}>
      <View style={styles.contentWrapper}>
        <HeaderLightText>{i18n.t('login.title')}</HeaderLightText>
        <Item floatingLabel error={hasErrors} style={styles.item}>
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
            testID="login-input-email"
          />
        </Item>
        <Item floatingLabel error={hasErrors} style={styles.item}>
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
            testID="login-input-password"
          />
        </Item>

        <BrandedButton
          enabled={isValid && !loading}
          loading={loading}
          onPress={handleLogin}
          style={styles.button}
          testID="login-button"
        >
          <Text>{i18n.t('log-in')}</Text>
        </BrandedButton>

        <View style={styles.textWrapper}>
          <RegularText>{i18n.t('login.dont-have-account')}</RegularText>
          <RegularText> </RegularText>
          <ClickableText onPress={() => appCoordinator.goToPreRegisterScreens()}>
            {i18n.t('login.create-account')}
          </ClickableText>
        </View>

        <ClickableText onPress={() => appCoordinator.goToResetPassword()} style={styling.textCenter}>
          {i18n.t('login.forgot-your-password')}
        </ClickableText>
      </View>
    </BasicPage>
  );
}

const styles = StyleSheet.create({
  button: {
    marginBottom: 16,
    marginTop: 'auto',
  },
  contentWrapper: {
    flex: 1,
    paddingHorizontal: grid.xxxl,
    paddingVertical: grid.xl,
  },
  item: {
    marginTop: 12,
  },
  labelStyle: {
    color: colors.tertiary,
    fontSize: 16,
  },
  textWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default LoginScreen;
