import { ClickableText, RegularBoldText, RegularText } from '@covid/components/Text';
import { ScreenParamList } from '@covid/features/ScreenParamList';
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

const ConsentScreenGB: React.FC<PropsType> = ({ navigation, route, setAgreed }) => {
  const onInfoLinkPress = React.useCallback(
    () => openWebLink('https://www.nhs.uk/conditions/coronavirus-covid-19/'),
    [],
  );

  const onPrivacyPolicyPress = React.useCallback(
    () => navigation.navigate('PrivacyPolicyUK', { viewOnly: route.params?.viewOnly }),
    [navigation.navigate, route.params?.viewOnly],
  );

  React.useEffect(() => {
    setAgreed(true);
  }, []);

  return (
    <ScrollView>
      <RegularText>
        By using this app and tracking if you are well or have symptoms, you will be helping medical science and the NHS
        to better understand Coronavirus (COVID-19) and helping us follow the spread of the virus.
        {'\n\n'}
        This app allows you to help others, but does not give health advice. If you need health advice please visit the
        NHS website:{' '}
        <ClickableText onPress={onInfoLinkPress} testID="info-link">
          https://www.nhs.uk/conditions/coronavirus-covid-19/
        </ClickableText>
        {'\n'}
      </RegularText>

      <RegularBoldText>Information sharing{'\n'}</RegularBoldText>
      <RegularText>
        This app is designed by doctors and scientists at Kings’ College London, Guys and St Thomas’ Hospitals and Zoe
        Global Limited, a health technology company. They have access to the information you enter, which may also be
        shared with the NHS and other medical researchers as outlined in our{' '}
        <ClickableText onPress={onPrivacyPolicyPress} testID="privacy-policy1">
          privacy notice
        </ClickableText>
        .{'\n\n'}
        {'\n'}
        No information you share will be used for commercial purposes. An anonymous code will be used to replace your
        personal details when sharing information with other researchers.
      </RegularText>

      <RegularBoldText>
        {'\n'}
        Your consent
        {'\n'}
      </RegularBoldText>
      <RegularText>
        By clicking below, you consent to our using the personal information we collect through your use of this app in
        the way we have described.
        {'\n\n'}
        We may share your data with medical research collaborators outside the UK (eg Harvard Medical School). Before
        sharing any of your data with any medical researcher outside of the UK, we will remove your name, phone number
        if provided, email address and anonymise your full postcode by removing the inward code (last three characters)
        or mapping it to an LSOA code to protect your privacy. By clicking below, you consent to us sharing your
        personal information on this basis.
        {'\n\n'}
        We adhere to the General Data Protection Regulation ‘GDPR’. For more information about how we use and share
        personal information about you, please see our{' '}
        <ClickableText onPress={onPrivacyPolicyPress} testID="privacy-policy2">
          privacy notice
        </ClickableText>
        .{'\n\n'}
        You may withdraw your consent at any time by emailing{' '}
        <RegularBoldText>leavecovidtracking@joinzoe.com</RegularBoldText>
        {'\n\n'}
        Any questions may be sent to <RegularBoldText>covidtrackingquestions@joinzoe.com</RegularBoldText>
      </RegularText>
    </ScrollView>
  );
};

export default React.memo(ConsentScreenGB);
