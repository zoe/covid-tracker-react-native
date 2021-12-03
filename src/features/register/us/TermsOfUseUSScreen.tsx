import { Screen } from '@covid/components/Screen';
import { ClickableText, RegularBoldText, RegularText } from '@covid/components/Text';
import i18n from '@covid/locale/i18n';
import { TScreenParamList } from '@covid/routes/types';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors } from '@theme';
import * as React from 'react';

type TProps = {
  navigation: StackNavigationProp<TScreenParamList, 'TermsOfUseUS'>;
  route: RouteProp<TScreenParamList, 'TermsOfUseUS'>;
};

export default class TermsOfUseUSScreen extends React.Component<TProps> {
  viewOnly = this.props.route.params?.viewOnly;

  render() {
    return (
      <Screen backgroundColor={colors.backgroundPrimary} testID="terms-of-use-us-screen">
        <RegularBoldText>
          {i18n.t('terms-of-use-us.header-1')}
          {'\n'}
        </RegularBoldText>
        <RegularText>
          {i18n.t('terms-of-use-us.para-1')}
          {'\n\n'}
          {i18n.t('terms-of-use-us.para-2')}
          {'\n\n'}
          {i18n.t('terms-of-use-us.para-3')}{' '}
          <ClickableText onPress={() => this.props.navigation.navigate('PrivacyPolicyUS', { viewOnly: this.viewOnly })}>
            {i18n.t('terms-of-use-us.privacy-policy')}
          </ClickableText>
          {'\n'}
        </RegularText>

        <RegularBoldText>
          {i18n.t('terms-of-use-us.header-2')}
          {'\n'}
        </RegularBoldText>
        <RegularText>
          {i18n.t('terms-of-use-us.para-4')}
          {'\n\n'}
          {i18n.t('terms-of-use-us.para-5')}
          {'\n\n'}
          {i18n.t('terms-of-use-us.para-6')}
          {'\n\n'}
          {i18n.t('terms-of-use-us.para-7')}
          {'\n\n'}
        </RegularText>

        <RegularBoldText>
          {'\n'}
          {i18n.t('terms-of-use-us.header-3')}
          {'\n'}
        </RegularBoldText>
        <RegularText>
          {i18n.t('terms-of-use-us.para-8')}
          {'\n\n'}
          {i18n.t('terms-of-use-us.para-9')}
          {'\n\n'}
          {i18n.t('terms-of-use-us.para-10')}
        </RegularText>

        <RegularBoldText>
          {'\n'}
          {i18n.t('terms-of-use-us.header-4')}
          {'\n'}
        </RegularBoldText>
        <RegularText>{i18n.t('terms-of-use-us.para-11')}</RegularText>

        <RegularBoldText>
          {'\n'}
          {i18n.t('terms-of-use-us.header-5')}
          {'\n'}
        </RegularBoldText>
        <RegularText>
          {i18n.t('terms-of-use-us.para-12')}
          {'\n\n'}
          {i18n.t('terms-of-use-us.para-13')}
        </RegularText>

        <RegularBoldText>
          {'\n'}
          {i18n.t('terms-of-use-us.header-6')}
          {'\n'}
        </RegularBoldText>
        <RegularText>
          {i18n.t('terms-of-use-us.para-14')}
          {'\n\n'}
          {i18n.t('terms-of-use-us.para-15')}
          {'\n\n'}
          {i18n.t('terms-of-use-us.para-16')}
          {'\n\n'}
          {i18n.t('terms-of-use-us.para-17')}
        </RegularText>

        <RegularBoldText>
          {'\n'}
          {i18n.t('terms-of-use-us.header-7')}
          {'\n'}
        </RegularBoldText>
        <RegularText>{i18n.t('terms-of-use-us.para-18')}</RegularText>

        <RegularBoldText>
          {'\n'}
          {i18n.t('terms-of-use-us.header-8')}
          {'\n'}
        </RegularBoldText>

        <RegularText>{i18n.t('terms-of-use-us.para-19')}</RegularText>

        <RegularBoldText>
          {'\n'}
          {i18n.t('terms-of-use-us.header-9')}
          {'\n'}
        </RegularBoldText>

        <RegularText>
          {i18n.t('terms-of-use-us.para-20')}
          {'\n\n'}
          {i18n.t('terms-of-use-us.para-21')}
        </RegularText>

        <RegularBoldText>
          {'\n'}
          {i18n.t('terms-of-use-us.header-10')}
          {'\n'}
        </RegularBoldText>

        <RegularText>{i18n.t('terms-of-use-us.para-22')}</RegularText>

        <RegularBoldText>
          {'\n'}
          {i18n.t('terms-of-use-us.header-11')}
          {'\n'}
        </RegularBoldText>

        <RegularText>
          {i18n.t('terms-of-use-us.para-23')}
          {'\n\n'}
          {i18n.t('terms-of-use-us.para-24')}
          {'\n\n'}
          {i18n.t('terms-of-use-us.para-25')}
          {'\n\n'}
          {i18n.t('terms-of-use-us.para-26')}
          {'\n\n'}
          {i18n.t('terms-of-use-us.para-27')}
          {'\n\n'}
          {i18n.t('terms-of-use-us.para-28')}
          {'\n\n'}
          {i18n.t('terms-of-use-us.para-29')}
          {'\n\n'}
          {i18n.t('terms-of-use-us.para-30')}
          {'\n\n'}
          {i18n.t('terms-of-use-us.para-31')}
          {'\n\n'}
          {i18n.t('terms-of-use-us.para-32')}
        </RegularText>

        <RegularBoldText>
          {'\n'}
          {i18n.t('terms-of-use-us.header-12')}
          {'\n'}
        </RegularBoldText>

        <RegularText>
          {i18n.t('terms-of-use-us.header-13')}
          {'\n\n'}
          {i18n.t('terms-of-use-us.para-33')}
          {'\n\n'}
          {i18n.t('terms-of-use-us.header-14')}
          {'\n\n'}
          {i18n.t('terms-of-use-us.para-34')}
          {'\n\n'}
          {i18n.t('terms-of-use-us.header-15')}
          {'\n\n'}
          {i18n.t('terms-of-use-us.para-35')}
          {'\n\n'}
          {i18n.t('terms-of-use-us.header-16')}
          {'\n\n'}
          {i18n.t('terms-of-use-us.para-36')}
          {'\n\n'}
          {i18n.t('terms-of-use-us.header-17')}
          {'\n\n'}
          {i18n.t('terms-of-use-us.para-37')}
          {'\n\n'}
          {i18n.t('terms-of-use-us.para-38')}
          {'\n\n'}
          {i18n.t('terms-of-use-us.para-39')}
          {'\n\n'}
          {i18n.t('terms-of-use-us.para-40')}
          {'\n\n'}
          {i18n.t('terms-of-use-us.para-41')}
          {'\n\n'}
          {i18n.t('terms-of-use-us.para-42')}
          {'\n\n'}
          {i18n.t('terms-of-use-us.para-43')}
          {'\n\n'}
          {i18n.t('terms-of-use-us.para-44')}
          {'\n\n'}
          {i18n.t('terms-of-use-us.para-45')}
          {'\n\n'}
          {i18n.t('terms-of-use-us.header-18')}
          {'\n\n'}
          {i18n.t('terms-of-use-us.para-46')}
          {'\n'}
          {i18n.t('terms-of-use-us.para-47')}
        </RegularText>
      </Screen>
    );
  }
}
