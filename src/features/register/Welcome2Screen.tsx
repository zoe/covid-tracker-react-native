import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC, useCallback, useState } from 'react';
import { Image, Linking, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { RouteProp } from '@react-navigation/native';

import { gbPartners, svPartners, usPartners } from '@assets';
import { BrandedButton, ClickableText, RegularBoldText, RegularText } from '@covid/components/Text';
import { ICoreService, isGBCountry, isSECountry, isUSCountry } from '@covid/core/user/UserService';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import i18n from '@covid/locale/i18n';
import { useInjection } from '@covid/provider/services.hooks';
import { Services } from '@covid/provider/services.types';
import appCoordinator from '@covid/features/AppCoordinator';
import { colors } from '@theme';

import CountryIpModal from './CountryIpModal';
import { getLocaleFlagIcon } from './helpers';

const Slash = () => <RegularBoldText style={styles.slash}> / </RegularBoldText>;

type PropsType = {
  navigation: StackNavigationProp<ScreenParamList, 'Welcome'>;
  route: RouteProp<ScreenParamList, 'Welcome'>;
};

const Welcome2Screen: FC<PropsType> = ({ navigation }) => {
  const userService = useInjection<ICoreService>(Services.User);

  const [ipModalVisible, setIpModalVisible] = useState(false);

  const onLoginPress = useCallback(() => navigation.navigate('Login'), [navigation.navigate]);

  const onCloseModal = useCallback(() => setIpModalVisible(false), [setIpModalVisible]);

  const onCreateAccountPress = useCallback(async () => {
    if (await userService.shouldAskCountryConfirmation()) {
      setIpModalVisible(true);
    } else {
      appCoordinator.goToPreRegisterScreens();
    }
  }, [userService.shouldAskCountryConfirmation, setIpModalVisible, isUSCountry, navigation.navigate]);

  const getFlagIcon = useCallback(getLocaleFlagIcon, [getLocaleFlagIcon]);

  const helpUrl = useCallback(() => {
    if (isGBCountry()) {
      Linking.openURL('https://www.nhs.uk/conditions/coronavirus-covid-19/');
    } else if (isSECountry()) {
      Linking.openURL('https://www.1177.se');
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
              <ClickableText testID="login" style={styles.login} onPress={onLoginPress}>
                {i18n.t('welcome.sign-in')}
              </ClickableText>
              <TouchableOpacity
                testID="selectCountry"
                onPress={() => navigation.navigate('CountrySelect', { patientId: null })}>
                <Image testID="flag" style={styles.flagIcon} source={getFlagIcon()} />
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
                  <ClickableText testID="disclaimer" style={[styles.subheader2, styles.nhsWebsite]} onPress={helpUrl}>
                    {i18n.t('welcome.disclaimer-link')}
                  </ClickableText>
                  .
                </RegularText>
              )}

              <Image style={styles.partnersLogo} source={partnersLogos()} />
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
        testID="countryIpModal"
        navigation={navigation}
        isModalVisible={ipModalVisible}
        closeModal={onCloseModal}
      />

      <View style={styles.buttonContainer}>
        <BrandedButton testID="createAccount" onPress={onCreateAccountPress}>
          {i18n.t('welcome.create-account')}
        </BrandedButton>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeView: {
    flexGrow: 1,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  rootContainer: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
  },
  headerRow: {
    paddingVertical: 8,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  covidContainer: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    paddingTop: 24,
  },
  partnerHeader: {
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 20,
  },
  divider: {
    height: 1,
    backgroundColor: colors.backgroundFour,
    marginVertical: 5,
  },
  partnerList: {
    marginTop: 0,
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 24,
  },
  login: {
    color: colors.primary,
    marginHorizontal: 16,
  },
  subheader: {
    paddingVertical: 8,
    color: colors.primary,
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 24,
    marginTop: 16,
  },
  subheader2: {
    paddingVertical: 8,
    color: colors.secondary,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '300',
    lineHeight: 24,
    marginTop: 8,
  },
  subtitle: {
    color: colors.primary,
    fontSize: 24,
    lineHeight: 32,
    paddingVertical: 8,
    textAlign: 'center',
    marginTop: 25,
  },
  slash: {
    color: colors.lightBlueBrand,
  },
  partnersLogo: {
    marginVertical: 16,
    height: 160,
    width: '100%',
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  partnerContainer: {
    marginVertical: 16,
    paddingHorizontal: 30,
    backgroundColor: colors.white,
    borderRadius: 10,
  },
  buttonContainer: {
    padding: 20,
  },
  flagIcon: {
    height: 32,
    width: 32,
  },
  nhsWebsite: {
    textDecorationLine: 'underline',
  },
});

export default Welcome2Screen;
