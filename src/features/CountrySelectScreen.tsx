import { gbFlag, svFlag, usFlag } from '@assets';
import { BasicNavHeader, SafeLayout } from '@covid/components';
import { localisationService } from '@covid/core/localisation/LocalisationService';
import { SupportedCountryCodes } from '@covid/core/user/dto/UserAPIContracts';
import { userService } from '@covid/core/user/UserService';
import { appCoordinator } from '@covid/features/AppCoordinator';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import i18n from '@covid/locale/i18n';
import { grid, styling } from '@covid/themes';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors } from '@theme';
import * as React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface IProps {
  navigation: StackNavigationProp<ScreenParamList, 'CountrySelect'>;
  route: RouteProp<ScreenParamList, 'CountrySelect'>;
}

type TCountry = {
  code: SupportedCountryCodes;
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
  async function selectCountry(countryCode: SupportedCountryCodes) {
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
    <SafeLayout style={styles.safeLayout} testID="select-country-screen">
      <View style={styles.container}>
        <BasicNavHeader style={styles.navHeader} />
        <Text style={styles.text}>{i18n.t('select-country')}</Text>
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
    </SafeLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: grid.gutter,
    position: 'relative',
  },
  flagRow: {
    alignSelf: 'stretch',
    flexDirection: 'row',
  },
  navHeader: {
    left: 0,
    position: 'absolute',
    top: 0,
  },
  safeLayout: {
    backgroundColor: colors.predict,
  },
  text: {
    color: colors.white,
    fontSize: 24,
    paddingBottom: 40,
    textAlign: 'center',
  },
});
