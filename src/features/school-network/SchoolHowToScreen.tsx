import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';
import { View } from 'native-base';

import { colors } from '@theme';
import Screen, { Header, ProgressBlock } from '@covid/components/Screen';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import { HeaderText, RegularText, RegularBoldText } from '@covid/components/Text';
import { Coordinator } from '@covid/core/Coordinator';
import ProgressStatus from '@covid/components/ProgressStatus';
import { Button } from '@covid/components/Buttons/Button';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';

import schoolNetworkCoordinator from './SchoolNetworkCoordinator';

type Props = {
  navigation: StackNavigationProp<ScreenParamList, 'SchoolHowTo'>;
  route: RouteProp<ScreenParamList, 'SchoolHowTo'>;
};

export const SchoolHowToScreen: React.FC<Props> = ({ route, navigation }) => {
  const coordinator: Coordinator = schoolNetworkCoordinator;

  const goNext = () => {
    coordinator.gotoNextScreen(route.name);
  };

  const currentPatient = route.params.patientData?.patientState;

  return (
    <View style={styles.container}>
      <Screen profile={currentPatient?.profile} navigation={navigation} style={styles.container} simpleCallout>
        <View style={styles.container}>
          <Header>
            <HeaderText style={styles.header}>{i18n.t('school-networks.how-to.title')}</HeaderText>
          </Header>

          <ProgressBlock>
            <ProgressStatus step={1} maxSteps={6} />
          </ProgressBlock>

          <View style={styles.description}>
            <RegularBoldText>{i18n.t('school-networks.how-to.point-1.title')}</RegularBoldText>
            <RegularText style={styles.label}>{i18n.t('school-networks.how-to.point-1.description')}</RegularText>
            <View style={{ height: 24 }} />
            <RegularBoldText>{i18n.t('school-networks.how-to.point-2.title')}</RegularBoldText>
            <RegularText style={styles.label}>{i18n.t('school-networks.how-to.point-2.description')}</RegularText>
          </View>
        </View>
      </Screen>

      <View style={styles.buttonsContainer}>
        <Button onPress={goNext} branded>
          {i18n.t('school-networks.how-to.cta')}
        </Button>
        <Button onPress={() => NavigatorService.navigate('Dashboard')}>{i18n.t('school-networks.how-to.skip')}</Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundPrimary,
  },

  header: {
    marginRight: 72,
  },

  description: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },

  label: {
    marginTop: 4,
  },

  buttonsContainer: {
    paddingHorizontal: 8,
    marginBottom: 48,
  },
});
