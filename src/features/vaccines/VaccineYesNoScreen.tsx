import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { Form } from 'native-base';
import { StyleSheet, View } from 'react-native';

import Screen, { Header } from '@covid/components/Screen';
import { HeaderText, RegularText } from '@covid/components/Text';
import assessmentCoordinator from '@covid/core/assessment/AssessmentCoordinator';
import i18n from '@covid/locale/i18n';
import { colors } from '@theme';
import { SelectorButton } from '@covid/components/SelectorButton';
import { VaccineBrands, VaccineRequest, VaccineTypes } from '@covid/core/vaccine/dto/VaccineRequest';
import { useInjection } from '@covid/provider/services.hooks';
import { Services } from '@covid/provider/services.types';
import { IVaccineService } from '@covid/core/vaccine/VaccineService';

import { ScreenParamList } from '../ScreenParamList';

type Props = {
  navigation: StackNavigationProp<ScreenParamList, 'VaccineYesNo'>;
  route: RouteProp<ScreenParamList, 'VaccineYesNo'>;
};

export const VaccineYesNoScreen: React.FC<Props> = ({ route, navigation }) => {
  const coordinator = assessmentCoordinator;
  const currentPatient = route.params.assessmentData.patientData.patientState;

  const vaccineService = useInjection<IVaccineService>(Services.Vaccine);
  const [disabled, setDisabled] = useState<boolean>(false);

  const handlePress = async (takenVaccine: boolean) => {
    setDisabled(true);

    if (takenVaccine) {
      const vaccine: Partial<VaccineRequest> = {
        vaccine_type: VaccineTypes.COVID_VACCINE,
        brand: VaccineBrands.PFIZER,
      };

      // Save vaccine in coordinator for submission later
      coordinator.setVaccine(vaccine);
    }

    const hasPlans = await vaccineService.hasVaccinePlans(currentPatient.patientId);
    coordinator.gotoNextScreen(route.name, {
      takenVaccine,
      hasPlans,
    });
    setDisabled(false);
  };

  return (
    <View style={styles.rootContainer}>
      <Screen profile={currentPatient.profile} navigation={navigation}>
        <Header>
          <HeaderText>{i18n.t('vaccines.yes-no.title')}</HeaderText>
        </Header>

        <View style={{ marginHorizontal: 16, marginVertical: 16 }}>
          <View>
            <RegularText>{i18n.t('vaccines.yes-no.description')}</RegularText>
          </View>

          <Form style={{ flexGrow: 1 }}>
            <SelectorButton
              onPress={() => handlePress(true)}
              text={i18n.t('vaccines.yes-no.answer-yes')}
              disable={disabled}
            />
            <SelectorButton
              onPress={() => handlePress(false)}
              text={i18n.t('vaccines.yes-no.answer-no')}
              disable={disabled}
            />
          </Form>
        </View>
      </Screen>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: colors.backgroundPrimary,
  },
});
