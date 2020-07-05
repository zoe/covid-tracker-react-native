import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC, useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import i18n from '@covid/locale/i18n';
import { ICoreService, isGBCountry, isSECountry, isUSCountry } from '@covid/core/user/UserService';
import { BrandedButton } from '@covid/components/Text';
import { useInjection } from '@covid/provider/services.hooks';
import { Services } from '@covid/provider/services.types';
import { colors } from '@theme';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import appConfig from '@covid/appConfig';

import ConsentScreenGB from './ConsentScreenGB';
import ConsentScreenSE from './ConsentScreenSE';
import ConsentScreenUS from './ConsentScreenUS';

type PropsType = {
  navigation: StackNavigationProp<ScreenParamList, 'Consent'>;
  route: RouteProp<ScreenParamList, 'Consent'>;
};

const ConsentScreen: FC<PropsType> = (props) => {
  const userService = useInjection<ICoreService>(Services.User);
  const [agreed, setAgreed] = useState(false);

  const handleAgreeClicked = useCallback(async () => {
    if (!agreed) {
      return;
    }

    if (isUSCountry()) {
      await userService.setConsentSigned('US', appConfig.consentVersionUS, appConfig.privacyPolicyVersionUS);
    }
    if (isGBCountry()) {
      await userService.setConsentSigned('UK', appConfig.consentVersionUK, appConfig.privacyPolicyVersionUK);
    }
    if (isSECountry()) {
      await userService.setConsentSigned('SE', appConfig.consentVersionSE, appConfig.privacyPolicyVersionSE);
    }
    props.navigation.navigate('Register');
  }, [agreed, userService.setConsentSigned]);

  const renderConsent = useCallback(() => {
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
      {!props.route.params.viewOnly && (
        <BrandedButton testID="agree" style={styles.button} enable={agreed} hideLoading onPress={handleAgreeClicked}>
          {i18n.t('legal.i-agree')}
        </BrandedButton>
      )}
    </View>
  );
};

export default React.memo(ConsentScreen);

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: colors.backgroundPrimary,
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  button: {
    marginTop: 20,
  },
});
