import { CheckboxItem, CheckboxList } from '@covid/components/Checkbox';
import { BrandedButton, ClickableText, RegularBoldText, RegularText } from '@covid/components/Text';
import UserService from '@covid/core/user/UserService';
import i18n from '@covid/locale/i18n';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors } from '@theme';
import React, { Component } from 'react';
import { Linking, ScrollView, StyleSheet, View } from 'react-native';

import { ScreenParamList } from '../../ScreenParamList';
import { NursesConsentVersionUS, privacyPolicyVersionUS } from '../constants';

type PropsType = {
  navigation: StackNavigationProp<ScreenParamList, 'NursesConsentUS'>;
  route: RouteProp<ScreenParamList, 'NursesConsentUS'>;
};

interface TermsState {
  processingChecked: boolean;
  termsOfUseChecked: boolean;
}

export class NursesConsentUSScreen extends Component<PropsType, TermsState> {
  private userService = new UserService();

  constructor(props: PropsType) {
    super(props);
    this.state = {
      processingChecked: false,
      termsOfUseChecked: false,
    };
  }

  viewOnly = this.props.route.params.viewOnly;

  handleProcessingChange = () => {
    this.setState({ processingChecked: !this.state.processingChecked });
  };

  handleTermsOfUseChange = () => {
    this.setState({ termsOfUseChecked: !this.state.termsOfUseChecked });
  };

  handleAgreeClicked = async () => {
    if (this.state.processingChecked && this.state.termsOfUseChecked) {
      await this.userService.setConsentSigned('US Nurses', NursesConsentVersionUS, privacyPolicyVersionUS);
      this.props.navigation.navigate('Register');
    }
  };

  render() {
    return (
      <View style={styles.rootContainer}>
        <ScrollView>
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
            <ClickableText onPress={() => this.openUrl('https://www.cdc.gov/coronavirus/2019-ncov/index.html')}>
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
            <ClickableText onPress={() => this.openUrl('mailto:leavecovidtracking-us@joinzoe.com')}>
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
            <ClickableText onPress={() => this.openUrl('mailto:covidtrackingquestions-us@joinzoe.com')}>
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
            <ClickableText
              onPress={() => this.props.navigation.navigate('PrivacyPolicyUS', { viewOnly: this.viewOnly })}>
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
            <ClickableText onPress={() => this.openUrl('mailto:leavecovidtracking-us@joinzoe.com')}>
              leavecovidtracking-us@joinzoe.com
            </ClickableText>
            {'\n'}
            {'\n'}
            {i18n.t('consent-nurses-us.para-16-2')}{' '}
            <ClickableText
              onPress={() => this.props.navigation.navigate('PrivacyPolicyUS', { viewOnly: this.viewOnly })}>
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

          {!this.viewOnly && (
            <CheckboxList>
              <CheckboxItem value={this.state.processingChecked} onChange={this.handleProcessingChange}>
                {i18n.t('consent-nurses-us.i-consent')}{' '}
                <ClickableText
                  onPress={() => this.props.navigation.navigate('PrivacyPolicyUS', { viewOnly: this.viewOnly })}>
                  {i18n.t('consent-nurses-us.privacy-policy')}
                </ClickableText>
                .
              </CheckboxItem>
              <CheckboxItem value={this.state.termsOfUseChecked} onChange={this.handleTermsOfUseChange}>
                {i18n.t('consent-nurses-us.i-read-accept')}{' '}
                <ClickableText
                  onPress={() => this.props.navigation.navigate('TermsOfUseUS', { viewOnly: this.viewOnly })}>
                  {i18n.t('consent-nurses-us.terms-of-use')}
                </ClickableText>{' '}
                and{' '}
                <ClickableText
                  onPress={() => this.props.navigation.navigate('PrivacyPolicyUS', { viewOnly: this.viewOnly })}>
                  {i18n.t('consent-nurses-us.privacy-policy')}
                </ClickableText>
                .
              </CheckboxItem>
            </CheckboxList>
          )}
        </ScrollView>

        {!this.viewOnly && (
          <BrandedButton
            style={styles.button}
            hideLoading
            enable={this.state.processingChecked && this.state.termsOfUseChecked}
            onPress={this.handleAgreeClicked}>
            {i18n.t('consent-nurses-us.i-agree')}
          </BrandedButton>
        )}
      </View>
    );
  }

  private openUrl(link: string) {
    Linking.openURL(link);
  }
}

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
