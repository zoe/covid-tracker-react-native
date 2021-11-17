import { Screen } from '@covid/components/Screen';
import { HeaderText, RegularText } from '@covid/components/Text';
import { TScreenParamList } from '@covid/features/ScreenParamList';
import i18n from '@covid/locale/i18n';
import { sizes } from '@covid/themes';
import { RouteProp } from '@react-navigation/native';
import * as React from 'react';

type TProps = {
  route: RouteProp<TScreenParamList, 'VaccineLogSymptomsInfo'>;
};

export const VaccineLogSymptomsInfoScreen: React.FC<TProps> = ({ route }) => {
  return (
    <Screen profile={route.params?.assessmentData?.patientData?.profile} testID="vaccine-log-symptoms-info-screen">
      <HeaderText style={{ marginBottom: sizes.l }}>{i18n.t('vaccines.log-symptoms.title')}</HeaderText>
      <RegularText style={{ marginBottom: sizes.l }}>{i18n.t('vaccines.log-symptoms.body-1')}</RegularText>
      <RegularText style={{ marginBottom: sizes.l }}>{i18n.t('vaccines.log-symptoms.body-2')}</RegularText>
      <RegularText style={{ marginBottom: sizes.l }}>{i18n.t('vaccines.log-symptoms.body-3')}</RegularText>
    </Screen>
  );
};
