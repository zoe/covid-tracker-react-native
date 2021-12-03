import { gbFlag, svFlag, usFlag } from '@assets';
import { RegularText } from '@covid/components';
import { Screen } from '@covid/components/Screen';
import { localisationService } from '@covid/core/localisation/LocalisationService';
import { TSupportedCountryCodes } from '@covid/core/user/dto/UserAPIContracts';
import { userService } from '@covid/core/user/UserService';
import { appCoordinator } from '@covid/features/AppCoordinator';
import i18n from '@covid/locale/i18n';
import { TScreenParamList } from '@covid/routes/types';
import { sizes, styling } from '@covid/themes';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors } from '@theme';
import * as React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

interface IProps {
  navigation: StackNavigationProp<TScreenParamList, 'CountrySelect'>;
  route: RouteProp<TScreenParamList, 'CountrySelect'>;
}

type TCountry = {
  code: TSupportedCountryCodes;
  source: any;
};

const countries: TCountry[] = [
  {
    code: 'US',
    source: usFlag,
  },
  {
    code: 'GB',
    source: gbFlag,
  },
  {
    code: 'SE',
    source: svFlag,
  },
];

export function CountrySelectScreen(props: IProps) {
  async function selectCountry(countryCode: TSupportedCountryCodes) {
    await localisationService.setUserCountry(countryCode);

    if (appCoordinator.shouldShowCountryPicker && props.route?.params?.onComplete) {
      await userService.updateCountryCode({ country_code: countryCode });
      props.route.params?.onComplete();
    } else {
      props.navigation.reset({
        index: 0,
        routes: [{ name: 'Welcome' }],
      });
    }
  }

  return (
    <Screen backgroundColor={colors.predict} testID="select-country-screen">
      <View style={styles.container}>
        <RegularText style={styles.text}>{i18n.t('select-country')}</RegularText>
        <View style={styles.flagRow}>
          {countries.map((country, index) => (
            <TouchableOpacity
              key={`country-${country.code}`}
              onPress={() => selectCountry(country.code)}
              style={index !== 0 ? [styling.flex, styling.marginLeft] : styling.flex}
              testID={`select-country-${country.code}`}
            >
              <Image resizeMode="contain" source={country.source} style={styling.fullWidth} />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: sizes.m,
  },
  flagRow: {
    alignSelf: 'stretch',
    flexDirection: 'row',
  },
  text: {
    color: colors.white,
    fontSize: 24,
    paddingBottom: sizes.xl,
    textAlign: 'center',
  },
});
