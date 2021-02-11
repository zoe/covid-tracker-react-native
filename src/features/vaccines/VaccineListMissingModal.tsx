import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { colors } from '@theme';
import i18n from '@covid/locale/i18n';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import { HeaderText, BrandedButton, Text } from '@covid/components';
import assessmentCoordinator, { AssessmentData } from '@covid/core/assessment/AssessmentCoordinator';

type Props = {
  navigation: StackNavigationProp<ScreenParamList, 'VaccineList'>;
  route: RouteProp<ScreenParamList, 'VaccineList'>;
  assessmentData: AssessmentData;
};

export const VaccineListMissingModal: React.FC<Props> = ({ navigation, route, assessmentData }) => {
  const coordinator = assessmentCoordinator;

  const close = () => {
    coordinator.goToAddEditVaccine(route.params.assessmentData.vaccineData);
  };

  return (
    <View style={styles.modal}>
      <HeaderText style={styles.text}>{i18n.t('vaccines.your-vaccine.details-missing-title')}</HeaderText>
      <Text style={styles.text}>{i18n.t('vaccines.your-vaccine.details-missing-body')}</Text>
      <BrandedButton onPress={close} style={styles.button}>
        {i18n.t('vaccines.your-vaccine.details-missing-button')}
      </BrandedButton>
    </View>
  );
};

const styles = StyleSheet.create({
  modal: {
    backgroundColor: colors.white,
    shadowRadius: 0,
    borderRadius: 16,
    minHeight: 224,
    alignItems: 'center',
    textAlign: 'center',
    padding: 32,
    marginTop: 160,
    marginHorizontal: 16,
  },
  text: {
    textAlign: 'center',
    marginBottom: 24,
  },
  button: {
    padding: 16,
    textAlign: 'center',
    alignContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 64,
    backgroundColor: colors.darkblue,
  },
});
