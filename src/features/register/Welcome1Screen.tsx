import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState, useEffect } from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import { usMap, gbMap, svMap, svFlag, usFlag, gbFlag } from '../../../assets';
import { colors } from '../../../theme';
import { ContributionCounter } from '../../components/ContributionCounter';
import { BrandedButton, RegularText } from '../../components/Text';
import UserService, { isGBCountry, isSECountry } from '../../core/user/UserService';
import i18n from '../../locale/i18n';
import { ScreenParamList } from '../ScreenParamList';
import { cleanIntegerVal } from '../../core/utils/number';

type PropsType = {
  navigation: StackNavigationProp<ScreenParamList, 'Welcome'>;
};

type WelcomeScreenState = {
  userCount: number;
};

const getFlagIcon = () => {
  if (isGBCountry()) {
    return gbFlag;
  } else if (isSECountry()) {
    return svFlag;
  } else {
    return usFlag;
  }
};

const getMapImage = () => {
  if (isGBCountry()) {
    return gbMap;
  } else if (isSECountry()) {
    return svMap;
  } else {
    return usMap;
  }
};

export const Welcome1Screen: React.FC<PropsType> = (props) => {
  const [state, setState] = useState<WelcomeScreenState>({ userCount: 0 });
  const userService = new UserService();

  useEffect(() => {
    userService.getUserCount().then((response) => {
      if (response) {
        const userCount = cleanIntegerVal(response);
        setState({ userCount });
      }
    });
  }, []);

  return (
    <View style={styles.safeView}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Image style={styles.mapImage} source={getMapImage()} />

        <TouchableOpacity
          style={styles.countryFlag}
          onPress={() => props.navigation.navigate('CountrySelect', { patientId: null })}>
          <Image style={styles.flagIcon} source={getFlagIcon()} />
        </TouchableOpacity>

        <View style={styles.rootContainer}>
          <View style={styles.covidContainer}>
            <RegularText style={styles.subtitle}>{i18n.t('welcome.take-a-minute')}</RegularText>
          </View>
        </View>
        <View style={styles.contributors}>
          <ContributionCounter variant={1} count={state.userCount} />
        </View>

        <View style={styles.nextButtonContainer}>
          <BrandedButton style={styles.nextButton} onPress={() => props.navigation.navigate('Welcome2')}>
            {i18n.t('welcome.tell-me-more')}
          </BrandedButton>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  safeView: {
    flexGrow: 1,
    backgroundColor: colors.brand,
  },
  scrollView: {
    backgroundColor: colors.brand,
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  rootContainer: {
    marginTop: 32,
    flex: 1,
    backgroundColor: colors.brand,
  },
  nextButtonContainer: {
    padding: 20,
    paddingBottom: 30,
  },
  nextButton: {
    backgroundColor: colors.purple,
    fontSize: 16,
  },
  countryFlag: {
    position: 'absolute',
    top: 56,
    end: 32,
  },
  covidContainer: {
    paddingHorizontal: 14,
    paddingBottom: 14,
  },
  mapImage: {
    height: 300,
    width: '100%',
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  subtitle: {
    color: colors.white,
    fontSize: 32,
    lineHeight: 48,
    paddingVertical: 24,
    paddingHorizontal: 40,
    textAlign: 'center',
    fontWeight: '300',
  },
  flagIcon: {
    height: 32,
    width: 32,
  },
  contributors: {
    paddingHorizontal: 32,
    marginBottom: 32,
  },
});
