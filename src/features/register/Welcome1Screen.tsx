import { gbMap, svMap, usMap } from '@assets';
import { BrandedButton } from '@covid/components';
import { ClickableText, RegularText } from '@covid/components/Text';
import { contentService } from '@covid/core/content/ContentService';
import { isGBCountry, isSECountry, LocalisationService } from '@covid/core/localisation/LocalisationService';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import i18n from '@covid/locale/i18n';
import { cleanIntegerVal } from '@covid/utils/number';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors } from '@theme';
import * as React from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import { ContributionCounter } from './components/ContributionCounter';
import { getLocaleFlagIcon } from './helpers';

type PropsType = {
  navigation: StackNavigationProp<ScreenParamList, 'Welcome'>;
};

const Welcome1Screen: React.FC<PropsType> = ({ navigation }) => {
  const [userCount, setUserCount] = React.useState<number>(0);

  React.useEffect(() => {
    contentService.getUserCount().then((response) => {
      if (response) {
        const userCount = cleanIntegerVal(response);
        setUserCount(userCount);
      }
    });
  }, [contentService.getUserCount, cleanIntegerVal, setUserCount]);

  const getMapImage = React.useCallback(() => {
    if (isGBCountry()) {
      return gbMap;
    }
    if (isSECountry()) {
      return svMap;
    }
    return usMap;
  }, [isGBCountry, isSECountry, gbMap, svMap, usMap]);

  const getFlagIcon = React.useCallback(getLocaleFlagIcon, [getLocaleFlagIcon]);

  const onLoginPress = React.useCallback(() => navigation.navigate('Login'), [navigation.navigate]);

  const onSelectCountryPress = React.useCallback(() => navigation.navigate('CountrySelect'), [navigation.navigate]);

  const onNextButtonPress = React.useCallback(() => navigation.navigate('Welcome2'), [navigation.navigate]);

  return (
    <View style={styles.safeView}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Image source={getMapImage()} style={styles.mapImage} testID="map" />
        <View style={styles.loginContainer}>
          <ClickableText onPress={onLoginPress} style={styles.login} testID="login-link">
            {i18n.t('log-in')}
          </ClickableText>
          <View style={styles.pipe} />
          <TouchableOpacity onPress={onSelectCountryPress} style={styles.countryFlag} testID="select-country">
            <Image source={getFlagIcon()} style={styles.flagIcon} testID={`flag-${LocalisationService.userCountry}`} />
          </TouchableOpacity>
        </View>

        <View style={styles.rootContainer}>
          <View style={styles.covidContainer}>
            <RegularText style={styles.subtitle}>{i18n.t('welcome.take-a-minute')}</RegularText>
          </View>
        </View>
        <View style={styles.contributors}>
          <ContributionCounter count={userCount} testID="counter" variant={1} />
        </View>

        <View style={styles.nextButtonContainer}>
          <BrandedButton onPress={onNextButtonPress} style={styles.nextButton} testID="create-account-1">
            {i18n.t('welcome.tell-me-more')}
          </BrandedButton>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  contributors: {
    marginBottom: 32,
    paddingHorizontal: 32,
  },
  countryFlag: {},
  covidContainer: {
    paddingBottom: 14,
    paddingHorizontal: 14,
  },
  flagIcon: {
    height: 32,
    width: 32,
  },
  login: {
    color: colors.white,
  },
  loginContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    right: 32,
    top: 60,
  },
  mapImage: {
    alignSelf: 'center',
    height: 300,
    resizeMode: 'contain',
    width: '100%',
  },
  nextButton: {
    backgroundColor: colors.purple,
    fontSize: 16,
  },
  nextButtonContainer: {
    padding: 20,
    paddingBottom: 30,
  },
  pipe: {
    backgroundColor: colors.white,
    height: 32,
    marginHorizontal: 16,
    width: 1,
  },
  rootContainer: {
    backgroundColor: colors.brand,
    flex: 1,
    marginTop: 32,
  },
  safeView: {
    backgroundColor: colors.brand,
    flexGrow: 1,
  },
  scrollView: {
    backgroundColor: colors.brand,
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  subtitle: {
    color: colors.white,
    fontFamily: 'SofiaPro-Light',
    fontSize: 32,
    lineHeight: 48,
    paddingHorizontal: 24,
    paddingVertical: 24,
    textAlign: 'center',
  },
});

export default Welcome1Screen;
