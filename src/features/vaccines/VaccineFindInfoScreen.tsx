import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import Screen, { Header } from '@covid/components/Screen';
import { HeaderText, RegularText } from '@covid/components/Text';
import i18n from '@covid/locale/i18n';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import { isGBCountry } from '@covid/core/localisation/LocalisationService';
import VaccineDemoUK from '@assets/vaccines/VaccineDemoUK';
import VaccineDemoUS from '@assets/vaccines/VaccineDemoUS';

type Props = {
  navigation: StackNavigationProp<ScreenParamList, 'VaccineFindInfo'>;
  route: RouteProp<ScreenParamList, 'VaccineFindInfo'>;
};

export const VaccineFindInfoScreen: React.FC<Props> = ({ route, navigation }) => {
  const { assessmentData } = route.params;

  // No case for SE, just GB and US atm (Jan 2021)
  const exampleSVG = isGBCountry() ? <VaccineDemoUK /> : <VaccineDemoUS />;

  return (
    <Screen extendEdges profile={assessmentData.patientData.profile} navigation={navigation}>
      <View style={{ padding: 16 }}>
        <Header>
          <HeaderText>{i18n.t('vaccines.find-info.title')}</HeaderText>
        </Header>

        <View style={{ padding: 16 }}>
          <RegularText style={{ paddingBottom: 24 }}>{i18n.t('vaccines.find-info.body-1')}</RegularText>
        </View>
      </View>

      {exampleSVG}
    </Screen>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200,
  },
});
