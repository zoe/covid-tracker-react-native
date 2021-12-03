import { BrandedButton, HeaderText, Text } from '@covid/components';
import { assessmentCoordinator } from '@covid/core/assessment/AssessmentCoordinator';
import { TDose } from '@covid/core/vaccine/dto/VaccineRequest';
import i18n from '@covid/locale/i18n';
import { TScreenParamList } from '@covid/routes/types';
import { sizes } from '@covid/themes';
import { RouteProp } from '@react-navigation/native';
import { colors } from '@theme';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';

type TProps = {
  route: RouteProp<TScreenParamList, 'VaccineList'>;
};

export const VaccineListMissingModal: React.FC<TProps> = ({ route }) => {
  const coordinator = assessmentCoordinator;

  // @julia: It looks like this is not working anymore. The params doesn't contain the vaccine
  // attribute anymore so the findIndex function always return -1.
  const close = () => {
    // Get the edit index of the first dose that has missing data
    const doses: TDose[] = route.params?.vaccine.doses ?? [];
    const incompleteDoseIndex: number = doses.findIndex((dose: TDose) => {
      return dose.date_taken_specific == null || dose.brand === null;
    });
    coordinator.goToAddEditVaccine(route.params?.vaccine, incompleteDoseIndex);
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
  button: {
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.darkblue,
    padding: sizes.m,
    paddingHorizontal: sizes.xxl,
    textAlign: 'center',
  },
  modal: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: sizes.m,
    marginHorizontal: sizes.m,
    marginTop: 160,
    minHeight: 224,
    padding: sizes.xl,
    shadowRadius: 0,
    textAlign: 'center',
  },
  text: {
    marginBottom: sizes.l,
    textAlign: 'center',
  },
});
