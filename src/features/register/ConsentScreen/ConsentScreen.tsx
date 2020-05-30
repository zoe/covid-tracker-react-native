import { BrandedButton } from '@covid/components/Text';
import UserService, { isGBCountry, isSECountry, isUSCountry } from '@covid/core/user/UserService';
import i18n from '@covid/locale/i18n';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC, useState, useCallback } from 'react';
import { View } from 'react-native';

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

const userService = new UserService();

const ConsentScreen: FC<PropsType> = (props) => {
  const [agreed, setAgreed] = useState(false);

  const handleAgreeClicked = useCallback(async () => {
    if (!agreed) {
      return;
    }

    if (isUSCountry()) {
      await userService.setConsentSigned('US', consentVersionUS, privacyPolicyVersionUS);
    }
    if (isGBCountry()) {
      await userService.setConsentSigned('UK', consentVersionUK, privacyPolicyVersionUK);
    }
    if (isSECountry()) {
      await userService.setConsentSigned('SE', consentVersionSE, privacyPolicyVersionSE);
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
