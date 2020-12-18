import { RouteProp, useFocusEffect } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Text } from 'native-base';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

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

  const handleNextButton = async () => {
    const hasPlans = await vaccineService.hasVaccinePlans(patientData.patientId);
    const takenVaccine = vaccines.length > 0;

    coordinator.gotoNextScreen(route.name, {
      takenVaccine,
      hasPlans,
    });
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
    marginHorizontal: 16,
    marginVertical: 16,
    backgroundColor: colors.backgroundTertiary,
  },
  newText: {
    color: colors.primary,
  },
  continueButton: {
    marginHorizontal: 16,
    marginBottom: 8,
  },
});
