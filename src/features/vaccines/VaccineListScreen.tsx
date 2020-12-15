import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Text } from 'native-base';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { colors } from '@theme';
import ProgressStatus from '@covid/components/ProgressStatus';
import Screen, { Header, ProgressBlock } from '@covid/components/Screen';
import { BrandedButton, HeaderText, RegularText } from '@covid/components/Text';
import { Loading } from '@covid/components/Loading';
import i18n from '@covid/locale/i18n';
import { vaccineService } from '@covid/Services';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import assessmentCoordinator from '@covid/core/assessment/AssessmentCoordinator';
import { VaccineRequest } from '@covid/core/vaccine/dto/VaccineRequest';
import { VaccineCard } from '@covid/features/vaccines/components/VaccineCard';

import { IVaccineService } from '../../core/vaccine/VaccineService';

type Props = {
  navigation: StackNavigationProp<ScreenParamList, 'VaccineList'>;
  route: RouteProp<ScreenParamList, 'VaccineList'>;
};

export const VaccineListScreen: React.FC<Props> = ({ route, navigation }) => {
  // TODO Inject
  const vaccineService: IVaccineService = vaccineService;
  const coordinator = assessmentCoordinator;

  const [vaccines, setVaccines] = useState<VaccineRequest[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const { patientData } = route.params.assessmentData;

  useEffect(() => {
    (async () => {
      try {
        const vaccines = await vaccineService.listVaccines();
        const patientId = patientData.patientId;
        const patientVaccines = vaccines.filter((v) => v.patient === patientId);
        setVaccines(patientVaccines);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const goToAddEditVaccine = (doseIndex?: number) => {
    coordinator.goToAddEditVaccine(doseIndex);
  };

  const handleNextButton = async () => {
    coordinator.gotoNextScreen(route.name);
  };

  const MainContent = () => {
    if (isLoading) {
      return <Loading status="" error={null} />;
    } else {
      return (
        <>
          {vaccines.length === 0 && (
            <BrandedButton style={styles.newButton} onPress={() => goToAddEditVaccine()}>
              <Text style={styles.newText}>{i18n.t('covid-test-list.add-new-test')}</Text>
            </BrandedButton>
          )}

          <View style={styles.content}>
            {vaccines.map((item: VaccineRequest) => {
              return <VaccineCard vaccine={item} key={item.id} />;
            })}
          </View>
        </>
      );
    }
  };

  return (
    <View style={styles.rootContainer}>
      <Screen profile={patientData.patientState.profile} navigation={navigation}>
        <Header>
          <HeaderText>{i18n.t('covid-test-list.title')}</HeaderText>
        </Header>

        <ProgressBlock>
          <ProgressStatus step={0} maxSteps={1} />
        </ProgressBlock>

        <View style={styles.content}>
          <RegularText>{i18n.t('covid-test-list.text')}</RegularText>
        </View>

        <MainContent />
      </Screen>

      <BrandedButton style={styles.continueButton} onPress={handleNextButton}>
        <Text>
          {vaccines.length === 0
            ? i18n.t('covid-test-list.never-had-test')
            : i18n.t('covid-test-list.above-list-correct')}
        </Text>
      </BrandedButton>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: colors.backgroundPrimary,
  },
  content: {
    margin: 16,
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
    marginBottom: 32,
  },
});
