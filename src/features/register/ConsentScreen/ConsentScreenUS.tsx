import { CheckboxItem, CheckboxList } from '@covid/components/Checkbox';
import { ClickableText, RegularBoldText, RegularText } from '@covid/components/Text';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import i18n from '@covid/locale/i18n';
import { openWebLink } from '@covid/utils/links';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import * as React from 'react';
import { ScrollView } from 'react-native';

type PropsType = {
  navigation: StackNavigationProp<ScreenParamList, 'Consent'>;
  route: RouteProp<ScreenParamList, 'Consent'>;
  setAgreed: React.Dispatch<React.SetStateAction<boolean>>;
};

const ConsentScreenUS: React.FC<PropsType> = ({ navigation, route, setAgreed }) => {
  const [processingChecked, setProcessingChecked] = React.useState(false);
  const [termsOfUseChecked, setTermsOfUseChecked] = React.useState(false);

  const onNurseConsentPress = React.useCallback(
    () => navigation.replace('NursesConsentUS', { viewOnly: route.params.viewOnly }),
    [navigation.replace, route.params.viewOnly],
  );

  const onInfoLinkPress = React.useCallback(
    () => openWebLink('https://www.cdc.gov/coronavirus/2019-ncov/index.html'),
    [],
  );

  const onPrivacyPolicyPress = React.useCallback(
    () => navigation.navigate('PrivacyPolicyUS', { viewOnly: route.params.viewOnly }),
    [navigation.navigate, route.params.viewOnly],
  );

  const onTermsOfUsePress = React.useCallback(
    () => navigation.navigate('TermsOfUseUS', { viewOnly: route.params.viewOnly }),
    [navigation.navigate, route.params.viewOnly],
  );

  const toggleProcessingChecked = React.useCallback(() => {
    setProcessingChecked(!processingChecked);
  }, [processingChecked, setProcessingChecked]);

  const toggleTermsOfUseChecked = React.useCallback(() => {
    setTermsOfUseChecked(!termsOfUseChecked);
  }, [termsOfUseChecked, setTermsOfUseChecked]);

  React.useEffect(() => {
    setAgreed(processingChecked && termsOfUseChecked);
  }, [processingChecked, termsOfUseChecked]);

  return (
    <ScrollView>
      <RegularText>
        {i18n.t('consent-normal-us.existing-study')}{' '}
        <ClickableText onPress={onNurseConsentPress} testID="nurseConsent">
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
        <ClickableText onPress={onInfoLinkPress} testID="infoLink">
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
        <ClickableText onPress={onPrivacyPolicyPress} testID="privacyPolicy1">
          {i18n.t('consent-normal-us.privacy-policy')}
        </ClickableText>
        .{'\n\n'}
        {i18n.t('consent-normal-us.you-may-withdraw')}{' '}
        <RegularBoldText>leavecovidtracking-us@joinzoe.com</RegularBoldText>
        {'\n\n'}
        {i18n.t('consent-normal-us.any-questions')}{' '}
        <RegularBoldText>covidtrackingquestions-us@joinzoe.com</RegularBoldText>
      </RegularText>

      {!route.params.viewOnly ? (
        <CheckboxList>
          <CheckboxItem onChange={toggleProcessingChecked} testID="processingCheck" value={processingChecked}>
            {i18n.t('consent-normal-us.i-consent')}{' '}
            <ClickableText onPress={onPrivacyPolicyPress} testID="privacyPolicy2">
              {i18n.t('consent-normal-us.privacy-policy')}
            </ClickableText>
            .
          </CheckboxItem>
          <CheckboxItem onChange={toggleTermsOfUseChecked} testID="termsOfUseCheck" value={termsOfUseChecked}>
            {i18n.t('consent-normal-us.read-accepted')}{' '}
            <ClickableText onPress={onTermsOfUsePress} testID="termsOfUse">
              {i18n.t('consent-normal-us.terms')}
            </ClickableText>{' '}
            {i18n.t('consent-normal-us.and')}{' '}
            <ClickableText onPress={onPrivacyPolicyPress} testID="privacyPolicy3">
              {i18n.t('consent-normal-us.privacy-policy')}
            </ClickableText>
            .
          </CheckboxItem>
        </CheckboxList>
      ) : null}
    </ScrollView>
  );
};

export default React.memo(ConsentScreenUS);
