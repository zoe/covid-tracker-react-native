import { Screen } from '@covid/components/Screen';
import { ClickableText, RegularText } from '@covid/components/Text';
import { contentService } from '@covid/core/content/ContentService';
import { isGBCountry, isSECountry, LocalisationService } from '@covid/core/localisation/LocalisationService';
import { TStateApp } from '@covid/core/state/app/types';
import { TRootState } from '@covid/core/state/root';
import i18n from '@covid/locale/i18n';
import { TScreenParamList } from '@covid/routes/types';
import { cleanIntegerVal } from '@covid/utils/number';
import { StackNavigationProp } from '@react-navigation/stack';
import Button from '@tracer/components/atoms/Button';
import { useToggleRebrand } from 'health-study/redux/app/selectors';
import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';

import { ContributionCounter } from './components/ContributionCounter';
import { getLocaleFlagIcon } from './helpers';
import { covidStyles, healthStudyStyles } from './Welcome1ScreenStyle';

type TProps = {
  navigation: StackNavigationProp<TScreenParamList, 'Welcome'>;
};

export default function Welcome1Screen({ navigation }: TProps) {
  const toggleReBrand = useSelector(useToggleRebrand);
  const [userCount, setUserCount] = React.useState<number>(0);

  const getUserCount = React.useCallback(async () => {
    try {
      const response = await contentService.getUserCount();
      if (response) {
        setUserCount(cleanIntegerVal(response));
      }
    } catch (_) {}
  }, [contentService.getUserCount, cleanIntegerVal, setUserCount]);

  React.useEffect(() => {
    getUserCount();
  }, []);

  const isGB = isGBCountry();
  const isSE = isSECountry();

  const getMapImage = React.useCallback(() => {
    if (isGB) {
      return require('@assets/gbMap.png');
    }
    if (isSE) {
      return require('@assets/svMap.png');
    }
    return require('@assets/usMap.png');
  }, [isGB, isSE]);

  const onLoginPress = React.useCallback(() => navigation.navigate('Login', { terms: '' }), [navigation.navigate]);
  const onSelectCountryPress = React.useCallback(() => navigation.navigate('CountrySelect', {}), [navigation.navigate]);
  const onNextButtonPress = React.useCallback(() => navigation.navigate('Welcome2'), [navigation.navigate]);

  const styles = toggleReBrand ? healthStudyStyles : covidStyles;
  return (
    <Screen noHeader noPadding backgroundColor={styles.screen.backgroundColor} testID="welcome-1-screen">
      <Image source={getMapImage()} style={styles.mapImage} testID="map" />

      <View style={styles.loginContainer}>
        <ClickableText onPress={onLoginPress} style={styles.login} testID="login-link">
          {i18n.t('log-in')}
        </ClickableText>
        <View style={styles.pipe} />
        <TouchableOpacity onPress={onSelectCountryPress} testID="select-country">
          <Image
            source={getLocaleFlagIcon()}
            style={styles.flagIcon}
            testID={`flag-${LocalisationService.userCountry}`}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.covidContainer}>
        <RegularText style={styles.subtitle}>{i18n.t('welcome.take-a-minute')}</RegularText>
      </View>

      <View style={styles.contributors}>
        <ContributionCounter count={userCount} testID="counter" variant={1} />
      </View>

      <View style={styles.nextButtonContainer}>
        <Button
          buttonType="accent"
          onPress={onNextButtonPress}
          style={styles.nextButton}
          testID="create-account-1"
          text={i18n.t('welcome.tell-me-more')}
        />
      </View>
    </Screen>
  );
}
