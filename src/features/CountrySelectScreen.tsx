import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { Component } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { gbFlag, svFlag, usFlag } from '@assets';
import { colors } from '@covid/theme';
import i18n from '@covid/locale/i18n';
import { lazyInject } from '@covid/provider/services';
import { Services } from '@covid/provider/services.types';
import { ILocalisationService } from '@covid/core/localisation/LocalisationService';
import { IUserService } from '@covid/core/user/UserService';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import appCoordinator from '@covid/features/AppCoordinator';
import { SupportedCountryCodes } from '@covid/core/user/dto/UserAPIContracts';

type Props = {
  navigation: StackNavigationProp<ScreenParamList, 'CountrySelect'>;
  route: RouteProp<ScreenParamList, 'CountrySelect'>;
};

const US_CODE = 'US';
const GB_CODE = 'GB';
const SV_CODE = 'SE';

export class CountrySelectScreen extends Component<Props, object> {
  @lazyInject(Services.Localisation)
  private readonly localisationServce: ILocalisationService;
  @lazyInject(Services.User)
  private readonly userService: IUserService;

  private selectCountry = async (countryCode: SupportedCountryCodes) => {
    await this.localisationServce.setUserCountry(countryCode);

    if (appCoordinator.shouldShowCountryPicker && this.props.route?.params?.onComplete) {
      await this.userService.updateCountryCode({ country_code: countryCode });
      this.props.route.params.onComplete();
    } else {
      this.props.navigation.reset({
        index: 0,
        routes: [{ name: 'Welcome' }],
      });
    }
  };

  public render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{i18n.t('select-country')}</Text>
        <View style={styles.flagRow}>
          <TouchableOpacity onPress={() => this.selectCountry(US_CODE)}>
            <Image source={usFlag} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.selectCountry(GB_CODE)}>
            <Image source={gbFlag} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.selectCountry(SV_CODE)}>
            <Image source={svFlag} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.predict,
  },
  text: {
    color: colors.white,
    paddingBottom: 40,
    fontSize: 24,
  },
  flagRow: {
    alignSelf: 'stretch',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
});
