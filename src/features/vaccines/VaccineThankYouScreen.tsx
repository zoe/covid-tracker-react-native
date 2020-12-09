import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Text } from 'native-base';
import { StyleSheet, View } from 'react-native';

import Screen from '@covid/components/Screen';
import { BrandedButton, HeaderText, RegularText } from '@covid/components/Text';
import assessmentCoordinator from '@covid/core/assessment/AssessmentCoordinator';
import i18n from '@covid/locale/i18n';
import { colors } from '@theme';
import Needle from '@assets/icons/Needle';

import { ScreenParamList } from '../ScreenParamList';

type Props = {
  navigation: StackNavigationProp<ScreenParamList, 'VaccineThankYou'>;
  route: RouteProp<ScreenParamList, 'VaccineThankYou'>;
};

export const VaccineThankYouScreen: React.FC<Props> = ({ route, navigation }) => {
  const handleSubmit = async () => {
    assessmentCoordinator.gotoNextScreen(route.name);
  };

  const currentPatient = assessmentCoordinator.assessmentData.patientData.patientState;
  return (
    <View style={styles.rootContainer}>
      <Screen profile={currentPatient.profile}>
        <View style={{ marginHorizontal: 16, marginTop: 36 }}>
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Needle height={64} width={64} color={colors.brand} />
          </View>

          <HeaderText style={{ marginTop: 36, textAlign: 'center' }}>{i18n.t('vaccines.thank-you.title')}</HeaderText>

          <RegularText style={{ marginTop: 36, textAlign: 'center' }}>{i18n.t('vaccines.thank-you.text')}</RegularText>
        </View>
      </Screen>

      <BrandedButton style={styles.continueButton} onPress={handleSubmit}>
        <Text>{i18n.t('vaccines.thank-you.confirm')}</Text>
      </BrandedButton>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: colors.backgroundPrimary,
  },

  continueButton: {
    marginHorizontal: 16,
    marginBottom: 32,
  },
});
