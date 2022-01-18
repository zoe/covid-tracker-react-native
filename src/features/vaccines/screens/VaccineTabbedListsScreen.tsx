/* eslint-disable react/no-children-prop */
import { EVaccineTypes, TDose } from '@covid/core/vaccine/dto/VaccineRequest';
import {
  IVaccineDoseByTypeProps,
  VaccineDoseListByType,
} from '@covid/features/vaccines/components/VaccineDoseListByType';
import i18n from '@covid/locale/i18n';
import { sizes, styling } from '@covid/themes';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { colors } from '@theme';
import * as React from 'react';
import { LayoutChangeEvent, useWindowDimensions, View } from 'react-native';

export enum ETabScreen {
  COVID = 'VaccineListCovidTab',
  FLU = 'VaccineListFluTab',
}

interface IProps extends IVaccineDoseByTypeProps {
  initialRouteName: ETabScreen;
}

const Tab = createMaterialTopTabNavigator();

const SINGLE_DOSE_ROW_HEIGHT = 48;
const HEIGHT_OF_STATIC_CONTENT = 500;

export function VaccineTabbedListsScreen(props: IProps) {
  const [viewWidth, setViewWidth] = React.useState(0);
  const windowDimensions = useWindowDimensions();

  const covidVaccines = React.useMemo(
    () => props.vaccineDoses.filter((item: TDose) => item.vaccine_type === EVaccineTypes.COVID_VACCINE),
    [props.vaccineDoses],
  );

  const fluVaccines = React.useMemo(
    () => props.vaccineDoses.filter((item: TDose) => item.vaccine_type === EVaccineTypes.SEASONAL_FLU),
    [props.vaccineDoses],
  );

  const onLayoutWidth = React.useCallback(
    (event: LayoutChangeEvent) => setViewWidth(event.nativeEvent.layout.width),
    [],
  );

  const minTabViewHeight = SINGLE_DOSE_ROW_HEIGHT * 5;
  const tabViewHeight = windowDimensions.height - HEIGHT_OF_STATIC_CONTENT;

  return (
    <>
      <View onLayout={onLayoutWidth} style={styling.measureWidth} />
      <Tab.Navigator
        backBehavior="none"
        initialRouteName={props.initialRouteName}
        sceneContainerStyle={{
          backgroundColor: colors.backgroundPrimary,
          height: tabViewHeight,
          minHeight: minTabViewHeight,
        }}
        screenOptions={{
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.quaternary,
          tabBarIndicatorStyle: { backgroundColor: colors.accent },
          tabBarItemStyle: { paddingHorizontal: sizes.xs, paddingVertical: sizes.s, width: viewWidth / 2 },
          tabBarLabelStyle: {
            fontFamily: 'SofiaPro-Medium',
            fontSize: 14,
            lineHeight: 20,
            textTransform: 'none',
          },
          tabBarScrollEnabled: true,
          tabBarStyle: { marginBottom: sizes.s },
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
    </>
  );
}
