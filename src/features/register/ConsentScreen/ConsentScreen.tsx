import appConfig from '@covid/appConfig';
import { BrandedButton } from '@covid/components';
import { consentService } from '@covid/core/consent/ConsentService';
import { isGBCountry, isSECountry, isUSCountry } from '@covid/core/localisation/LocalisationService';
import { appCoordinator } from '@covid/features/AppCoordinator';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import i18n from '@covid/locale/i18n';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors } from '@theme';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';

import ConsentScreenGB from './ConsentScreenGB';
import ConsentScreenSE from './ConsentScreenSE';
import ConsentScreenUS from './ConsentScreenUS';

type PropsType = {
  navigation: StackNavigationProp<ScreenParamList, 'Consent'>;
  route: RouteProp<ScreenParamList, 'Consent'>;
};

const ConsentScreen: React.FC<PropsType> = (props) => {
  const [agreed, setAgreed] = React.useState(false);

  const handleAgreeClicked = React.useCallback(async () => {
    if (!agreed) {
      return;
    }

    if (isUSCountry()) {
      await consentService.setConsentSigned('US', appConfig.consentVersionUS, appConfig.privacyPolicyVersionUS);
    }
    if (isGBCountry()) {
      await consentService.setConsentSigned('UK', appConfig.consentVersionUK, appConfig.privacyPolicyVersionUK);
    }
    if (isSECountry()) {
      await consentService.setConsentSigned('SE', appConfig.consentVersionSE, appConfig.privacyPolicyVersionSE);
    }
    appCoordinator.gotoNextScreen(props.route.name);
  }, [agreed, consentService.setConsentSigned]);

  const renderConsent = React.useCallback(() => {
    if (isUSCountry()) {
      return <ConsentScreenUS {...props} setAgreed={setAgreed} />;
    }
    if (isGBCountry()) {
      return <ConsentScreenGB {...props} setAgreed={setAgreed} />;
    }
    if (isSECountry()) {
      return <ConsentScreenSE {...props} setAgreed={setAgreed} />;
    }
    return <ConsentScreenGB {...props} setAgreed={setAgreed} />;
  }, [props, setAgreed]);

  return (
    <View style={styles.rootContainer}>
      {renderConsent()}
      {!props.route.params?.viewOnly ? (
        <BrandedButton enabled={agreed} onPress={handleAgreeClicked} style={styles.button} testID="button-agree">
          {i18n.t('legal.i-agree')}
        </BrandedButton>
      ) : null}
    </View>
  );
};

export default React.memo(ConsentScreen);

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
  },
  rootContainer: {
    backgroundColor: colors.backgroundPrimary,
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
});
