import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { Component } from 'react';
import { Linking, ScrollView, StyleSheet, View } from 'react-native';

import { colors } from '@theme';
import { BrandedButton, ClickableText, RegularBoldText, RegularText } from '@covid/components/Text';
import { ApplicationVersion } from '@covid/components/AppVersion';

import i18n from '../../../locale/i18n';
import { ScreenParamList } from '../../ScreenParamList';

type PropsType = {
  navigation: StackNavigationProp<ScreenParamList, 'PrivacyPolicyUS'>;
  route: RouteProp<ScreenParamList, 'PrivacyPolicyUS'>;
};

const HeaderText = (props: { text: string }) => {
  return (
    <RegularBoldText>
      {props.text}
      {'\n'}
    </RegularBoldText>
  );
};

export class PrivacyPolicyUSScreen extends Component<PropsType, object> {
  viewOnly = this.props.route.params.viewOnly;

  render() {
    return (
      <View style={styles.rootContainer}>
        <ScrollView>
          <HeaderText text={i18n.t('privacy-policy-us.header-1')} />
          <RegularText>
            {i18n.t('privacy-policy-us.para-1')}
            {'\n\n'}
          </RegularText>

          <HeaderText text={i18n.t('privacy-policy-us.header-2')} />
          <RegularText>
            {i18n.t('privacy-policy-us.para-2')}
            {'\n\n'}
          </RegularText>
          <HeaderText text={i18n.t('privacy-policy-us.header-3')} />
          <RegularText>
            {i18n.t('privacy-policy-us.para-3')}
            {'\n\n'}
          </RegularText>
          <HeaderText text={i18n.t('privacy-policy-us.header-4')} />
          <RegularText>
            {i18n.t('privacy-policy-us.para-4')}
            {'\n'}
          </RegularText>

          <HeaderText text={i18n.t('privacy-policy-us.header-5')} />
          <RegularText>
            {i18n.t('privacy-policy-us.para-5')}
            {'\n\n'}
          </RegularText>

          <HeaderText text={i18n.t('privacy-policy-us.header-6')} />
          <RegularText>
            {i18n.t('privacy-policy-us.para-6')}
            {'\n\n'}
          </RegularText>

          <HeaderText text={i18n.t('privacy-policy-us.header-7')} />
          <RegularText>
            {i18n.t('privacy-policy-us.para-7')}
            {'\n\n'}
          </RegularText>

          <HeaderText text={i18n.t('privacy-policy-us.header-8')} />
          <RegularText>
            {i18n.t('privacy-policy-us.para-8')}
            {'\n\n'}
          </RegularText>

          <HeaderText text={i18n.t('privacy-policy-us.header-9')} />
          <RegularText>
            {i18n.t('privacy-policy-us.para-9')}
            {'\n\n'}
            {'\n\n'}
          </RegularText>

          <HeaderText text={i18n.t('privacy-policy-us.header-10')} />
          <RegularText>
            {i18n.t('privacy-policy-us.para-10')}
            {'\n\n'}
          </RegularText>

          <HeaderText text={i18n.t('privacy-policy-us.header-11')} />
          <RegularText>
            {i18n.t('privacy-policy-us.para-11')}
            {'\n\n'}
          </RegularText>

          <HeaderText text={i18n.t('privacy-policy-us.header-12')} />
          <RegularText>
            {i18n.t('privacy-policy-us.para-12')}
            {'\n\n'}
          </RegularText>

          <HeaderText text={i18n.t('privacy-policy-us.header-13')} />
          <RegularText>
            {i18n.t('privacy-policy-us.para-13-1')}{' '}
            <ClickableText
              onPress={() => this.openUrl('https://ico.org.uk/make-a-complaint/your-personal-information-concerns/')}>
              https://ico.org.uk/make-a-complaint/your-personal-information-concerns/
            </ClickableText>{' '}
            {i18n.t('privacy-policy-us.para-13-2')}
            {'\n\n'}
          </RegularText>

          <HeaderText text={i18n.t('privacy-policy-us.header-14')} />
          <RegularText>
            {i18n.t('privacy-policy-us.para-14')}
            {'\n\n'}
          </RegularText>

          <HeaderText text={i18n.t('privacy-policy-us.header-15')} />
          <RegularText>
            {i18n.t('privacy-policy-us.para-15')}
            {'\n\n'}
          </RegularText>

          <HeaderText text={i18n.t('privacy-policy-us.header-16')} />
          <RegularText>
            {i18n.t('privacy-policy-us.para-16')}
            {'\n'}
          </RegularText>
        </ScrollView>

        <BrandedButton style={styles.button} onPress={() => this.props.navigation.goBack()}>
          {i18n.t('privacy-policy-us.back')}
        </BrandedButton>

        <ApplicationVersion />
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
