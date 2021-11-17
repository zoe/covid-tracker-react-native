/* eslint-disable react/no-children-prop */
import { EVaccineTypes, TDose } from '@covid/core/vaccine/dto/VaccineRequest';
import {
  IVaccineDoseByTypeProps,
  VaccineDoseListByType,
} from '@covid/features/vaccines/components/VaccineDoseListByType';
import i18n from '@covid/locale/i18n';
import { sizes } from '@covid/themes';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { colors } from '@theme';
import * as React from 'react';
import { useWindowDimensions } from 'react-native';

export enum ETabScreen {
  COVID = 'VaccineListCovidTab',
  FLU = 'VaccineListFluTab',
}

interface IProps extends IVaccineDoseByTypeProps {
  tabViewHeight: number;
  minTabViewHeight: number;
  initialRouteName: ETabScreen;
}

const Tab = createMaterialTopTabNavigator();

const GUTTER = 50;
const MIN_TAB_WIDTH = 85;

export function VaccineTabbedListsScreen(props: IProps) {
  const windowDimensions = useWindowDimensions();

  const covidVaccines = React.useMemo(
    () => props.vaccineDoses.filter((item: TDose) => item.vaccine_type === EVaccineTypes.COVID_VACCINE),
    [props.vaccineDoses],
  );

  const fluVaccines = React.useMemo(
    () => props.vaccineDoses.filter((item: TDose) => item.vaccine_type === EVaccineTypes.SEASONAL_FLU),
    [props.vaccineDoses],
  );

  const barwidth = windowDimensions.width - GUTTER;
  const tabWidth = Math.max(MIN_TAB_WIDTH, barwidth / 2);

  return (
    <Tab.Navigator
      backBehavior="none"
      initialRouteName={props.initialRouteName}
      sceneContainerStyle={{
        backgroundColor: colors.backgroundPrimary,
        height: props.tabViewHeight,
        minHeight: props.minTabViewHeight,
      }}
      tabBarOptions={{
        activeTintColor: colors.primary,
        inactiveTintColor: colors.quaternary,
        indicatorStyle: { backgroundColor: colors.accent },
        labelStyle: {
          fontFamily: 'SofiaPro-Medium',
          fontSize: 14,
          lineHeight: 20,
          textTransform: 'none',
        },
        scrollEnabled: true,
        style: { marginBottom: sizes.s },
        tabStyle: { paddingHorizontal: sizes.xs, paddingVertical: sizes.s, width: tabWidth },
      }}
    >
      <Tab.Screen
        children={() => <VaccineDoseListByType vaccineDoses={covidVaccines} vaccineRecord={props.vaccineRecord} />}
        name={ETabScreen.COVID}
        options={{
          tabBarAccessibilityLabel: i18n.t('vaccines.vaccine-list.tab-covid'),
          tabBarLabel: i18n.t('vaccines.vaccine-list.tab-covid'),
        }}
      />
      <Tab.Screen
        children={() => <VaccineDoseListByType vaccineDoses={fluVaccines} vaccineRecord={props.vaccineRecord} />}
        name={ETabScreen.FLU}
        options={{
          tabBarAccessibilityLabel: i18n.t('vaccines.vaccine-list.tab-flu'),
          tabBarLabel: i18n.t('vaccines.vaccine-list.tab-flu'),
        }}
      />
    </Tab.Navigator>
  );
}
