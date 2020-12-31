import { RouteProp, useFocusEffect } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Text } from 'native-base';
import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import moment, { Moment } from 'moment';

import { colors } from '@theme';
import Screen from '@covid/components/Screen';
import { BrandedButton, HeaderText, RegularText } from '@covid/components/Text';
import { Loading } from '@covid/components/Loading';
import i18n from '@covid/locale/i18n';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import assessmentCoordinator from '@covid/core/assessment/AssessmentCoordinator';
import { VaccineRequest } from '@covid/core/vaccine/dto/VaccineRequest';
import { VaccineCard } from '@covid/features/vaccines/components/VaccineCard';
import { useInjection } from '@covid/provider/services.hooks';
import { Services } from '@covid/provider/services.types';

import { IVaccineService } from '../../core/vaccine/VaccineService';

type Props = {
  navigation: StackNavigationProp<ScreenParamList, 'VaccineList'>;
  route: RouteProp<ScreenParamList, 'VaccineList'>;
};

export const VaccineListScreen: React.FC<Props> = ({ route, navigation }) => {
  const vaccineService = useInjection<IVaccineService>(Services.Vaccine);
  const coordinator = assessmentCoordinator;

  const [vaccines, setVaccines] = useState<VaccineRequest[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const { patientData } = route.params.assessmentData;

  useFocusEffect(
    React.useCallback(() => {
      refreshVaccineList();
    }, [])
  );

  const refreshVaccineList = () => {
    setLoading(true);
    vaccineService
      .listVaccines()
      .then((vaccines) => {
        const patientId = patientData.patientId;
        const patientVaccines = vaccines.filter((v) => v.patient === patientId);
        setVaccines(patientVaccines);
        setLoading(false);
      })
      .catch(() => {});
  };

  function getFirstActiveDose(vaccines: VaccineRequest[]): string | null | undefined {
    // Loops over all vaccines and doses and return the first dose that has a date in the last 7 days.
    const today = moment().add(moment().utcOffset(), 'minutes').toDate();
    const sevenDaysAgo = moment().add(moment().utcOffset(), 'minutes').subtract(7, 'days').toDate();

    for (let i = 0; i < vaccines.length; i++) {
      for (let j = 0; j < vaccines[i].doses?.length; j++) {
        const dose = vaccines[i].doses[j];
        if (dose.date_taken_specific) {
          const doseDate = moment(dose.date_taken_specific).toDate();
          if (sevenDaysAgo <= doseDate && doseDate <= today) {
            return dose.id;
          }
        }
      }
    }
    return null;
  }

  const handleNextButton = async () => {
    if (vaccines.length > 0) {
      const doseID = getFirstActiveDose(vaccines);
      const shouldAskDoseSymptoms = !!doseID;
      coordinator.gotoNextScreen(route.name, { shouldAskDoseSymptoms });
    } else {
      // No vaccines entered. Check if user has answered a VaccinePlan / VaccineHesitancy
      const hasPlans = await vaccineService.hasVaccinePlans(patientData.patientId);
      const askVaccineHesitancy = !hasPlans;
      coordinator.gotoNextScreen(route.name, { askVaccineHesitancy });
    }
  };

  const promptDeleteTest = (item: VaccineRequest) => {
    Alert.alert(
      i18n.t('vaccines.vaccine-list.delete-vaccine-title'),
      i18n.t('vaccines.vaccine-list.delete-vaccine-text'),
      [
        {
          text: i18n.t('cancel'),
          style: 'cancel',
        },
        {
          text: i18n.t('delete'),
          style: 'destructive',
          onPress: () => {
            vaccineService.deleteVaccine(item.id).then(() => refreshVaccineList());
          },
        },
      ],
      { cancelable: false }
    );
  };

  const enableNextButton = () => {
    if (!!vaccines[0]?.doses[0] && vaccines[0]?.doses[0]?.date_taken_specific === undefined) {
      return false;
    } else {
      return true;
    }
  };

  const ListContent = () => {
    if (isLoading) {
      return <Loading status="" error={null} />;
    } else {
      return (
        <>
          {vaccines.length === 0 && (
            <BrandedButton style={styles.newButton} onPress={() => coordinator.goToAddEditVaccine()}>
              <Text style={styles.newText}>{i18n.t('vaccines.vaccine-list.add-button')}</Text>
            </BrandedButton>
          )}

          <>
            {vaccines.map((item: VaccineRequest) => {
              return (
                <VaccineCard
                  style={{ marginVertical: 8 }}
                  vaccine={item}
                  key={item.id}
                  onPressDose={(i) => {
                    coordinator.goToAddEditVaccine(item, i);
                  }}
                  onPressDelete={() => promptDeleteTest(item)}
                />
              );
            })}
          </>
        </>
      );
    }
  };

  return (
    <Screen style={styles.rootContainer} profile={patientData.patientState.profile} navigation={navigation}>
      <HeaderText style={{ marginVertical: 16 }}>{i18n.t('vaccines.vaccine-list.title')}</HeaderText>

      <RegularText style={{ marginVertical: 8 }}>{i18n.t('vaccines.vaccine-list.description')}</RegularText>

      <ListContent />

      <View style={{ flex: 1 }} />

      <BrandedButton style={styles.continueButton} onPress={handleNextButton} enable={enableNextButton()}>
        <Text>
          {vaccines.length === 0
            ? i18n.t('vaccines.vaccine-list.no-vaccine')
            : vaccines[0]?.doses[1]?.date_taken_specific === undefined // 2nd dose not logged
            ? i18n.t('vaccines.vaccine-list.no-2nd')
            : i18n.t('vaccines.vaccine-list.correct-info')}
        </Text>
      </BrandedButton>
    </Screen>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
  },
  newButton: {
    marginVertical: 16,
    borderWidth: 1,
    borderColor: colors.purple,
    backgroundColor: colors.backgroundSecondary,
  },
  newText: {
    color: colors.purple,
  },
  continueButton: {},
});
