import Connect from '@assets/school-network-modules/Connect';
import { Button } from '@covid/components/buttons/Button';
import Screen, { Header } from '@covid/components/Screen';
import { HeaderText, RegularBoldText, RegularText } from '@covid/components/Text';
import { Coordinator } from '@covid/core/Coordinator';
import { schoolNetworkCoordinator } from '@covid/features/school-network/SchoolNetworkCoordinator';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors } from '@theme';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';

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
      <Screen showBackButton navigation={navigation} style={styles.container} testID="school-intro-screen">
        <View style={styles.container}>
          <Connect style={{ marginBottom: 24, marginLeft: 16, marginTop: 24 }} />

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
          <Button branded onPress={goNext}>
            {i18n.t('school-networks.intro.cta')}
          </Button>
          <Button onPress={() => NavigatorService.navigate('Dashboard')}>{i18n.t('skip')}</Button>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    marginBottom: 32,
    marginHorizontal: 24,
    marginVertical: 16,
  },

  buttonsContainer: {
    marginBottom: 48,
    paddingHorizontal: 8,
  },

  container: {
    backgroundColor: colors.white,
    flex: 1,
  },

  description: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },

  header: {
    marginRight: 72,
  },
});
