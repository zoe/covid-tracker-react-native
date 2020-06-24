import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC, useState, useCallback } from 'react';
import { View } from 'react-native';

import i18n from '@covid/locale/i18n';
import { isGBCountry, isSECountry, isUSCountry } from '@covid/core/user/UserService';
import { BrandedButton } from '@covid/components/Text';
import { useInjection } from '@covid/provider/services.hooks';
import { IConsentService } from '@covid/core/consent/ConsentService';
import { Services } from '@covid/provider/services.types';

import { ScreenParamList } from '../../ScreenParamList';
import {
  consentVersionSE,
  consentVersionUK,
  consentVersionUS,
  privacyPolicyVersionSE,
  privacyPolicyVersionUK,
  privacyPolicyVersionUS,
} from '../constants';

import ConsentScreenGB from './ConsentScreenGB';
import ConsentScreenSE from './ConsentScreenSE';
import ConsentScreenUS from './ConsentScreenUS';
import styles from './styles';

type PropsType = {
  navigation: StackNavigationProp<ScreenParamList, 'Consent'>;
  route: RouteProp<ScreenParamList, 'Consent'>;
};

const ConsentScreen: FC<PropsType> = (props) => {
  const [agreed, setAgreed] = useState(false);

  const consentService = useInjection<IConsentService>(Services.Consent);

  const handleAgreeClicked = useCallback(async () => {
    if (!agreed) {
      return;
    }

    if (isUSCountry()) {
      await consentService.setConsentSigned('US', consentVersionUS, privacyPolicyVersionUS);
    }
    if (isGBCountry()) {
      await consentService.setConsentSigned('UK', consentVersionUK, privacyPolicyVersionUK);
    }
    if (isSECountry()) {
      await consentService.setConsentSigned('SE', consentVersionSE, privacyPolicyVersionSE);
    }
    props.navigation.navigate('Register');
  }, [agreed, consentService.setConsentSigned]);

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
