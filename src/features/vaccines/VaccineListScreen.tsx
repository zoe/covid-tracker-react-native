import { IUIAction } from '@covid/common';
import { BrandedButton, HeaderText, Text } from '@covid/components';
import { Loading } from '@covid/components/Loading';
import Screen from '@covid/components/Screen';
import assessmentCoordinator from '@covid/core/assessment/AssessmentCoordinator';
import { isSECountry } from '@covid/core/localisation/LocalisationService';
import { selectApp, setLoggedVaccine } from '@covid/core/state';
import { RootState } from '@covid/core/state/root';
import { useAppDispatch } from '@covid/core/state/store';
import vaccinesSlice, { fetchVaccines } from '@covid/core/state/vaccines/slice';
import { Dose, VaccineRequest } from '@covid/core/vaccine/dto/VaccineRequest';
import { IVaccineService } from '@covid/core/vaccine/VaccineService';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import { VaccineWarning } from '@covid/features/vaccines/components';
import { VaccineCard } from '@covid/features/vaccines/components/VaccineCard';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import { useInjection } from '@covid/provider/services.hooks';
import { Services } from '@covid/provider/services.types';
import { openWebLink } from '@covid/utils/links';
import { RouteProp, useFocusEffect } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors } from '@theme';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';

type Props = {
  navigation: StackNavigationProp<ScreenParamList, 'VaccineList'>;
  route: RouteProp<ScreenParamList, 'VaccineList'>;
};

export const VaccineListScreen: React.FC<Props> = ({ route, navigation }) => {
  const vaccineService = useInjection<IVaccineService>(Services.Vaccine);
  const coordinator = assessmentCoordinator;
  const vaccines = useSelector<RootState, VaccineRequest[]>((state) => state.vaccines.vaccines);
  const [loading, setLoading] = useState<boolean>(true);
  const [showVaccineWarning, setShowVaccineWarning] = useState<boolean>(false);
  const { patientData } = route.params.assessmentData;
  const dispatch = useAppDispatch();
  const app = useSelector(selectApp);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(vaccinesSlice.actions.reset());
      refreshVaccineList();
    }, []),
  );

  const refreshVaccineList = () => {
    setLoading(true);
    const { patientId } = patientData;
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

  const navigateToNextPage = async () => {
    if (vaccines.length > 0) {
      const dose = getFirstActiveDose(vaccines);
      const shouldAskDoseSymptoms = !!dose;
      coordinator.gotoNextScreen(route.name, { dose, shouldAskDoseSymptoms });
    } else {
      coordinator.gotoNextScreen(route.name, {});
    }
  };

  const enableNext = () => {
    const firstDose: Partial<Dose> | undefined = vaccines[0]?.doses[0];
    const secondDose: Partial<Dose> | undefined = vaccines[0]?.doses[1];

    // Disable button if user has dose(s) with missing date, brand & description
    if (
      firstDose &&
      (firstDose.date_taken_specific == null ||
        firstDose.brand === null ||
        (firstDose.brand === 'not_sure' && firstDose.description === null))
    ) {
      return false;
    }

    if (
      secondDose &&
      (secondDose.date_taken_specific == null ||
        secondDose.brand === null ||
        (secondDose.brand === 'not_sure' && secondDose.description === null))
    ) {
      return false;
    }

    return true;
  };

  const ListContent = () => {
    if (loading) {
      return <Loading error={null} status="" />;
    }
    return (
      <>
        {vaccines.length === 0 && (
          <BrandedButton onPress={() => coordinator.goToAddEditVaccine()} style={styles.newButton}>
            <Text style={styles.newText}>{i18n.t('vaccines.vaccine-list.add-button')}</Text>
          </BrandedButton>
        )}

        {vaccines.map((vaccine: VaccineRequest) => {
          return (
            <VaccineCard
              key={vaccine.id}
              onPressEdit={(i) => {
                coordinator.goToAddEditVaccine(vaccine);
              }}
              style={{ marginVertical: 8 }}
              vaccine={vaccine}
            />
          );
        })}
      </>
    );
  };

  const showPopup = () => {
    NavigatorService.navigate('VaccineListMissingModal', { vaccine: vaccines[0] });
  };

  const navigateToNextPageOrShowPopup = () => {
    const dose = getFirstActiveDose(vaccines);
    coordinator.test(dose);
    return;
    if (enableNext()) {
      navigateToNextPage();
    } else {
      showPopup();
    }
  };

  useEffect(() => {
    if (app.loggedVaccine) {
      setShowVaccineWarning(true);
    }
  }, [app.loggedVaccine]);

  const actions: IUIAction[] = [
    ...(isSECountry()
      ? [
          {
            action: () => {
              setShowVaccineWarning(false);
              dispatch(setLoggedVaccine(false));
              openWebLink(
                'https://www.folkhalsomyndigheten.se/smittskydd-beredskap/utbrott/aktuella-utbrott/covid-19/vaccination-mot-covid-19/information-for-dig-om-vaccinationen/efter-vaccinationen--fortsatt-folja-de-allmanna-raden/',
              );
            },
            label: i18n.t('navigation.learn-more'),
          },
        ]
      : []),
    {
      action: () => {
        setShowVaccineWarning(false);
        dispatch(setLoggedVaccine(false));
      },
      label: i18n.t('navigation.dismiss'),
    },
  ];

  // Disable the banner popup until we can solve the "cannot call hook" problem
  //
  // useEffect(() => {
  //   if (app.loggedVaccine) {
  //     addMessage({
  //       actions: [
  //         ...(isSECountry()
  //           ? [
  //               {
  //                 label: i18n.t('navigation.learn-more'),
  //                 action: () => {
  //                   removeMessage();
  //                   dispatch(setLoggedVaccine(false));
  //                   openWebLink(
  //                     'https://www.folkhalsomyndigheten.se/smittskydd-beredskap/utbrott/aktuella-utbrott/covid-19/vaccination-mot-covid-19/information-for-dig-om-vaccinationen/efter-vaccinationen--fortsatt-folja-de-allmanna-raden/'
  //                   );
  //                 },
  //               },
  //             ]
  //           : []),
  //         {
  //           label: i18n.t('navigation.dismiss'),
  //           action: () => {
  //             removeMessage();
  //             dispatch(setLoggedVaccine(false));
  //           },
  //         },
  //       ],
  //       messageType: 'BANNER',
  //       message: {
  //         body: i18n.t('vaccines.banner.body'),
  //       },
  //     });
  //   }
  // }, [app.loggedVaccine]);

  return (
    <View style={styles.rootContainer}>
      {showVaccineWarning ? <VaccineWarning actions={actions} /> : null}

      <Screen navigation={navigation} profile={patientData.patientState.profile}>
        <HeaderText style={{ margin: 16 }}>{i18n.t('vaccines.vaccine-list.title')}</HeaderText>

        <Text style={{ marginHorizontal: 16, marginVertical: 8 }}>{i18n.t('vaccines.vaccine-list.description')}</Text>

        <ListContent />

        <View style={{ flex: 1 }} />

        <BrandedButton onPress={navigateToNextPageOrShowPopup} style={styles.continueButton}>
          <Text style={{ color: colors.white }}>
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
  continueButton: {
    color: colors.white,
    marginHorizontal: 16,
  },
  newButton: {
    backgroundColor: colors.backgroundPrimary,
    borderColor: colors.purple,
    borderWidth: 1,
    marginVertical: 16,
  },
  newText: {
    color: colors.purple,
  },
  rootContainer: {
    backgroundColor: colors.backgroundPrimary,
    flex: 1,
  },
});
