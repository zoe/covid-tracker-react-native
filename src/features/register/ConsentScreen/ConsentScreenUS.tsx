import { CheckboxItem, CheckboxList } from '@covid/components/Checkbox';
import { ClickableText, RegularBoldText, RegularText } from '@covid/components/Text';
import i18n from '@covid/locale/i18n';
import { TScreenParamList } from '@covid/routes/types';
import { openWebLink } from '@covid/utils/links';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import * as React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

type TProps = {
  navigation: StackNavigationProp<TScreenParamList, 'Consent'>;
  route: RouteProp<TScreenParamList, 'Consent'>;
  setAgreed: (agreed: boolean) => void;
  style?: StyleProp<ViewStyle>;
};

export const ConsentScreenUS: React.FC<TProps> = React.memo((props: TProps) => {
  const [processingChecked, setProcessingChecked] = React.useState(false);
  const [termsOfUseChecked, setTermsOfUseChecked] = React.useState(false);

  const onNurseConsentPress = React.useCallback(
    () => props.navigation.replace('NursesConsentUS', { viewOnly: props.route.params?.viewOnly }),
    [props.navigation.replace, props.route.params?.viewOnly],
  );

  const onInfoLinkPress = React.useCallback(
    () => openWebLink('https://www.cdc.gov/coronavirus/2019-ncov/index.html'),
    [],
  );

  const onPrivacyPolicyPress = React.useCallback(
    () => props.navigation.navigate('PrivacyPolicyUS', { viewOnly: props.route.params?.viewOnly }),
    [props.navigation.navigate, props.route.params?.viewOnly],
  );

  const onTermsOfUsePress = React.useCallback(
    () => props.navigation.navigate('TermsOfUseUS', { viewOnly: props.route.params?.viewOnly }),
    [props.navigation.navigate, props.route.params?.viewOnly],
  );

  const toggleProcessingChecked = React.useCallback(() => {
    setProcessingChecked(!processingChecked);
  }, [processingChecked, setProcessingChecked]);

  const toggleTermsOfUseChecked = React.useCallback(() => {
    setTermsOfUseChecked(!termsOfUseChecked);
  }, [termsOfUseChecked, setTermsOfUseChecked]);

  React.useEffect(() => {
    props.setAgreed(processingChecked && termsOfUseChecked);
  }, [processingChecked, termsOfUseChecked]);

  return (
    <View style={props.style}>
      <RegularText>
        {i18n.t('consent-normal-us.existing-study')}{' '}
        <ClickableText onPress={onNurseConsentPress} testID="nurse-consent">
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
        <ClickableText onPress={onInfoLinkPress} testID="info-link">
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
        <ClickableText onPress={onPrivacyPolicyPress} testID="privacy-policy1">
          {i18n.t('consent-normal-us.privacy-policy')}
        </ClickableText>
        .{'\n\n'}
        {i18n.t('consent-normal-us.you-may-withdraw')}{' '}
        <RegularBoldText>leavecovidtracking-us@joinzoe.com</RegularBoldText>
        {'\n\n'}
        {i18n.t('consent-normal-us.any-questions')}{' '}
        <RegularBoldText>covidtrackingquestions-us@joinzoe.com</RegularBoldText>
      </RegularText>

      {!props.route.params?.viewOnly ? (
        <CheckboxList>
          <CheckboxItem onChange={toggleProcessingChecked} testID="processing-check" value={processingChecked}>
            {i18n.t('consent-normal-us.i-consent')}{' '}
            <ClickableText onPress={onPrivacyPolicyPress} testID="privacy-policy2">
              {i18n.t('consent-normal-us.privacy-policy')}
            </ClickableText>
            .
          </CheckboxItem>
          <CheckboxItem onChange={toggleTermsOfUseChecked} testID="terms-of-use-check" value={termsOfUseChecked}>
            {i18n.t('consent-normal-us.read-accepted')}{' '}
            <ClickableText onPress={onTermsOfUsePress} testID="terms-of-use">
              {i18n.t('consent-normal-us.terms')}
            </ClickableText>{' '}
            {i18n.t('and')}{' '}
            <ClickableText onPress={onPrivacyPolicyPress} testID="privacy-policy3">
              {i18n.t('consent-normal-us.privacy-policy')}
            </ClickableText>
            .
          </CheckboxItem>
        </CheckboxList>
      ) : null}
    </View>
  );
});
