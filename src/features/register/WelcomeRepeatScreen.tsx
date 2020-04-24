import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RouteProp } from '@react-navigation/native';
import { Linking } from 'expo';
import React, { useState, useEffect } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { covidIcon, menuIcon, gbPartnersReturn, svPartnersReturn, usPartnersReturn } from '../../../assets';
import { colors } from '../../../theme';
import { ContributionCounter } from '../../components/ContributionCounter';
import { BrandedButton, RegularText } from '../../components/Text';
import { AsyncStorageService } from '../../core/AsyncStorageService';
import { PushNotificationService } from '../../core/PushNotificationService';
import UserService, { isGBCountry, isSECountry, isUSCountry } from '../../core/user/UserService';
import i18n from '../../locale/i18n';
import { ScreenParamList } from '../ScreenParamList';

type PropsType = {
  navigation: DrawerNavigationProp<ScreenParamList, 'WelcomeRepeat'>;
  route: RouteProp<ScreenParamList, 'WelcomeRepeat'>;
};

interface WelcomeScreenState {
  userCount: number;
}

export const WelcomeRepeatScreen: React.FC<PropsType> = (props) => {
  const [state, setState] = useState<WelcomeScreenState>({ userCount: 0 });

  useEffect(() => {
    const init = async () => {
      const userService = new UserService();
      const userCount = await userService.getUserCount();
      setState({ userCount: userCount ? parseInt(userCount, 10) : 0 });

      const hasPushToken = await AsyncStorageService.getPushToken();
      if (!hasPushToken) {
        const pushToken = await PushNotificationService.getPushToken(false);
        if (pushToken) {
          try {
            await userService.savePushToken(pushToken);
            AsyncStorageService.setPushToken(pushToken);
          } catch (error) {
            // Ignore failure.
          }
        }
      }
    };

    init();
  }, []);

  const handleButtonPress = () => {
    props.navigation.navigate('SelectProfile');
  };

  const openWebsite = () => {
    if (isUSCountry()) {
      Linking.openURL('https://covid.joinzoe.com/us');
    } else {
      Linking.openURL('https://covid.joinzoe.com/');
    }
  };

  const partnersLogos = () => {
    if (isGBCountry()) {
      return gbPartnersReturn;
    } else if (isSECountry()) {
      return svPartnersReturn;
    } else {
      return usPartnersReturn;
    }
  };

  return (
    <SafeAreaView style={styles.safeView}>
      <ScrollView>
        <View style={styles.rootContainer}>
          <View style={styles.headerRow}>
            <TouchableOpacity
              onPress={() => {
                props.navigation.toggleDrawer();
              }}>
              <Image source={menuIcon} style={styles.menuIcon} />
            </TouchableOpacity>
          </View>

          <View style={styles.covidIconBackground}>
            <Image source={covidIcon} style={styles.covidIcon} resizeMode="contain" />
          </View>

          <Text style={styles.appName}>{i18n.t('welcome.title')}</Text>

          <RegularText style={styles.subtitle}>{i18n.t('welcome.take-a-minute')}</RegularText>

          <ContributionCounter variant={2} count={state.userCount} />

          <Image style={styles.partnersLogo} source={partnersLogos()} />

          <View style={{ flex: 1 }} />

          <TouchableOpacity style={styles.discoveriesContainer} onPress={openWebsite}>
            <View style={styles.discoveriesTitleBackground}>
              <RegularText style={styles.discoveriesTitle}>{i18n.t('welcome.research')}</RegularText>
            </View>
            <RegularText style={styles.discoveriesText}>{i18n.t('welcome.see-how-your-area-is-affected')}</RegularText>
            <RegularText style={styles.discoveriesVisitText}>{i18n.t('welcome.visit-the-website')}</RegularText>
          </TouchableOpacity>

          <BrandedButton style={styles.reportButton} onPress={handleButtonPress}>
            {i18n.t('welcome.report-button')}
          </BrandedButton>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
    backgroundColor: colors.brand,
  },
  rootContainer: {
    paddingHorizontal: 24,
    paddingTop: 24,
    flex: 1,
    alignItems: 'center',
  },
  headerRow: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  covidIconBackground: {
    backgroundColor: colors.predict,
    padding: 8,
    borderRadius: 8,
    marginVertical: 24,
  },
  covidIcon: {
    height: 48,
    width: 48,
  },
  appName: {
    color: colors.white,
    fontSize: 14,
  },
  subtitle: {
    color: colors.white,
    fontSize: 24,
    lineHeight: 38,
    textAlign: 'center',
    marginTop: 16,
  },
  discoveriesButton: {
    backgroundColor: colors.backgroundTertiary,
    alignSelf: 'center',
    width: 180,
    margin: 10,
    elevation: 0,
  },
  discoveriesVisitText: {
    color: colors.lightBrand,
    fontSize: 16,
    lineHeight: 24,
  },
  discoveriesTitleBackground: {
    backgroundColor: colors.slashBlue,
    paddingHorizontal: 4,
    borderRadius: 4,
  },
  discoveriesTitle: {
    fontSize: 12,
    color: colors.white,
    letterSpacing: 0.2,
  },
  discoveriesText: {
    textAlign: 'center',
    marginHorizontal: 100,
    marginVertical: 8,
    color: colors.white,
    fontSize: 16,
    lineHeight: 24,
  },
  discoveriesContainer: {
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.backgroundSecondary,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  partnersLogo: {
    width: '95%',
    height: 100,
    resizeMode: 'contain',
  },
  menuIcon: {
    height: 20,
    width: 20,
    tintColor: colors.white,
  },
  reportButton: {
    marginTop: 48,
    textAlign: 'center',
    backgroundColor: colors.purple,
    alignSelf: 'center',
    width: '100%',
    elevation: 0,
  },
});
