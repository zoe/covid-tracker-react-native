import VaccineDemoUK from '@assets/vaccines/VaccineDemoUK';
import VaccineDemoUS from '@assets/vaccines/VaccineDemoUS';
import Screen, { Header } from '@covid/components/Screen';
import { HeaderText, RegularText } from '@covid/components/Text';
import { isGBCountry, isUSCountry } from '@covid/core/localisation/LocalisationService';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import i18n from '@covid/locale/i18n';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import * as React from 'react';
import { View } from 'react-native';

type Props = {
  navigation: StackNavigationProp<ScreenParamList, 'VaccineFindInfo'>;
  route: RouteProp<ScreenParamList, 'VaccineFindInfo'>;
};

export const VaccineFindInfoScreen: React.FC<Props> = ({ route, navigation }) => {
  // No case for SE, just GB and US atm (Feb 2021)
  let exampleSVG;
  if (isGBCountry()) {
    exampleSVG = <VaccineDemoUK />;
  }
  if (isUSCountry()) {
    exampleSVG = <VaccineDemoUS />;
  }

  return (
    <Screen
      extendEdges
      showCloseButton
      navigation={navigation}
      profile={route.params?.assessmentData?.patientData?.profile}
      testID="vaccine-find-info-screen"
    >
      <View style={{ padding: 16 }}>
        <Header>
          <HeaderText>{i18n.t('vaccines.find-info.title')}</HeaderText>
        </Header>

        <View style={{ padding: 16 }}>
          <RegularText style={{ paddingBottom: 24 }}>{i18n.t('vaccines.find-info.body-1')}</RegularText>
        </View>
      </View>

      <View style={{ alignContent: 'center', padding: 8 }}>{exampleSVG}</View>
    </Screen>
  );
};
