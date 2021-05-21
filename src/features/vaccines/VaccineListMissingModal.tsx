import { RouteProp } from '@react-navigation/native';
import React from 'react';
import { StyleSheet } from 'react-native';

import { colors } from '@covid/theme';
import i18n from '@covid/locale/i18n';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import { BrandedButton, HeaderText, Text, Modal } from '@covid/components';
import assessmentCoordinator from '@covid/core/assessment/AssessmentCoordinator';

interface IProps {
  route: RouteProp<ScreenParamList, 'VaccineList'>;
}

export default function VaccineListMissingModal({ route }: IProps) {
  const coordinator = assessmentCoordinator;

  const close = () => {
    coordinator.goToAddEditVaccine(route.params.vaccine);
  };

  return (
    <Modal>
      <HeaderText style={styles.text}>{i18n.t('vaccines.your-vaccine.details-missing-title')}</HeaderText>
      <Text style={styles.text}>{i18n.t('vaccines.your-vaccine.details-missing-body')}</Text>
      <BrandedButton onPress={close} style={styles.button}>
        {i18n.t('vaccines.your-vaccine.details-missing-button')}
      </BrandedButton>
    </Modal>
  );
}

const styles = StyleSheet.create({
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
