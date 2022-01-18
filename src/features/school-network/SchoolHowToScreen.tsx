import { Button } from '@covid/components/buttons/Button';
import { ProgressHeader } from '@covid/components/ProgressHeader';
import { Screen } from '@covid/components/Screen';
import { RegularBoldText, RegularText } from '@covid/components/Text';
import { Coordinator } from '@covid/core/Coordinator';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import { TScreenParamList } from '@covid/routes/types';
import { sizes, styling } from '@covid/themes';
import { RouteProp } from '@react-navigation/native';
import { colors } from '@theme';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';

import { schoolNetworkCoordinator } from './SchoolNetworkCoordinator';

type TProps = {
  route: RouteProp<TScreenParamList, 'SchoolHowTo'>;
};

export const SchoolHowToScreen: React.FC<TProps> = ({ route }) => {
  const coordinator: Coordinator = schoolNetworkCoordinator;

  const goNext = () => {
    coordinator.gotoNextScreen(route.name);
  };

  const currentPatient = route.params?.patientData?.patientState;

  return (
    <Screen
      simpleCallout
      backgroundColor={colors.backgroundPrimary}
      profile={currentPatient?.profile}
      testID="school-how-to-screen"
    >
      <ProgressHeader currentStep={1} maxSteps={6} title={i18n.t('school-networks.how-to.title')} />

      <RegularBoldText style={styles.marginTop}>{i18n.t('school-networks.how-to.point-1.title')}</RegularBoldText>
      <RegularText style={styles.label}>{i18n.t('school-networks.how-to.point-1.description')}</RegularText>

      <View style={{ height: 24 }} />

      <RegularBoldText>{i18n.t('school-networks.how-to.point-2.title')}</RegularBoldText>
      <RegularText style={styles.label}>{i18n.t('school-networks.how-to.point-2.description')}</RegularText>

      <View style={styling.flex} />

      <Button branded onPress={goNext}>
        {i18n.t('school-networks.how-to.cta')}
      </Button>
      <Button onPress={() => NavigatorService.navigate('Dashboard')}>{i18n.t('skip')}</Button>
    </Screen>
  );
};

const styles = StyleSheet.create({
  label: {
    marginTop: sizes.xxs,
  },
  marginTop: {
    marginTop: sizes.m,
  },
});
