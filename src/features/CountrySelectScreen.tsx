import { gbFlag, svFlag, usFlag } from '@assets';
import { ILocalisationService } from '@covid/core/localisation/LocalisationService';
import { SupportedCountryCodes } from '@covid/core/user/dto/UserAPIContracts';
import { IUserService } from '@covid/core/user/UserService';
import appCoordinator from '@covid/features/AppCoordinator';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import i18n from '@covid/locale/i18n';
import { lazyInject } from '@covid/provider/services';
import { Services } from '@covid/provider/services.types';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors } from '@theme';
import React, { Component } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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
    alignItems: 'center',
    backgroundColor: colors.predict,
    flex: 1,
    justifyContent: 'center',
  },
  flagRow: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  text: {
    color: colors.white,
    fontSize: 24,
    paddingBottom: 40,
  },
});
