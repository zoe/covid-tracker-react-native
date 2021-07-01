import { BrandedButton, HeaderText, Text } from '@covid/components';
import { assessmentCoordinator } from '@covid/core/assessment/AssessmentCoordinator';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import i18n from '@covid/locale/i18n';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors } from '@theme';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';

type Props = {
  navigation: StackNavigationProp<ScreenParamList, 'VaccineList'>;
  route: RouteProp<ScreenParamList, 'VaccineList'>;
};

export const VaccineListMissingModal: React.FC<Props> = ({ route }) => {
  const coordinator = assessmentCoordinator;

  const close = () => {
    coordinator.goToAddEditVaccine(route.params?.vaccine);
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
    padding: 16,
    paddingHorizontal: 64,
    textAlign: 'center',
  },
  modal: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 16,
    marginHorizontal: 16,
    marginTop: 160,
    minHeight: 224,
    padding: 32,
    shadowRadius: 0,
    textAlign: 'center',
  },
  text: {
    marginBottom: 24,
    textAlign: 'center',
  },
});
