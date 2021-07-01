import { Button } from '@covid/components/buttons/Button';
import ProgressStatus from '@covid/components/ProgressStatus';
import Screen, { Header, ProgressBlock } from '@covid/components/Screen';
import { HeaderText, RegularBoldText, RegularText } from '@covid/components/Text';
import { Coordinator } from '@covid/core/Coordinator';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors } from '@theme';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';

import { schoolNetworkCoordinator } from './SchoolNetworkCoordinator';

type Props = {
  navigation: StackNavigationProp<ScreenParamList, 'SchoolHowTo'>;
  route: RouteProp<ScreenParamList, 'SchoolHowTo'>;
};

export const SchoolHowToScreen: React.FC<Props> = ({ route, navigation }) => {
  const coordinator: Coordinator = schoolNetworkCoordinator;

  const goNext = () => {
    coordinator.gotoNextScreen(route.name);
  };

  const currentPatient = route.params?.patientData?.patientState;

  return (
    <View style={styles.container}>
      <Screen
        simpleCallout
        navigation={navigation}
        profile={currentPatient?.profile}
        style={styles.container}
        testID="school-how-to-screen"
      >
        <View style={styles.container}>
          <Header>
            <HeaderText style={styles.header}>{i18n.t('school-networks.how-to.title')}</HeaderText>
          </Header>

          <ProgressBlock>
            <ProgressStatus maxSteps={6} step={1} />
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
        <Button branded onPress={goNext}>
          {i18n.t('school-networks.how-to.cta')}
        </Button>
        <Button onPress={() => NavigatorService.navigate('Dashboard')}>{i18n.t('skip')}</Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonsContainer: {
    marginBottom: 48,
    paddingHorizontal: 8,
  },

  container: {
    backgroundColor: colors.backgroundPrimary,
    flex: 1,
  },

  description: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },

  header: {
    marginRight: 72,
  },

  label: {
    marginTop: 4,
  },
});
