import { Text } from '@covid/components';
import { BrandedButton } from '@covid/components/buttons';
import { Screen } from '@covid/components/Screen';
import i18n from '@covid/locale/i18n';
import { sizes } from '@covid/themes';
import * as LocalAuthentication from 'expo-local-authentication';
import * as React from 'react';
import { StyleSheet } from 'react-native';

enum EResult {
  CANCELLED = 'CANCELLED',
  DISABLED = 'DISABLED',
  ERROR = 'ERROR',
  SUCCESS = 'SUCCESS',
}

export function BiometricAuthScreen() {
  const [facialRecognitionAvailable, setFacialRecognitionAvailable] = React.useState(false);
  const [fingerprintAvailable, setFingerprintAvailable] = React.useState(false);
  const [irisAvailable, setIrisAvailable] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [result, setResult] = React.useState<EResult>();

  const checkSupportedAuthentication = async () => {
    const types = await LocalAuthentication.supportedAuthenticationTypesAsync();
    if (types && types.length) {
      setFacialRecognitionAvailable(types.includes(LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION));
      setFingerprintAvailable(types.includes(LocalAuthentication.AuthenticationType.FINGERPRINT));
      setIrisAvailable(types.includes(LocalAuthentication.AuthenticationType.IRIS));
    }
  };

  const onPressAuthenticate = async () => {
    if (loading) {
      return;
    }

    setLoading(true);

    try {
      // It's not possible to define a specific biometric authentication method so the below function could
      // start the fingerprint or facial recognition or fallback methods like device pincode or device password.
      const results = await LocalAuthentication.authenticateAsync();

      if (results.success) {
        setResult(EResult.SUCCESS);
      } else if (results.error === 'unknown') {
        // Getting this response means the device doesn't allow biometric authentication anymore.
        // This mostly happens after the user tried too many times.
        setResult(EResult.DISABLED);
      } else if (
        results.error === 'user_cancel' ||
        results.error === 'system_cancel' ||
        results.error === 'app_cancel'
      ) {
        setResult(EResult.CANCELLED);
      }
    } catch (error) {
      setResult(EResult.ERROR);
    }

    setLoading(false);
  };

  React.useEffect(() => {
    checkSupportedAuthentication();
  }, []);

  let resultMessage;
  switch (result) {
    case EResult.CANCELLED:
      resultMessage = i18n.t('biometric-auth.result-cancelled');
      break;
    case EResult.DISABLED:
      resultMessage = i18n.t('biometric-auth.result-disabled');
      break;
    case EResult.ERROR:
      resultMessage = i18n.t('biometric-auth.result-error');
      break;
    case EResult.SUCCESS:
      resultMessage = i18n.t('biometric-auth.result-success');
      break;
    default:
      resultMessage = '';
      break;
  }

  let description;
  if (facialRecognitionAvailable && fingerprintAvailable && irisAvailable) {
    description = i18n.t('biometric-auth.description-facial-finger-iris');
  } else if (facialRecognitionAvailable && fingerprintAvailable) {
    description = i18n.t('biometric-auth.description-facial-finger');
  } else if (facialRecognitionAvailable && irisAvailable) {
    description = i18n.t('biometric-auth.description-facial-iris');
  } else if (fingerprintAvailable && irisAvailable) {
    description = i18n.t('biometric-auth.description-finger-iris');
  } else if (facialRecognitionAvailable) {
    description = i18n.t('biometric-auth.description-facial');
  } else if (fingerprintAvailable) {
    description = i18n.t('biometric-auth.description-finger');
  } else if (irisAvailable) {
    description = i18n.t('biometric-auth.description-iris');
  } else {
    description = i18n.t('biometric-auth.description-nothing');
  }

  return (
    <Screen testID="biometric-authentication">
      <Text inverted colorPalette="uiDark" colorShade="dark" textClass="p">
        {description}
      </Text>
      {facialRecognitionAvailable || fingerprintAvailable || irisAvailable ? (
        <BrandedButton onPress={onPressAuthenticate} style={styles.marginTop}>
          {i18n.t('biometric-auth.button')}
        </BrandedButton>
      ) : null}
      {resultMessage ? <Text style={styles.marginTop}>{resultMessage}</Text> : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  marginTop: {
    marginTop: sizes.l,
  },
});
