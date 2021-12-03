import Connect from '@assets/school-network-modules/Connect';
import { Button } from '@covid/components/buttons/Button';
import { Screen } from '@covid/components/Screen';
import { HeaderText, RegularBoldText, RegularText } from '@covid/components/Text';
import { Coordinator } from '@covid/core/Coordinator';
import { schoolNetworkCoordinator } from '@covid/features/school-network/SchoolNetworkCoordinator';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import { TScreenParamList } from '@covid/routes/types';
import { styling } from '@covid/themes';
import { RouteProp } from '@react-navigation/native';
import * as React from 'react';
import { View } from 'react-native';

type TProps = {
  route: RouteProp<TScreenParamList, 'SchoolIntro'>;
};

const enableCTAs = false;

export const SchoolIntroScreen: React.FC<TProps> = ({ route }) => {
  const coordinator: Coordinator = schoolNetworkCoordinator;

  const goNext = () => {
    coordinator.gotoNextScreen(route.name);
  };

  return (
    <Screen backgroundColor="white" testID="school-intro-screen">
      <Connect style={styling.selfCenter} />

      <View style={{ height: 32 }} />
      <HeaderText>{i18n.t('school-networks.intro.title')}</HeaderText>
      <View style={{ height: 32 }} />

      <RegularBoldText>{i18n.t('school-networks.intro.point-1.title')}</RegularBoldText>
      <RegularText>{i18n.t('school-networks.intro.point-1.description')}</RegularText>

      <View style={{ height: 16 }} />

      <RegularBoldText>{i18n.t('school-networks.intro.point-2.title')}</RegularBoldText>
      <RegularText>{i18n.t('school-networks.intro.point-2.description')}</RegularText>

      <View style={{ height: 16 }} />

      <RegularBoldText>{i18n.t('school-networks.intro.point-3.title')}</RegularBoldText>
      <RegularText>{i18n.t('school-networks.intro.point-3.description')}</RegularText>

      <View style={styling.flex} />

      {enableCTAs ? (
        <>
          <Button branded onPress={goNext}>
            {i18n.t('school-networks.intro.cta')}
          </Button>
          <Button onPress={() => NavigatorService.navigate('Dashboard')}>{i18n.t('skip')}</Button>
        </>
      ) : null}
    </Screen>
  );
};
