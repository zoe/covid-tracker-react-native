import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Linking, StyleSheet } from 'react-native';
import { View } from 'native-base';

import { colors } from '@theme';
import Screen, { Header } from '@covid/components/Screen';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import { HeaderText, RegularText, RegularBoldText } from '@covid/components/Text';
import { Coordinator } from '@covid/core/Coordinator';
import { Button } from '@covid/components/buttons/Button';
import i18n from '@covid/locale/i18n';
import SchoolConnectImage from '@assets/school-network-modules/connect.svg';
import NavigatorService from '@covid/NavigatorService';
import schoolNetworkCoordinator from '@covid/features/school-network/SchoolNetworkCoordinator';

type Props = {
  navigation: StackNavigationProp<ScreenParamList, 'SchoolIntro'>;
  route: RouteProp<ScreenParamList, 'SchoolIntro'>;
};

const enableCTAs = false;

export const SchoolIntroScreen: React.FC<Props> = ({ route, navigation }) => {
  const coordinator: Coordinator = schoolNetworkCoordinator;

  const goNext = () => {
    coordinator.gotoNextScreen(route.name);
  };

  return (
    <View style={styles.container}>
      <Screen showBackButton navigation={navigation} style={styles.container}>
        <View style={styles.container}>
          <SchoolConnectImage style={{ marginLeft: 16, marginBottom: 24, marginTop: 24 }} />

          <Header>
            <HeaderText style={styles.header}>{i18n.t('school-networks.intro.title')}</HeaderText>
          </Header>

          <View style={styles.description}>
            <RegularBoldText>{i18n.t('school-networks.intro.point-1.title')}</RegularBoldText>
            <RegularText>{i18n.t('school-networks.intro.point-1.description')}</RegularText>
            <View style={{ height: 16 }} />
            <RegularBoldText>{i18n.t('school-networks.intro.point-2.title')}</RegularBoldText>
            <RegularText>{i18n.t('school-networks.intro.point-2.description')}</RegularText>
            <View style={{ height: 16 }} />
            <RegularBoldText>{i18n.t('school-networks.intro.point-3.title')}</RegularBoldText>
            <RegularText>{i18n.t('school-networks.intro.point-3.description')}</RegularText>
          </View>
        </View>
      </Screen>

      {enableCTAs ? (
        <View style={styles.buttonsContainer}>
          <Button onPress={goNext} branded>
            {i18n.t('school-networks.intro.cta')}
          </Button>
          <Button onPress={() => NavigatorService.navigate('Dashboard')}>{i18n.t('school-networks.intro.skip')}</Button>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },

  header: {
    marginRight: 72,
  },

  description: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },

  button: {
    marginVertical: 16,
    marginHorizontal: 24,
    marginBottom: 32,
  },

  buttonsContainer: {
    paddingHorizontal: 8,
    marginBottom: 48,
  },
});
