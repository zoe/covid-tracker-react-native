import { usMap, gbMap, svMap, svFlag, usFlag, gbFlag } from '@assets';
import { ContributionCounter } from '@covid/components/ContributionCounter';
import { BrandedButton, RegularText } from '@covid/components/Text';
import UserService, { isGBCountry, isSECountry } from '@covid/core/user/UserService';
import { cleanIntegerVal } from '@covid/core/utils/number';
import i18n from '@covid/locale/i18n';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState, useEffect, useCallback } from 'react';
import { Image, ScrollView, TouchableOpacity, View } from 'react-native';

import { ScreenParamList } from '../../ScreenParamList';
import styles from './styles';

const userService = new UserService();

type PropsType = {
  navigation: StackNavigationProp<ScreenParamList, 'Welcome'>;
};

const Welcome1Screen: React.FC<PropsType> = ({ navigation }) => {
  const [userCount, setUserCount] = useState<number>(0);

  useEffect(() => {
    userService.getUserCount().then((response) => {
      if (response) {
        const userCount = cleanIntegerVal(response);
        setUserCount(userCount);
      }
    });
  }, []);

  const getMapImage = useCallback(() => {
    if (isGBCountry()) {
      return gbMap;
    }
    if (isSECountry()) {
      return svMap;
    }
    return usMap;
  }, [isGBCountry, isSECountry]);

  const getFlagIcon = useCallback(() => {
    if (isGBCountry()) {
      return gbFlag;
    }
    if (isSECountry()) {
      return svFlag;
    }
    return usFlag;
  }, [isGBCountry, isSECountry]);

  const onSelectCountryPress = useCallback(() => navigation.navigate('CountrySelect', { patientId: null }), [
    navigation.navigate,
  ]);

  const onNextButtonPress = useCallback(() => navigation.navigate('Welcome2'), [navigation.navigate]);

  return (
    <View style={styles.safeView}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Image testID="map" style={styles.mapImage} source={getMapImage()} />

        <TouchableOpacity testID="selectCountry" style={styles.countryFlag} onPress={onSelectCountryPress}>
          <Image testID="flag" style={styles.flagIcon} source={getFlagIcon()} />
        </TouchableOpacity>

        <View style={styles.rootContainer}>
          <View style={styles.covidContainer}>
            <RegularText style={styles.subtitle}>{i18n.t('welcome.take-a-minute')}</RegularText>
          </View>
        </View>
        <View style={styles.contributors}>
          <ContributionCounter testID="counter" variant={1} count={userCount} />
        </View>

        <View style={styles.nextButtonContainer}>
          <BrandedButton testID="more" style={styles.nextButton} onPress={onNextButtonPress}>
            {i18n.t('welcome.tell-me-more')}
          </BrandedButton>
        </View>
      </ScrollView>
    </View>
  );
};

export default Welcome1Screen;
