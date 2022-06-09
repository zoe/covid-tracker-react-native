import { svPartners, usPartners } from '@assets';
import { PartnerLogosGB } from '@assets/logos/PartnerLogosGB';
import { Text } from '@covid/components';
import { NavHeader } from '@covid/components/NavHeader';
import { Screen } from '@covid/components/Screen';
import { ClickableText, RegularBoldText, RegularText } from '@covid/components/Text';
import {
  isGBCountry,
  isSECountry,
  isUSCountry,
  LocalisationService,
  localisationService,
} from '@covid/core/localisation/LocalisationService';
import { TStateApp } from '@covid/core/state/app/types';
import { TRootState } from '@covid/core/state/root';
import { appCoordinator } from '@covid/features/AppCoordinator';
import i18n from '@covid/locale/i18n';
import { TScreenParamList } from '@covid/routes/types';
import { openWebLink } from '@covid/utils/links';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors } from '@theme';
import Button from '@tracer/components/atoms/Button';
import { useToggleRebrand } from '@health-study/redux/app/selectors';
import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';

import CountryIpModal from './CountryIpModal';
import { getLocaleFlagIcon } from './helpers';
import { covidStyles, healthStudyStyles } from './Welcome2ScreenStyle';

type TProps = {
  navigation: StackNavigationProp<TScreenParamList, 'Welcome'>;
  route: RouteProp<TScreenParamList, 'Welcome'>;
};

const Welcome2Screen: React.FC<TProps> = ({ navigation }) => {
  const toggleReBrand = useSelector(useToggleRebrand);
  const [ipModalVisible, setIpModalVisible] = React.useState(false);

  const onLoginPress = React.useCallback(() => navigation.navigate('Login'), [navigation.navigate]);

  const onCloseModal = React.useCallback(() => setIpModalVisible(false), [setIpModalVisible]);

  const onCreateAccountPress = React.useCallback(async () => {
    if (await localisationService.shouldAskCountryConfirmation()) {
      setIpModalVisible(true);
    } else {
      appCoordinator.goToPreRegisterScreens();
    }
  }, [localisationService.shouldAskCountryConfirmation, setIpModalVisible, isUSCountry, navigation.navigate]);

  const helpUrl = React.useCallback(() => {
    if (isGBCountry()) {
      openWebLink('https://www.nhs.uk/conditions/coronavirus-covid-19/');
    } else if (isSECountry()) {
      openWebLink('https://www.1177.se');
    }
  }, [isGBCountry, isSECountry]);

  const partnersLogos = React.useMemo(() => {
    if (isSECountry()) {
      return svPartners;
    }
    return usPartners;
  }, [isSECountry(), svPartners, usPartners]);

  const flagIcon = getLocaleFlagIcon();
  const renderHeader = React.useCallback(
    () => (
      <NavHeader
        rightElement={
          <>
            <ClickableText onPress={onLoginPress} style={styles.login} testID="login">
              {i18n.t('log-in')}
            </ClickableText>
            <TouchableOpacity onPress={() => navigation.navigate('CountrySelect', {})} testID="select-country">
              <Image source={flagIcon} style={styles.flagIcon} testID={`flag-${LocalisationService.userCountry}`} />
            </TouchableOpacity>
          </>
        }
      />
    ),
    [flagIcon, LocalisationService.userCountry],
  );

  const styles = toggleReBrand ? healthStudyStyles : covidStyles;
  const Slash = () => <RegularBoldText style={styles.slash}> / </RegularBoldText>;

  return (
    <>
      <Screen backgroundColor={colors.backgroundSecondary} renderHeader={renderHeader} testID="welcome-2-screen">
        <View style={styles.covidContainer}>
          <Text rhythm={24} style={styles.center} textClass="h3Light">
            {isGBCountry() ? i18n.t('welcome.how-you-can-help.title-uk') : i18n.t('welcome.how-you-can-help.title')}
          </Text>

          <RegularText style={styles.subheader}>
            {isGBCountry() ? i18n.t('welcome.how-you-can-help.text1-uk') : i18n.t('welcome.how-you-can-help.text1')}
          </RegularText>

          {isGBCountry() ? (
            <RegularText style={styles.subheader2}>{i18n.t('welcome.how-you-can-help.text2-uk')}</RegularText>
          ) : null}

          {isUSCountry() ? (
            <RegularText style={styles.subheader2}>{i18n.t('welcome.how-you-can-help.text2')}</RegularText>
          ) : null}

          {isSECountry() ? (
            <RegularText style={styles.subheader2}>
              {i18n.t('welcome.disclaimer')}{' '}
              <ClickableText onPress={helpUrl} style={[styles.subheader2, styles.nhsWebsite]} testID="disclaimer">
                {i18n.t('welcome.disclaimer-link')}
              </ClickableText>
            </RegularText>
          ) : null}

          {isGBCountry() ? (
            <PartnerLogosGB style={styles.partnerLogosGB} />
          ) : (
            <Image source={partnersLogos} style={styles.partnersLogo} />
          )}

          {isUSCountry() ? (
            <View style={styles.partnerContainer}>
              <RegularText style={styles.partnerHeader}>{i18n.t('welcome.from-researchers')}</RegularText>

              <View style={styles.divider} />

              <RegularText style={styles.partnerList}>
                {i18n.t('names.harvard-th-chan-school-of-public-health')}
                <Slash />
                {i18n.t('names.mass-general-hospital')}
                <Slash />
                {i18n.t('names.kings-college-london')}
                <Slash />
                {i18n.t('names.stanford-university-school-of-medicine')}
                <Slash />
                {i18n.t('names.zoe')}
              </RegularText>
            </View>
          ) : null}
        </View>

        <View style={{ flex: 1 }} />

        <Button onPress={onCreateAccountPress} testID="create-account-2" text={i18n.t('welcome.create-account')} />
      </Screen>

      <CountryIpModal
        closeModal={onCloseModal}
        isModalVisible={ipModalVisible}
        navigation={navigation}
        testID="country-ip-modal"
      />
    </>
  );
};

export default Welcome2Screen;
