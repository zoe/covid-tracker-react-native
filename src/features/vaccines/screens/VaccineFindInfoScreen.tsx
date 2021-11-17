import VaccineDemoUK from '@assets/vaccines/VaccineDemoUK';
import VaccineDemoUS from '@assets/vaccines/VaccineDemoUS';
import { Screen } from '@covid/components/Screen';
import { HeaderText, RegularText } from '@covid/components/Text';
import { isGBCountry, isUSCountry } from '@covid/core/localisation/LocalisationService';
import { TScreenParamList } from '@covid/features/ScreenParamList';
import i18n from '@covid/locale/i18n';
import { sizes } from '@covid/themes';
import { RouteProp } from '@react-navigation/native';
import * as React from 'react';
import { useWindowDimensions } from 'react-native';

type TProps = {
  route: RouteProp<TScreenParamList, 'VaccineFindInfo'>;
};

export const VaccineFindInfoScreen: React.FC<TProps> = ({ route }) => {
  const windowDimensions = useWindowDimensions();

  const width = Math.min(sizes.maxScreenWidth, windowDimensions.width - sizes.screenHorizontalPadding * 2);

  // No case for SE, just GB and US atm (Feb 2021)
  let exampleSVG;
  if (isGBCountry()) {
    exampleSVG = <VaccineDemoUK width={width} />;
  }
  if (isUSCountry()) {
    exampleSVG = <VaccineDemoUS width={width} />;
  }

  return (
    <Screen profile={route.params?.assessmentData?.patientData?.profile} testID="vaccine-find-info-screen">
      <HeaderText>{i18n.t('vaccines.find-info.title')}</HeaderText>

      <RegularText style={{ paddingBottom: sizes.l }}>{i18n.t('vaccines.find-info.body-1')}</RegularText>

      {exampleSVG}
    </Screen>
  );
};
