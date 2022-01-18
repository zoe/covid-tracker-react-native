import { Screen } from '@covid/components/Screen';
import { ClickableText, RegularText } from '@covid/components/Text';
import { HeaderText } from '@covid/features/register/components/LegalComponents';
import i18n from '@covid/locale/i18n';
import { TScreenParamList } from '@covid/routes/types';
import { openWebLink } from '@covid/utils/links';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors } from '@theme';
import * as React from 'react';

type TProps = {
  navigation: StackNavigationProp<TScreenParamList, 'PrivacyPolicyUS'>;
  route: RouteProp<TScreenParamList, 'PrivacyPolicyUS'>;
};

export class PrivacyPolicyUSScreen extends React.Component<TProps, object> {
  render() {
    return (
      <Screen backgroundColor={colors.backgroundPrimary} testID="privacy-policy-us-screen">
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
            onPress={() => openWebLink('https://ico.org.uk/make-a-complaint/your-personal-information-concerns/')}
          >
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
      </Screen>
    );
  }
}
