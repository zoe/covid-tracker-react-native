import { gbPartners, svPartners, usPartners } from '@assets';
import { BrandedButton } from '@covid/components';
import { ClickableText, RegularBoldText, RegularText } from '@covid/components/Text';
import {
  ILocalisationService,
  isGBCountry,
  isSECountry,
  isUSCountry,
} from '@covid/core/localisation/LocalisationService';
import appCoordinator from '@covid/features/AppCoordinator';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import i18n from '@covid/locale/i18n';
import { useInjection } from '@covid/provider/services.hooks';
import { Services } from '@covid/provider/services.types';
import { openWebLink } from '@covid/utils/links';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors } from '@theme';
import React, { FC, useCallback, useState } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import CountryIpModal from './CountryIpModal';
import { getLocaleFlagIcon } from './helpers';

const Slash = () => <RegularBoldText style={styles.slash}> / </RegularBoldText>;

type PropsType = {
  navigation: StackNavigationProp<ScreenParamList, 'Welcome'>;
  route: RouteProp<ScreenParamList, 'Welcome'>;
};

const Welcome2Screen: FC<PropsType> = ({ navigation }) => {
  const localisationService = useInjection<ILocalisationService>(Services.Localisation);

  const [ipModalVisible, setIpModalVisible] = useState(false);

  const onLoginPress = useCallback(() => navigation.navigate('Login'), [navigation.navigate]);

  const onCloseModal = useCallback(() => setIpModalVisible(false), [setIpModalVisible]);

  const onCreateAccountPress = useCallback(async () => {
    if (await localisationService.shouldAskCountryConfirmation()) {
      setIpModalVisible(true);
    } else {
      appCoordinator.goToPreRegisterScreens();
    }
  }, [localisationService.shouldAskCountryConfirmation, setIpModalVisible, isUSCountry, navigation.navigate]);

  const getFlagIcon = useCallback(getLocaleFlagIcon, [getLocaleFlagIcon]);

  const helpUrl = useCallback(() => {
    if (isGBCountry()) {
      openWebLink('https://www.nhs.uk/conditions/coronavirus-covid-19/');
    } else if (isSECountry()) {
      openWebLink('https://www.1177.se');
    }
  }, [isGBCountry, isSECountry]);

  const partnersLogos = useCallback(() => {
    if (isGBCountry()) {
      return gbPartners;
    }
    if (isSECountry()) {
      return svPartners;
    }
    return usPartners;
  }, [isGBCountry, isSECountry, gbPartners, svPartners, usPartners]);

  return (
    <SafeAreaView style={styles.safeView}>
      <View style={styles.rootContainer}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.covidContainer}>
            <View style={styles.headerRow}>
              <ClickableText onPress={onLoginPress} style={styles.login} testID="login">
                {i18n.t('welcome.sign-in')}
              </ClickableText>
              <TouchableOpacity onPress={() => navigation.navigate('CountrySelect')} testID="selectCountry">
                <Image source={getFlagIcon()} style={styles.flagIcon} testID="flag" />
              </TouchableOpacity>
            </View>
            <View>
              <RegularText style={styles.subtitle}>{i18n.t('welcome.how-you-can-help.title')}</RegularText>
              <RegularText style={styles.subheader}>{i18n.t('welcome.how-you-can-help.text1')}</RegularText>

              {isUSCountry() && (
                <RegularText style={styles.subheader2}>{i18n.t('welcome.how-you-can-help.text2')}</RegularText>
              )}

              {(isSECountry() || isGBCountry()) && (
                <RegularText style={styles.subheader2}>
                  {'\n'}
                  {i18n.t('welcome.disclaimer')}{' '}
                  <ClickableText onPress={helpUrl} style={[styles.subheader2, styles.nhsWebsite]} testID="disclaimer">
                    {i18n.t('welcome.disclaimer-link')}
                  </ClickableText>
                  .
                </RegularText>
              )}

              <Image source={partnersLogos()} style={styles.partnersLogo} />
            </View>

            {isUSCountry() && (
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
            )}
          </View>
        </ScrollView>
      </View>

      <CountryIpModal
        closeModal={onCloseModal}
        isModalVisible={ipModalVisible}
        navigation={navigation}
        testID="countryIpModal"
      />

      <View style={styles.buttonContainer}>
        <BrandedButton onPress={onCreateAccountPress} testID="createAccount">
          {i18n.t('welcome.create-account')}
        </BrandedButton>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    padding: 20,
  },
  covidContainer: {
    paddingBottom: 24,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  divider: {
    backgroundColor: colors.backgroundFour,
    height: 1,
    marginVertical: 5,
  },
  flagIcon: {
    height: 32,
    width: 32,
  },
  headerRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingVertical: 8,
  },
  login: {
    color: colors.primary,
    marginHorizontal: 16,
  },
  nhsWebsite: {
    textDecorationLine: 'underline',
  },
  partnerContainer: {
    backgroundColor: colors.white,
    borderRadius: 10,
    marginVertical: 16,
    paddingHorizontal: 30,
  },
  partnerHeader: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },
  partnerList: {
    fontSize: 16,
    lineHeight: 24,
    marginTop: 0,
    textAlign: 'center',
  },
  partnersLogo: {
    alignSelf: 'center',
    height: 160,
    marginVertical: 16,
    resizeMode: 'contain',
    width: '100%',
  },
  rootContainer: {
    backgroundColor: colors.backgroundSecondary,
    flex: 1,
  },
  safeView: {
    flexGrow: 1,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  slash: {
    color: colors.lightBlueBrand,
  },
  subheader: {
    color: colors.primary,
    fontSize: 16,
    lineHeight: 24,
    marginTop: 16,
    paddingVertical: 8,
    textAlign: 'center',
  },
  subheader2: {
    color: colors.secondary,
    fontFamily: 'SofiaPro-Light',
    fontSize: 16,
    lineHeight: 24,
    marginTop: 8,
    paddingVertical: 8,
    textAlign: 'center',
  },
  subtitle: {
    color: colors.primary,
    fontSize: 24,
    lineHeight: 32,
    marginTop: 25,
    paddingVertical: 8,
    textAlign: 'center',
  },
});

export default Welcome2Screen;
