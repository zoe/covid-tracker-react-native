import { RouteProp, useFocusEffect } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Text } from 'native-base';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import moment from 'moment';
import { useSelector } from 'react-redux';

import { colors } from '@theme';
import Screen from '@covid/components/Screen';
import { BrandedButton, HeaderText, RegularText } from '@covid/components/Text';
import { Loading } from '@covid/components/Loading';
import i18n from '@covid/locale/i18n';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import assessmentCoordinator from '@covid/core/assessment/AssessmentCoordinator';
import { Dose, VaccineRequest } from '@covid/core/vaccine/dto/VaccineRequest';
import { VaccineCard } from '@covid/features/vaccines/components/VaccineCard';
import { useInjection } from '@covid/provider/services.hooks';
import { Services } from '@covid/provider/services.types';
import { useAppDispatch } from '@covid/core/state/store';
import vaccinesSlice, { fetchVaccines } from '@covid/core/state/vaccines/slice';
import { RootState } from '@covid/core/state/root';
import { IPatientService } from '@covid/core/patient/PatientService';

type Props = {
  navigation: StackNavigationProp<ScreenParamList, 'VaccineList'>;
  route: RouteProp<ScreenParamList, 'VaccineList'>;
};

export const VaccineListScreen: React.FC<Props> = ({ route, navigation }) => {
  const patientService = useInjection<IPatientService>(Services.Patient);
  const coordinator = assessmentCoordinator;
  const vaccines = useSelector<RootState, VaccineRequest[]>((state) => state.vaccines.vaccines);
  const [isLoading, setLoading] = useState<boolean>(true);
  const { patientData } = route.params.assessmentData;
  const dispatch = useAppDispatch();

  useFocusEffect(
    React.useCallback(() => {
      dispatch(vaccinesSlice.actions.reset());
      refreshVaccineList();
    }, [])
  );

  const refreshVaccineList = () => {
    setLoading(true);
    const patientId = patientData.patientId;
    dispatch(fetchVaccines(patientId))
      .then(() => setLoading(false))
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
      const dose = getFirstActiveDose(vaccines);
      const shouldAskDoseSymptoms = !!dose;
      coordinator.gotoNextScreen(route.name, { shouldAskDoseSymptoms, dose });
    } else {
      //Send to hesitancy screen if they havn't yet seen it
      if (!patientData.patientInfo?.vaccine_hesitancy_seen) {
        // Update patient's vaccine_hesitancy_seen so it doesn't show next time, even after vaccine delete.
        patientService.updatePatientInfo(patientData.patientId, { vaccine_hesitancy_seen: true }).then((info) => {
          patientData.patientInfo = info;
          coordinator.gotoNextScreen(route.name, { askVaccineHesitancy: true });
        });
      } else {
        coordinator.gotoNextScreen(route.name, { askVaccineHesitancy: false });
      }
    }
  };

  const enableNextButton = () => {
    const firstDose: Partial<Dose> | undefined = vaccines[0]?.doses[0];
    return !(firstDose && firstDose.date_taken_specific == null); // Disable button if user has first dose with no date.
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
          {vaccines.map((vaccine: VaccineRequest) => {
            return (
              <VaccineCard
                style={{ marginVertical: 8 }}
                vaccine={vaccine}
                key={vaccine.id}
                onPressEdit={(i) => {
                  coordinator.goToAddEditVaccine(vaccine);
                }}
              />
            );
          })}
        </>
      );
    }
  };

  return (
    <View style={styles.rootContainer}>
      <Screen profile={patientData.patientState.profile} navigation={navigation}>
        <HeaderText style={{ margin: 16 }}>{i18n.t('vaccines.vaccine-list.title')}</HeaderText>
        <RegularText style={{ marginVertical: 8, marginHorizontal: 16 }}>
          {i18n.t('vaccines.vaccine-list.description')}
        </RegularText>
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
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: colors.backgroundPrimary,
  },
  newButton: {
    marginVertical: 16,
    borderWidth: 1,
    borderColor: colors.purple,
    backgroundColor: colors.backgroundPrimary,
  },
  newText: {
    color: colors.purple,
  },
  continueButton: {
    marginHorizontal: 16,
  },
});
