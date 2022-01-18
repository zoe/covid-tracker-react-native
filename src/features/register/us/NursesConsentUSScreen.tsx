import appConfig from '@covid/appConfig';
import { CheckboxItem, CheckboxList } from '@covid/components/Checkbox';
import { Screen } from '@covid/components/Screen';
import { ClickableText, RegularBoldText, RegularText } from '@covid/components/Text';
import { consentService } from '@covid/core/consent/ConsentService';
import i18n from '@covid/locale/i18n';
import { TScreenParamList } from '@covid/routes/types';
import { openWebLink } from '@covid/utils/links';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors } from '@theme';
import * as React from 'react';

type TProps = {
  navigation: StackNavigationProp<TScreenParamList, 'NursesConsentUS'>;
  route: RouteProp<TScreenParamList, 'NursesConsentUS'>;
};

interface ITermsState {
  processingChecked: boolean;
  termsOfUseChecked: boolean;
}

export class NursesConsentUSScreen extends React.Component<TProps, ITermsState> {
  constructor(props: TProps) {
    super(props);
    this.state = {
      processingChecked: false,
      termsOfUseChecked: false,
    };
  }

  viewOnly = this.props.route.params?.viewOnly;

  handleProcessingChange = () => {
    this.setState((prevState) => ({ processingChecked: !prevState.processingChecked }));
  };

  handleTermsOfUseChange = () => {
    this.setState((prevState) => ({ termsOfUseChecked: !prevState.termsOfUseChecked }));
  };

  handleAgreeClicked = async () => {
    if (this.state.processingChecked && this.state.termsOfUseChecked) {
      await consentService.setConsentSigned(
        'US Nurses',
        appConfig.nursesConsentVersionUS,
        appConfig.privacyPolicyVersionUS,
      );
      this.props.navigation.navigate('Register');
    }
  };

  render() {
    return (
      <Screen
        backgroundColor={colors.backgroundPrimary}
        footerEnabled={this.state.processingChecked && this.state.termsOfUseChecked}
        footerOnPress={this.handleAgreeClicked}
        footerTitle={this.viewOnly ? '' : i18n.t('consent-nurses-us.i-agree')}
        testID="nurses-consent-us"
      >
        <RegularBoldText>
          {i18n.t('consent-nurses-us.header-1')}
          {'\n'}
        </RegularBoldText>
        <RegularText>
          {i18n.t('consent-nurses-us.para-1')}
          {'\n'}
        </RegularText>
        <RegularBoldText>
          {i18n.t('consent-nurses-us.header-2')}
          {'\n'}
        </RegularBoldText>
        <RegularText>
          {i18n.t('consent-nurses-us.para-2')}
          {'\n'}
        </RegularText>

        <RegularBoldText>
          {i18n.t('consent-nurses-us.header-3')}
          {'\n'}
        </RegularBoldText>
        <RegularText>
          {i18n.t('consent-nurses-us.para-3')}{' '}
          <ClickableText onPress={() => openWebLink('https://www.cdc.gov/coronavirus/2019-ncov/index.html')}>
            https://www.cdc.gov/coronavirus/2019-ncov/index.html
          </ClickableText>
          .{'\n'}
        </RegularText>

        <RegularBoldText>
          {i18n.t('consent-nurses-us.header-4')}
          {'\n'}
        </RegularBoldText>
        <RegularText>
          {i18n.t('consent-nurses-us.para-4')}
          {'\n'}
        </RegularText>

        <RegularBoldText>
          {i18n.t('consent-nurses-us.header-5')}
          {'\n'}
        </RegularBoldText>

        <RegularText>
          {i18n.t('consent-nurses-us.para-5')}
          {'\n'}
        </RegularText>

        <RegularBoldText>
          {i18n.t('consent-nurses-us.header-6')}
          {'\n'}
        </RegularBoldText>

        <RegularText>
          {i18n.t('consent-nurses-us.para-6')}
          {'\n'}
        </RegularText>

        <RegularBoldText>
          {i18n.t('consent-nurses-us.header-7')}
          {'\n'}
        </RegularBoldText>
        <RegularText>
          {i18n.t('consent-nurses-us.para-7')}
          {'\n'}
        </RegularText>

        <RegularBoldText>
          {i18n.t('consent-nurses-us.header-8')}
          {'\n'}
        </RegularBoldText>
        <RegularText>
          {i18n.t('consent-nurses-us.para-8')}
          {'\n'}
        </RegularText>

        <RegularBoldText>
          {i18n.t('consent-nurses-us.header-9')}
          {'\n'}
        </RegularBoldText>

        <RegularText>
          {i18n.t('consent-nurses-us.para-9')}{' '}
          <ClickableText onPress={() => openWebLink('mailto:leavecovidtracking-us@joinzoe.com')}>
            leavecovidtracking-us@joinzoe.com
          </ClickableText>
          {'\n'}
        </RegularText>

        <RegularBoldText>
          {i18n.t('consent-nurses-us.header-10')}
          {'\n'}
        </RegularBoldText>

        <RegularText>
          {i18n.t('consent-nurses-us.para-10')}
          {'\n'}
        </RegularText>

        <RegularBoldText>
          {i18n.t('consent-nurses-us.header-11')}
          {'\n'}
        </RegularBoldText>
        <RegularText>
          {i18n.t('consent-nurses-us.para-11')}
          {'\n'}
        </RegularText>

        <RegularBoldText>
          {i18n.t('consent-nurses-us.header-12')}
          {'\n'}
        </RegularBoldText>
        <RegularText>
          {i18n.t('consent-nurses-us.para-12')}{' '}
          <ClickableText onPress={() => openWebLink('mailto:covidtrackingquestions-us@joinzoe.com')}>
            covidtrackingquestions-us@joinzoe.com
          </ClickableText>
          {'\n'}
          {'\n'}
          {i18n.t('consent-nurses-us.para-12-2')}
          {'\n'}
        </RegularText>

        <RegularBoldText>
          {i18n.t('consent-nurses-us.header-13')}
          {'\n'}
        </RegularBoldText>
        <RegularText>
          {i18n.t('consent-nurses-us.para-13')}
          {'\n'}
        </RegularText>

        <RegularBoldText>{i18n.t('consent-nurses-us.header-14')}</RegularBoldText>
        <RegularText>
          {i18n.t('consent-nurses-us.para-14')}
          {'\n'}
        </RegularText>

        <RegularBoldText>
          {i18n.t('consent-nurses-us.header-15')}
          {'\n'}
        </RegularBoldText>
        <RegularText>
          {i18n.t('consent-nurses-us.para-15')}{' '}
          <ClickableText onPress={() => this.props.navigation.navigate('PrivacyPolicyUS', { viewOnly: this.viewOnly })}>
            {i18n.t('consent-nurses-us.privacy-policy')}
          </ClickableText>
          . {i18n.t('consent-nurses-us.para-15-2')}
          {'\n'}
        </RegularText>

        <RegularBoldText>
          {i18n.t('consent-nurses-us.header-16')}
          {'\n'}
        </RegularBoldText>
        <RegularText>
          {i18n.t('consent-nurses-us.para-16')}{' '}
          <ClickableText onPress={() => openWebLink('mailto:leavecovidtracking-us@joinzoe.com')}>
            leavecovidtracking-us@joinzoe.com
          </ClickableText>
          {'\n'}
          {'\n'}
          {i18n.t('consent-nurses-us.para-16-2')}{' '}
          <ClickableText onPress={() => this.props.navigation.navigate('PrivacyPolicyUS', { viewOnly: this.viewOnly })}>
            {i18n.t('consent-nurses-us.privacy-policy')}
          </ClickableText>
          .{'\n'}
          {'\n'}
        </RegularText>

        <RegularBoldText>
          {i18n.t('consent-nurses-us.informed-consent-authorization')}
          {'\n'}
        </RegularBoldText>
        <RegularBoldText>
          {i18n.t('consent-nurses-us.header-17')}
          {'\n'}
        </RegularBoldText>
        <RegularText>
          {i18n.t('consent-nurses-us.body-17')}me.
          {'\n'}
        </RegularText>

        <RegularBoldText>
          {i18n.t('consent-nurses-us.header-18')}
          {'\n'}
        </RegularBoldText>
        <RegularText>
          {i18n.t('consent-nurses-us.body-18')}
          {'\n'}
        </RegularText>

        {!this.viewOnly ? (
          <CheckboxList>
            <CheckboxItem onChange={this.handleProcessingChange} value={this.state.processingChecked}>
              {i18n.t('consent-nurses-us.i-consent')}{' '}
              <ClickableText
                onPress={() => this.props.navigation.navigate('PrivacyPolicyUS', { viewOnly: this.viewOnly })}
              >
                {i18n.t('consent-nurses-us.privacy-policy')}
              </ClickableText>
              .
            </CheckboxItem>
            <CheckboxItem onChange={this.handleTermsOfUseChange} value={this.state.termsOfUseChecked}>
              {i18n.t('consent-nurses-us.i-read-accept')}{' '}
              <ClickableText
                onPress={() => this.props.navigation.navigate('TermsOfUseUS', { viewOnly: this.viewOnly })}
              >
                {i18n.t('consent-nurses-us.terms-of-use')}
              </ClickableText>{' '}
              and{' '}
              <ClickableText
                onPress={() => this.props.navigation.navigate('PrivacyPolicyUS', { viewOnly: this.viewOnly })}
              >
                {i18n.t('consent-nurses-us.privacy-policy')}
              </ClickableText>
              .
            </CheckboxItem>
          </CheckboxList>
        ) : null}
      </Screen>
    );
  }
}
