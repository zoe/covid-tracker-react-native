import { CheckboxList, CheckboxItem } from '@covid/components/Checkbox';
import { RegularText, ClickableText, RegularBoldText } from '@covid/components/Text';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import i18n from '@covid/locale/i18n';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC, useCallback, useState, useEffect } from 'react';
import { ScrollView, Linking } from 'react-native';

type PropsType = {
  navigation: StackNavigationProp<ScreenParamList, 'Consent'>;
  route: RouteProp<ScreenParamList, 'Consent'>;
  setAgreed: React.Dispatch<React.SetStateAction<boolean>>;
};

const ConsentScreenUS: FC<PropsType> = ({ navigation, route, setAgreed }) => {
  const [processingChecked, setProcessingChecked] = useState(false);
  const [termsOfUseChecked, setTermsOfUseChecked] = useState(false);

  const onNurseConsentPress = useCallback(
    () => navigation.replace('NursesConsentUS', { viewOnly: route.params.viewOnly }),
    [navigation.replace, route.params.viewOnly]
  );

  const onInfoLinkPress = useCallback(
    () => Linking.openURL('https://www.cdc.gov/coronavirus/2019-ncov/index.html'),
    []
  );

  const onPrivacyPolicyPress = useCallback(
    () => navigation.navigate('PrivacyPolicyUS', { viewOnly: route.params.viewOnly }),
    [navigation.navigate, route.params.viewOnly]
  );

  const onTermsOfUsePress = useCallback(
    () => navigation.navigate('TermsOfUseUS', { viewOnly: route.params.viewOnly }),
    [navigation.navigate, route.params.viewOnly]
  );

  const toggleProcessingChecked = useCallback(() => {
    setProcessingChecked(!processingChecked);
  }, [processingChecked, setProcessingChecked]);

  const toggleTermsOfUseChecked = useCallback(() => {
    setTermsOfUseChecked(!termsOfUseChecked);
  }, [termsOfUseChecked, setTermsOfUseChecked]);

  useEffect(() => {
    setAgreed(processingChecked && termsOfUseChecked);
  }, [processingChecked, termsOfUseChecked]);

  return (
    <ScrollView>
      <RegularText>
        {i18n.t('consent-normal-us.existing-study')}{' '}
        <ClickableText testID="nurseConsent" onPress={onNurseConsentPress}>
          {i18n.t('consent-normal-us.click-here')}
        </ClickableText>
        {'\n'}
      </RegularText>

      <RegularBoldText>
        {i18n.t('consent-normal-us.purpose')}
        {'\n'}
      </RegularBoldText>
      <RegularText>
        {i18n.t('consent-normal-us.purpose-body')}{' '}
        <ClickableText testID="infoLink" onPress={onInfoLinkPress}>
          https://www.cdc.gov/coronavirus/2019-ncov/index.html
        </ClickableText>
        {'\n'}
      </RegularText>

      <RegularBoldText>
        {i18n.t('consent-normal-us.information-sharing')}
        {'\n'}
      </RegularBoldText>
      <RegularText>{i18n.t('consent-normal-us.information-sharing-body')}</RegularText>

      <RegularBoldText>
        {'\n'}
        {i18n.t('consent-normal-us.your-consent')}
        {'\n'}
      </RegularBoldText>
      <RegularText>
        {i18n.t('consent-normal-us.your-consent-body')}{' '}
        <ClickableText testID="privacyPolicy1" onPress={onPrivacyPolicyPress}>
          {i18n.t('consent-normal-us.privacy-policy')}
        </ClickableText>
        .{'\n\n'}
        {i18n.t('consent-normal-us.you-may-withdraw')}{' '}
        <RegularBoldText>leavecovidtracking-us@joinzoe.com</RegularBoldText>
        {'\n\n'}
        {i18n.t('consent-normal-us.any-questions')}{' '}
        <RegularBoldText>covidtrackingquestions-us@joinzoe.com</RegularBoldText>
      </RegularText>

      {!route.params.viewOnly && (
        <CheckboxList>
          <CheckboxItem testID="processingCheck" value={processingChecked} onChange={toggleProcessingChecked}>
            {i18n.t('consent-normal-us.i-consent')}{' '}
            <ClickableText testID="privacyPolicy2" onPress={onPrivacyPolicyPress}>
              {i18n.t('consent-normal-us.privacy-policy')}
            </ClickableText>
            .
          </CheckboxItem>
          <CheckboxItem testID="termsOfUseCheck" value={termsOfUseChecked} onChange={toggleTermsOfUseChecked}>
            {i18n.t('consent-normal-us.read-accepted')}{' '}
            <ClickableText testID="termsOfUse" onPress={onTermsOfUsePress}>
              {i18n.t('consent-normal-us.terms')}
            </ClickableText>{' '}
            {i18n.t('consent-normal-us.and')}{' '}
            <ClickableText testID="privacyPolicy3" onPress={onPrivacyPolicyPress}>
              {i18n.t('consent-normal-us.privacy-policy')}
            </ClickableText>
            .
          </CheckboxItem>
        </CheckboxList>
      )}
    </ScrollView>
  );
};

export default React.memo(ConsentScreenUS);
