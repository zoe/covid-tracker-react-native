import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';
import { View } from 'native-base';

import { colors } from '@theme';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import Screen, { Header } from '@covid/components/Screen';
import SchoolConnectImage from '@assets/school-network-modules/connect.svg';
import { HeaderText, RegularBoldText, RegularText } from '@covid/components/Text';
import i18n from '@covid/locale/i18n';
import { Button } from '@covid/components/Buttons/Button';
import NavigatorService from '@covid/NavigatorService';

type Props = {
  navigation: StackNavigationProp<ScreenParamList, 'SchoolNetworkInfo'>;
  route: RouteProp<ScreenParamList, 'SchoolNetworkInfo'>;
};

export const SchoolNetworkInfoScreen: React.FC<Props> = ({ route, navigation }) => {
  return (
    <View style={styles.container}>
      <Screen showBackButton navigation={navigation} style={styles.container}>
        <View style={styles.container}>
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
