import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

import Screen, { Header } from '@covid/components/Screen';
import { HeaderText, RegularText } from '@covid/components/Text';
import i18n from '@covid/locale/i18n';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import { vaccinationnExampleUK } from '@assets';

type Props = {
  navigation: StackNavigationProp<ScreenParamList, 'VaccineFindInfo'>;
  route: RouteProp<ScreenParamList, 'VaccineFindInfo'>;
};

export const VaccineFindInfoScreen: React.FC<Props> = ({ route, navigation }) => {
  const { assessmentData } = route.params;

  return (
    <Screen profile={assessmentData.patientData.profile} navigation={navigation}>
      <Header>
        <HeaderText>{i18n.t('vaccines.find-info.title')}</HeaderText>
      </Header>

      <View style={{ padding: 16 }}>
        <RegularText style={{ paddingBottom: 24 }}>{i18n.t('vaccines.find-info.body-1')}</RegularText>
      </View>

      <Image style={styles.image} source={vaccinationnExampleUK} />
    </Screen>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200,
  },
});
