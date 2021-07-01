import Screen, { Header } from '@covid/components/Screen';
import { HeaderText, RegularText } from '@covid/components/Text';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import i18n from '@covid/locale/i18n';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import * as React from 'react';
import { View } from 'react-native';

type Props = {
  navigation: StackNavigationProp<ScreenParamList, 'VaccineLogSymptomsInfo'>;
  route: RouteProp<ScreenParamList, 'VaccineLogSymptomsInfo'>;
};

export const VaccineLogSymptomsInfoScreen: React.FC<Props> = ({ route, navigation }) => {
  return (
    <Screen
      showCloseButton
      navigation={navigation}
      profile={route.params?.assessmentData?.patientData?.profile}
      testID="vaccine-log-symptoms-info-screen"
    >
      <Header>
        <HeaderText>{i18n.t('vaccines.log-symptoms.title')}</HeaderText>
      </Header>

      <View style={{ padding: 16 }}>
        <RegularText style={{ paddingBottom: 24 }}>{i18n.t('vaccines.log-symptoms.body-1')}</RegularText>
        <RegularText style={{ paddingBottom: 24 }}>{i18n.t('vaccines.log-symptoms.body-2')}</RegularText>
        <RegularText style={{ paddingBottom: 24 }}>{i18n.t('vaccines.log-symptoms.body-3')}</RegularText>
      </View>
    </Screen>
  );
};
