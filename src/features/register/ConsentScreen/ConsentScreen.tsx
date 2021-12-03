import appConfig from '@covid/appConfig';
import { BrandedButton } from '@covid/components';
import { Screen } from '@covid/components/Screen';
import { consentService } from '@covid/core/consent/ConsentService';
import { isGBCountry, isSECountry, isUSCountry } from '@covid/core/localisation/LocalisationService';
import { appCoordinator } from '@covid/features/AppCoordinator';
import { ConsentScreenGB } from '@covid/features/register/ConsentScreen/ConsentScreenGB';
import { ConsentScreenSE } from '@covid/features/register/ConsentScreen/ConsentScreenSE';
import { ConsentScreenUS } from '@covid/features/register/ConsentScreen/ConsentScreenUS';
import i18n from '@covid/locale/i18n';
import { TScreenParamList } from '@covid/routes/types';
import { styling } from '@covid/themes';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import * as React from 'react';

type TProps = {
  navigation: StackNavigationProp<TScreenParamList, 'Consent'>;
  route: RouteProp<TScreenParamList, 'Consent'>;
};

export default React.memo((props: TProps) => {
  const [agreed, setAgreed] = React.useState(false);

  const onPressSubmit = React.useCallback(async () => {
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

  function renderConsent() {
    if (isUSCountry()) {
      return (
        <ConsentScreenUS navigation={props.navigation} route={props.route} setAgreed={setAgreed} style={styling.flex} />
      );
    }
    if (isSECountry()) {
      return (
        <ConsentScreenSE navigation={props.navigation} route={props.route} setAgreed={setAgreed} style={styling.flex} />
      );
    }
    return (
      <ConsentScreenGB navigation={props.navigation} route={props.route} setAgreed={setAgreed} style={styling.flex} />
    );
  }

  return (
    <Screen testID="consent-screen">
      {renderConsent()}
      {!props.route.params?.viewOnly ? (
        <BrandedButton enabled={agreed} onPress={onPressSubmit} style={styling.marginTopHuge} testID="button-agree">
          {isGBCountry() ? i18n.t('legal.i-agree-uk') : i18n.t('legal.i-agree')}
        </BrandedButton>
      ) : null}
    </Screen>
  );
});
