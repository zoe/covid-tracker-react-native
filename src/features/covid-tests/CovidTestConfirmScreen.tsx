import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC, useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import i18n from '@covid/locale/i18n';
import { BrandedButton, HeaderText, RegularText } from '@covid/components/Text';
import { useInjection } from '@covid/provider/services.hooks';
import { Services } from '@covid/provider/services.types';
import { colors } from '@theme';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import appConfig from '@covid/appConfig';
import appCoordinator from '@covid/features/AppCoordinator';
import { IConsentService } from '@covid/core/consent/ConsentService';
import Screen, { Header } from '@covid/components/Screen';
import { CheckboxItem } from '@covid/components/Checkbox';
import { ListItem } from 'native-base';
import NavigatorService from '@covid/NavigatorService';

type PropsType = {
  navigation: StackNavigationProp<ScreenParamList, 'CovidTestConfirm'>;
  route: RouteProp<ScreenParamList, 'CovidTestConfirm'>;
};

export const CovidTestConfirmScreen: FC<PropsType> = (props) => {
  const [agreed, setAgreed] = useState(false);

  const consentService = useInjection<IConsentService>(Services.Consent);

  const handleConsentClick = (checked: boolean) => {
    setAgreed(checked);
  };

  const handleAgreeClicked = async () => {
    if (!agreed) {
      return;
    }
    //await consentService.setConsentSigned('US', appConfig.consentVersionUS, appConfig.privacyPolicyVersionUS); //TODO
    NavigatorService.goBack();
  };

  return (
    <Screen showBackButton navigation={props.navigation} style={styles.container}>
      <Header>
        <HeaderText>{i18n.t('covid-test.confirm-test.title')}</HeaderText>
      </Header>

      <RegularText style={styles.body}>{i18n.t('covid-test.confirm-test.body')}</RegularText>

      <View style={{ flex: 1 }} />

      <ListItem>
        <CheckboxItem value={agreed} onChange={handleConsentClick}>
          {i18n.t('covid-test.confirm-test.consent')}
        </CheckboxItem>
      </ListItem>

      <BrandedButton testID="confirm" style={styles.button} enable={agreed} hideLoading onPress={handleAgreeClicked}>
        {i18n.t('legal.confirm')}
      </BrandedButton>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
  },
  button: {
    marginTop: 20,
  },
  body: {
    fontSize: 17,
    marginHorizontal: 16,
    marginVertical: 32,
  },
});
